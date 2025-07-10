// Vitest テストセットアップファイル
// en: Vitest test setup file
import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

// Testing Library matcher拡張
// en: Extend Testing Library matchers
expect.extend(matchers);

// jsdom環境でのReact 18対応
// en: React 18 support for jsdom environment
Object.defineProperty(window, "IS_REACT_ACT_ENVIRONMENT", {
  writable: true,
  value: true,
});
