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
