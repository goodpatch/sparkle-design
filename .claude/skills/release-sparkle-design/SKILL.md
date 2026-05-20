---
name: release-sparkle-design
license: Apache-2.0
description: >
  sparkle-design（公開 npm パッケージ）の新バージョンをリリースするための手順スキル。
  package.json の version bump、CHANGELOG.md の更新、リリース PR 作成、PR マージ後の
  git tag 作成・push、GitHub Release 作成、npm publish までを一連の手順で実行する。
  CHANGELOG 更新漏れと GitHub Release 作成漏れを防ぐためのチェックリストを含む。
  「sparkle-design をリリース」「sparkle-design の新バージョンを切る」「v1.0.x をリリース」
  「sparkle-design の CHANGELOG を更新」で発動。
  English: "release sparkle-design", "cut a new sparkle-design version",
  "publish sparkle-design", "bump sparkle-design version".
user-invocable: true
---

# Skill: release-sparkle-design

`sparkle-design`（公開 npm パッケージ）の新バージョンをリリースするための手順スキル。

**このスキルが解決する問題**:

- 過去に v1.0.1 / v1.0.2 / v1.0.3 で CHANGELOG.md 更新が漏れた（v1.0.3 では GitHub Release と git tag も未作成）
- リリース手順がドキュメント化されておらず、各リリースで作業者が手探りになっていた
- このスキルはチェックリストとして機能し、リリース漏れをゼロにする

---

<!-- ========== AI アシスタント向け指示（ユーザーにそのまま見せない） ========== -->

## AI アシスタントへの指示

### 実行方針

1. **ユーザーにリリース種別を確認**

   - `patch`（バグ修正 / 依存更新 / 内部リファクタ）/ `minor`（後方互換のある機能追加）/ `major`（破壊的変更）
   - タグ・Release 未作成の過去バージョンがある場合は同時に追補するか確認

2. **`sparkle-design` リポジトリのルートで作業する**

   - 編集・テスト・git 操作はすべて `sparkle-design` のチェックアウトディレクトリで実行
   - worktree を使う場合は `.claude/worktrees/<name>` 配下で作業

3. **以下のチェックリストを順に実行する**

---

## リリース手順チェックリスト

### 事前確認

- [ ] `main` を最新に pull できているか
- [ ] CI が main で全部 green か（`gh run list --branch main --limit 5`）
- [ ] `git tag --list --sort=-v:refname | head` で最新タグを確認
- [ ] `gh release list --limit 10` で最新 GitHub Release を確認
- [ ] **タグ / Release / `package.json` の `version` が三つ揃っているか** ← 乖離していたら過去分の追補が必要
- [ ] `git log <最新タグ>..origin/main --oneline` で、未リリース commit があるか確認

### 過去リリース追補（漏れがある場合）

タグ未作成・Release 未作成のバージョンがある場合は **新バージョンを切る前に** 必ず追補する。

- [ ] 該当バージョンのリリースコミット（`🔖 chore: release vX.Y.Z` 等）の SHA を特定: `git log --all --oneline | grep release`
- [ ] そのコミットに対して `git tag vX.Y.Z <SHA>` でタグを作成
- [ ] `git push origin vX.Y.Z` でタグを push
- [ ] `gh release create vX.Y.Z --title "vX.Y.Z" --notes "..."` で Release を作成
  - notes は CHANGELOG.md の該当セクションをコピペするのが確実

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
- [ ] `pnpm install` で lockfile が壊れていないか確認
- [ ] テスト: `pnpm test` で全部 pass を確認
- [ ] 型チェック: `pnpm type-check`（or `npx tsc --noEmit`）
- [ ] format: `pnpm format:check`（必要なら `pnpm format`）
- [ ] コミット作成（メッセージ規約: 日本語 + emoji prefix）
  - 例: `🔖 chore: release vX.Y.Z`
  - 本文に主要変更点を箇条書きで（CHANGELOG からの抜粋でよい）
- [ ] `gh pr create` で PR 作成

### リリース PR レビュー・マージ

- [ ] レビュー受領（CodeRabbit / Codex / 人間レビュアー）
- [ ] 全 CI green を確認（`gh pr checks <PR番号>`）
- [ ] **通常マージ（`--merge`）でマージ**。スカッシュは禁止（コミットが消えるとリリース履歴が辿れない）
- [ ] base branch protection があるため、必要なら admin マージ: `gh pr merge <PR番号> --merge --admin`

### マージ後: タグ・Release・publish

- [ ] `git fetch origin main && git checkout main && git pull` で最新化
- [ ] リリースコミットの SHA を確認: `git log --oneline -3`
- [ ] **タグ作成 + push**:
  ```bash
  git tag vX.Y.Z
  git push origin vX.Y.Z
  ```
- [ ] **GitHub Release 作成**:
  CHANGELOG.md のセクションを `--notes` で直接渡すのが確実:
  ```bash
  gh release create vX.Y.Z --title "vX.Y.Z" --notes "$(awk '/^## \[X\.Y\.Z\]/,/^## \[/' CHANGELOG.md | sed '$d')"
  ```
  もしくは手動で `gh release create vX.Y.Z` を実行し、ブラウザで notes を貼る。
- [ ] **npm publish** — GitHub Actions ワークフローを実行:
  ```bash
  gh workflow run "Publish to npm" --ref vX.Y.Z
  ```
- [ ] 公開確認:
  - <https://www.npmjs.com/package/sparkle-design> の versions に X.Y.Z が出ているか
  - `npm view sparkle-design version` で確認

### 完了報告

- [ ] チームへリリース完了を共有（Slack / esa など）
- [ ] CHANGELOG.md / GitHub Release / npm の 3 つが揃っていることを最終確認

---

## バージョン番号の決め方（semver）

- **patch (`x.y.Z`)**: バグ修正、ドキュメント修正、依存更新、内部リファクタ（public API 不変）
- **minor (`x.Y.0`)**: 後方互換のある新機能追加、新コンポーネント追加、新 props 追加
- **major (`X.0.0`)**: 後方互換を破る変更（peer dep のメジャー縛り変更、props 削除、コンポーネント削除など）

迷ったらユーザーに確認する。

---

## トラブルシューティング

### リリースコミットだけ作って tag/release を忘れていた場合

そのコミットの SHA を `git log --oneline | grep release` で特定して、後付けで tag + release を作成可能。
このスキルの「過去リリース追補」セクションを参照。

### CHANGELOG が古い場合

`git log <最古の未反映タグ>..HEAD --oneline` で範囲を取って、各バージョンの section を遡って書き戻す。
GitHub Release の本文がある場合はそれを CHANGELOG にコピーすれば早い。

### npm publish ワークフローが失敗する場合

- `pnpm-lock.yaml` の整合性が崩れていないか確認（`pnpm install --frozen-lockfile` を試す）
- `pnpm.overrides` を package.json に書いていると pnpm 10+ では読まれない場合がある。`pnpm-workspace.yaml` 側の `overrides:` フィールドへの移行を検討
- `NPM_TOKEN` の有効期限切れも疑う（リポジトリ Secrets を確認）

### マージ後のローカル checkout が worktree と衝突する

`gh pr merge --delete-branch` がローカル branch を消そうとして worktree 衝突を起こすことがある。
worktree を `git worktree remove` で先に消すか、PR マージ自体は GitHub UI から行う。

---

## 参考リンク

- [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) — CHANGELOG.md の書式
- [Semantic Versioning](https://semver.org/lang/ja/) — semver
- `sparkle-design` の `CLAUDE.md` / `docs/ai-instructions/` の規約も参照
