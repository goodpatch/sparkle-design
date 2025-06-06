# Sparkle Design for React

Next.js + TypeScript を用いたコンポーネントライブラリです。Tailwind CSS や Storybook、style-dictionary、shadcn/ui を利用しています。

## ディレクトリ構成

```
├─ src/
│  ├─ app/            # Next.js アプリケーション関連
│  ├─ components/     # React コンポーネントと Storybook
│  └─ lib/            # 共有ユーティリティ
├─ style-dictionary/  # デザイントークンと生成ファイル
├─ scripts/           # 各種スクリプト
├─ public/r/          # 公開用レジストリ JSON
└─ .github/           # コントリビュートに関するドキュメント
```

## 主なコマンド

### 開発サーバーの起動

```bash
npm run dev
```

Next.js の開発サーバーを起動します。

## Package のビルド

```bash
npm run build:package
```

### Storybook の起動

```bash
npm run storybook
```

コンポーネント一覧を確認できます。

### デザイントークンのビルド

```bash
npm run build:sd
```

`style-dictionary` 配下のトークンから CSS 変数を生成します。

### コンポーネントレジストリの生成

```bash
make registry
```

`scripts/merge-registry` 配下の Swift ツールを実行し、`registry.json` を生成して `public/r/` にコピーします。

### 新規コンポーネントの作成

```bash
make new-component
```

または `./scripts/setup.sh <コンポーネント名>` を実行してください。

## Makefile について

Makefile では次のターゲットが定義されています。

- `registry` – レジストリの生成と公開ファイルへのコピー
- `new-component` – 対話形式で新規コンポーネントを作成
- `help` – 利用可能なターゲット一覧を表示

`make help` で詳細を確認できます。

## その他

- React コンポーネントのコメント記法は `.github/comment-rule.md` を参照してください。
- コミットメッセージの形式は `.github/copilot-commit-message-instructions.md` のルールに従います。
