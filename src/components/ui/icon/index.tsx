import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 表示するアイコン名
   * en: Name of the icon to display
   */
  icon: string;
  /**
   * アイコンサイズ
   * en: Size of the icon
   */
  size?: number;
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
