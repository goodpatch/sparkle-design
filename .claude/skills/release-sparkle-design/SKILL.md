---
name: release-sparkle-design
license: Apache-2.0
description: >
  sparkle-design / sparkle-design-internal の新バージョンをリリースするための手順スキル。
  package.json の version bump、CHANGELOG.md 更新、リリース PR 作成、PR マージ後の
  git tag 作成・push、GitHub Release 作成、npm publish までを一連の手順で実行する。
  CHANGELOG 更新漏れと GitHub Release 作成漏れを防ぐためのチェックリストを含む。
  「リリースしたい」「新バージョンを切る」「v1.0.x をリリース」「sparkle-design をリリース」
  「sparkle-design-internal をリリース」「CHANGELOG を更新」で発動。
  English: "release sparkle-design", "cut a new version", "publish a release",
  "bump version".
user-invocable: true
---

# Skill: release-sparkle-design

`sparkle-design` または `sparkle-design-internal` の新バージョンをリリースするための手順スキル。

**このスキルが解決する問題**:

- 過去に v1.0.1 / v1.0.2 / v1.0.3 で CHANGELOG.md 更新が漏れた（v1.0.3 では GitHub Release 自体も作られていなかった）
- リリース手順がドキュメント化されておらず、各リリースで作業者が手探りになっていた
- このスキルはチェックリストとして機能し、リリース漏れをゼロにする

---

<!-- ========== AI アシスタント向け指示（ユーザーにそのまま見せない） ========== -->

## AI アシスタントへの指示

### 実行方針

1. **ユーザーに対象リポジトリとリリース種別を確認**

   - リポジトリ: `sparkle-design`（公開）／ `sparkle-design-internal`（社内）
   - リリース種別: `patch` / `minor` / `major`（semver）
   - 未リリースの過去バージョンがある場合（タグ・Release 未作成）は同時に追補するか確認

2. **対象リポジトリで作業する**

   - sparkle ワークスペース内で作業している場合、必ず対象リポジトリのディレクトリに `cd` してから git 操作・テスト・編集を行う
   - ワークスペースルートは git リポジトリではないので注意

3. **以下のチェックリストを順に実行**

---

## リリース手順チェックリスト

### 事前確認

- [ ] 対象リポジトリの `main` が最新に pull できているか
- [ ] CI が main で全部 green か（`gh run list --branch main --limit 5`）
- [ ] `git tag --list --sort=-v:refname | head` で最新タグを確認
- [ ] `gh release list --limit 10` で最新 GitHub Release を確認
- [ ] **タグと Release のバージョンが package.json の `version` と一致しているか** ← ここが乖離していたら過去リリースの追補が必要
- [ ] `git log <最新タグ>..origin/main --oneline` で、未リリース commit があるか確認

### 過去リリース追補（漏れがある場合）

タグ未作成・Release 未作成のバージョンがある場合は **新バージョンを切る前に** 必ず追補する。

- [ ] 該当バージョンのリリースコミット（`🔖 chore: release vX.Y.Z` 等）の SHA を特定: `git log --all --oneline | grep release`
- [ ] そのコミットに対して `git tag vX.Y.Z <SHA>` でタグを作成
- [ ] `git push origin vX.Y.Z` でタグを push
- [ ] `gh release create vX.Y.Z --title "vX.Y.Z" --notes "..."` で Release を作成
  - notes は CHANGELOG.md の該当セクションをコピペ、もしくは `--generate-notes` で自動生成

### 新バージョンの準備（リリース PR 作成）

- [ ] `chore/release-X.Y.Z` ブランチを `origin/main` から切る（worktree 推奨）
- [ ] `package.json` の `version` を `X.Y.Z` に更新
- [ ] `CHANGELOG.md` を更新（**ここが過去最も漏れていた箇所**）
  - [ ] `## [Unreleased]` 直下に `## [X.Y.Z] - YYYY-MM-DD` セクションを追加
  - [ ] `git log <最新タグ>..HEAD --oneline` で前リリースからの commit を一覧化
  - [ ] PR 番号付きで Added / Changed / Fixed / Security / Dependencies に分類
    - PR タイトルの emoji prefix から大まかに分類できる: ✨ → Added, ♻️ → Changed, 🐛 → Fixed, 🔒 → Security
    - `chore(deps)` / `dependabot` は `### Dependencies` セクションにまとめる
  - [ ] **CHANGELOG にも未反映の過去バージョンがある場合は同時に追補する**
- [ ] `pnpm install` で lockfile を更新（version 変更は通常 lockfile には影響しないが念のため）
- [ ] テスト: `pnpm test` で全部 pass を確認
- [ ] 型チェック: `pnpm type-check`（or `npx tsc --noEmit`）
- [ ] lint / format: `pnpm lint && pnpm format:check`
- [ ] コミット作成（メッセージ規約: 日本語 + emoji prefix）
  - 例: `🔖 chore: release vX.Y.Z`
  - 本文に主要変更点を箇条書きで（CHANGELOG からの抜粋でよい）
- [ ] `gh pr create` で PR 作成

### リリース PR レビュー・マージ

- [ ] レビュー受領（CodeRabbit / Codex / 人間レビュアー）
- [ ] 全 CI green を確認（`gh pr checks <PR番号>`）
- [ ] **通常マージ（`--merge`）でマージ**。スカッシュは禁止（コミットが消えるとリリース履歴が辿れない）
- [ ] sparkle-design は admin 権限が必要な場合あり: `gh pr merge <PR番号> --merge --admin`

### マージ後: タグ・Release・publish

- [ ] `git fetch origin main && git checkout main && git pull` で最新化
- [ ] リリースコミットの SHA を確認: `git log --oneline -3`
- [ ] **タグ作成 + push**:
  ```bash
  git tag vX.Y.Z
  git push origin vX.Y.Z
  ```
- [ ] **GitHub Release 作成**:
  ```bash
  gh release create vX.Y.Z \
    --title "vX.Y.Z" \
    --notes-from-tag
  ```
  または CHANGELOG.md のセクションを `--notes` で直接渡す:
  ```bash
  gh release create vX.Y.Z --title "vX.Y.Z" --notes "$(cat <<'EOF'
  ## Added
  ...（CHANGELOG.md の当該バージョンセクションをコピペ）
  EOF
  )"
  ```
- [ ] **npm publish**:
  - `sparkle-design`（npmjs.org 公開）: `gh workflow run "Publish to npm" --ref vX.Y.Z`
  - `sparkle-design-internal`（GitHub Packages）: `gh workflow run "Publish to GitHub Packages" --ref vX.Y.Z`
- [ ] 公開確認:
  - `sparkle-design`: <https://www.npmjs.com/package/sparkle-design> の versions に X.Y.Z が出ているか
  - `sparkle-design-internal`: <https://github.com/goodpatch/sparkle-design-internal/packages> で確認
- [ ] consumer 側を更新（任意）:
  - `sparkle-design-internal` の devDep `@goodpatch/sparkle-design` のバージョンを bump
  - `sparkle-design-docs` の sync

### 完了報告

- [ ] チームへリリース完了を共有（Slack / esa など）
- [ ] CHANGELOG.md / GitHub Release / npm の 3 つが揃っていることを最終確認

---

## バージョン番号の決め方（semver）

- **patch (`x.y.Z`)**: バグ修正、ドキュメント修正、依存更新、内部リファクタ（public API 不変）
- **minor (`x.Y.0`)**: 後方互換のある新機能追加、新コンポーネント追加、新 props 追加
- **major (`X.0.0`)**: 後方互換を破る変更（peer dep の React バージョン縛り変更、props 削除、コンポーネント削除など）

迷ったらユーザーに確認する。

---

## トラブルシューティング

### リリースコミットだけ作って tag/release を忘れていた場合

そのコミットの SHA を `git log --oneline | grep release` で特定して、後付けで tag + release を作成可能。
このスキルの「過去リリース追補」セクションを参照。

### CHANGELOG が古い場合

`git log <最古の未反映タグ>..HEAD --oneline` で範囲を取って、各バージョンの section を遡って書き戻す。
GitHub Release の本文がある場合はそれを CHANGELOG にコピーすれば早い。

### npm publish が失敗する場合

- `pnpm-lock.yaml` の整合性が崩れていないか確認（`pnpm install --frozen-lockfile` を試す）
- `pnpm.overrides` は pnpm 10+ では `pnpm-workspace.yaml` に書く必要がある（package.json では読まれない）
- `NPM_TOKEN` / GitHub Packages 用 token の有効期限切れも疑う

### マージ後のローカル checkout が worktree と衝突する

`gh pr merge --delete-branch` がローカル branch を消そうとして worktree 衝突を起こすことがある。
worktree を `git worktree remove` で先に消すか、PR マージ自体は GitHub UI から行う。

---

## 参考リンク

- [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) — CHANGELOG.md の書式
- [Semantic Versioning](https://semver.org/lang/ja/) — semver
- sparkle ワークスペースの `CLAUDE.md` のリリース手順節も参照
