// コンポーネントのソースを読むので node 環境で動かす
// en: Runs in the node environment because it reads the component sources.
// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, it, expect } from "vitest";

const COMPONENTS_DIR = path.resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "components",
  "ui"
);

const componentSources = fs
  .readdirSync(COMPONENTS_DIR)
  .filter(name => fs.existsSync(path.join(COMPONENTS_DIR, name, "index.tsx")))
  .map(name => ({
    name,
    source: fs.readFileSync(
      path.join(COMPONENTS_DIR, name, "index.tsx"),
      "utf8"
    ),
  }));

/**
 * ホバーの色の変化はトランジションで動かさない
 * en: Hover color changes are not animated with transitions.
 *
 * ホバーは操作への即時の応答なので、色はすぐ切り替える。状態の変化に伴う色
 * （Switch のトラックなど）は、`--motion-color-*` で個別に動かす。
 * en: Hover is an immediate response to the pointer, so colors switch instantly. Colors that
 * follow a state change (e.g. the Switch track) are animated individually with `--motion-color-*`.
 */
describe("hover transitions", () => {
  // 状態の変化に伴う色をまだ Tailwind 標準の時間で動かしているもの。モーショントークンへの
  // 置き換えで外していく
  // en: Components still animating state-change colors with Tailwind's default timing.
  // Remove each entry as it moves to the motion tokens.
  const STATE_CHANGE_PENDING = new Set(["switch"]);

  it("reads the component sources", () => {
    expect(componentSources.length).toBeGreaterThan(20);
  });

  it.each(componentSources.filter(c => !STATE_CHANGE_PENDING.has(c.name)))(
    "$name does not use transition-colors / transition-all",
    ({ source }) => {
      expect(source).not.toMatch(/\btransition-(colors|all)\b/);
    }
  );
});

/**
 * 重さを持たないコンポーネントは、モーショントークンを参照しない
 * en: Components without a motion weight never reference the motion tokens.
 *
 * 設計ガイドライン 2.3。一定速度で回り続ける表示（Spinner）、繰り返しの読み込み表示（Skeleton）、
 * 直接操作（Slider）は、motion-weight を変えても動きが変わらないようにする。
 * en: Motion guidelines 2.3. A constantly spinning indicator (Spinner), a repeating loading
 * placeholder (Skeleton) and direct manipulation (Slider) must not change with motion-weight.
 */
describe("components without a motion weight", () => {
  const UNWEIGHTED = ["spinner", "skeleton", "slider"];

  it.each(UNWEIGHTED)("%s does not reference the motion tokens", name => {
    const component = componentSources.find(c => c.name === name);
    expect(component, `${name} が見つかりません`).toBeDefined();
    expect(component?.source).not.toMatch(/--motion-|animate-motion-/);
  });
});
