import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
}

/**
 * アイコンは情報を象形表現でユーザーに提示するために使用するコンポーネントです。
 */
export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <span ref={ref} className={cn("icon-3-fill-0", className)} {...props}>
        {icon}
      </span>
    );
  }
);
Icon.displayName = "Icon";
