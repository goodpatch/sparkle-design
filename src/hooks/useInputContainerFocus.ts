/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";

/**
 * `useInputContainerFocus` のオプション
 * en: Options for `useInputContainerFocus`
 */
export interface UseInputContainerFocusOptions<TTarget extends HTMLElement> {
  /**
   * クリック時にフォーカスさせるターゲット要素の ref
   * en: Ref to the target element that should receive focus on container click
   */
  targetRef: React.RefObject<TTarget | null>;
  /**
   * 無効状態（true のときは何もしない）
   * en: When true, the handler does nothing
   */
  isDisabled?: boolean;
  /**
   * クリックがこの ref の要素内で発生したときはフォーカスを移さない
   * en: When the click originates inside any of these refs, focus is not moved
   */
  excludeRefs?: ReadonlyArray<React.RefObject<HTMLElement | null>>;
}

/**
 * コンテナ要素クリック時に、内側のターゲット要素（典型的には `<input>`）へ
 * フォーカスを移すクリックハンドラを返す hook。
 *
 * en: Returns a click handler that forwards focus to a target element (typically
 *     the inner `<input>`) when the surrounding container element is clicked.
 *     Clicks that originate within `excludeRefs` are ignored so embedded controls
 *     (icon buttons, clear buttons, etc.) keep their own click semantics.
 *
 * @example
 * ```tsx
 * const containerRef = React.useRef<HTMLDivElement>(null);
 * const inputRef = React.useRef<HTMLInputElement>(null);
 * const buttonRef = React.useRef<HTMLButtonElement>(null);
 *
 * const handleContainerClick = useInputContainerFocus({
 *   targetRef: inputRef,
 *   isDisabled,
 *   excludeRefs: [buttonRef],
 * });
 *
 * return (
 *   <div ref={containerRef} onClick={handleContainerClick}>
 *     <input ref={inputRef} />
 *     <button ref={buttonRef}>...</button>
 *   </div>
 * );
 * ```
 */
export function useInputContainerFocus<TTarget extends HTMLElement>(
  options: UseInputContainerFocusOptions<TTarget>
): (e: React.MouseEvent) => void {
  const { targetRef, isDisabled = false, excludeRefs } = options;
  return React.useCallback(
    (e: React.MouseEvent) => {
      if (isDisabled) return;

      if (excludeRefs) {
        for (const ref of excludeRefs) {
          const node = ref.current;
          if (node && (node === e.target || node.contains(e.target as Node))) {
            return;
          }
        }
      }

      targetRef.current?.focus();
    },
    [isDisabled, targetRef, excludeRefs]
  );
}
