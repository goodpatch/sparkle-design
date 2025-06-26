# Gemini CLI guidelines

Gemini CLI はこのリポジトリでコードを生成するとき、次の規則に従います。

## Environment

- Node.js のバージョンは `.node-version` もしくは `.tool-versions` の **22.14.0** に合わせます。
- 依存関係は `pnpm install` でインストールします。

## Directory layout

- `src/` – app、コンポーネントとユーティリティ
- `style-dictionary/` – トークンとビルド結果
- `scripts/` – `setup.sh` などのツール
- `public/r/` – レジストリ JSON

## Workflow

- 生成されたコードをレビューし、必要に応じて修正を加えます。
- `pnpm lint` を実行してエラーが無いことを確認します。
- コミットメッセージは `.github/copilot-commit-message-instructions.md` のルールに従い、日本語で絵文字から書き始めます。
- React コンポーネントのコメントは `.github/comment-rule.md` の `[Copilot Comment]` 記法を使います。
- ブランチ名には英数字・ドット・ハイフン・アンダースコアのみ使用します。

## Common commands

- `pnpm dev` – 開発サーバー起動
- `pnpm storybook` – Storybook を開く
- `pnpm build:sd` – デザイントークン生成
- `make registry` – レジストリ生成
- `make new-component` または `./scripts/setup.sh <name>` – コンポーネント作成
- `make help` – Makefile のターゲット一覧

## Programmatic checks

コミット前に次を実行します:

```bash
pnpm lint
```

## Gemini CLI

- Gemini CLI はこのファイルの指示に従ってコミットや PR を準備します。

## Reference

- `AGENTS.md` – リポジトリのガイドライン
- `CONTRIBUTING.md` – コントリビュート方法
