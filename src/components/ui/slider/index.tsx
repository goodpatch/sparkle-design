/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { findLabelIdsFor } from "@/lib/a11y";
import { getIndicatorMinCh } from "./utils";

const sliderRootVariants = cva(
  "relative flex touch-none select-none items-center py-1.5 flex-1 min-w-0",
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

const sliderRangeVariants = cva("absolute h-full bg-object-info", {
  variants: {
    isDisabled: {
      true: "bg-surface-base-200",
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const sliderThumbVariants = cva(
  [
    "relative block rounded-full border border-object-neutral-low bg-surface-base-0 shadow-raise cursor-pointer",
    // 半透明の状態色は白地に重ねる（つまみの下のトラックを透かさない）
    // en: Layer translucent state colors over the white fill so the track does not show through
    "ring-offset-background transition-colors hover:border-object-neutral-middle hover:bg-linear-to-r hover:from-surface-neutral-low-hover hover:to-surface-neutral-low-hover",
    "focus:outline-hidden focus:border-object-info focus:bg-linear-to-r focus:from-surface-primary-low-active focus:to-surface-primary-low-active",
    "focus:ring-2 focus:ring-border-ring focus:ring-offset-2",
    "h-4 w-4",
    // タッチターゲットを24x24px以上に拡張（WCAG 2.5.8）
    // en: Expand touch target to 24x24px minimum (WCAG 2.5.8)
    "before:absolute before:content-[''] before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:min-h-6 before:min-w-6",
  ].join(" "),
  {
    variants: {
      isDisabled: {
        true: "pointer-events-none bg-surface-neutral-middle-disabled bg-none border-none shadow-base cursor-not-allowed",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
type SliderPrimitiveProps = Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  // NOTE: Sparkle Designでは横方向のみのスライダーをサポートしています
  "orientation"
>;

export interface SliderProps extends SliderPrimitiveProps {
  /**
   * スライダーが無効化されているかどうか
   * en: Whether the slider is disabled
   */
  isDisabled?: SliderVariantProps["isDisabled"];
  /**
   * スライダーの最大値
   * en: The maximum value of the slider
   */
  max?: SliderPrimitiveProps["max"];
  /**
   * スライダーの最小値
   * en: The minimum value of the slider
   */
  min?: SliderPrimitiveProps["min"];
  /**
   * スライダーのステップ値
   * en: The step value of the slider
   */
  step?: SliderPrimitiveProps["step"];
  /**
   * スライダーの値（制御コンポーネント用）
   * en: The value of the slider (for controlled component)
   */
  value?: SliderPrimitiveProps["value"];
  /**
   * スライダーの初期値（非制御コンポーネント用）
   * en: The default value of the slider (for uncontrolled component)
   */
  defaultValue?: SliderPrimitiveProps["defaultValue"];
  /**
   * スライダーの値が変更されたときに呼び出されるコールバック
   * en: Callback invoked when the value of the slider changes
   */
  onValueChange?: SliderPrimitiveProps["onValueChange"];
  /**
   * スライダーの単位表示を設定
   * en: Set the unit display of the slider
   */
  unit?: string;
  /**
   * つまみ（`role="slider"` を持つ要素）に付与する id。
   * `<label htmlFor>` や FormControl から渡される id は Root ではなくつまみに付与される。
   * en: id applied to the thumb (the element with `role="slider"`).
   *     ids passed via `<label htmlFor>` or FormControl land on the thumb, not the root.
   */
  id?: string;
  /**
   * つまみのアクセシブルネーム。可視ラベルがない場合に指定する。
   * en: Accessible name of the thumb. Use when there is no visible label.
   */
  "aria-label"?: string;
  /**
   * つまみのアクセシブルネームを参照する要素の id（空白区切りで複数可）
   * en: id(s) of the element(s) that label the thumb (space separated)
   */
  "aria-labelledby"?: string;
  /**
   * つまみの補足説明を参照する要素の id（FormControl から自動で渡される）
   * en: id(s) of the element(s) that describe the thumb (passed automatically by FormControl)
   */
  "aria-describedby"?: string;
  /**
   * つまみの値が不正かどうか（FormControl から自動で渡される）
   * en: Whether the thumb value is invalid (passed automatically by FormControl)
   */
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
}

/**
 * **概要 / Overview**
 *
 * - スライダーは任意の範囲の中からユーザーに特定の数値を選択してもらうために使用するコンポーネントです。
 * - en: The Slider component is used to select a value within a range.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Slider
 *   aria-label="音量"
 *   value={[50]}
 *   onValueChange={setValue}
 *   min={0}
 *   max={100}
 *   step={1}
 * />
 *
 * // フォームと組み合わせる場合（FormHeader のラベルが自動で関連付く）
 * // en: With Form (the FormHeader label is associated automatically)
 * <FormItem>
 *   <FormHeader label="満足度" />
 *   <FormControl>
 *     <Slider value={[field.value]} onValueChange={([v]) => field.onChange(v)} />
 *   </FormControl>
 * </FormItem>
 * ```
 *
 * **アクセシビリティ / Accessibility**
 *
 * - 名前・状態は `role="slider"` のつまみに付きます。`id` / `aria-label` / `aria-labelledby` /
 *   `aria-describedby` / `aria-invalid` はつまみに付与されます。
 * - 可視ラベルがない場合は `aria-label`、ある場合は `aria-labelledby` で名前を付けてください。
 *   `FormHeader` + `FormControl` で包んだ場合はラベルが自動で関連付きます。
 * - 自前の `<label htmlFor>` を使う場合は、ラベルにも `id` を付けるか `aria-labelledby` を
 *   指定してください（`label[for]` だけでは `role="slider"` に名前が付きません）。
 * - en: The name and state belong to the thumb with `role="slider"`. `id`, `aria-label`,
 *   `aria-labelledby`, `aria-describedby` and `aria-invalid` are applied to the thumb.
 * - en: Use `aria-label` without a visible label, or `aria-labelledby` with one.
 *   Wrapping in `FormHeader` + `FormControl` associates the label automatically.
 * - en: When using your own `<label htmlFor>`, give the label an `id` too or pass
 *   `aria-labelledby` (`label[for]` alone does not name a `role="slider"` element).
 *
 * @param {SliderProps} props
 */
function Slider({
  className,
  isDisabled,
  disabled,
  value,
  defaultValue,
  onValueChange,
  unit,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: SliderProps) {
  const isDisabledState = Boolean(isDisabled || disabled);

  // label[for] で指されたラベルを aria-labelledby としてつまみに関連付ける。
  // label[for] は span[role="slider"] に名前を与えないため、id が渡され明示的な名前がないときは
  // その id を htmlFor で指す id 付きの <label> をマウント時に探して aria-labelledby に設定する。
  // これにより FormHeader + FormControl で包むだけでラベルが読み上げられる。
  // en: Associate labels pointing at the thumb via label[for] as aria-labelledby.
  //     label[for] does not name a span[role="slider"], so when an id is given without an
  //     explicit name, look up <label> elements (with an id) whose htmlFor matches on mount
  //     and set them as aria-labelledby, so FormHeader + FormControl is enough.
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  const [associatedLabelIds, setAssociatedLabelIds] = React.useState<
    string | undefined
  >(undefined);
  React.useEffect(() => {
    if (!id || ariaLabel || ariaLabelledBy || !thumbRef.current) {
      setAssociatedLabelIds(undefined);
      return;
    }
    setAssociatedLabelIds(findLabelIdsFor(thumbRef.current, id));
  }, [id, ariaLabel, ariaLabelledBy]);

  // 非制御コンポーネントの場合の内部状態管理
  const [internalValue, setInternalValue] = React.useState<number[]>(
    defaultValue || [props?.min ?? 0]
  );

  // 制御コンポーネントかどうかを判定
  const isControlled = value !== undefined;

  // 現在の値を取得（制御/非制御コンポーネントに対応）
  const currentValue = isControlled ? value : internalValue;

  // 値変更ハンドラー
  const handleValueChange = React.useCallback(
    (newValue: number[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  // 最小幅のみ制御するため style のみ指定
  // en: Control only min width
  const valueMinWidthStyle = React.useMemo<React.CSSProperties>(() => {
    const ch = getIndicatorMinCh(props?.max, unit);
    // NOTE: 端にThumbが来た時サイズ変化してしまうため、Thumbの半径分の余白を加算
    return ch > 0 ? { minWidth: `calc(${ch}ch + var(--spacing) * 2)` } : {};
  }, [props?.max, unit]);

  return (
    <div className="flex justify-center gap-3 w-full">
      <SliderPrimitive.Root
        data-slot="slider"
        disabled={isDisabledState}
        // Radix はロールを持たないルート（span）にも aria-disabled を付けるが、ARIA 1.2 では
        // aria-disabled のグローバル属性としての使用は非推奨。無効状態は role="slider" のつまみに付ける
        // en: Radix also sets aria-disabled on the role-less root span, but ARIA 1.2 deprecates
        //     aria-disabled as a global attribute. The disabled state is exposed on the role="slider" thumb
        aria-disabled={undefined}
        className={cn(
          sliderRootVariants({ isDisabled: isDisabledState }),
          className
        )}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative w-full grow overflow-hidden rounded-minimum h-1",
            isDisabledState
              ? "bg-surface-base-100 cursor-not-allowed"
              : "bg-surface-base-200 cursor-pointer"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(sliderRangeVariants({ isDisabled: isDisabledState }))}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          ref={thumbRef}
          data-slot="slider-thumb"
          id={id}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? associatedLabelIds}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          // Radix は無効状態を Root にしか付与しないため、role="slider" のつまみにも伝える
          // en: Radix only marks the root as disabled, so expose it on the role="slider" thumb too
          aria-disabled={isDisabledState || undefined}
          className={cn(sliderThumbVariants({ isDisabled: isDisabledState }))}
        />
      </SliderPrimitive.Root>
      <span
        className={cn(
          "text-right tabular-nums character-3-regular-mono flex-shrink-0",
          isDisabledState
            ? "text-text-neutral-disabled cursor-not-allowed"
            : "text-text-neutral-middle"
        )}
        style={valueMinWidthStyle}
      >
        {currentValue[0]}
        {unit}
      </span>
    </div>
  );
}

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
