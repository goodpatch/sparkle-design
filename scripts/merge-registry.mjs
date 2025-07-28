#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { glob } from "glob";

/**
 * Swift版に合わせたJSONフォーマッター
 * en: JSON formatter to match Swift output style
 */
function formatJsonLikeSwift(obj, indent = 0) {
  const indentStr = " ".repeat(indent);
  const nextIndentStr = " ".repeat(indent + 2);

  if (obj === null) return "null";
  if (typeof obj === "boolean") return obj.toString();
  if (typeof obj === "number") return obj.toString();
  if (typeof obj === "string") return JSON.stringify(obj);

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      // 空配列は複数行で表現（Swift版に合わせる）
      return `[\n\n${indentStr}]`;
    }

    const items = obj
      .map(item => nextIndentStr + formatJsonLikeSwift(item, indent + 2))
      .join(",\n");

    return `[\n${items}\n${indentStr}]`;
  }

  if (typeof obj === "object") {
    const keys = Object.keys(obj).sort();
    if (keys.length === 0) return "{}";

    const pairs = keys
      .map(key => {
        const value = formatJsonLikeSwift(obj[key], indent + 2);
        return `${nextIndentStr}${JSON.stringify(key)} : ${value}`;
      })
      .join(",\n");

    return `{\n${pairs}\n${indentStr}}`;
  }

  return "undefined";
}

/**
 * オブジェクトのキーを再帰的にソートする
 * en: Recursively sort object keys for stable output
 */
function sortObjectKeys(obj) {
  if (obj === null || typeof obj !== "object" || obj instanceof Date) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = {};

  for (const key of sortedKeys) {
    sortedObj[key] = sortObjectKeys(obj[key]);
  }

  return sortedObj;
}

/**
 * レジストリアイテムを結合するNode.js実装
 * Vercel環境でSwiftが利用できない場合のフォールバック
 */
async function mergeRegistry() {
  try {
    // 既存のregistry.jsonを読み込み
    const registryPath = path.resolve("registry.json");
    let registry;

    try {
      const registryContent = fs.readFileSync(registryPath, "utf8");
      registry = JSON.parse(registryContent);
    } catch (error) {
      console.log("📝 registry.json not found, creating new one");
      registry = {
        $schema: "https://ui.shadcn.com/schema/registry.json",
        name: "sparkle-ui",
        homepage: "https://goodpatch.com",
        items: [],
      };
    }

    // src/components内のJSONファイルを検索
    const componentJsonFiles = await glob("src/components/**/*.json", {
      cwd: process.cwd(),
      absolute: true,
    });

    console.log(`Found ${componentJsonFiles.length} component JSON files`);

    // 各JSONファイルを読み込んでレジストリアイテムとして追加
    const items = [];
    for (const filePath of componentJsonFiles) {
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const item = JSON.parse(content);

        // $schemaフィールドを除外してSwift版と合わせる
        const { $schema, ...itemWithoutSchema } = item;

        // アイテムのキーをソートして安定化
        const sortedItem = sortObjectKeys(itemWithoutSchema);
        items.push(sortedItem);
        console.log(`✅ Processed: ${path.basename(filePath)}`);
      } catch (error) {
        console.error(`❌ Failed to parse ${filePath}:`, error.message);
      }
    }

    // アイテムを名前でソートして順序を安定化
    items.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    });

    // 新しいレジストリを作成してキーをソート
    const newRegistry = sortObjectKeys({
      ...registry,
      items: items,
    });

    // レジストリを書き込み
    const formattedJson = formatJsonLikeSwift(newRegistry);
    fs.writeFileSync(registryPath, formattedJson);
    console.log(
      `🎉 Successfully merged ${items.length} items into registry.json`
    );
  } catch (error) {
    console.error("❌ Error merging registry:", error);
    process.exit(1);
  }
}

// スクリプトとして実行された場合
if (import.meta.url === `file://${process.argv[1]}`) {
  mergeRegistry();
}

export default mergeRegistry;
