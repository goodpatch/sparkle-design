---
name: release-sparkle-design
license: Apache-2.0
description: >
  sparkle-design（公開 npm パッケージ）の新バージョンをリリースするための手順スキル。
  package.json の version bump、CHANGELOG.md の更新、リリース PR 作成、PR マージ後の
  npm への stage、メンテナーによる 2FA 承認（npm stage approve）、承認後の git tag・
  GitHub Release 作成までを一連の手順で実行する。
  CHANGELOG 更新漏れと GitHub Release 作成漏れを防ぐためのチェックリストを含む。
  「sparkle-design をリリース」「sparkle-design の新バージョンを切る」「vX.Y.Z をリリース」
  「sparkle-design の CHANGELOG を更新」で発動。
  English: "release sparkle-design", "cut a new sparkle-design version",
  "publish sparkle-design", "bump sparkle-design version".
user-invocable: true
---

# Skill: release-sparkle-design

`sparkle-design`（公開 npm パッケージ）の新バージョンをリリースするための手順スキル。

**このスキルが解決する問題**:

- CHANGELOG.md の更新漏れや、GitHub Release・git tag の作成漏れが繰り返し起きていた
- リリース手順がドキュメント化されておらず、各リリースで作業者が手探りになっていた
- このスキルはチェックリストとして機能し、リリース漏れをゼロにする

---

<!-- ========== AI アシスタント向け指示（ユーザーにそのまま見せない） ========== -->

## AI アシスタントへの指示

> **🛑 不可逆操作の扱い（このスキルで最優先のルール）**
>
> 🛑 が付いた項目（PR マージ / npm への stage / GitHub Release 作成）は、
> **ユーザーが名指しで指示したときだけ**実行する。「リリースして」という最初の依頼は、
> マージ・publish までの事前承認ではない。**リストに並んでいることは実行してよい理由にならない。**
> 🛑 の手前まで進んだら停止し、状況（PR 番号 / CI 状態 / 次のコマンド）を報告して指示を待つ。
>
> これらは `scripts/hooks/irreversible-ops-guard.sh`（PreToolUse hook）が実際にブロックする。
> ブロックされたら、ユーザーの指示を得たうえで `SPARKLE_CONFIRM=1` を先頭に付けて再実行する。
>
> 👤 **`npm stage approve`（公開の確定）は AI が実行しない。** npm の 2FA コードが要る操作で、
> メンテナー本人が手元で実行する。AI は stage ID とコマンドを提示して待つ。
> **hook が無い環境（Claude Code 以外のエージェント）でも、上のルールは同じように適用する。**

### 実行方針

1. **ユーザーにリリース種別を確認**

   - `patch`（バグ修正 / 依存更新 / 内部リファクタ）/ `minor`（後方互換のある機能追加）/ `major`（破壊的変更）
   - タグ・Release 未作成の過去バージョンがある場合は同時に追補するか確認

2. **`sparkle-design` リポジトリのルートで作業する**

   - 編集・テスト・git 操作はすべて `sparkle-design` のチェックアウトディレクトリで実行
   - 既定は git worktree（`.claude/worktrees/<name>` 配下）で `chore/release-X.Y.Z` ブランチを切る。本チェックアウトに未コミットの変更が無く、並行作業も無いときに限り、直接ブランチを切ってもよい

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

- [ ] 該当バージョンを公開した commit の SHA を npm の記録から特定する: `npm view sparkle-design@X.Y.Z gitHead --registry=https://registry.npmjs.org`（CI から公開した版は main のマージコミットが記録されている）
- [ ] 🛑 `gh workflow run "Publish GitHub Release" -f ref=<SHA>` で tag と Release を作る
  - ワークフローは npm で公開済みであることと、`gitHead` が SHA と一致すること（記録が無ければ止まる）を確かめてから tag を打ち、CHANGELOG の該当セクションを notes にする

> 🛑 **ここで停止する。** 追補対象のバージョンと、打とうとしているタグ / SHA の対応表を提示し、
> ユーザーの承認を得てから push・Release 作成を実行する。タグの push は取り消しが面倒で、
> 誤ったコミットに打つと、公開した内容と tag の指す commit が食い違う。

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
- [ ] 型チェック: `pnpm type-check`
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

### マージ後: stage → 承認 → tag・Release

npm は 2027 年 1 月に granular access token での直接 publish を廃止する。CI は
**trusted publishing（GitHub Actions の OIDC）で `npm stage publish` するだけ**で（トークンは使わない）、
公開の確定はメンテナーが 2FA 付きで `npm stage approve` する。tag と GitHub Release は公開を確認してから作る。

> 🛑 **マージが済んだからといって、AI の判断で続けて stage まで走らない。**
> 「stage して」「リリースして」と明示的に指示されてから着手し、実行前に
> 対象の version（`X.Y.Z`）と main の最新 commit を提示して確認を取る。

- [ ] リリース PR が main にマージ済みで、main の `package.json` の `version` が `X.Y.Z` になっていることを確認する（`git fetch origin main && git show origin/main:package.json | jq -r .version`）
- [ ] 🛑 **npm へ stage** — main を ref にしてワークフローを実行する（`gh workflow run` の `--ref` はブランチ名かタグ名のみで SHA は渡せない。ワークフローは main 以外からの実行を拒否する）。dist-tag は version から自動判定（`-beta.N` → `beta`、`-rc.N` → `next`、それ以外 → `latest`）:
  ```bash
  gh workflow run "Publish to npm" --ref main -f channel=auto
  ```
  - stage した時点では**まだ公開されていない**（`npm stage reject` で取り下げられる）。dist-tag は stage 時に決まり、承認時には変えられない
  - 実行結果の Summary に **stage ID・commit（main のマージコミット）・承認コマンド**が出る。以降はこの commit を使う
- [ ] 👤 **メンテナーが 2FA 付きで承認する**（AI は実行しない）。手元で `npm login --registry=https://registry.npmjs.org` 済みであること（社内 proxy が既定 registry の環境があるので、コマンドには必ず `--registry` を付ける）。必要なら先に中身を確認する:
  ```bash
  npx -y npm@11.21.0 stage download <stage-id> --registry=https://registry.npmjs.org   # 任意: tarball を確認
  npx -y npm@11.21.0 stage approve <stage-id> --otp=<code> --registry=https://registry.npmjs.org
  ```
  取り下げる場合は `npx -y npm@11.21.0 stage reject <stage-id> --otp=<code> --registry=https://registry.npmjs.org`
- [ ] 公開確認: `npm view sparkle-design@X.Y.Z version --registry=https://registry.npmjs.org` と `npm view sparkle-design dist-tags --registry=https://registry.npmjs.org`（社内 proxy 経由だと反映が遅れるので registry を明示する）
- [ ] 🛑 **tag と GitHub Release を作る** — 公開を確認してから、Summary に出た commit を渡して実行する。ワークフローは npm 上の公開と `gitHead` がその commit と一致することを確かめてから tag を打ち、CHANGELOG の節で Release を作る（`-` を含む版は pre-release）:
  ```bash
  gh workflow run "Publish GitHub Release" -f ref=<Summary の commit>
  ```

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

`npm view sparkle-design@X.Y.Z gitHead --registry=https://registry.npmjs.org` で公開した commit の SHA を特定し、`gh workflow run "Publish GitHub Release" -f ref=<SHA>` で後付けで tag + Release を作成できる（npm で公開済みであることが前提）。
このスキルの「過去リリース追補」セクションを参照。

### CHANGELOG が古い場合

`git log <最古の未反映タグ>..HEAD --oneline` で範囲を取って、各バージョンの section を遡って書き戻す。
GitHub Release の本文がある場合はそれを CHANGELOG にコピーすれば早い。

### npm stage ワークフローが失敗する場合

- `pnpm-lock.yaml` の整合性が崩れていないか確認（`pnpm install --frozen-lockfile` を試す）
- `pnpm.overrides` は本リポジトリでは `package.json` の `pnpm.overrides` に置く運用（CI が使う pnpm のバージョンで読まれることを確認済み）。ローカルの pnpm バージョンが大幅に違うと挙動差で lockfile が書き換わることがあるので、ローカルで pnpm install するときは lockfile の差分（特に `overrides:` セクション）を確認すること
- **認証エラー（E404 / ENEEDAUTH / 403）** は trusted publisher の設定を疑う。npmjs.com の設定と workflow のファイル名・リポジトリが一致しているか、stage が許可されているかを `npx -y npm@11.21.0 trust list sparkle-design --registry=https://registry.npmjs.org` で確認する（次節）
- 直接 publish できるトークン（Bypass 2FA 付き）を発行し直す対応は**取らない**。2027 年 1 月に廃止される

### trusted publisher（OIDC）の設定

トークンの発行・更新は不要。npm 側でパッケージと GitHub Actions のワークフローを一度だけ結び付ける（npm の 2FA が要るのでメンテナーが実行する）:

```bash
npx -y npm@11.21.0 trust github sparkle-design \
  --repository goodpatch/sparkle-design --file publish.yml --allow-stage-publish --registry=https://registry.npmjs.org
npx -y npm@11.21.0 trust list sparkle-design --registry=https://registry.npmjs.org   # 確認
```

- `--allow-stage-publish` だけを付け、`--allow-publish` は付けない（CI から直接公開できないようにし、公開の確定を人の 2FA に限る）
- ワークフローのファイル名（`publish.yml`）やリポジトリ名を変えたら設定し直す
- OIDC で stage できることを確認したら、リポジトリの `NPM_TOKEN` secret は削除する（`gh secret delete NPM_TOKEN --repo goodpatch/sparkle-design`）

### マージ後のローカル checkout が worktree と衝突する

`gh pr merge --delete-branch` がローカル branch を消そうとして worktree 衝突を起こすことがある。
worktree を `git worktree remove` で先に消すか、PR マージ自体は GitHub UI から行う。

---

## 参考リンク

- [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) — CHANGELOG.md の書式
- [Semantic Versioning](https://semver.org/lang/ja/) — semver
- `sparkle-design` の `CLAUDE.md` / `docs/ai-instructions/` の規約も参照
