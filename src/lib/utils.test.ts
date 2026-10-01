import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { cn, SPARKLE_RADIUS_NAMES, SPARKLE_SHADOW_NAMES } from "./utils";

// tailwind-merge が登録なしで認識する名前（Tailwind v4 の標準テーマ名と、
// isTshirtSize で判定される 3xl などの T シャツサイズ）
// en: Names tailwind-merge recognizes without registration (Tailwind v4 default theme
// names plus T-shirt sizes such as 3xl matched by isTshirtSize)
const TAILWIND_RADIUS = [
  "none",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "full",
];
const TAILWIND_SHADOW = [
  "none",
  "2xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
];

describe("cn", () => {
  it.each([
    // 角丸: Sparkle のセマンティック名同士・Tailwind 標準名との衝突を後勝ちで解決する
    // en: Radius: resolve conflicts among Sparkle names and with Tailwind defaults
    ["rounded-modal rounded-none", "rounded-none"],
    ["rounded-action rounded-container", "rounded-container"],
    ["rounded-lg rounded-modal", "rounded-modal"],
    ["rounded-t-action rounded-t-none", "rounded-t-none"],
    // 影
    // en: Shadow
    ["shadow-raise shadow-none", "shadow-none"],
    ["shadow-popout shadow-lg", "shadow-lg"],
    ["shadow-flat shadow-raise", "shadow-raise"],
    ["shadow-3xl shadow-none", "shadow-none"],
    // 旧実装では shadow-raise が影の色と誤判定されて消えていた
    // en: The old setup misread shadow-raise as a shadow color and dropped it
    ["shadow-raise shadow-red-500", "shadow-raise shadow-red-500"],
    // タイポグラフィは同種同士だけ後勝ち
    // en: Typography only overrides its own kind
    ["character-3-regular-pro character-2-bold-mono", "character-2-bold-mono"],
    ["icon-5-fill-0 icon-6-fill-1", "icon-6-fill-1"],
  ])("merges %j → %j", (input, expected) => {
    expect(cn(input)).toBe(expected);
  });

  it.each([
    // 別プロパティ同士は残す
    // en: Keep classes that target different properties
    "rounded-modal shadow-popout",
    "character-3-regular-pro text-sm",
    "icon-5-fill-0 font-bold",
    "character-3-regular-pro icon-5-fill-0",
  ])("keeps both in %j", input => {
    expect(cn(input)).toBe(input);
  });

  it("still merges semantic color tokens", () => {
    expect(cn("bg-surface-base-0 bg-surface-neutral-middle-disabled")).toBe(
      "bg-surface-neutral-middle-disabled"
    );
  });

  it("registers every non-Tailwind --radius-* / --shadow-* name in the CSS", () => {
    // sparkle-design.css にトークンが増えたら登録漏れとして落とす
    // en: Fail when sparkle-design.css gains a token that isn't registered
    const css = readFileSync(
      resolve(__dirname, "../app/sparkle-design.css"),
      "utf8"
    );
    const names = (prefix: string) => [
      ...new Set(
        [...css.matchAll(new RegExp(`--${prefix}-([A-Za-z0-9-]+):`, "g"))].map(
          m => m[1]
        )
      ),
    ];
    expect(
      names("radius")
        .filter(n => !TAILWIND_RADIUS.includes(n))
        .sort()
    ).toEqual([...SPARKLE_RADIUS_NAMES].sort());
    expect(
      names("shadow")
        .filter(n => !TAILWIND_SHADOW.includes(n))
        .sort()
    ).toEqual([...SPARKLE_SHADOW_NAMES].sort());
  });
});
