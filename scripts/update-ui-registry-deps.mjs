#!/usr/bin/env node

// UI配下のitem.jsonから古いテーマ依存関係を削除
// en: Remove old theme dependencies from UI item.json files

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const BASE_DIR = path.resolve(ROOT, "src/components/ui");
const OLD_URLS = new Set([
  "https://sparkle-design.goodpatch.com/r/sparkle-font.json",
  "https://sparkle-design.goodpatch.com/r/sparkle-color.json",
  "https://sparkle-design.goodpatch.com/r/sparkle-style.json",
  "https://sparkle-design.goodpatch.com/r/sparkle-design-theme.json",
]);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let updated = 0;
for (const file of walk(BASE_DIR)) {
  if (!file.endsWith("/item.json")) continue;
  try {
    const raw = fs.readFileSync(file, "utf8");
    const json = JSON.parse(raw);
    if (!Array.isArray(json.registryDependencies)) continue;
    const before = json.registryDependencies;
    const filtered = before.filter((u) => !OLD_URLS.has(u));
    const hasAnyOld = filtered.length !== before.length;
    if (hasAnyOld) {
      json.registryDependencies = filtered;
      fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
      console.log(`✅ Updated: ${path.relative(ROOT, file)}`);
      updated++;
    }
  } catch (e) {
    console.error(`❌ Failed: ${file}:`, e.message);
  }
}

console.log(`🎯 Done. Updated ${updated} files.`);
