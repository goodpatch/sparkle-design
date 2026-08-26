/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, it, expect } from "vitest";

/**
 * package.json の `exports` に関する規約テスト
 * en: Contract tests for the `exports` field in package.json
 */
describe("package.json exports", () => {
  const pkg = JSON.parse(
    readFileSync(path.resolve(process.cwd(), "package.json"), "utf-8")
  ) as { exports: Record<string, unknown> };

  // 利用側が導入バージョンを確認できるようにする（goodpatch/sparkle-design#306）
  // en: Consumers must be able to read the installed version (#306).
  it("exposes ./package.json so consumers can read the installed version", () => {
    expect(pkg.exports["./package.json"]).toBe("./package.json");
  });
});
