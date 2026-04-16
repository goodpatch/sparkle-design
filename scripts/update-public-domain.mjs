#!/usr/bin/env node

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DEFAULT_FROM = "https://sparkle-design.goodpatch.com";
const TEXT_EXTENSIONS = new Set([
  ".md",
  ".mdx",
  ".json",
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".sh",
]);
const EXCLUDED_PARTS = new Set(["node_modules", "dist", ".next", "storybook-static"]);

function usage() {
  console.log("Usage: node scripts/update-public-domain.mjs --to https://your-domain.example.com [--from https://sparkle-design.goodpatch.com] [--dry-run]");
}

function normalize(url) {
  return url.trim().replace(/\/+$/, "");
}

function requireOptionValue(flag, value) {
  if (!value || value.startsWith("-")) {
    console.error(`Missing value for ${flag}`);
    usage();
    process.exit(1);
  }
  return value;
}

function validateUrl(flag, value) {
  const normalized = normalize(value);
  if (!normalized) {
    console.error(`Invalid value for ${flag}`);
    process.exit(1);
  }

  let parsed;
  try {
    parsed = new URL(normalized);
  } catch {
    console.error(`Invalid URL for ${flag}: ${value}`);
    process.exit(1);
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    console.error(`Invalid protocol for ${flag}: ${parsed.protocol}`);
    process.exit(1);
  }

  return normalized;
}

const args = process.argv.slice(2);
let from = DEFAULT_FROM;
let to = "";
let dryRun = false;

for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--from") from = requireOptionValue(arg, args[++i]);
  else if (arg === "--to") to = requireOptionValue(arg, args[++i]);
  else if (arg === "--dry-run") dryRun = true;
  else if (arg === "--help" || arg === "-h") {
    usage();
    process.exit(0);
  } else {
    console.error(`Unknown option: ${arg}`);
    usage();
    process.exit(1);
  }
}

if (!to) {
  usage();
  process.exit(1);
}

from = validateUrl("--from", from);
to = validateUrl("--to", to);

const includeRoots = [
  "README.md",
  "README.en.md",
  ".claude/skills",
  ".storybook",
  "docs",
  "public/r",
  "scripts",
  "src/components/ui",
  "src/docs",
  "registry.json",
];

function shouldSkip(relPath) {
  return relPath.split(path.sep).some((part) => EXCLUDED_PARTS.has(part));
}

function* walk(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    yield target;
    return;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    const full = path.join(target, entry.name);
    const rel = path.relative(ROOT, full);
    if (shouldSkip(rel)) continue;
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const seen = new Set();
let updated = 0;
for (const relativeTarget of includeRoots) {
  const absoluteTarget = path.resolve(ROOT, relativeTarget);
  for (const file of walk(absoluteTarget)) {
    const rel = path.relative(ROOT, file);
    if (seen.has(rel)) continue;
    seen.add(rel);
    if (!TEXT_EXTENSIONS.has(path.extname(file))) continue;
    const before = fs.readFileSync(file, "utf8");
    if (!before.includes(from)) continue;
    const after = before.split(from).join(to);
    if (!dryRun) fs.writeFileSync(file, after);
    console.log(`${dryRun ? "DRY" : "OK"} ${rel}`);
    updated += 1;
  }
}

console.log(`Done. ${dryRun ? "Would update" : "Updated"} ${updated} files.`);
