import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
}

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
