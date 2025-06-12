import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  size?: number;
  fill?: boolean;
}

/**
 * アイコンは情報を象形表現でユーザーに提示するために使用するコンポーネントです。
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
