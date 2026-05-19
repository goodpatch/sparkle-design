/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";

/**
 * 複数の ref を 1 つにまとめる ref コールバックを返す hook
 * en: Returns a single ref callback that forwards to multiple refs
 *
 * @example
 * ```tsx
 * const Foo = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
 *   const innerRef = React.useRef<HTMLInputElement>(null);
 *   const mergedRef = useMergeRefs(innerRef, ref);
 *   return <input ref={mergedRef} {...props} />;
 * });
 * ```
 *
 * @param refs マージ対象の ref。`React.Ref<T>` 互換のもの（callback ref / ref object）。
 */
export function useMergeRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return React.useCallback(
    (value: T | null) => {
      refs.forEach(ref => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs
  );
}
