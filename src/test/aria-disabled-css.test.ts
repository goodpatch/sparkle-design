// このテストだけ node 環境で動かす。Tailwind のコンパイルにファイルシステムと
// file スキームの import.meta.url が必要で、jsdom 環境では解決できないため
// en: This file runs in the node environment: compiling Tailwind needs the filesystem and a
// file-scheme import.meta.url, which the jsdom environment does not provide.
// @vitest-environment node
import path from "node:path";
import { fileURLToPath } from "node:url";

import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { describe, it, expect, beforeAll } from "vitest";

const REPO_ROOT = path.resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  ".."
);

// 検証したいユーティリティだけを候補として渡す（プロジェクト全体の走査は不要）
// en: Feed only the utilities under test as candidates; scanning the whole project is unnecessary.
const PROBE_CSS = `
@import "tailwindcss" source(none);
@import "./src/app/sparkle-design.css";
@source inline("hover:bg-surface-primary-high-hover");
@source inline("active:bg-surface-primary-high-active");
@source inline("disabled:bg-surface-primary-high-disabled");
@source inline("aria-disabled:bg-surface-primary-high-disabled");
@source inline("aria-disabled:border-border-primary-low");
`;

/**
 * `aria-disabled:` ユーティリティが実際に CSS として出力されるかの検証
 * en: Verifies that the `aria-disabled:` utilities are actually emitted as CSS.
 *
 * コンポーネント側のテストは className に文字列が載ることしか見ないため、
 * 「Tailwind が sparkle のトークン付きで CSS を吐くか」「hover に勝つか」は
 * ここで実コンパイルして確認する（goodpatch/sparkle-design#311）
 * en: The component tests only assert the class strings. Whether Tailwind emits CSS with the
 * sparkle tokens, and whether it beats `hover:`, is verified here by compiling for real (#311).
 */
describe("aria-disabled utilities (compiled CSS)", () => {
  let css = "";

  beforeAll(async () => {
    const from = path.join(REPO_ROOT, "aria-disabled-css.test.css");
    const result = await postcss([tailwind()]).process(PROBE_CSS, { from });
    css = result.css;
  }, 60_000);

  it.each([
    [
      "aria-disabled:bg-surface-primary-high-disabled",
      "--color-surface-primary-high-disabled",
    ],
    ["aria-disabled:border-border-primary-low", "--color-border-primary-low"],
  ])("emits %s with the sparkle token", (utility, token) => {
    const rule = css.slice(css.indexOf(`.${utility.replace(":", "\\:")}`));

    expect(css).toContain(`.${utility.replace(":", "\\:")}`);
    expect(rule).toContain('[aria-disabled="true"]');
    expect(rule.slice(0, 300)).toContain(`var(${token})`);
  });

  // Button は無効時も hover: / active: を出力し続けるため、詳細度が並ぶこの 2 つの
  // 勝敗は出力順だけで決まる。aria-disabled が後ろに来ることを固定する
  // en: Button keeps emitting hover: / active: while disabled. Their specificity ties, so the
  // winner is decided purely by output order — pin aria-disabled to come last.
  it("orders aria-disabled after hover / active / disabled", () => {
    const at = (utility: string) =>
      css.indexOf(`.${utility.replace(":", "\\:")}`);

    const hover = at("hover:bg-surface-primary-high-hover");
    const active = at("active:bg-surface-primary-high-active");
    const disabled = at("disabled:bg-surface-primary-high-disabled");
    const ariaDisabled = at("aria-disabled:bg-surface-primary-high-disabled");

    expect(hover).toBeGreaterThan(-1);
    expect(active).toBeGreaterThan(hover);
    expect(disabled).toBeGreaterThan(active);
    expect(ariaDisabled).toBeGreaterThan(disabled);
  });
});
