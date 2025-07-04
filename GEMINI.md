# Gemini CLI guidelines

Gemini CLI はこのリポジトリでコードを生成するとき、次の規則に従います。

## 環境設定

- **Node.js**: `.node-version` または `.tool-versions` の **22.14.0** を使用
- **パッケージマネージャー**: `pnpm install` で依存関係をインストール

## 開発フロー

1. **コード生成**: AI開発ガイドラインに従ってコードを生成
2. **品質チェック**: `pnpm lint && pnpm format` でコード品質を確認
3. **テスト実行**: `pnpm test` でテストを実行
4. **コミット**: 日本語絵文字メッセージでコミット

## 主要参照ドキュメント

**必ず以下の順序で参照してください:**

1. **`.github/instructions/ai-context.instructions.md`** – プロジェクト概要
2. **`.github/instructions/ai-development.instructions.md`** – 開発パターン
3. **`.github/instructions/testing.instructions.md`** – テストガイドライン
4. **`.github/instructions/comment-style.instructions.md`** – コメント規則
5. **`.github/instructions/new-component.instructions.md`** – コンポーネント作成

## 重要なルール

- **コメント**: 日本語のあとに `en:` 付き英語
- **コミット**: `.github/copilot-commit-message-instructions.md` に従う
- **ブランチ**: 英数字・ドット・ハイフン・アンダースコアのみ
- **テスト**: t_wadaベストプラクティスに厳密に従う

---

**Gemini CLI専用**: このファイルの指示に従ってコミットやPRを準備します。
