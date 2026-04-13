#!/usr/bin/env node

/**
 * 各コンポーネントフォルダに README.md を生成する。
 * item.json の description と index.tsx の JSDoc から情報を抽出する。
 *
 * Usage: node scripts/generate-readmes.mjs [--dry-run]
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uiDir = path.resolve(__dirname, "../src/components/ui");
const dryRun = process.argv.includes("--dry-run");

/** kebab-case → PascalCase */
function toPascalCase(str) {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

/** index.tsx から JSDoc ブロックを抽出 */
function extractJSDoc(source) {
  const blocks = [];
  const regex = /\/\*\*[\s\S]*?\*\//g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    blocks.push(match[0]);
  }
  return blocks;
}

/** JSDoc から「使用例 / Usage Example」セクションのコードブロックを抽出 */
function extractUsageExample(jsdocBlocks) {
  for (const block of jsdocBlocks) {
    const usageMatch = block.match(
      /使用例\s*\/\s*Usage Example[\s\S]*?```tsx\n([\s\S]*?)```/
    );
    if (usageMatch) {
      return usageMatch[1].replace(/^\s*\*\s?/gm, "").trim();
    }
  }
  return null;
}

/** JSDoc から注意事項を抽出 */
function extractWarnings(jsdocBlocks) {
  const warnings = [];
  for (const block of jsdocBlocks) {
    const lines = block.split("\n");
    for (const line of lines) {
      const cleaned = line.replace(/^\s*\*\s?/, "").trim();
      if (
        cleaned.match(
          /^-\s*.*(注意|Warning|やってはいけない|使わない|不可|禁止|asChild|isDisabled|prefixIcon.*JSX)/i
        )
      ) {
        warnings.push(cleaned);
      }
    }
  }
  return warnings;
}

function generateReadme(componentDir, componentName) {
  const pascalName = toPascalCase(componentName);

  // item.json から description を取得
  const itemJsonPath = path.join(componentDir, "item.json");
  let description = "";
  if (fs.existsSync(itemJsonPath)) {
    const item = JSON.parse(fs.readFileSync(itemJsonPath, "utf8"));
    description = item.description || "";
  }

  // index.tsx から JSDoc と "use client" を検出
  const indexPath = path.join(componentDir, "index.tsx");
  let usageExample = null;
  let warnings = [];
  let isClientComponent = false;
  if (fs.existsSync(indexPath)) {
    const source = fs.readFileSync(indexPath, "utf8");
    isClientComponent = source.includes('"use client"');
    const jsdocBlocks = extractJSDoc(source);
    usageExample = extractUsageExample(jsdocBlocks);
    warnings = extractWarnings(jsdocBlocks);
  }

  const lines = [];
  lines.push(`# ${pascalName}`);
  lines.push("");

  if (description) {
    lines.push(description);
    lines.push("");
  }

  // Server / Client Component 情報
  if (isClientComponent) {
    lines.push(
      `> **Client Component**: このコンポーネントは \`"use client"\` を含みます。Server Component から使う場合は個別 import を推奨します。`
    );
    lines.push(">");
    lines.push("> ```tsx");
    lines.push(
      `> import { ${pascalName} } from "@goodpatch/sparkle-design/${componentName}";`
    );
    lines.push("> ```");
  } else {
    lines.push(
      "> **Server Component 互換**: このコンポーネントは Server Component からそのまま利用できます。"
    );
  }
  lines.push("");

  lines.push("## インストール");
  lines.push("");
  lines.push("```bash");
  lines.push(
    `npx shadcn@latest add https://sparkle-design.goodpatch.com/r/${componentName}.json`
  );
  lines.push("```");
  lines.push("");
  lines.push(
    "または npm パッケージとして `@goodpatch/sparkle-design` をインストールしている場合はそのまま利用できます。"
  );
  lines.push("");

  lines.push("## 使い方");
  lines.push("");
  if (usageExample) {
    lines.push("```tsx");
    lines.push(usageExample);
    lines.push("```");
  } else {
    lines.push("```tsx");
    if (isClientComponent) {
      lines.push(
        `// Server Component から使う場合は個別 import`
      );
      lines.push(
        `import { ${pascalName} } from "@goodpatch/sparkle-design/${componentName}";`
      );
      lines.push("");
      lines.push(
        `// Client Component 内ではバレル import も可`
      );
      lines.push(
        `import { ${pascalName} } from "@goodpatch/sparkle-design";`
      );
    } else {
      lines.push(
        `import { ${pascalName} } from "@goodpatch/sparkle-design";`
      );
    }
    lines.push("");
    lines.push(`<${pascalName} />`);
    lines.push("```");
  }
  lines.push("");

  if (warnings.length > 0) {
    lines.push("## 注意事項");
    lines.push("");
    for (const w of warnings) {
      lines.push(w);
    }
    lines.push("");
  }

  lines.push("## 関連リンク");
  lines.push("");
  lines.push(
    `- [ガイドライン](https://sparkle-design.goodpatch.com/guidelines/components/${componentName})`
  );
  lines.push(
    `- [Storybook](https://sparkle-design.goodpatch.com/storybook/index.html?path=/docs/components-${componentName}--docs)`
  );
  lines.push(
    `- [ソースコード](https://github.com/goodpatch/sparkle-design/tree/main/src/components/ui/${componentName})`
  );
  lines.push("");

  return lines.join("\n");
}

// メイン処理
const components = fs
  .readdirSync(uiDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let created = 0;

for (const name of components) {
  const dir = path.join(uiDir, name);
  const content = generateReadme(dir, name);

  if (dryRun) {
    console.log(`[dry-run] ${name}/README.md`);
  } else {
    fs.writeFileSync(path.join(dir, "README.md"), content, "utf8");
    console.log(`✅ ${name}/README.md`);
  }
  created++;
}

console.log(
  `\n${created} README files ${dryRun ? "would be" : ""}generated.`
);
