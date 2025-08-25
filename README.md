<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="./docs/images/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
![npm](https://img.shields.io/npm/v/@goodpatch/sparkle-design)
[![ci](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml/badge.svg)](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml)


React.js + TypeScript を用いたコンポーネントライブラリです。<br />
shadcn/ui をベースに、Goodpatch のデザインシステム「Sparkle Design」を実装しています。

## 特徴

- 🔧 **柔軟性** ... shadcn/ui をベースに shadcn/ui registry に対応しているため、1コンポーネントから導入が可能です。npm パッケージとしても公開しているためプロジェクトごとに適した方法で導入していただくことが出来ます。
- ♿️ **アクセシビリティ** ... Sparkle Design はアクセシビリティを重視して設計されています。
- 🎨 **カスタマイズ性** ... 専用CLIツールを利用し、Figmaファイルと同等のカスタマイズを適用することが出来ます。これによりSparkle Designをベースとしたデザインシステムのコードを素早く用意することが出来ます。

## 使用方法

### パッケージのインストール

```bash
npm install sparkle-design
# または
pnpm add sparkle-design
# または
yarn add sparkle-design
```

### 個別コンポーネントの導入

Sparkle Design は shadcn/ui registry に対応しています。レジストリの URL は Storybook からコピーすることができます。<br />
shadcn/ui registry の詳細な情報は [公式ドキュメント](https://ui.shadcn.com/docs/registry/getting-started) を参照してください。

```bash
pnpm dlx shadcn@latest add [registry URL]
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

#### Sparkle Design CSS の生成

以下のコマンドで `sparkle.config.json` の設定に基づいて、デザインシステムに準拠した CSS を生成します。<br />
このコマンドは内部的に `sparkle-design-cli` を実行し、プライマリカラー、フォント設定、角丸設定などのデザイントークンから `src/app/sparkle-design.css` ファイルを生成します。

```bash
pnpm build:css
```

設定ファイル (`sparkle.config.json`) の内容：

- `primary`: プライマリカラー（blue, red, orange など）
- `font-pro`: プロポーショナルフォント（Google Fonts の名前）
- `font-mono`: モノスペースフォント（Google Fonts の名前）
- `radius`: 角丸設定（sm, md, lg など）

設定ファイルは [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364/sparkle-design-theme-settings) から書き出すことができます。

また、`sparkle-design-cli`を自分のプロジェクトで直接使用することも可能です。

```bash
npx sparkle-design-cli
```

または、グローバルにインストールして使用することもできます。

```bash
npm install -g sparkle-design-cli
sparkle-design-cli
```

詳しい使い方は `sparkle-design-cli --help` で確認してください。

## 開発ガイド

### 開発環境

- Node.js 22.14.0 以上
- pnpm 10.12.4 以上

### ディレクトリ構成

```
├─ src/
│  ├─ app/            # Sparkle Designのページとスタイルファイル
│  ├─ components/     # React コンポーネント
│  └─ lib/            # 共有ユーティリティ
├─ scripts/           # 各種スクリプト
├─ public/r/          # 公開用レジストリ JSON
└─ .github/           # GitHub関連の設定ファイル
   └─ instructions/   # 開発・テスト・AI向けガイドライン
```

### Package のビルド

```bash
pnpm build:package
```

### Storybook の起動

```bash
pnpm storybook
```

### テストの実行

```bash
pnpm test
```

テストガイドラインについては `.github/instructions/testing.instructions.md` を参照してください。

### コードフォーマット

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

### Makefile について

Makefile では次のターゲットが定義されています。

- `registry` ... レジストリの生成と公開ファイルへのコピー
- `new-component` ... 対話形式で新規コンポーネントを作成

`make help` で詳細は確認してください。

### Sparkle Design バッジ

Sparkle Design のバッジは、コンポーネントが Sparkle Design を使用していることを示します。README に次のように追加してください。

```markdown
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
```

### その他

- コメントの書き方は `.github/instructions/comment-style.instructions.md` を参照してください。
- コミットメッセージの形式は `.github/copilot-commit-message-instructions.md` のルールに従います。
- 変更履歴は `CHANGELOG.md` を参照してください。
- その他開発・テスト・AI関連のガイドラインは `.github/instructions/` ディレクトリを参照してください。

## コンポーネント対応状況

現在のコンポーネントの実装状況は以下の表を参照してください。

| コンポーネント      | 実装  | Storybook | レジストリ   | Figma Code Connect | A11y チェック |
| ----------------- | ---- | --------- | ---------- | ------------------ | ------------- |
| Avatar            | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Badge             | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Breadcrumb        | ✅   | ✅        | ✅         | ❌                 | ❌            |
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
| Select            | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Side Navigation   | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Skeleton          | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Slider            | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Slot              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Spinner           | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Stack             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Stepper           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Switch            | ✅   | ✅        | ✅         | ✅                 | ❌            |
| Table             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Tabs              | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Tag               | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Textarea          | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Toast             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Tooltip           | ✅   | ✅        | ✅         | ❌                 | ❌            |
| Vertical Tabs     | ❌   | ❌        | ❌         | ❌                 | ❌            |
