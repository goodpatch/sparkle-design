<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="https://sparkle-design.vercel.app/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
[![ci](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml/badge.svg)](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


React.js + TypeScript を用いたコンポーネントライブラリです。<br />
shadcn/ui をベースに、[グッドパッチ](https://goodpatch.com/)のデザインシステム「Sparkle Design」を実装しています。

## 特徴

- 🔧 **柔軟性** ... shadcn/ui をベースに shadcn/ui registry に対応しているため、1コンポーネントから導入が可能です。npm パッケージとしても公開しているため、プロジェクトごとに適した方法で導入していただくことが出来ます。
- ♿️ **アクセシビリティ** ... Sparkle Design はアクセシビリティを重視して設計されています。
- 🎨 **カスタマイズ性** ... 専用CLIツールを利用し、Figmaファイルと同等のカスタマイズを適用することが出来ます。これによりSparkle Designをベースとしたデザインシステムのコードを素早く用意することが出来ます。
- 🤖 **AI フレンドリー** ... Claude Code / Cursor / Codex 向けのスキルとガード設定を同梱。AI コーディングでもデザインシステムの品質を維持できます。

## 使用方法

### パッケージのインストール

npm パッケージとして公開済みです。以下の手順でインストールできます。

```bash
npm install @goodpatch/sparkle-design
# または
pnpm add @goodpatch/sparkle-design
# または
yarn add @goodpatch/sparkle-design
```

> このパッケージには CSS は同梱されません。利用側で `sparkle-design-cli generate` を実行し、生成された `sparkle-design.css` / `globals.css` / `SparkleHead.tsx` を自分のアプリに配置して利用してください。

> **Server Component で使う場合**: `"use client"` を含むコンポーネントは個別 import を推奨します。各コンポーネントの [README](src/components/ui/) に Server Component / Client Component の情報が記載されています。
>
> ```tsx
> import { Button } from "@goodpatch/sparkle-design/button";
> ```

### 個別コンポーネントの導入

Sparkle Design は shadcn/ui registry に対応しています。レジストリの URL は Storybook からコピーすることができます。<br />
shadcn/ui registry の詳細な情報は [公式ドキュメント](https://ui.shadcn.com/docs/registry/getting-started) を参照してください。

```bash
pnpm dlx shadcn@latest add [registry URL]
```

また[Namespaces](https://ui.shadcn.com/docs/registry/namespace)を`components.json`に指定することで、コンポーネント名でのインストールも可能になります。

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.vercel.app/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @sparkle-design/button
```

### 基本的な使用例

```tsx
import React from "react";
import { Button, Badge, Card } from "@goodpatch/sparkle-design";

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

#### npm パッケージとして利用する場合

`@goodpatch/sparkle-design` を npm パッケージとしてインストールして利用する場合、TailwindCSS v4 がパッケージ内のユーティリティクラスを検出できるよう `@source` ディレクティブが必要です。

`sparkle-design-cli` で CSS を生成すると、`sparkle.config.json` の設定に基づいて `@source` ディレクティブが自動的に `globals.css` に挿入されます。

手動で設定する場合は、プロジェクトの `globals.css` に以下を追加してください:

```css
@import "tailwindcss";
/* @goodpatch/sparkle-design のクラスをスキャン対象にする */
/* パスは globals.css の配置に応じて調整（src/app/globals.css なら ../../node_modules/...） */
@source "../../node_modules/@goodpatch/sparkle-design/dist";
/* Sparkle Design のカスタム定義（Tailwindの後にインポート） */
@import "./sparkle-design.css";
```

> **注意**: `@source` の相対パスは `globals.css` の配置場所に依存します。上記は `src/app/globals.css` の場合の例です。

#### Sparkle Design CSS と SparkleHead の生成

`sparkle.config.json` の設定に基づいて、デザインシステムに準拠した CSS とフォント読み込み用コンポーネントを生成します。

```bash
npx sparkle-design-cli generate
```

このコマンドは以下のファイルを生成します:
- `sparkle-design.css` — デザイントークン CSS
- `SparkleHead.tsx` — フォント読み込み用 React コンポーネント

`SparkleHead` はルートレイアウトの `<head>` 内に配置してください:

```tsx
import { SparkleHead } from "./SparkleHead";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <SparkleHead />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> **Next.js App Router で `@next/next/no-head-element` が出る場合**: `next/core-web-vitals` を使用しているプロジェクトでは、`layout.tsx` に `<head>` を直接書くと lint エラーになることがあります。その場合は `eslint-disable` で該当行を除外するか、`next/font` による代替方法を検討してください。
```

> `SparkleHead` は `<link rel="preconnect">` と `<link rel="stylesheet">` でフォントを読み込みます。CSS の `@import` に比べてフォントの発見が早く、特にモバイル環境でのアイコン表示が改善されます。

設定ファイル (`sparkle.config.json`) の基本設定：

- `primary`: プライマリカラー（blue, red, orange, green, purple, pink, yellow）
- `font-pro`: プロポーショナルフォント（[Google Fonts](https://fonts.google.com/) の名前）
- `font-mono`: モノスペースフォント（[Google Fonts](https://fonts.google.com/) の名前）
- `radius`: 角丸設定（none, sm, md, lg, xl, full）

設定ファイルは [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364/sparkle-design-theme-settings) Figma プラグインから書き出すことができます。

フォントウェイトのカスタマイズ、フォールバックチェーン、カスタムトークン CSS などの拡張設定は `sparkle.config.json` の `extend` セクションで指定できます。詳細は `sparkle-design-cli generate --help` を参照してください。

```bash
# CSS を生成
npx sparkle-design-cli generate

# アンチパターンを検査
npx sparkle-design-cli check src --strict

# AI アシスタント向けの guard 設定を導入先プロジェクトに差し込む
npx sparkle-design-cli setup --assistant claude
```

`setup` は導入先の `package.json` に `lint:sparkle` スクリプトを追加し、AI アシスタント向けの指示ファイル（`CLAUDE.md` / `AGENTS.md` / `.cursor/rules/` 等）に Sparkle Design の品質チェックガイドを差し込みます。詳細は `sparkle-design-cli setup --help` を参照してください。

## 開発ガイド

### 開発環境

- Node.js 22.14.0 以上
- pnpm 10 以上

### ディレクトリ構成

```
├─ src/
│  ├─ app/            # Sparkle Designのページとスタイルファイル
│  ├─ components/     # React コンポーネント
│  └─ lib/            # 共有ユーティリティ
├─ scripts/           # 各種スクリプト
├─ docs/
│  └─ ai-instructions/ # 開発・テスト・AI向けガイドライン（ソース）
└─ .github/           # GitHub関連の設定ファイル
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

テストガイドラインについては `docs/ai-instructions/testing.md` を参照してください。

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

- コメントの書き方は `docs/ai-instructions/comment-style.md` を参照してください。
- コミットメッセージの形式は `.github/copilot-commit-message-instructions.md` のルールに従います。
- 変更履歴は `CHANGELOG.md` を参照してください。
- 公開用ドメインを切り替える場合は `pnpm update:public-domain -- --to https://new-domain.example.com --dry-run` で影響範囲を確認し、その後 `--dry-run` を外して一括更新できます。
- その他開発・テスト・AI関連のガイドラインは `docs/ai-instructions/` ディレクトリを参照してください。

## コンポーネント公開状況

現在公開されているコンポーネントの一覧です。
✅ 公開中
❌ 非公開・開発前

| コンポーネント      | 実装  | Storybook | レジストリ   | Figma Code Connect | A11y チェック |
| ----------------- | ---- | --------- | ---------- | ------------------ | ------------- |
| Avatar            | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Badge             | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Breadcrumb        | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Button            | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Calendar          | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Card              | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Checkbox          | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Dialog            | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Divider           | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Filter Chip       | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Form              | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Icon              | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Icon Button       | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Image             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Inline Message    | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Input             | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Input Chip        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Date        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input File        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Number      | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Password    | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Input Search      | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Input Time        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Link              | ✅   | ✅        | ✅         | ✅                 | ✅            |
| List              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Menu              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Modal             | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Overlay           | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Pagination        | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Popover           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Radio             | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Segmented Control | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Select            | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Side Navigation   | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Skeleton          | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Slider            | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Slot              | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Spinner           | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Stack             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Stepper           | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Switch            | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Table             | ❌   | ❌        | ❌         | ❌                 | ❌            |
| Tabs              | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Tag               | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Textarea          | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Toast             | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Tooltip           | ✅   | ✅        | ✅         | ✅                 | ✅            |
| Vertical Tabs     | ❌   | ❌        | ❌         | ❌                 | ❌            |

## ライセンス

[Apache License 2.0](LICENSE)

Copyright 2026 [Goodpatch Inc.](https://goodpatch.com/)
