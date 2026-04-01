---
name: setup-sparkle-design
description: >
  @goodpatch/sparkle-design（React コンポーネントライブラリ）の導入・セットアップ・
  テーマカスタマイズ・コンポーネント選択を支援するスキル。
  npm インストール、sparkle-design-cli による CSS 生成、sparkle.config.json のテーマ設定、
  アンチパターンガードの導入までをカバーする。
  「Sparkle Design」「sparkle-design」「デザインシステム」「コンポーネントライブラリ」
  への言及、またはプライマリカラー・フォント・角丸などのテーマカスタマイズの相談、
  「どのコンポーネントを使えばいい」といったコンポーネント選択の質問で発動すること。
  sparkle.config.json への言及も発動トリガーとする。
  日本語: "Sparkle Designを導入", "sparkle-designをインストール",
  "sparkle-designをセットアップ", "コンポーネントライブラリを追加",
  "デザインシステムをセットアップ", "どのコンポーネントを使えばいい",
  "テーマをカスタマイズしたい", "プライマリカラーを変えたい"
  English: "install sparkle-design", "add sparkle design",
  "set up sparkle design", "which component should I use"
---

# Skill: setup-sparkle-design

プロジェクトに `@goodpatch/sparkle-design` を npm パッケージとして導入し、コンポーネントを利用できる状態にするためのスキル。

> **社内版との違い**: 社内版 `@goodpatch/sparkle-design-internal` を導入する場合は `install-sparkle-design` スキルを使ってください。こちらは公開版 `@goodpatch/sparkle-design` 用です。

---

<!-- ========== AI アシスタント向け指示（ユーザーにそのまま見せない） ========== -->

## AI アシスタントへの指示

### 実行方針

1. **プロジェクト状態を確認する**

   - パッケージマネージャを特定（`package.json` や lockfile から）
   - `sparkle.config.json` の有無を確認
   - `globals.css` の場所と内容を確認

2. **不足しているステップのみ案内する**

   - 既に完了しているステップは省略してよい
   - エラーが出たときはトラブルシューティングセクションを参照

### 参照ドキュメント

| ドキュメント | いつ参照するか |
|---|---|
| この SKILL.md | 導入・基本設定（常に利用可能） |
| `references/update-workflow.md` | アップデートが求められたとき |
| `references/component-catalog.md` | コンポーネント選択の相談時 |
| `references/component-selection.md` | コンポーネント置き換え・統一の依頼時 |
| `references/troubleshooting.md` | 導入エラー発生時 |

<!-- ========== ここからユーザーに案内するコンテンツ ========== -->

---

## Quick Start（3 ステップ）

### Step 1: パッケージをインストール

```bash
# npm
npm install @goodpatch/sparkle-design

# pnpm
pnpm add @goodpatch/sparkle-design

# yarn
yarn add @goodpatch/sparkle-design
```

> **認証不要**: `@goodpatch/sparkle-design` は npmjs.com で公開されているため、`.npmrc` の設定やトークンは不要です。

### Step 2: CSS セットアップ

CSS は npm パッケージの dist には含まれていない。`sparkle-design-cli` でプロジェクトに CSS を生成する（CLI にテンプレートが埋め込まれている）。

```bash
# sparkle.config.json を作成（未作成の場合）
# フォントウェイトやカスタム CSS が必要な場合は extend セクションを使う（sparkle-design-cli generate --help 参照）
cat > sparkle.config.json << 'EOF'
{
  "primary": "blue",
  "font-pro": "BIZ UDPGothic",
  "font-mono": "BIZ UDGothic",
  "radius": "md"
}
EOF

# CSS を生成
npx --yes sparkle-design-cli generate
```

生成されるファイル（配置先はプロジェクト構成による。例: Next.js App Router では `src/app/`）:

- `src/app/sparkle-design.css` -- デザイントークン（プリミティブ `:root` + セマンティック `:root` + `@theme inline`）
- `src/app/SparkleHead.tsx` -- フォント読み込み用 React コンポーネント（`<link>` タグで preconnect + Google Fonts を読み込む）
- `src/app/globals.css` -- `@source` ディレクティブ（`source-packages` 指定時）、`sparkle-design.css` の読み込みが追記される

`SparkleHead` はルートレイアウトの `<head>` 内に配置する:

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

> **TailwindCSS v4 との互換性**: CLI が `globals.css` に `@source` ディレクティブを自動挿入するため、TailwindCSS v4 でも `node_modules` 内のクラスが正しく検出されます。追加パッケージがある場合は `extend.source-packages` 配列に追加してください。

> `globals.css` がルートレイアウト（`src/app/layout.tsx` や `_app.tsx`）で import されていることを確認する。

#### 拡張設定（extend）

フォントのウェイト個別指定やカスタム CSS トークンの読み込みが可能。

```json
{
  "primary": "blue",
  "font-pro": "Montserrat",
  "font-mono": "Roboto Mono",
  "radius": "md",
  "extend": {
    "fonts": {
      "pro": [
        { "family": "Montserrat", "weights": [500, 600, 700] },
        { "family": "Noto Sans JP", "weights": [400, 500, 600, 700] }
      ],
      "mono": [
        { "family": "Roboto Mono", "weights": [400, 700] }
      ]
    },
    "source-packages": [],
    "custom-css": "./src/app/custom-tokens.css"
  }
}
```

| フィールド | 説明 |
|---|---|
| `extend.fonts.pro` / `extend.fonts.mono` | フォントファミリーごとにウェイトを指定。`font-pro` / `font-mono` より優先 |
| `extend.source-packages` | `@source` で追加スキャンする npm パッケージ名の配列 |
| `extend.custom-css` | プロジェクト固有のカスタムトークン CSS ファイルパス |

`extend` にはファイルパスも指定可能（例: `"extend": "./sparkle.extend.json"`）。

### Step 3: コンポーネントを使う

```tsx
import { Button, Card, Input } from "@goodpatch/sparkle-design";

export function MyPage() {
  return (
    <Card>
      <Input placeholder="名前を入力" />
      <Button>送信</Button>
    </Card>
  );
}
```

どのコンポーネントを使うか迷ったら `references/component-catalog.md` を参照。

---

## sparkle.config.json リファレンス

### 基本設定（Figma プラグインで出力可能）

| フィールド | 説明 | 選択肢 |
|---|---|---|
| `primary` | プライマリカラー | `blue`, `red`, `orange`, `green`, `purple`, `pink`, `yellow` |
| `font-pro` | プロポーショナルフォント | Google Fonts の名前 |
| `font-mono` | モノスペースフォント | Google Fonts の名前 |
| `radius` | 角丸設定 | `none`, `sm`, `md`, `lg`, `xl`, `full` |

設定ファイルは [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364) Figma プラグインからも書き出せる。

---

## AI ガード設定

初回セットアップ時に、AI アシスタント向けのアンチパターンガードを導入する:

```bash
# Claude Code 向け（CLAUDE.md にガードルールを追記）
npx --yes sparkle-design-cli setup --assistant claude

# Cursor 向け
npx --yes sparkle-design-cli setup --assistant cursor

# Codex 向け
npx --yes sparkle-design-cli setup --assistant codex

# 汎用（SPARKLE-DESIGN-AI.md を生成）
npx --yes sparkle-design-cli setup --assistant generic
```

`--dry-run` で変更内容のプレビュー、`--target <path>` で対象ディレクトリの明示指定が可能。

`setup` は `package.json` に `lint:sparkle` / `lint:sparkle:json` スクリプトも追加する。

### アンチパターン検査

```bash
# テキスト出力
npx --yes sparkle-design-cli check src

# 厳格モード（違反があれば exit 1、CI 向け）
npx --yes sparkle-design-cli check src --strict

# JSON 出力（AI 連携向け、manualReviewReminders も含む）
npx --yes sparkle-design-cli check src --format json
```

13 種類のアンチパターンを自動検出する。`lint:sparkle` があるプロジェクトでは、個別ルールを毎回列挙するより先にコマンドを回す。

---

## トラブルシューティング

| エラー | 原因 | 対処 |
|---|---|---|
| CSS が反映されない | `globals.css` が import されていない | ルートレイアウトで `import "./globals.css"` を確認 |
| CSS 再生成でデザインが崩れる | `sparkle-design.css` にカスタムトークンを直接追加していた | カスタムトークンは別ファイルに移動し、`sparkle.config.json` の `extend.custom-css` で指定する |
| フォントウェイトが足りない | デフォルトでは `[400, 700]` のみ | `sparkle.config.json` の `extend.fonts` でフォントごとにウェイトを指定する |
| `createContext is not a function` | barrel export で client boundary が崩れる | `"use client"` 付きの re-export file を作る（`references/troubleshooting.md` 参照） |

詳細は `references/troubleshooting.md` を参照。

<!-- ========== AI アシスタント向け補足（ユーザーにそのまま見せない） ========== -->

---

## AI アシスタント補足

### Anti-pattern ガードの浸透

初回セットアップ時に、利用プロジェクトの `CODING-RULES.md` や `CLAUDE.md` へ最低限以下を追記する:

```markdown
## Sparkle Design Guard

- Sparkle Design を触った PR では `lint:sparkle` を実行する
- `lint:sparkle` が未設定なら `npx --yes sparkle-design-cli check src --strict` を script 化する。AI が直接確認する場合は `npx --yes sparkle-design-cli check src --format json` を優先する
- 機械検出できない使い分けは Sparkle Design の docs / JSDoc を参照する
```

個別ルールの説明を毎回複製するより、まず `lint:sparkle` を回す。Badge/Tag の意味的な使い分けや CardDescription の typography など、機械検出できないものだけ docs で補う。

### Progressive Disclosure

Load references as needed:

- **Always available**: This SKILL.md (core workflow)
- **Load on error**: `references/troubleshooting.md`
- **Load for component selection**: `references/component-catalog.md`, `references/component-selection.md`
- **Load for update**: `references/update-workflow.md`

---

Last Updated: 2026-03-31
