<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="https://raw.githubusercontent.com/goodpatch/sparkle-design/main/public/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

**[English](./README.en.md)** | 日本語

[![npm version](https://img.shields.io/npm/v/sparkle-design)](https://www.npmjs.com/package/sparkle-design)
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

## クイックスタート

### 1. セットアップ

既存の Next.js / Vite プロジェクトで次の 1 コマンドを実行するだけで導入が完了します。

```bash
npx --yes sparkle-design-cli setup --assistant claude
```

これで以下が自動で行われます:

1. パッケージマネージャー（pnpm / npm / yarn / bun）を自動検出
2. `sparkle-design` を dependencies、`tailwindcss` + `@tailwindcss/postcss` を devDependencies に追加
3. `sparkle.config.json` / `postcss.config.mjs` / Tailwind エントリ CSS（Next.js: `globals.css`、Vite: `index.css`）を必要に応じて生成
4. `CLAUDE.md` に Sparkle Design ガードブロックと `lint:sparkle` スクリプトを追加
5. `sparkle-design.css` と `SparkleHead.tsx` を生成

`--assistant` は `claude` / `cursor` / `codex` / `generic` から選択できます。既存ファイルは上書きされません。

セットアップが完了したら、生成された `SparkleHead` をルートレイアウトの `<head>` に配置してください。

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

> **Next.js App Router で `@next/next/no-head-element` が出る場合**: `next/core-web-vitals` を使用しているプロジェクトでは、`layout.tsx` に `<head>` を直接書くと lint エラーになることがあります。該当行に `// eslint-disable-next-line @next/next/no-head-element` を追加するか、`next/font` による代替方法を検討してください。

`sparkle.config.json` でプライマリカラー・フォント・角丸などをカスタマイズできます。Figma 上で設定を調整したい場合は [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364/sparkle-design-theme-settings) プラグインを利用できます。詳細は `sparkle-design-cli generate --help` を参照してください。

> **⚠️ TailwindCSS v4 で npm package として使う場合の注意:** TailwindCSS v4 は `node_modules` 内のユーティリティクラスを自動スキャンしないため、`sparkle-design` を npm package として使うときはエントリ CSS に以下のような `@source` ディレクティブが必要です。
>
> ```css
> @import "tailwindcss";
> @source "../../node_modules/sparkle-design/dist";
> @import "./sparkle-design.css";
> ```
>
> `sparkle-design-cli` v2.0.6 以降は、`generate` / `setup` 実行時に **`package.json` の dependencies / devDependencies を自動スキャン** し、`sparkle-design` や `@goodpatch/sparkle-design-internal` が含まれていれば該当する `@source` を自動挿入します。`sparkle.config.json` 側で何も設定しなくても動きます。独自のデザインシステムパッケージを併用したい場合のみ `extend.source-packages` に追記すると、自動検出分と合算されます。

#### AI エージェントに Skill として導入する場合（任意）

Claude Code / Codex / Cursor などの AI エージェントを使っている場合は、[Vercel の skills CLI](https://github.com/vercel-labs/skills) 経由で Sparkle Design のスキルセットを導入しておくと、会話から誘導してもらうこともできます。

```bash
# setup-sparkle-design スキルだけを導入
npx skills add goodpatch/sparkle-design -s setup-sparkle-design

# 全スキル（setup / add-component / accessibility-checker）を導入
npx skills add goodpatch/sparkle-design --all
```

導入後に「Sparkle Design を導入して」と依頼すると `setup-sparkle-design` スキルが発動し、プロジェクト状態に合わせて不足ステップだけ案内してくれます。`-a claude-code` / `-a codex` などで対象エージェントを指定することもできます。

### 2. コンポーネントの使用

```tsx
import React from "react";
import { Button, Badge, Card } from "sparkle-design";

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

> **Server Component で使う場合**: `"use client"` を含むコンポーネントは個別 import を推奨します。各コンポーネントの [README](src/components/ui/) に Server Component / Client Component の情報が記載されています。
>
> ```tsx
> import { Button } from "sparkle-design/button";
> ```

### 3. 設定の更新とアンチパターンの検査

`sparkle.config.json` を編集した後は以下で CSS を再生成できます。

```bash
npx sparkle-design-cli generate
```

Sparkle Design に関するコード変更後は、アンチパターンを検出できます。

```bash
npx sparkle-design-cli check src
```

### 手動インストール（高度な利用）

CLI setup を使わずに段階的に導入したい場合は、[CLI ドキュメント](https://github.com/goodpatch/sparkle-design-cli#readme) を参照してください。

## 個別コンポーネントの導入

Sparkle Design は shadcn/ui registry に対応しています。レジストリの URL は Storybook からコピーすることができます。<br />
shadcn/ui registry の詳細な情報は [公式ドキュメント](https://ui.shadcn.com/docs/registry/getting-started) を参照してください。

```bash
pnpm dlx shadcn@latest add [registry URL]
```

また[Namespaces](https://ui.shadcn.com/docs/registry/namespace)を`components.json`に指定することで、コンポーネント名でのインストールも可能になります。

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.goodpatch.com/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @sparkle-design/button
```

## 開発ガイド

開発環境のセットアップ・コンポーネントの作成・テスト・コントリビューション方法は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。

### ディレクトリ構成

```text
├─ src/
│  ├─ app/            # Sparkle Designのページとスタイルファイル
│  ├─ components/     # React コンポーネント
│  └─ lib/            # 共有ユーティリティ
├─ scripts/           # 各種スクリプト
├─ docs/
│  └─ ai-instructions/ # 開発・テスト・AI向けガイドライン（ソース）
└─ .github/           # GitHub関連の設定ファイル
```

### Sparkle Design バッジ

Sparkle Design のバッジは、コンポーネントが Sparkle Design を使用していることを示します。README に次のように追加してください。

```markdown
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
```

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
