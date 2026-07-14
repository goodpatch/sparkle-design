#!/usr/bin/env node
// CHANGELOG.md から `## [X.Y.Z]` 形式のセクション本文を 1 つだけ stdout に出す。
// publish.yml の GitHub Release 自動作成 step が release notes として食わせる
// 想定で、見つからなければ exit 0 + 空出力（caller 側で fallback note に切り替える）。
//
// usage: node scripts/extract-changelog-section.mjs <version>
//   例: node scripts/extract-changelog-section.mjs 2.0.7-rc.4
//
// CHANGELOG.md の path はリポジトリ root 固定。CI（actions/checkout した
// working-directory）からも開発者ローカル（リポジトリ root で実行）からも
// `process.cwd()/CHANGELOG.md` で解決される前提。
//
// en: Print one `## [X.Y.Z]` section body from CHANGELOG.md to stdout for
// publish.yml's GitHub Release step. Empty stdout + exit 0 means the section
// is missing — the caller should fall back to a generic note.

import fs from 'node:fs';
import path from 'node:path';

const version = process.argv[2];
if (!version) {
  console.error('usage: extract-changelog-section.mjs <version>');
  process.exit(1);
}

const changelogPath = path.resolve(process.cwd(), 'CHANGELOG.md');
let content;
try {
  content = fs.readFileSync(changelogPath, 'utf8');
} catch (error) {
  // CHANGELOG.md が無い / 読めないのは workflow 側の構成ミス。stderr に
  // 原因を出して exit 1（fallback ではなく fail にする）。
  // en: Missing CHANGELOG.md is a workflow misconfig, not a soft miss.
  console.error(`failed to read CHANGELOG.md: ${error.message}`);
  process.exit(1);
}

// 探すマーカーは `## [<version>]` から始まる行。version 自体に regex メタ文字
// （`.` など）が含まれるので、indexOf で literal 検索する。同じ version 文字列
// が body 中に偶然出る可能性を避けるため、行頭起点 (`\n## [` / 先頭) のみ採用。
// en: Search by literal `## [<version>]` at line start to avoid accidental
// substring matches from body text mentioning the same version.
const marker = `## [${version}]`;
const candidates = [];
if (content.startsWith(marker)) {
  candidates.push(0);
}
let searchFrom = 0;
const needle = `\n## [${version}]`;
while (true) {
  const idx = content.indexOf(needle, searchFrom);
  if (idx === -1) break;
  candidates.push(idx + 1);
  searchFrom = idx + needle.length;
}
if (candidates.length === 0) {
  // セクション無し。caller の fallback に任せるため空出力で exit 0。
  // en: Section missing — exit 0 with empty output so the caller can fall
  // back to a generic release note.
  process.exit(0);
}

const startIdx = candidates[0];
const rest = content.slice(startIdx);
// 見出し行 `## [X.Y.Z] - YYYY-MM-DD` 自体は出力から外し、本文だけを返す。
// 入れたままだと `gh release create --title vX.Y.Z` で付くタイトルと release
// 本文冒頭の見出しが二重表示になり Release UI が冗長になる。
// en: Strip the `## [X.Y.Z]` heading line itself — `gh release create
// --title vX.Y.Z` already shows the version, so leaving the heading in the
// notes body would duplicate it in the Release UI.
const firstNewlineIdx = rest.indexOf('\n');
const bodyStartIdx = firstNewlineIdx === -1 ? rest.length : firstNewlineIdx + 1;
// 次の `## [` で打ち切り。同じ version 行を 2 度目に踏まないよう本文開始
// 位置から探す。
// en: Stop at the next `## [` heading, starting from the body offset to
// skip the current heading.
const nextHeaderIdx = rest.indexOf('\n## [', bodyStartIdx);
const sectionBody =
  nextHeaderIdx === -1 ? rest.slice(bodyStartIdx) : rest.slice(bodyStartIdx, nextHeaderIdx);
process.stdout.write(`${sectionBody.trim()}\n`);
