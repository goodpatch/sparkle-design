# コントリビュートガイド

Sparkle Design for React へのコントリビュートを歓迎します！

## セットアップ

```bash
# Node.js のバージョンは .node-version に合わせてください
pnpm install
```

## 開発フロー

1. Issue を確認し、作業するものを選ぶ
2. ブランチを作成する（`feature/component-name`, `fix/issue-description` など）
3. 変更を実装する
4. テスト・lint・型チェックを通す
5. PR を作成する

### 新規コンポーネントの作成

```bash
./scripts/setup.sh <component-name>
```

スクリプトが以下のファイルを生成します:
- `index.tsx` — コンポーネント実装
- `index.test.tsx` — テスト
- `index.stories.tsx` — Storybook ストーリー
- `item.json` — shadcn registry メタデータ
- `README.md` — コンポーネントドキュメント

詳細は `docs/ai-instructions/new-component.md` を参照してください。

## 品質チェック

PR を作成する前に以下を実行してください。

```bash
pnpm lint:fix         # ESLint 自動修正
pnpm format           # Prettier フォーマット
pnpm type-check       # TypeScript 型チェック
pnpm test             # テスト
pnpm build:package    # パッケージビルド
```

## コミットメッセージ

- 日本語で記述します
- 絵文字プレフィックス + Conventional Commit 形式
- 詳細は `.github/copilot-commit-message-instructions.md` を参照

## ブランチ名

- 英数字・ドット・ハイフン・アンダースコアを使用
- `/` は接頭辞と名前の区切りとしてのみ使用（例: `feature/button-variant`）

## AI ツールの活用

このリポジトリは AI コーディングに最適化されています。

- **Claude Code**: `.claude/skills/` にスキルを同梱
- **GitHub Copilot**: `.github/instructions/` にガイドラインを配置
- **Cursor**: `.cursor/rules/` にルールを配置
- **Codex**: `AGENTS.md` にガイドラインを記載

アンチパターンの検査:

```bash
npx sparkle-design-cli check src --format json
```

## コメントスタイル

- 日本語を先に、英語は `en:` プレフィックスを付けて続ける
- 詳細は `docs/ai-instructions/comment-style.md` を参照

---

# Contributing Guide

We welcome contributions to Sparkle Design for React!

## Setup

- Match the Node.js version to `.node-version`.
- Install dependencies with `pnpm install`.

## Development Flow

1. Check existing issues and pick one to work on
2. Create a branch (`feature/component-name`, `fix/issue-description`, etc.)
3. Implement changes
4. Pass tests, lint, and type checks
5. Open a pull request

### Creating a New Component

```bash
./scripts/setup.sh <component-name>
```

The script generates:
- `index.tsx` — Component implementation
- `index.test.tsx` — Tests
- `index.stories.tsx` — Storybook stories
- `item.json` — shadcn registry metadata
- `README.md` — Component documentation

See `docs/ai-instructions/new-component.md` for details.

## Quality Checks

Run these before opening a PR:

```bash
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier formatting
pnpm type-check       # TypeScript type check
pnpm test             # Tests
pnpm build:package    # Package build
```

## Commit Messages

- Written in Japanese
- Emoji prefix + Conventional Commit format
- See `.github/copilot-commit-message-instructions.md` for details

## Branch Naming

- Use alphanumeric characters, dots, hyphens, and underscores
- `/` is only used as a separator between prefix and name (e.g., `feature/button-variant`)

## AI Tools

This repository is optimized for AI-assisted development.

- **Claude Code**: Skills bundled in `.claude/skills/`
- **GitHub Copilot**: Guidelines in `.github/instructions/`
- **Cursor**: Rules in `.cursor/rules/`
- **Codex**: Guidelines in `AGENTS.md`

Anti-pattern checking:

```bash
npx sparkle-design-cli check src --format json
```

## Comment Style

- Japanese first, followed by English with `en:` prefix
- See `docs/ai-instructions/comment-style.md` for details
