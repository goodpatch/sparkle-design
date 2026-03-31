<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="https://sparkle-design.vercel.app/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
[![ci](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml/badge.svg)](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

React + TypeScript で構築されたコンポーネントライブラリです。
[Goodpatch](https://goodpatch.com/) のデザインシステム「**Sparkle Design**」を実装しており、shadcn/ui のエコシステムと互換性があります。

## 特徴

- **柔軟な導入** — shadcn/ui registry に対応しているため 1 コンポーネントから導入可能。npm パッケージとしてまとめてインストールすることもできます。
- **テーマカスタマイズ** — 専用 CLI でプライマリカラー・フォント・角丸を変更するだけで、デザインシステム全体に一貫したテーマを適用できます。[Figma プラグイン](https://www.figma.com/community/plugin/1443500367756891364)と連携し、デザインとコードのテーマを統一できます。
- **アクセシビリティ** — [Radix UI](https://www.radix-ui.com/) をベースに WCAG 準拠のアクセシビリティを実装しています。
- **AI フレンドリー** — Claude Code / Cursor / Codex 向けのスキルとガード設定を同梱。AI コーディングでもデザインシステムの品質を維持できます。

## クイックスタート

### 1. インストール

```bash
npm install @goodpatch/sparkle-design
```

### 2. テーマ CSS を生成

```bash
# 設定ファイルを作成
cat > sparkle.config.json << 'EOF'
{
  "primary": "blue",
  "font-pro": "BIZ UDPGothic",
  "font-mono": "BIZ UDGothic",
  "radius": "md"
}
EOF

# CSS を生成
npx sparkle-design-cli generate
```

`globals.css` をルートレイアウトで import してください。

### 3. コンポーネントを使う

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@goodpatch/sparkle-design";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>はじめよう</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="solid" theme="primary" prefixIcon="rocket_launch">
          スタート
        </Button>
      </CardContent>
    </Card>
  );
}
```

> **Server Component で使う場合**: `"use client"` を含むコンポーネントは個別 import を推奨します。
> 各コンポーネントの README に Server Component / Client Component の情報が記載されています。
>
> ```tsx
> import { Button } from "@goodpatch/sparkle-design/button";
> ```

## 導入方法

### npm パッケージ（推奨）

```bash
npm install @goodpatch/sparkle-design
# pnpm add @goodpatch/sparkle-design
# yarn add @goodpatch/sparkle-design
```

### shadcn/ui registry（個別コンポーネント）

```bash
npx shadcn@latest add https://sparkle-design.vercel.app/r/button.json
```

Namespace を設定すると、コンポーネント名でインストールできます。

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.vercel.app/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @sparkle-design/button
```

## テーマカスタマイズ

`sparkle.config.json` でテーマを設定し、`sparkle-design-cli` で CSS を生成します。

### 基本設定

| フィールド | 説明 | 選択肢 |
|---|---|---|
| `primary` | プライマリカラー | `blue`, `red`, `orange`, `green`, `purple`, `pink`, `yellow` |
| `font-pro` | プロポーショナルフォント | [Google Fonts](https://fonts.google.com/) の名前 |
| `font-mono` | モノスペースフォント | [Google Fonts](https://fonts.google.com/) の名前 |
| `radius` | 角丸 | `none`, `sm`, `md`, `lg`, `xl`, `full` |

設定ファイルは [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364) Figma プラグインから書き出すこともできます。

### 拡張設定

フォントウェイトの個別指定やカスタム CSS トークンの読み込みが可能です。

```json
{
  "primary": "blue",
  "font-pro": "Montserrat",
  "font-mono": "Roboto Mono",
  "radius": "md",
  "extend": {
    "fonts": {
      "pro": [
        { "family": "Montserrat", "weights": [400, 500, 600, 700] },
        { "family": "Noto Sans JP", "weights": [400, 500, 600, 700] }
      ]
    },
    "source-packages": [],
    "custom-css": "./src/app/custom-tokens.css"
  }
}
```

詳細は `npx sparkle-design-cli generate --help` を参照してください。

## CLI ツール

[sparkle-design-cli](https://www.npmjs.com/package/sparkle-design-cli) は 3 つのサブコマンドを提供します。

```bash
# テーマ CSS を生成
npx sparkle-design-cli generate

# アンチパターンを検査（13 種類を自動検出）
npx sparkle-design-cli check src --strict

# AI アシスタント向けガード設定を導入
npx sparkle-design-cli setup --assistant claude
```

`setup` コマンドは Claude Code / Cursor / Codex / 汎用に対応しており、`package.json` に `lint:sparkle` スクリプトも追加します。

## コンポーネント一覧

| コンポーネント | 説明 |
|---|---|
| [Badge](src/components/ui/badge/) | 状態やカテゴリを示すラベル |
| [Breadcrumb](src/components/ui/breadcrumb/) | ページ階層のナビゲーション |
| [Button](src/components/ui/button/) | アクションのトリガー |
| [Card](src/components/ui/card/) | コンテンツのグループ化 |
| [Checkbox](src/components/ui/checkbox/) | 複数選択の入力 |
| [Dialog](src/components/ui/dialog/) | アクション確認のモーダル |
| [Divider](src/components/ui/divider/) | コンテンツの区切り線 |
| [Form](src/components/ui/form/) | フォーム要素のラッパー |
| [Icon](src/components/ui/icon/) | Material Symbols アイコン |
| [IconButton](src/components/ui/icon-button/) | アイコンのみのボタン |
| [InlineMessage](src/components/ui/inline-message/) | ページ内通知メッセージ |
| [Input](src/components/ui/input/) | テキスト入力フィールド |
| [InputPassword](src/components/ui/input-password/) | パスワード入力 |
| [Link](src/components/ui/link/) | ナビゲーションリンク |
| [Modal](src/components/ui/modal/) | 大型モーダル |
| [Overlay](src/components/ui/overlay/) | 操作ブロック用オーバーレイ |
| [Radio](src/components/ui/radio/) | 単一選択の入力 |
| [Select](src/components/ui/select/) | ドロップダウン選択 |
| [Skeleton](src/components/ui/skeleton/) | 読み込みプレースホルダ |
| [Slider](src/components/ui/slider/) | 範囲選択のスライダー |
| [Spinner](src/components/ui/spinner/) | 処理中インジケータ |
| [Switch](src/components/ui/switch/) | オン/オフトグル |
| [Tabs](src/components/ui/tabs/) | タブ切り替え |
| [Tag](src/components/ui/tag/) | カテゴリ・ステータスのラベル |
| [Textarea](src/components/ui/textarea/) | 複数行テキスト入力 |
| [Toast](src/components/ui/toast/) | 一時的なフィードバック |
| [Tooltip](src/components/ui/tooltip/) | ホバー時の補足情報 |

各コンポーネントフォルダの README に使い方、Client/Server Component 情報、注意事項が記載されています。

## 開発

### 環境

- Node.js 22.14.0 以上（`.node-version` 参照）
- pnpm 10 以上

### コマンド

```bash
pnpm install          # 依存関係のインストール
pnpm dev              # 開発サーバー
pnpm storybook        # Storybook
pnpm test             # テスト
pnpm build:package    # パッケージビルド
pnpm build:css        # テーマ CSS 生成
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm type-check       # TypeScript 型チェック
```

### 新規コンポーネントの作成

```bash
./scripts/setup.sh <component-name>
```

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) と `docs/ai-instructions/` を参照してください。

## Sparkle Design バッジ

Sparkle Design を使用していることを示すバッジを README に追加できます。

```markdown
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
```

## ライセンス

[Apache License 2.0](LICENSE)

Copyright 2026 [Goodpatch Inc.](https://goodpatch.com/)
