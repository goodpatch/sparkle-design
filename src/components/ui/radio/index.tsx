/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
"use client";

import * as React from "react";
import { RadioGroup as RadioPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Radio（radiogroup）のエラー状態を各 RadioItem に伝える
 * en: Propagates the radio group's invalid state to each RadioItem
 */
const RadioInvalidContext = React.createContext(false);

const labelVariants = cva("cursor-pointer", {
  variants: {
    size: {
      sm: "character-2-regular-pro",
      md: "character-3-regular-pro",
      lg: "character-4-regular-pro",
    },
    isDisabled: {
      true: "text-text-neutral-disabled cursor-not-allowed",
      false: "text-text-neutral-middle",
    },
  },
  defaultVariants: {
    size: "md",
    isDisabled: false,
  },
});

const radioItemVariants = cva(
  [
    "relative rounded-full transition-colors flex items-center justify-center cursor-pointer",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
      isDisabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      isDisabled: false,
    },
  }
);

const radioIndicatorVariants = cva(
  [
    "flex items-center justify-center rounded-full border border-2 bg-surface-base-0 transition-colors",
    "[.group:focus_&]:outline-hidden [.group:focus-visible_&]:ring-2 [.group:focus-visible_&]:ring-border-ring [.group:focus-visible_&]:ring-offset-2",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "border-object-negative-enabled [.group[data-state=checked]_&]:border-object-negative-enabled",
        false: "border-object-neutral-low",
      },
      isDisabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isDisabled: false,
        isInvalid: false,
        className: "hover:border-object-neutral-middle",
      },
      {
        isDisabled: false,
        isInvalid: true,
        className: "hover:border-object-negative-hover",
      },
      {
        isDisabled: true,
        isInvalid: false,
        className:
          "border-object-neutral-disabled [.group[data-state=checked]_&]:border-object-primary-disabled",
      },
      {
        isDisabled: true,
        isInvalid: true,
        className:
          "border-object-negative-disabled [.group[data-state=checked]_&]:border-object-negative-disabled",
      },
    ],
    defaultVariants: {
      size: "md",
    },
  }
);

const radioIndicatorDotVariants = cva(
  "rounded-full transition-colors flex items-center justify-center shrink-0",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
      isInvalid: {
        true: "[.group[data-state=checked]_&]:bg-object-negative-enabled",
        false: "[.group[data-state=checked]_&]:bg-object-primary-enabled",
      },
      isDisabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        isDisabled: false,
        isInvalid: false,
        className:
          "[.group[data-state=checked]_&]:hover:bg-object-primary-hover",
      },
      {
        isDisabled: false,
        isInvalid: true,
        className:
          "[.group[data-state=checked]_&]:hover:bg-object-negative-hover",
      },
      {
        isDisabled: true,
        isInvalid: false,
        className: "[.group[data-state=checked]_&]:bg-object-primary-disabled",
      },
      {
        isDisabled: true,
        isInvalid: true,
        className: "[.group[data-state=checked]_&]:bg-object-negative-disabled",
      },
    ],
    defaultVariants: {
      size: "md",
      isInvalid: false,
      isDisabled: false,
    },
  }
);

const radioIndicatorDotInnerVariants = cva("rounded-full bg-surface-base-0", {
  variants: {
    size: {
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioPrimitiveProps = React.ComponentProps<typeof RadioPrimitive.Root>;
export interface RadioProps extends RadioPrimitiveProps {
  /**
   * ラジオのデフォルト値
   * en: Default value of the radio group
   */
  defaultValue?: RadioPrimitiveProps["defaultValue"];
  /**
   * ラジオの値が変更されたときのコールバック
   * en: Callback when the radio value changes
   */
  onValueChange?: RadioPrimitiveProps["onValueChange"];
  /**
   * グループ全体がエラー状態かどうか。`aria-invalid` を radiogroup に付け、配下の RadioItem もエラー配色になる
   * en: Whether the whole group is in an error state. Sets `aria-invalid` on the radiogroup and renders every RadioItem in the error style
   * @default false
   */
  isInvalid?: boolean;
}

/**
 * `htmlFor` が指定 id を指す `<label>` のうち、id を持つものの id を空白区切りで返す。
 * `label[for]` は labelable 要素（input / button など）にしか名前を与えないため、
 * `span[role="slider"]` や `div[role="radiogroup"]` には aria-labelledby で関連付け直す必要がある。
 * en: Returns space-separated ids of `<label>` elements (that have an id) whose
 *     `htmlFor` points to the given id. `label[for]` only names labelable elements
 *     (input, button, ...), so role-based controls such as `span[role="slider"]` or
 *     `div[role="radiogroup"]` must be re-associated via aria-labelledby.
 */
function findLabelIdsFor(target: HTMLElement, id: string): string | undefined {
  const root = target.getRootNode() as Document | ShadowRoot;
  // NOTE: useId 由来の id は CSS セレクタで特殊文字を含むため、属性セレクタではなく htmlFor で比較する
  // en: useId-generated ids contain selector-special characters, so compare htmlFor instead of using an attribute selector
  const ids = Array.from(root.querySelectorAll<HTMLLabelElement>("label[for]"))
    .filter(label => label.htmlFor === id && label.id)
    .map(label => label.id);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/**
 * **概要 / Overview**
 *
 * - ラジオボタンは単一選択の形式でユーザーからの入力を取得するために使用するコンポーネントです。
 * - en: The Radio component is used to select one option from multiple choices.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <Radio value="option1" onValueChange={setValue}>
 *   <RadioItem value="option1" label="オプション1" />
 *   <RadioItem value="option2" label="オプション2" />
 * </Radio>
 * ```
 *
 * @param {RadioProps} props
 */
function Radio({ className, isInvalid = false, ref, ...props }: RadioProps) {
  // aria-invalid は ARIA 1.2 で radiogroup がサポートロール（radio は対象外）なのでグループに付ける。
  // FormControl などが aria-invalid を直接渡した場合もエラー配色を伝える。空文字は ARIA では
  // false 相当なので invalid 扱いしない（型付けされていない呼び出しに備えて unknown で比較する）
  // en: ARIA 1.2 supports aria-invalid on radiogroup (not on radio), so set it on the group.
  //     An aria-invalid passed directly (e.g. by FormControl) also turns on the error style.
  //     An empty string means false in ARIA (compared as unknown for untyped callers)
  const ariaInvalid: unknown = props["aria-invalid"];
  const groupInvalid =
    isInvalid ||
    (ariaInvalid !== undefined &&
      ariaInvalid !== false &&
      ariaInvalid !== "false" &&
      ariaInvalid !== "");

  // label[for] は div[role="radiogroup"] に名前を与えないため、id が渡され明示的な名前がないときは
  // その id を htmlFor で指す id 付きの <label> を探して aria-labelledby に設定する（Slider と同じ方式）。
  // これにより FormHeader + FormControl で包むだけでグループ名が読み上げられる
  // en: label[for] does not name a div[role="radiogroup"], so when an id is given without an
  //     explicit name, look up <label> elements (with an id) whose htmlFor matches and set them
  //     as aria-labelledby (same approach as Slider), so FormHeader + FormControl is enough
  const {
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
  } = props;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === "function") {
        // React 19 の callback ref が返す cleanup はアンマウント時にそのまま呼ぶ
        // en: Forward the cleanup returned by a React 19 callback ref so it runs on unmount
        const cleanup = ref(node);
        if (typeof cleanup === "function") {
          return () => {
            rootRef.current = null;
            cleanup();
          };
        }
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );
  const [associatedLabelIds, setAssociatedLabelIds] = React.useState<
    string | undefined
  >(undefined);
  React.useEffect(() => {
    if (!id || ariaLabel || ariaLabelledBy || !rootRef.current) {
      setAssociatedLabelIds(undefined);
      return;
    }
    setAssociatedLabelIds(findLabelIdsFor(rootRef.current, id));
  }, [id, ariaLabel, ariaLabelledBy]);

  return (
    <RadioInvalidContext.Provider value={groupInvalid}>
      <RadioPrimitive.Root
        data-slot="radio-group"
        className={cn("grid gap-y-2 gap-x-4", className)}
        {...props}
        ref={setRootRef}
        aria-labelledby={ariaLabelledBy ?? associatedLabelIds}
        aria-invalid={groupInvalid || undefined}
      />
    </RadioInvalidContext.Provider>
  );
}
Radio.displayName = RadioPrimitive.Root.displayName;

type RadioItemVariantProps = VariantProps<typeof radioItemVariants>;
type RadioIndicatorDotVariantProps = VariantProps<
  typeof radioIndicatorDotVariants
>;
type RadioPrimitiveItemProps = React.ComponentPropsWithoutRef<
  typeof RadioPrimitive.Item
>;
interface RadioItemProps extends RadioPrimitiveItemProps {
  /**
   * ラジオボタンのサイズ
   * en: Radio button size
   * @default "md"
   */
  size?: RadioItemVariantProps["size"];
  /**
   * エラー配色にするかどうか（見た目のみ）。支援技術に無効状態を伝えるには Radio の `isInvalid` を使う
   * en: Whether to render this item in the error style (visual only). Use `isInvalid` on Radio to expose the invalid state to assistive technology
   * @default false
   */
  isInvalid?: RadioIndicatorDotVariantProps["isInvalid"];
  /**
   * ラジオボタンが無効かどうか
   * en: Whether the radio button is disabled
   * @default false
   */
  disabled?: RadioPrimitiveItemProps["disabled"];
  /**
   * ラベルのテキスト
   * en: Label text for the radio button
   */
  label?: string;
}

/**
 * **概要 / Overview**
 *
 * - ラジオボタンのアイテムコンポーネントです。
 * - en: Individual radio button item component.
 *
 * **使用例 / Usage Example**
 *
 * ```tsx
 * <RadioItem value="option1" label="オプション1" size="md" />
 * ```
 *
 * @param {RadioItemProps} props
 */
function RadioItem({
  className,
  size = "md",
  isInvalid: isInvalidProp = false,
  disabled = false,
  label,
  id,
  ...props
}: RadioItemProps) {
  const isInvalid = React.useContext(RadioInvalidContext) || !!isInvalidProp;
  return (
    <div className="flex items-center">
      <RadioPrimitive.Item
        data-slot="radio-group-item"
        id={id}
        className={cn(
          radioItemVariants({ size, isDisabled: disabled }),
          "group",
          className
        )}
        disabled={disabled}
        {...props}
      >
        <div
          className={cn(
            radioIndicatorVariants({ size, isInvalid, isDisabled: disabled })
          )}
        >
          <RadioPrimitive.Indicator
            data-slot="radio-group-indicator"
            className={cn(
              radioIndicatorDotVariants({
                size,
                isInvalid,
                isDisabled: disabled,
              })
            )}
          >
            <div className={cn(radioIndicatorDotInnerVariants({ size }))} />
          </RadioPrimitive.Indicator>
        </div>
      </RadioPrimitive.Item>
      {label && (
        <label
          htmlFor={id}
          className={cn(labelVariants({ size, isDisabled: disabled }))}
        >
          {label}
        </label>
      )}
    </div>
  );
}
RadioItem.displayName = RadioPrimitive.Item.displayName;

export { Radio, RadioItem };
export type { RadioItemProps };
