import { describe, expect, it } from "vitest";
import { cn } from "./utils";

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
});
