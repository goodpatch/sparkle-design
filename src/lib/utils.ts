import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

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
      radius: [
        "divide",
        "minimum",
        "notice",
        "action",
        "container",
        "modal",
        "round",
        "halfModal",
      ],
      // --shadow-* のセマンティック名
      // en: Semantic --shadow-* names
      shadow: ["base", "flat", "raise", "stick", "float", "popout"],
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
