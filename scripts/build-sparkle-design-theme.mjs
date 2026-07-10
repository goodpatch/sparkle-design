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
 * `token` に一致する {} ブロックをすべて抽出する。sparkle-design.css には
 * `:root { ... }` が2つある（プリミティブブロックと、実行時に参照できる
 * セマンティックトークンブロック）ため、両方を集める必要がある。
 * en: Extract every brace block matching `token`. sparkle-design.css
 * declares two `:root { ... }` blocks (a primitive block and a
 * semantic-token block meant to be usable at runtime), both of which need
 * to be collected here.
 */
function extractAllBraceBlocks(source, token) {
  const blocks = [];
  let searchFrom = 0;
  while (true) {
    const start = source.indexOf(token, searchFrom);
    if (start === -1) break;
    const open = source.indexOf("{", start);
    if (open === -1) break;
    let depth = 0;
    let end = -1;
    for (let i = open; i < source.length; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) break; // unbalanced
    blocks.push(source.slice(open + 1, end));
    searchFrom = end + 1;
  }
  return blocks;
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
  // sparkle-design.css には `:root { ... }` が2つある
  // （プリミティブトークンブロックと、実行時に参照できるセマンティックトークン
  // ブロック）。どちらも実際に解決可能な値（リテラル、または他の :root 変数への
  // 参照）を持つため、両方をマージしてレジストリの cssVars に使う。
  //
  // `@theme inline` は意図的にここでは使わない: sparkle-design-cli 2.4.1+ の
  // `@theme inline` は各セマンティック宣言が同名変数へ自己参照する
  // （例: `--color-primary-500: var(--color-primary-500)`）設計になっており、
  // これは Tailwind の compiled utility class 生成のためだけの仕組みで、
  // レジストリ消費者へそのまま渡すと解決不能な循環参照になってしまう
  // （goodpatch/sparkle-design#289 のレビュー指摘）。
  // en: sparkle-design.css declares two `:root { ... }` blocks (primitive
  // tokens, and semantic tokens meant to be usable at runtime). Both resolve
  // to real values (literals or references to other :root vars), so merge
  // both for the registry's cssVars.
  // `@theme inline` is intentionally NOT used here: as of sparkle-design-cli
  // 2.4.1+, every `@theme inline` declaration self-references its own
  // semantic variable name (e.g. `--color-primary-500: var(--color-primary-500)`)
  // — a Tailwind-compiler-only construct — which would become an unresolvable
  // circular reference if handed to registry consumers as-is.
  const rootBlocks = extractAllBraceBlocks(noComments, ":root");
  const cssVarsTheme = rootBlocks.reduce(
    (acc, block) => ({ ...acc, ...parseDeclarations(block) }),
    {}
  );

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
