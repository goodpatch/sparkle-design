/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * アイコンサイズのスケール値（1-12）
 * en: Icon size scale values (1-12)
 *
 * | scale | px  |
 * |-------|-----|
 * | 1     | 12  |
 * | 2     | 14  |
 * | 3     | 16  |
 * | 4     | 18  |
 * | 5     | 20  |
 * | 6     | 24  |
 * | 7     | 28  |
 * | 8     | 32  |
 * | 9     | 36  |
 * | 10    | 42  |
 * | 11    | 48  |
 * | 12    | 54  |
 */
export type IconSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 表示するアイコン名
   * en: Name of the icon to display
   */
  icon: string;
  /**
   * アイコンサイズ（スケール値 1-12）
   * en: Size of the icon (scale value 1-12)
   * @see IconSize
   */
  size?: IconSize;
  /**
   * 塗りつぶしアイコンかどうか
   * en: Whether the icon is filled
   */
  fill?: boolean;
}

/**
 * **概要 / Overview**
 *
 * - アイコンはテキスト情報を視覚表現でユーザーに提示するために使用するコンポーネントです。
 * - en: The Icon component is used to present textual information to users through visual representation.
 *
 * **アンチパターン / Anti-patterns**
 *
 * - `size` にピクセル値（24, 32 など）を渡さないでください。スケール値（1-12）を使用してください。
 *   en: Do not pass pixel values to `size`. Use scale values (1-12) instead.
 *
 * ```tsx
 * // ✅ Correct - スケール値
 * <Icon icon="settings" size={6} />   // 24px 相当
 *
 * // ❌ Wrong - ピクセル値
 * <Icon icon="settings" size={24} />
 * ```

 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Icon icon="check" size={6} fill={true} />
 * ```
 *
 * @param {IconProps} props
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, icon, size = 3, fill = false, ...props }, ref) => {
    // 既存のclassNameにicon-X-fill-0の形式が含まれているかチェック
    const hasIconTypographyClass = className?.match(/icon-\d+-fill-\d+/);

    // サイズクラスの生成（既存のサイズクラスがない場合のみ）
    const fillValue = fill ? 1 : 0;
    const iconTypographyClass = hasIconTypographyClass
      ? ""
      : `icon-${size}-fill-${fillValue}`;

    return (
      <span
        ref={ref}
        className={cn(iconTypographyClass, "select-none", className)}
        aria-hidden="true"
        {...props}
      >
        {icon}
      </span>
    );
  }
);
Icon.displayName = "Icon";
