# Sparkle Design for React [![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)

Next.js + TypeScript を用いたコンポーネントライブラリです。Tailwind CSS や Storybook、shadcn/ui を利用しています。

## ディレクトリ構成

```
├─ src/
│  ├─ app/            # Next.js アプリケーション関連
│  ├─ components/     # React コンポーネントと Storybook
│  └─ lib/            # 共有ユーティリティ
├─ scripts/           # 各種スクリプト
├─ public/r/          # 公開用レジストリ JSON
└─ .github/           # GitHub関連の設定ファイル
```

## 主なコマンド

### 開発サーバーの起動

```bash
pnpm dev
```

Next.js の開発サーバーを起動します。

## Package のビルド

```bash
pnpm build:package
```

### Storybook の起動

```bash
pnpm storybook
```

コンポーネント一覧を確認できます。Storybook の「Accessibility」タブからアクセシビリティチェックも行えます。

### Sparkle Design CSS の生成

```bash
pnpm build:css
```

`sparkle.config.json` の設定に基づいて、デザインシステム CSS を生成します。このコマンドは内部的に `sparkle-design-cli` を実行し、プライマリカラー、フォント設定、角丸設定などのデザイントークンから `src/app/sparkle-design.css` ファイルを生成します。

設定ファイル (`sparkle.config.json`) の内容：

- `primary`: プライマリカラー（blue, red, orange など）
- `font-pro`: プロポーショナルフォント（Google Fonts の名前）
- `font-mono`: モノスペースフォント（Google Fonts の名前）
- `radius`: 角丸設定（sm, md, lg など）

設定ファイルは Sparkle Design Theme Settings から書き出すことができます。
また、`sparkle-design-cli`を自分のプロジェクトで直接使用することも可能です。

```bash
npx sparkle-design-cli
```

または、グローバルにインストールした場合：

```bash
npm install -g sparkle-design-cli
sparkle-design-cli
```

詳しい使い方は `sparkle-design-cli --help` で確認できます。

## 使用方法

### パッケージのインストール

```bash
npm install sparkle-design
# または
pnpm add sparkle-design
# または
yarn add sparkle-design
```

### 基本的な使用例

```tsx
import React from "react";
import { Button, Badge, Card } from "sparkle-design";

// 必要なスタイルをインポート
import "sparkle-design/globals.css";
import "sparkle-design/sparkle-design.css";

function App() {
  return (
    <div>
      <Card>
        <h1>Sparkle Design を使った例</h1>
        <Badge variant="primary">新機能</Badge>
        <Button variant="primary" size="md">
          ボタンをクリック
        </Button>
      </Card>
    </div>
  );
}

export default App;
```

### スタイルファイルについて

- **`globals.css`**: 基本的な Tailwind CSS とリセットスタイル
- **`sparkle-design.css`**: Sparkle Design のデザイントークン（カラー、フォント、角丸、シャドウなど）

両方のファイルをインポートすることで、Sparkle Design の全機能を利用できます。

### TypeScript サポート

Sparkle Design は完全に TypeScript で書かれており、型定義が含まれています。

```tsx
import { ButtonProps } from "sparkle-design";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

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

### テストの実行

```bash
pnpm test
```

Vitest によるユニットテストを実行します。Storybook のテストアドオンとも連携しています。
プルリクエストを作成すると、GitHub Actions が `pnpm lint` と `pnpm test` を自動で実行し、結果が PR 画面に表示されます。

## 開発環境設定

### VS Code 推奨設定

プロジェクトには `.vscode/settings.json` と `.vscode/extensions.json` が含まれており、以下の機能が自動で有効になります：

- **Format on Save**: ファイル保存時の自動フォーマット
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマット

推奨拡張機能:
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer

### コードフォーマット

Prettier と ESLint の設定は以下のファイルで管理されています：

- `prettier.config.cjs` - Prettier の設定
- `.eslintrc.cjs` - ESLint の設定
- `.editorconfig` - エディタの基本設定
- `.prettierignore` - フォーマット除外ファイル

コマンドライン使用:

```bash
# フォーマットチェック
pnpm format:check

# 自動フォーマット
pnpm format

# ESLint チェック (Next.js 経由)
pnpm lint:check
# または
pnpm lint

# ESLint 自動修正 (Next.js 経由)
pnpm lint:fix

# 型チェック
pnpm type-check
```

**注意**: ESLintは`next lint`コマンドを使用しており、Next.jsプロジェクトに最適化された設定とルールが適用されます。

## Makefile について

Makefile では次のターゲットが定義されています。

- `registry` ... レジストリの生成と公開ファイルへのコピー
- `new-component` ... 対話形式で新規コンポーネントを作成
- `help` ... 利用可能なターゲット一覧を表示

`make help` で詳細を確認できます。

## Sparkle Design バッジ

Sparkle Design のバッジは、コンポーネントが Sparkle Design を使用していることを示します。README に次のように追加してください。

```markdown
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
```

## その他

- React コンポーネントのコメント記法は `.github/comment-rule.md` を参照してください。
- コミットメッセージの形式は `.github/copilot-commit-message-instructions.md` のルールに従います。
- 変更履歴は `CHANGELOG.md` を参照してください。

## コンポーネント対応状況

| コンポーネント    | 実装 | Storybook | レジストリ | Figma Code Connect | A11y チェック |
| ----------------- | ---- | --------- | ---------- | ------------------ | ------------- |
| Avatar            | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Badge             | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Breadcrumb        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Button            | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Calendar          | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Card              | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Checkbox          | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Dialog            | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Divider           | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Filter Chip       | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Form Control      | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Icon              | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Icon Button       | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Image             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Inline Message    | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Input             | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Input Chip        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Date        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input File        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Number      | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Password    | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Input Search      | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Time        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Link              | ✅   | ✅        | ✅         | ❌                 | ❌            |
| List              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Menu              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Modal             | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Package           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Pagination        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Popover           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Radio             | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Segmented Control | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Select            | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Side Navigation   | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Skeleton          | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Slider            | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Slot              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Spinner           | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Stack             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Stepper           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Switch            | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Table             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Tabs              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Tag               | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Textarea          | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Toast             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Tooltip           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Vertical Tabs     | ❌   | ❌        | ❌         | ❌                 | ❌            |
