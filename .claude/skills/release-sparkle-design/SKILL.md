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

> **🛑 不可逆操作の扱い（このスキルで最優先のルール）**
>
> 🛑 が付いた項目（PR マージ / タグ push / GitHub Release 作成 / npm publish）は、
> **ユーザーが名指しで指示したときだけ**実行する。「リリースして」という最初の依頼は、
> マージ・publish までの事前承認ではない。**リストに並んでいることは実行してよい理由にならない。**
> 🛑 の手前まで進んだら停止し、状況（PR 番号 / CI 状態 / 次のコマンド）を報告して指示を待つ。
>
> これらは `scripts/hooks/irreversible-ops-guard.sh`（PreToolUse hook）が実際にブロックする。
> ブロックされたら、ユーザーの指示を得たうえで `SPARKLE_CONFIRM=1` を先頭に付けて再実行する。
> **hook が無い環境（Claude Code 以外のエージェント）でも、上のルールは同じように適用する。**

### 実行方針

1. **ユーザーにリリース種別を確認**

   - `patch`（バグ修正 / 依存更新 / 内部リファクタ）/ `minor`（後方互換のある機能追加）/ `major`（破壊的変更）
   - タグ・Release 未作成の過去バージョンがある場合は同時に追補するか確認

2. **`sparkle-design` リポジトリのルートで作業する**

   - 編集・テスト・git 操作はすべて `sparkle-design` のチェックアウトディレクトリで実行
   - 並列作業を分離したい場合は git worktree を使ってもよい（既存運用では `.claude/worktrees/<name>` 配下に置く慣例）。worktree を使わずに `chore/release-X.Y.Z` ブランチを直接切る運用でも可

3. **以下のチェックリストを順に実行する**

   - ただし 🛑 が付いた項目に到達したら、そこで停止してユーザーの明示的な指示を待つ
     （上の「不可逆操作の扱い」を参照）。停止せずに走り切ってはならない

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
- [ ] そのコミットに対して `git tag vX.Y.Z <SHA>` でタグを作成（ローカルタグまでは自走してよい）
- [ ] 🛑 `git push origin vX.Y.Z` でタグを push
- [ ] 🛑 `gh release create vX.Y.Z --title "vX.Y.Z" --notes "..."` で Release を作成
  - notes は CHANGELOG.md の該当セクションをコピペするのが確実

> 🛑 **ここで停止する。** 追補対象のバージョンと、打とうとしているタグ / SHA の対応表を提示し、
> ユーザーの承認を得てから push・Release 作成を実行する。タグの push は取り消しが面倒で、
> 誤ったコミットに打つと publish 対象がずれる。

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

> 🛑 **AI はここで必ず停止する。PR 作成までがこのスキルの自走範囲。**
> PR の URL・変更差分の要約・CI の状態を報告して**ユーザーの応答を待つ**。
> **AI によるセルフレビュー（`/code-review` 等）は人間のレビューの代替にならない。**
> publish の前段であるマージは、後戻りが難しい操作の入口なので、必ず人が差分を見る。

- [ ] レビュー受領（CodeRabbit / Codex / 人間レビュアー）
- [ ] 全 CI green を確認（`gh pr checks <PR番号>`）
- [ ] 🛑 **通常マージ（`--merge`）でマージ**。スカッシュは禁止（コミットが消えるとリリース履歴が辿れない）
- [ ] 🛑 base branch protection があるため、必要なら admin マージ: `gh pr merge <PR番号> --merge --admin`
  - `--admin` は保護ブランチのレビュー要件を迂回する。**ユーザーが admin マージを明示的に求めたときだけ**使う。
    「protection で弾かれたから `--admin` を付け直す」を AI の判断でやらない

### マージ後: タグ・Release・publish

> 🛑 **マージが済んだからといって、AI の判断で続けて publish まで走らない。**
> 「タグを打って publish して」と明示的に指示されてから着手し、実行前に
> 置き換えた実際の値（`X.Y.Z` / `RELEASE_SHA`）を提示して確認を取る。

- [ ] `git fetch origin main && git checkout main && git pull` で最新化
- [ ] **リリースコミットの SHA を `git log --oneline | grep release | head -1` で必ず特定**
- [ ] **タグはリリースコミットの SHA を明示して打つ**（HEAD に打つと main が進んだ場合に誤タグ → publish 漏れ・誤 publish の温床）:
  ```bash
  # 候補が 1 件であることを確認してからタグを打つ（別バージョンを掴むと誤 publish になる）
  CANDIDATES=$(git log --format='%H %s' | grep -F "release vX.Y.Z")
  echo "$CANDIDATES"
  [ "$(echo "$CANDIDATES" | wc -l)" -eq 1 ] || { echo "候補が 1 件ではない。手で SHA を特定すること" >&2; exit 1; }
  RELEASE_SHA=$(echo "$CANDIDATES" | awk '{print $1}')
  git show --no-patch --oneline "$RELEASE_SHA"   # 対象コミットを目視確認する
  git tag vX.Y.Z "$RELEASE_SHA"
  ```
- [ ] 🛑 タグを push する（打った SHA とコミットメッセージを提示して確認後）:
  ```bash
  git push origin vX.Y.Z
  ```
- [ ] 🛑 **GitHub Release 作成**:
  CHANGELOG.md のセクションを `--notes` で直接渡すのが確実:
  ```bash
  awk '/^## \[X\.Y\.Z\]/{flag=1;next} /^## \[/{flag=0} flag' CHANGELOG.md > /tmp/notes.md
  # 見出しの誤記や CHANGELOG 未反映だと空になる。空の Release を作らない
  [ -s /tmp/notes.md ] || { echo "CHANGELOG から vX.Y.Z のセクションを抽出できなかった" >&2; exit 1; }
  cat /tmp/notes.md   # 内容を目視確認してから作成する
  gh release create vX.Y.Z --title "vX.Y.Z" --notes-file /tmp/notes.md
  ```
- [ ] 🛑 **npm publish** — GitHub Actions ワークフローを実行。**tag ref で実行する**ことで、main が進んでも正しいリリースコミットの内容が publish される:
  ```bash
  gh workflow run "Publish to npm" --ref vX.Y.Z
  ```
  - **publish は取り消せない。** npm の unpublish は公開 72 時間以内かつ依存されていない場合のみで、
    実質的な回復手段は「新しいパッチバージョンを出す」しかない。実行前に必ずユーザーの明示的な
    指示を得る（`--ref` に渡すタグ名も読み上げて確認する）
  - workflow が `npm error code E404 'pkg@X.Y.Z' is not in this registry` で失敗する場合は **NPM_TOKEN の期限切れ**（auth 失敗が 404 として返る npm registry 仕様）
  - workflow が `npm error code EOTP` で失敗する場合は、**トークン種別が 2FA バイパス対応していない**。次のいずれかで作り直し:
    - Classic Token: タイプを **Automation** で発行
    - Granular Access Token: 作成時に **「Bypass 2FA when publishing」を有効** にする
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
- `pnpm.overrides` は本リポジトリでは `package.json` の `pnpm.overrides` に置く運用（CI が使う pnpm のバージョンで読まれることを確認済み）。ローカルの pnpm バージョンが大幅に違うと挙動差で lockfile が書き換わることがあるので、ローカルで pnpm install するときは lockfile の差分（特に `overrides:` セクション）を確認すること
- 認証エラーは npm 仕様で 404 として返ることが多い。`NPM_TOKEN` の有効期限切れや権限不足を最初に疑う
- 2FA OTP を要求された場合（`npm error code EOTP`）はトークン種別が automation 対応していない。Classic Token なら Automation 型、Granular Access Token なら「Bypass 2FA when publishing」を有効にしたものを発行

### マージ後のローカル checkout が worktree と衝突する

`gh pr merge --delete-branch` がローカル branch を消そうとして worktree 衝突を起こすことがある。
worktree を `git worktree remove` で先に消すか、PR マージ自体は GitHub UI から行う。

---

## 参考リンク

- [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) — CHANGELOG.md の書式
- [Semantic Versioning](https://semver.org/lang/ja/) — semver
- `sparkle-design` の `CLAUDE.md` / `docs/ai-instructions/` の規約も参照
