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

- [ ] 該当バージョンのリリースコミット（`🔖 chore: release vX.Y.Z` 等）の SHA を、下の「マージ後: stage → 承認 → tag・Release」にある「候補が 1 件であることを確かめる」スニペットで特定する
- [ ] 🛑 `gh workflow run "Publish GitHub Release" -f ref=<SHA>` で tag と Release を作る
  - ワークフローは npm で公開済みであること（と、記録があれば `gitHead` が SHA と一致すること）を確かめてから tag を打ち、CHANGELOG の該当セクションを notes にする

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

npm は 2027 年 1 月に granular access token での直接 publish を廃止する。そのため CI は
**stage 専用トークン（read-write-stage-only）で `npm stage publish` するだけ**で、公開の確定は
メンテナーが 2FA 付きで `npm stage approve` する。tag と GitHub Release は公開を確認してから作る。

> 🛑 **マージが済んだからといって、AI の判断で続けて stage まで走らない。**
> 「stage して」「リリースして」と明示的に指示されてから着手し、実行前に
> 置き換えた実際の値（`X.Y.Z` / `RELEASE_SHA`）を提示して確認を取る。

- [ ] リリース用 worktree ではなく、`main` をチェックアウトしている本チェックアウトに戻って `git fetch origin main && git checkout main && git pull` で最新化する（`main` は本チェックアウトで使われているので、worktree 側では checkout できない）
- [ ] **リリースコミットの SHA を特定する**（候補が 1 件であることを確かめる）:
  ```bash
  CANDIDATES=$(git log --format='%H %s' | grep -F "X.Y.Z")
  echo "$CANDIDATES"
  [ "$(echo "$CANDIDATES" | wc -l)" -eq 1 ] || { echo "候補が 1 件ではない。手で SHA を特定すること" >&2; exit 1; }
  RELEASE_SHA=$(echo "$CANDIDATES" | awk '{print $1}')
  git show --no-patch --oneline "$RELEASE_SHA"   # 対象コミットを目視確認する
  ```
- [ ] 🛑 **npm へ stage** — リリースコミットを ref にしてワークフローを実行する（dist-tag は version から自動判定。`-beta.N` → `beta`、`-rc.N` → `next`、それ以外 → `latest`）:
  ```bash
  gh workflow run "Publish to npm" --ref "$RELEASE_SHA" -f channel=auto
  ```
  - stage した時点では**まだ公開されていない**（`npm stage reject` で取り下げられる）。dist-tag は stage 時に決まり、承認時には変えられない
  - 実行結果の Summary に **stage ID・commit・承認コマンド**が出る
- [ ] 👤 **メンテナーが 2FA 付きで承認する**（AI は実行しない）。必要なら先に中身を確認する:
  ```bash
  npx -y npm@^11.21.0 stage download <stage-id>   # 任意: tarball を確認
  npx -y npm@^11.21.0 stage approve <stage-id> --otp=<code>
  ```
  取り下げる場合は `npx -y npm@^11.21.0 stage reject <stage-id> --otp=<code>`
- [ ] 公開確認: `npm view sparkle-design@X.Y.Z version --registry=https://registry.npmjs.org` と `npm view sparkle-design dist-tags --registry=https://registry.npmjs.org`（社内 proxy 経由だと反映が遅れるので registry を明示する）
- [ ] 🛑 **tag と GitHub Release を作る** — 公開を確認してから実行する。ワークフローは npm 上の公開と `gitHead` が指定 commit と一致することを確かめてから tag を打ち、CHANGELOG の節で Release を作る（`-` を含む版は pre-release）:
  ```bash
  gh workflow run "Publish GitHub Release" -f ref="$RELEASE_SHA"
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

そのコミットの SHA を「マージ後: stage → 承認 → tag・Release」の「候補が 1 件であることを確かめる」スニペットで特定し、`gh workflow run "Publish GitHub Release" -f ref=<SHA>` で後付けで tag + Release を作成できる（npm で公開済みであることが前提）。
このスキルの「過去リリース追補」セクションを参照。

### CHANGELOG が古い場合

`git log <最古の未反映タグ>..HEAD --oneline` で範囲を取って、各バージョンの section を遡って書き戻す。
GitHub Release の本文がある場合はそれを CHANGELOG にコピーすれば早い。

### npm stage ワークフローが失敗する場合

- `pnpm-lock.yaml` の整合性が崩れていないか確認（`pnpm install --frozen-lockfile` を試す）
- `pnpm.overrides` は本リポジトリでは `package.json` の `pnpm.overrides` に置く運用（CI が使う pnpm のバージョンで読まれることを確認済み）。ローカルの pnpm バージョンが大幅に違うと挙動差で lockfile が書き換わることがあるので、ローカルで pnpm install するときは lockfile の差分（特に `overrides:` セクション）を確認すること
- **`npm error code E404 ... is not in this registry`** は認証エラー（npm は認証失敗を 404 で返す）。`NPM_TOKEN` の期限切れか権限不足を最初に疑い、次の「トークンの更新」を行う
- 直接 publish できるトークン（Bypass 2FA 付き）を発行し直す対応は**取らない**。2027 年 1 月に廃止される

### NPM_TOKEN（stage 専用トークン）の更新

期限切れのときは、`npm login` 済み・`gh auth login` 済みの手元で次を実行する。npm のパスワードと 2FA コードを聞かれる（npm の仕様でトークン発行は 2FA 必須のため、ここだけは人が行う）。発行したトークンは画面に出さず、そのまま GitHub の secret に登録される:

```bash
scripts/rotate-npm-token.sh --expires 90
```

古いトークンは `npm token list` で確認し、`npm token revoke <id>` で失効させる。

### マージ後のローカル checkout が worktree と衝突する

`gh pr merge --delete-branch` がローカル branch を消そうとして worktree 衝突を起こすことがある。
worktree を `git worktree remove` で先に消すか、PR マージ自体は GitHub UI から行う。

---

## 参考リンク

- [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) — CHANGELOG.md の書式
- [Semantic Versioning](https://semver.org/lang/ja/) — semver
- `sparkle-design` の `CLAUDE.md` / `docs/ai-instructions/` の規約も参照
