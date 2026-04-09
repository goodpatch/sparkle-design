# コントリビュートガイド / Contributing Guide

Sparkle Design for React へのコントリビュートを歓迎します！ / We welcome contributions to Sparkle Design for React!

## セットアップ / Setup

```bash
# Node.js のバージョンは .node-version に合わせてください
# Match the Node.js version to .node-version
pnpm install
```

## 開発フロー / Development Flow

1. Issue を確認し、作業するものを選ぶ / Check existing issues and pick one
2. ブランチを作成する / Create a branch (`feature/component-name`, `fix/issue-description`, etc.)
3. 変更を実装する / Implement changes
4. テスト・lint・型チェックを通す / Pass tests, lint, and type checks
5. PR を作成する / Open a pull request

### 新規コンポーネントの作成 / Creating a New Component

```bash
./scripts/setup.sh <component-name>
```

スクリプトが以下のファイルを生成します / The script generates:
- `index.tsx` — コンポーネント実装 / Component implementation
- `index.test.tsx` — テスト / Tests
- `index.stories.tsx` — Storybook ストーリー / Storybook stories
- `item.json` — shadcn registry メタデータ / Registry metadata
- `README.md` — コンポーネントドキュメント / Component documentation

詳細は `docs/ai-instructions/new-component.md` を参照してください。

## 品質チェック / Quality Checks

PR を作成する前に以下を実行してください / Run these before opening a PR:

```bash
pnpm lint:fix         # ESLint 自動修正 / ESLint auto-fix
pnpm format           # Prettier フォーマット / Prettier formatting
pnpm type-check       # TypeScript 型チェック / TypeScript type check
pnpm test             # テスト / Tests
pnpm build:package    # パッケージビルド / Package build
```

## コミットメッセージ / Commit Messages

- 日本語で記述します / Written in Japanese
- 絵文字プレフィックス + Conventional Commit 形式 / Emoji prefix + Conventional Commit format
- 詳細は `.github/copilot-commit-message-instructions.md` を参照

## ブランチ名 / Branch Naming

- 英数字・ドット・ハイフン・アンダースコアを使用 / Use alphanumeric characters, dots, hyphens, underscores
- `/` は接頭辞と名前の区切りとしてのみ使用 / `/` only as prefix separator (e.g., `feature/button-variant`)

## AI ツールの活用 / AI Tools

このリポジトリは AI コーディングに最適化されています / This repository is optimized for AI-assisted development.

- **Claude Code**: `.claude/skills/` にスキルを同梱 / Skills bundled in `.claude/skills/`
- **GitHub Copilot**: `.github/instructions/` にガイドラインを配置 / Guidelines in `.github/instructions/`
- **Cursor**: `.cursor/rules/` にルールを配置 / Rules in `.cursor/rules/`
- **Codex**: `AGENTS.md` にガイドラインを記載 / Guidelines in `AGENTS.md`

アンチパターンの検査 / Anti-pattern checking:

```bash
npx sparkle-design-cli check src --format json
```

## コメントスタイル / Comment Style

- 日本語を先に、英語は `en:` プレフィックスを付けて続ける / Japanese first, English with `en:` prefix
- 詳細は `docs/ai-instructions/comment-style.md` を参照
