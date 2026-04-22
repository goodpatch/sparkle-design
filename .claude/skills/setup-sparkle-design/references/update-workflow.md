# Sparkle Design アップデートワークフロー

プロジェクトの Sparkle Design 関連パッケージ・CLI を最新化するためのワークフロー。
非エンジニアのユーザーでも「アップデートして」の一言で自律的に実行できることを目指す。

---

## いつ実行するか

- ユーザーが「Sparkle Design をアップデートしたい」「最新にしたい」と言ったとき
- セッション開始時の定期チェックでユーザーが承認したとき
- CHANGELOG に破壊的変更や重要な修正が記載されていることに気づいたとき

---

## ワークフロー手順

### Step 1: パッケージバージョンの確認とアップデート

```bash
# 現在のバージョンと最新バージョンを比較
npm view sparkle-design version

# package.json の現在のバージョンを確認
grep '"sparkle-design"' package.json

# アップデート（パッケージマネージャに合わせる）
pnpm update sparkle-design
# または
npm update sparkle-design
```

ユーザーにアップデート内容（現在のバージョン -> 最新バージョン）を見せてから実行する。

### Step 2: CLI の最新化と setup

sparkle-design-cli の最新版で guard 設定を更新する。

```bash
# CLI の最新バージョンを確認
npm view sparkle-design-cli version

# setup を実行して guard を最新化（既存設定は保持される）
npx --yes sparkle-design-cli setup --assistant claude
# 必要に応じて他のアシスタントも:
# npx --yes sparkle-design-cli setup --assistant cursor
# npx --yes sparkle-design-cli setup --assistant codex
```

### Step 3: CHANGELOG ベースのマイグレーション

アップデートしたバージョン間の CHANGELOG を確認し、必要な対応をプロジェクトに適用する。

```bash
# CHANGELOG を取得（GitHub API 経由）
gh api repos/goodpatch/sparkle-design/contents/CHANGELOG.md --jq '.content' | base64 -d
```

CHANGELOG の「Changed」「Migration」セクションに記載がある場合:
- **Breaking changes**: ユーザーに説明し、対応コードを提案
- **Deprecations**: 非推奨になった API の置き換えを提案
- **New features**: 利用可能な新機能をユーザーに案内
- **CSS regeneration が必要な変更**: `npx --yes sparkle-design-cli generate` を実行

### Step 4: 品質チェック

```bash
# アンチパターン検査
npx --yes sparkle-design-cli check src --format json

# findings と manualReviewReminders を確認
# findings があれば修正を提案
# manualReviewReminders はユーザーに確認を促す（各 reminder ID を最終 reply で
# echo + 1 行コメントで判定を示す形が推奨）
```

`character-*` に対応する token が無いサイズ等、ルールの自動判定を例外扱い
したい場合は対象行に `// sparkle-disable-line <rule-id>` を付けて opt-out
できる（使いすぎないこと、design を本当に壊すケースのみ）。

型チェックとテストも実行して、アップデートで壊れた箇所がないか確認:

```bash
pnpm type-check
pnpm test
pnpm build
```

### Step 5: 完了報告

ユーザーに以下をサマリーとして報告する:
- アップデートしたパッケージとバージョン（before -> after）
- 適用した CHANGELOG の変更点
- CLI check の結果
- 型チェック・テスト・ビルドの結果
- 手動確認が必要な項目（manualReviewReminders）
