/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import * as React from "react";

interface UseControllableStateParams<T> {
  prop?: T;
  defaultProp: T;
  onChange?: (value: T) => void;
}

/**
 * value を渡したら controlled、渡さなければ uncontrolled として扱う軽量フック。
 * `radix-ui/internal` の `useControllableState`（非公開 API）に依存せず、
 * このリポジトリ内で完結させるためのローカル実装。
 * en: Lightweight hook that treats the state as controlled when `prop` is
 * provided and uncontrolled otherwise. A local implementation kept inside this
 * repo instead of depending on `radix-ui/internal`'s non-public `useControllableState`.
 */
function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>): [
  T,
  (nextValue: React.SetStateAction<T>) => void,
] {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledValue;

  // 関数型アップデート（prev => next）を setState の updater 内で解決すると、
  // そこに含めた onChange 呼び出しが副作用として updater に混ざってしまう
  // （React が updater を複数回評価するケース、例えば StrictMode の
  // 二重呼び出しで onChange が重複発火しうる）。ref に直近値を保持して
  // updater の外で同期的に解決することで、onChange は常に 1 回だけ呼ぶ。
  // en: Resolving a functional updater (prev => next) inside setState's
  // updater and calling onChange there mixes a side effect into the
  // updater — React can invoke updaters more than once (e.g. StrictMode's
  // double-invoke), which could fire onChange twice. Keeping the latest
  // value in a ref lets us resolve it synchronously outside the updater, so
  // onChange always fires exactly once.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  const setValue = React.useCallback(
    (nextValue: React.SetStateAction<T>) => {
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (prevValue: T) => T)(valueRef.current)
          : nextValue;
      valueRef.current = resolvedValue;
      if (!isControlled) {
        setUncontrolledValue(resolvedValue);
      }
      onChange?.(resolvedValue);
    },
    [isControlled, onChange]
  );

  return [value, setValue];
}

export { useControllableState };
