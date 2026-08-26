// Vitest テストセットアップファイル
// en: Vitest test setup file
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Testing Library matcher拡張
// en: Extend Testing Library matchers
expect.extend(matchers);

// この setup は node 環境のテスト（CSS の実コンパイル等）でも読まれるため、
// jsdom 固有の polyfill は window があるときだけ適用する
// en: This setup also runs for node-environment tests (e.g. compiling CSS), so the
// jsdom-specific polyfills are applied only when `window` exists.
if (typeof window !== "undefined") {
  // jsdom環境でのReact 18対応
  // en: React 18 support for jsdom environment
  Object.defineProperty(window, "IS_REACT_ACT_ENVIRONMENT", {
    writable: true,
    value: true,
  });

  // ResizeObserver polyfill for jsdom
  // en: ResizeObserver polyfill for jsdom
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      this.callback = callback;
    }
    callback: ResizeObserverCallback;
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // MatchMedia polyfill for jsdom
  // en: MatchMedia polyfill for jsdom
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
  });
}
