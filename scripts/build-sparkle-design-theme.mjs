#!/usr/bin/env node

// CSSをshadcn/uiのレジストリアイテム(JSON)へ変換するスクリプト
// en: Converts CSS into a shadcn/ui registry item (JSON)

import fs from "fs";
import path from "path";

// --- Utility functions (match merge-registry.mjs stack) ---

/**
 * オブジェクトのキーを再帰的にソート
 * en: Recursively sort object keys for stable output
 */
function sortObjectKeys(obj) {
  if (obj === null || typeof obj !== "object" || obj instanceof Date) return obj;
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  const out = {};
  for (const k of Object.keys(obj).sort()) out[k] = sortObjectKeys(obj[k]);
  return out;
}

/**
 * ブロック抽出ヘルパー: 指定トークン直後の {} をパース
 * en: Extracts the brace block following a token (e.g. :root, @theme inline)
 */
function extractBraceBlock(source, token) {
  const start = source.indexOf(token);
  if (start === -1) return null;
  const open = source.indexOf("{", start);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) {
        // return inner content (without braces)
        return source.slice(open + 1, i);
      }
    }
  }
  return null;
}

/**
 * コメントを除去
 * en: Strip CSS comments
 */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/**
 * 宣言の key: value; を抽出
 * en: Parse CSS declarations of the form key: value;
 */
function parseDeclarations(block) {
  const out = {};
  // Normalize whitespace and strip comments first
  const cleaned = stripComments(block);
  const re = /([^:{};\n]+?)\s*:\s*([^;]+);/g; // capture until next semicolon
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const rawKey = m[1].trim();
    const rawVal = m[2].trim();
    // Only keep CSS vars or standard properties
    if (!rawKey) continue;
    const key = rawKey.replace(/^--/, "");
    const value = rawVal.replace(/\s+/g, " ").trim();
    out[key] = value;
  }
  return out;
}

/**
 * @utility ブロックをすべて抽出
 * en: Extract all @utility blocks as { name, declarations }
 */
function parseUtilities(source) {
  const utilities = [];
  let idx = 0;
  while (true) {
    const at = source.indexOf("@utility", idx);
    if (at === -1) break;
    const brace = source.indexOf("{", at);
    if (brace === -1) break;
    const namePart = source.slice(at + "@utility".length, brace).trim();
    // find matching closing brace for the block
    let depth = 0;
    let end = brace;
    for (; end < source.length; end++) {
      if (source[end] === "{") depth++;
      else if (source[end] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    if (depth !== 0) break; // unbalanced
    const inner = source.slice(brace + 1, end);
    const declarations = parseDeclarations(inner);
    utilities.push({ name: namePart, declarations });
    idx = end + 1;
  }
  return utilities;
}

/**
 * @import のURL一覧を抽出
 * en: Extract @import url(...) statements
 */
function parseImports(source) {
  const imports = [];
  const re = /@import\s+url\(([^)]+)\)\s*;/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const inside = m[1].trim();
    // keep quotes if present
    imports.push(`@import url(${inside})`);
  }
  return imports;
}

/**
 * メイン処理: CSSからテーマJSONを生成
 * en: Main: generate theme JSON from CSS
 */
function buildTheme() {
  const cssPath = path.resolve("src/app/sparkle-design.css");
  if (!fs.existsSync(cssPath)) {
    console.error("❌ CSS file not found:", cssPath);
    process.exit(1);
  }

  const source = fs.readFileSync(cssPath, "utf8");
  const noComments = stripComments(source);

  // 1) @import lines -> css
  const importRules = parseImports(noComments);

  // 2) :root variables
  const rootBlock = extractBraceBlock(noComments, ":root");
  const rootVars = rootBlock ? parseDeclarations(rootBlock) : {};

  // 3) @theme inline variables (same treatment as vars)
  const themeInlineBlock = extractBraceBlock(noComments, "@theme inline");
  const themeVars = themeInlineBlock ? parseDeclarations(themeInlineBlock) : {};

  // Merge vars (semantic overrides primitive)
  const cssVarsTheme = { ...rootVars, ...themeVars };

  // 4) @utility blocks -> css
  const utilities = parseUtilities(noComments);

  // Compose css object
  const cssObject = {};
  for (const imp of importRules) {
    cssObject[imp] = {};
  }
  for (const u of utilities) {
    cssObject[`@utility ${u.name}`] = u.declarations;
  }

  // Compose item
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "sparkle-design-theme",
    title: "Sparkle Design Theme",
    type: "registry:theme",
    css: sortObjectKeys(cssObject),
    cssVars: {
      theme: sortObjectKeys(cssVarsTheme),
    },
  };

  const outPath = path.resolve("src/components/sparkle-design-theme.json");
  fs.writeFileSync(outPath, JSON.stringify(item, null, 2) + "\n");
  console.log("✅ Wrote", outPath);
}

// スクリプトとして実行
// en: Run as script
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    buildTheme();
  } catch (e) {
    console.error("❌ Failed to build theme:", e);
    process.exit(1);
  }
}

export default buildTheme;

