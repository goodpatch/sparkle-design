"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sliderRootVariants = cva(
  "relative flex w-full touch-none select-none items-center py-1.5",
  {
    variants: {
      isDisabled: {
        true: "cursor-not-allowed",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-sm bg-gray-200 h-1"
);

const sliderRangeVariants = cva("absolute h-full bg-blue-500", {
  variants: {
    isDisabled: {
      true: "bg-blue-200",
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const sliderThumbVariants = cva(
  "block rounded-full border border-gray-200 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-offset-background transition-colors hover:bg-gray-50 focus:outline-none focus:bg-blue-50 focus:border-blue-300 focus:ring-2 focus:ring-ring focus:ring-offset-2 h-4 w-4",
  {
    variants: {
      isDisabled: {
        true: "pointer-events-none bg-gray-100 hover:bg-gray-100 focus:bg-gray-300 focus:border-gray-300",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderRootVariants> {
  isDisabled?: boolean;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, isDisabled, disabled, ...props }, ref) => {
  const isDisabledState = Boolean(isDisabled || disabled);

  return (
    <SliderPrimitive.Root
      ref={ref}
      disabled={isDisabledState}
      aria-disabled={isDisabledState}
      className={cn(
        sliderRootVariants({ isDisabled: isDisabledState }),
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className={cn(sliderTrackVariants())}>
        <SliderPrimitive.Range
          className={cn(sliderRangeVariants({ isDisabled: isDisabledState }))}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(sliderThumbVariants({ isDisabled: isDisabledState }))}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
