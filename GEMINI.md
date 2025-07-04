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
- React コンポーネントのコメントは `.github/comment-rule.md` のルールに従います。
- コード内のコメントは日本語のあとに `en:` を付けた英語を続けて記述してください。
- ブランチ名には英数字・ドット・ハイフン・アンダースコアのみ使用します。

## Common commands

- `pnpm dev` – 開発サーバー起動
- `pnpm storybook` – Storybook を開く
- `pnpm build:sd` – デザイントークン生成
- `make registry` – レジストリ生成
- `make new-component` または `./scripts/setup.sh <name>` – コンポーネント作成
- `make help` – Makefile のターゲット一覧

## Testing Guidelines

- **必読**: `.github/instructions/testing.instructions.md` でテストガイドライン全体を確認
- t_wadaさんのテストベストプラクティスに厳密に従う
- テスト分析時は中間ログファイルを使用: `npm run test:ai-analyze`
- CVAで生成される実際のTailwindCSSクラスをテストする（バリアント名ではなく）
- jsdomの制限を適切に処理する（キーボードナビゲーション、ポータルコンポーネント）

## AI Development

- AI固有の開発パターンは `.github/instructions/ai-development.instructions.md` を参照
- プロジェクトコンテキストは `.github/instructions/ai-context.instructions.md` を参照

## Programmatic checks

コミット前に次を実行します:

```bash
pnpm lint
npm test
```

## Gemini CLI

- Gemini CLI はこのファイルの指示に従ってコミットや PR を準備します。

## Reference

- `AGENTS.md` – リポジトリのガイドライン
- `CONTRIBUTING.md` – コントリビュート方法
- `.github/instructions/` – 各種開発指示
