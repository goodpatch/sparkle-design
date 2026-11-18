/**
 * @jest-environment jsdom
 */
import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useControllableState } from "./use-controllable-state";

describe("useControllableState", () => {
  describe("Uncontrolled", () => {
    it("defaultProp を初期値として使い、setValue で更新できる", () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultProp: false })
      );

      expect(result.current[0]).toBe(false);

      act(() => {
        result.current[1](true);
      });

      expect(result.current[0]).toBe(true);
    });

    it("関数型アップデート（prev => next）を受け付ける", () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultProp: 0 })
      );

      act(() => {
        result.current[1](prev => prev + 1);
        result.current[1](prev => prev + 1);
      });

      expect(result.current[0]).toBe(2);
    });

    it("onChange に解決後の値を渡す", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState({ defaultProp: 1, onChange })
      );

      act(() => {
        result.current[1](prev => prev + 1);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it("StrictMode 下でも関数型アップデートで onChange は1回だけ呼ばれる", () => {
      // 関数型アップデートの解決を setState の updater 内で行い、そこで
      // onChange を呼ぶ実装だと、StrictMode（dev）が updater を2回評価する
      // ことで onChange が重複発火しうる。ref で外側に解決することで
      // updater 自体が不要になり、この問題が起きないことを確認する。
      // en: If resolving a functional updater happened inside setState's
      // updater and onChange were called there, StrictMode's double-invoke
      // of updaters (dev-only) could fire onChange twice. Resolving via a
      // ref outside the updater removes the updater dependency entirely, so
      // this can no longer happen.
      const onChange = vi.fn();
      const { result } = renderHook(
        () => useControllableState({ defaultProp: 0, onChange }),
        { wrapper: React.StrictMode }
      );

      act(() => {
        result.current[1](prev => prev + 1);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });

  describe("Controlled", () => {
    it("prop の値をそのまま返し、内部状態を持たない", () => {
      const { result, rerender } = renderHook(
        ({ prop }) => useControllableState({ prop, defaultProp: false }),
        { initialProps: { prop: true } }
      );

      expect(result.current[0]).toBe(true);

      rerender({ prop: false });
      expect(result.current[0]).toBe(false);
    });

    it("関数型アップデートは現在の prop を prev として解決し、onChange に渡す", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState({ prop: 5, defaultProp: 0, onChange })
      );

      act(() => {
        result.current[1](prev => prev + 1);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(6);
      // controlled なので呼び出し側が prop を更新するまで value 自体は変わらない
      expect(result.current[0]).toBe(5);
    });
  });
});
