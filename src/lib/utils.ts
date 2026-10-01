import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * src/app/sparkle-design.css の --radius-* / --shadow-* のうち Tailwind 標準に無い名前。
 * CSS とのずれは utils.test.ts で検出する
 * en: --radius-* / --shadow-* names in src/app/sparkle-design.css that Tailwind doesn't ship.
 *     Drift from the CSS is caught by utils.test.ts
 */
export const SPARKLE_RADIUS_NAMES = [
  "divide",
  "minimum",
  "notice",
  "action",
  "container",
  "modal",
  "round",
  "halfModal",
] as const;
export const SPARKLE_SHADOW_NAMES = [
  "base",
  "flat",
  "raise",
  "stick",
  "float",
  "popout",
  // Tailwind 標準は 2xl まで。Sparkle は 3xl を追加している
  // en: Tailwind stops at 2xl; Sparkle adds 3xl
  "3xl",
] as const;

/**
 * Sparkle のテーマから生成されるユーティリティを tailwind-merge に教える。
 * tailwind-merge は Tailwind 標準のスケール名（`rounded-lg` 等）しか知らないため、
 * 登録しないと `rounded-modal rounded-none` のように両方残り、利用側の `className`
 * による上書きが CSS の出力順任せになる。
 * en: Teach tailwind-merge the utilities generated from the Sparkle theme. It only knows
 * Tailwind's default scale names, so without this `rounded-modal rounded-none` keeps both
 * classes and a consumer's `className` override depends on CSS output order.
 */
const twMerge = extendTailwindMerge<"sparkle-character" | "sparkle-icon">({
  extend: {
    theme: {
      // src/app/sparkle-design.css の --radius-* のうち Tailwind 標準に無いもの
      // en: --radius-* names in src/app/sparkle-design.css that Tailwind doesn't ship
      radius: [...SPARKLE_RADIUS_NAMES],
      // --shadow-* のセマンティック名
      // en: Semantic --shadow-* names
      shadow: [...SPARKLE_SHADOW_NAMES],
    },
    classGroups: {
      // character-* / icon-* はフォント関連の複数プロパティをまとめて指定するクラス。
      // 同種同士（character-2-… と character-3-…）だけを後勝ちにし、text-sm 等とは
      // 衝突させない（どのプロパティが勝つか一意に決められないため）
      // en: character-* / icon-* set several font properties at once. Only make them
      // override their own kind; don't conflict with text-sm etc., since which property
      // should win can't be decided uniquely
      "sparkle-character": [
        {
          character: [(v: string) => /^\d+-(regular|bold)-(pro|mono)$/.test(v)],
        },
      ],
      "sparkle-icon": [{ icon: [(v: string) => /^\d+-fill-[01]$/.test(v)] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
