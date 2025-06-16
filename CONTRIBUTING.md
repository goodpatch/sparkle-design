# コントリビュートガイド

このプロジェクトへの貢献を歓迎します。プルリクエストを送る前に次の内容を確認してください。

## セットアップ

- Node.js のバージョンは `.node-version`もしくは`.tool-versions` に合わせてください。
- 依存関係のインストールは `pnpm install` で行います。

## ブランチ運用

- ブランチ名には英数字・ドット・ハイフン・アンダースコアのみ使用してください。

## コミットメッセージ

- `.github/copilot-commit-message-instructions.md` のルールに従い、日本語で記述します。

## プルリクエスト

- 変更点の概要と関連する Issue 番号を記載してください。
- コード変更時は `pnpm lint` を実行し、エラーが無いことを確認してください。

## 開発に役立つコマンド

- 開発サーバー: `pnpm dev`
- デザイントークン生成: `pnpm build:sd`
- Storybook: `pnpm storybook`

詳細は `README.md` も参照してください。
