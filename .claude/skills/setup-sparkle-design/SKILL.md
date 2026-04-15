---
name: setup-sparkle-design
description: >
  sparkle-design（React コンポーネントライブラリ）の導入・セットアップ・
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

プロジェクトに `sparkle-design` を npm パッケージとして導入し、コンポーネントを利用できる状態にするためのスキル。

> **社内版との違い**: 社内版 `@goodpatch/sparkle-design-internal` を導入する場合は `install-sparkle-design` スキルを使ってください。こちらは公開版 `sparkle-design` 用です。

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

## Quick Start（1 コマンド）

```bash
npx --yes sparkle-design-cli setup --assistant claude
```

このコマンド 1 つで以下が全て実行される:

1. **パッケージマネージャー検出** -- pnpm / yarn / bun / npm を lockfile から自動判定
2. **パッケージインストール** -- `sparkle-design` を dependencies、`tailwindcss` + `@tailwindcss/postcss` を devDependencies に追加（既に入っていればスキップ）
3. **初期ファイル生成** -- `sparkle.config.json` / `postcss.config.mjs` / `globals.css` が無ければ作成（既存ファイルは保持）
4. **AI ガード設定** -- `CLAUDE.md` に Sparkle Design Guard ブロックと `lint:sparkle` スクリプトを追加
5. **`generate` 実行** -- `sparkle-design.css` と `SparkleHead.tsx` を生成

`--assistant` は `claude` / `cursor` / `codex` / `generic` から選択可能。部分的に実行したい場合は `--skip-install` / `--skip-scaffold` / `--skip-generate` を使う。

### 生成されるファイル

- `sparkle.config.json` -- デザインテーマ設定（初期値: blue / Inter / JetBrains Mono / md）
- `postcss.config.mjs` -- PostCSS 設定（`@tailwindcss/postcss` プラグインを有効化）
- `src/app/globals.css` or `src/globals.css` -- Tailwind エントリポイント CSS（`@source` 含む）
- `src/app/sparkle-design.css` -- デザイントークン（プリミティブ `:root` + セマンティック `:root` + `@theme inline`）
- `src/app/SparkleHead.tsx` -- フォント読み込み用 React コンポーネント
- `CLAUDE.md` -- AI ガードブロック（`<!-- sparkle-design-cli:setup:start -->` で囲まれた部分）

### SparkleHead の配置

生成された `SparkleHead` をルートレイアウトの `<head>` 内に配置する:

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

> **TailwindCSS v4 との互換性**: CLI が Tailwind エントリポイント CSS に `@source` ディレクティブを自動挿入するため、TailwindCSS v4 でも `node_modules` 内のクラスが正しく検出されます。追加パッケージがある場合は `extend.source-packages` 配列に追加してください。

> Tailwind エントリポイント CSS がルートレイアウト（`src/app/layout.tsx` や `_app.tsx`）で import されていることを確認する。

### テーマをカスタマイズする

`sparkle.config.json` を編集した後、再生成する:

```bash
npx sparkle-design-cli generate
```

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
import { Button, Card, Input } from "sparkle-design";

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

## 部分的な setup 実行

フルセットアップではなく特定のステップだけ実行したい場合:

```bash
# 既存プロジェクトに AI ガードだけ追加する（パッケージ導入・ファイル生成・generate をスキップ）
npx --yes sparkle-design-cli setup --assistant claude --skip-install --skip-scaffold --skip-generate

# パッケージは別途インストール済みで、scaffold と generate だけやりたい
npx --yes sparkle-design-cli setup --assistant claude --skip-install

# Cursor の rules ファイルだけ追加
npx --yes sparkle-design-cli setup --assistant cursor --skip-install --skip-scaffold --skip-generate
```

`--dry-run` で変更内容のプレビュー、`--target <path>` で lint 対象ディレクトリの明示指定が可能。

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
