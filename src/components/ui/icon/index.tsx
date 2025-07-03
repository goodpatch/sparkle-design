import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  size?: number;
  fill?: boolean;
}

/**
 * アイコンは情報を象形表現でユーザーに示すためのコンポーネントです。
 * en: The Icon component provides pictorial cues to convey information.
 *
 * @param props.icon 表示するアイコン名
 * en: @param props.icon Name of the icon to display
 * @param props.size アイコンサイズ
 * en: @param props.size Size of the icon
 * @param props.fill 塗りつぶしアイコンかどうか
 * en: @param props.fill Whether the icon is filled
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
