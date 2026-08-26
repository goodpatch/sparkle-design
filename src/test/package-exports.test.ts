/**
 * @jest-environment jsdom
 */
import { describe, it, expect } from "vitest";

// 実行時の cwd に依存しないよう、このファイルからの相対 import で package.json を読む
// en: Import package.json relative to this file so the test does not depend on the cwd.
import pkg from "../../package.json";

/**
 * package.json の `exports` に関する規約テスト
 * en: Contract tests for the `exports` field in package.json
 */
describe("package.json exports", () => {
  const exportsField = (pkg as { exports?: Record<string, unknown> }).exports;

  // 利用側が導入バージョンを確認できるようにする（goodpatch/sparkle-design#306）
  // en: Consumers must be able to read the installed version (#306).
  it("exposes ./package.json so consumers can read the installed version", () => {
    expect(exportsField?.["./package.json"]).toBe("./package.json");
  });

  it("keeps the package root entry point", () => {
    expect(exportsField?.["."]).toBeDefined();
  });
});
