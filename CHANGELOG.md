# 変更履歴

本プロジェクトの主な変更点を記録します。
このファイルは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に基づいて作成されています。

## [Unreleased]

### Changed

- `Publish to npm` workflow に npm publish 後の git tag 付け・GitHub Release 自動作成ステップを追加（v1.0.6 で GitHub Release 作成が漏れていたため。`sparkle-design-cli` / `sparkle-design-internal` の publish.yml と同じ方式）

## [1.0.6] - 2026-07-14

### Fixed

- `build-sparkle-design-theme.mjs` が `@theme inline` の自己参照で壊れる問題を修正（`sparkle-design-cli` 2.4.1+ の生成物形式変更に追従）(#290)

### Changed

- `sparkle-design-cli` 2.4.2 で `sparkle-design.css` を再生成 (#289)
- `change-sparkle-config` / `setup-sparkle-design` スキルに複数テーマ運用とカスタムブランドカラーの案内を追加 (#287)
- `change-sparkle-config` スキルに `generate --scope` による単一バンドルランタイム切替の案内を追加 (#288)

## [1.0.5] - 2026-06-05

### Fixed

- **Icon: font-weight を 500 に固定し親要素からの継承を防止** (#281, closes goodpatch/sparkle-design-internal#198)
  - Button の bold ラベル等から `font-weight: 700` が継承され、アイコンが疑似ボールド（faux bold）で太く描画される問題を修正
  - `Icon` の span に `font-medium` を明示付与（`className` からの上書きは引き続き可能）

### Changed

- release skill とリリース記録のレビュー指摘を反映 (#277)

### Dependencies

- `vitest` 3.2.3 → 4.1.0 (#279)
  - Vitest 4 の browser provider API へ移行（`@vitest/browser` → `@vitest/browser-playwright`、`browser.name` → `browser.instances`）
  - `@vitest/coverage-v8` を ^4.1.0 に更新

## [1.0.4] - 2026-05-19

### Added

- **Button: `React.forwardRef` 対応** (#275, closes #270)
  - Radix `Trigger asChild`（Popover 等）から Button に直接 `ref` を渡せるように
  - `asChild` で `<a>` 等の非 button 要素を slot するケースに対応するため、ref 型は `HTMLElement` で広く受ける
  - ref forwarding テスト（通常 button / asChild + a）を新規追加

### Changed

- 共有スキルの frontmatter に `user-invocable: true` を追加 (#271)
- Input フォロー修正: `useMergeRefs` の型整理と a11y lint エラー解消 (#272)

### Dependencies

- `next` 15.5.15 → 15.5.18 (#267)
- `brace-expansion` 5.0.5 → 5.0.6 (#269)
- `postcss` 8.4.31 → 8.5.14 (#273)

## [1.0.3] - 2026-05-19

### Added

- **Input まわりの再利用フックを named export** (#272, closes #263)
  - `useInputContainerFocus` / `useMergeRefs` を public API として公開
- **`Input.triggerProps` による ARIA / HTML 属性フォワード** (#272, closes #268)
  - 内部のトリガーボタンに ARIA / HTML 属性を渡せるように

### Notes

- 後方互換は維持

## [1.0.2] - 2026-04-17

### Changed

- README から `@goodpatch/sparkle-design-internal` の言及を削除 (#252)
- v1.0.1 直後のドキュメント修正を npm に反映するためのパッチリリース

## [1.0.1] - 2026-04-16

### Security

- `pnpm.overrides` に追加: `hono ^4.12.14` / `yaml ^2.8.3` / `@eslint/plugin-kit ^0.3.4` / `brace-expansion ^1.1.13`（`<1.1.13` の range）
- `pnpm audit` 残件クリア（prod / dev とも 0）

### Changed

- `@figma/code-connect` を `dependencies` → `devDependencies` に移動
  - consumer の `node_modules` から `lodash` を含む Figma Code Connect のツリーが消える
- `dist` から `*.figma.{js,d.ts}` を除外しパッケージサイズを縮小
- TailwindCSS v4 + npm package 利用時の `@source` 自動検知に関する README 注記を CLI v2.0.6 ベースに更新
- `globals.css` 前提表記を「Tailwind エントリ CSS（`globals.css` / `index.css`）」に整理
- Material Symbols の woff2 を URL 軸縮小で 60〜75% 削減（CLI v2.0.1 の変更を反映）

## [1.0.0] - 2026-04-13

### Changed

- **OSS 公開リリース** 🎉
- npm レジストリを GitHub Packages → npmjs.org に移行
- ドメインを `sparkle-design.goodpatch.com` に統一
- CODE_OF_CONDUCT / SECURITY.md を追加

## [0.0.10] - 2026-03-27

### Added

- **Link: `asChild` prop** — next/link や React Router の Link 等、任意のリンクコンポーネントをルート要素として使用可能に
  - Radix Slot Primitive を使用（Button と同じパターン）
  - `isOpenInNew` アイコンは asChild 使用時も自動付与
  - 非リンク要素（`<span>` / `<div>`）を渡した場合の開発警告を追加

## [0.0.9] - 2026-03-24

### Changed

- `react` / `react-dom` の依存バージョンを `^18 || ^19` に拡張
  - React 19 を使用するプロジェクトで vitest 実行時に発生する JSX ランタイム混在エラーを解消

### Docs

- README に `sparkle-design-cli setup` コマンドの案内を追加
- README の設定オプション一覧を簡潔化（詳細は `--help` に誘導）
- `build:css` のバージョンピン留めを削除（常に最新版を使用）

## [0.0.8] - 2026-03-23

### Changed

- package build の ESM 互換性を改善
  - `dist` を `.js` 出力 + 拡張子付き relative import へ変更し、Node.js ESM / Turbopack / Vitest で解決しやすい形に調整
  - component 単位の subpath exports を追加し、client component を barrel export を経由せず import できるように改善

## [0.0.7] - 2026-03-23

### Changed

- `sparkle-design-cli@1.3.11 generate` を使うよう `build:css` を更新
- shared skill / reference docs の Sparkle CLI コマンド例を最新化
- `CardControl` の docs 説明重複を整理

### Docs

- `setup` の実行例を `npx --yes` / `pnpm dlx` 併記へ更新
- `generate` サブコマンド付きの CLI 例に統一


## [0.0.6] - 2026-03-18

### Changed

- `sparkle-design-cli@1.3.9 generate` を使うよう `build:css` / registry ビルドを更新
- Button 形式に揃えた anti-pattern JSDoc へ更新
- anti-pattern reference を CLI の source-of-truth から同期する運用に変更

### Docs

- README の CLI 利用例を `generate` / `check` サブコマンド前提に更新

## [0.0.5] - 2026-03-12

### 追加

- README のサムネイル画像を絶対 URL に変更し、npm package 上でも参照切れしないよう調整

### 変更

- `sparkle-design-cli@1.3.8` を使うよう `build:css` / registry ビルドを更新
- Tabs の Storybook に `scrollable` オプションを追加
- Badge / Tag などの Docs コメントと skill に anti-pattern ガイドを追加

### 修正

- `sparkle-design-cli@1.3.8` で CSS を再生成し、Material Symbols import の string notation 化と `body` レベルの `font-family` ルールを反映
- npm パッケージが CSS 同梱を前提としないよう、package metadata を CLI 利用前提の形へ整理
- TabsList に `scrollable` を追加し、モバイルで横スクロール可能に改善
- SelectItem のカーソルを `pointer` に修正

## [0.0.2] - 2026-03-06

### 追加

- セマンティックトークンを `:root` に出力（CSS変数として `var()` で直接参照可能に）
- README に npm パッケージ利用時の `@source` ディレクティブ設定方法を追記
- `source-packages` オプションのドキュメントをスキルファイルに追加
- Icon/Spinner の `size` prop に `IconSize` 型（1-12 の union 型）を導入し、無効なピクセル値の指定を型レベルで防止

### 変更

- `sparkle-design-cli` v1.3.x で CSS を再生成（セマンティック `:root` ブロック追加、`subpixel-antialiased` 適用）
- Button / Icon Button コンポーネントに `"use client"` ディレクティブを追加（Turbopack 互換性向上）
- フォントレンダリングを `subpixel-antialiased` に変更（Tailwind v4 デフォルトの `antialiased` を上書き）

## [0.0.1] - 2025-12-12

### 追加

#### UI コンポーネント

- Badge コンポーネントの実装
- Breadcrumb コンポーネントの実装
- Button コンポーネント（複数バリアント対応）
- Card コンポーネントの実装
- Checkbox コンポーネントの実装
- Dialog コンポーネントの実装
- Divider コンポーネントの実装
- Form コンポーネントの実装
- Icon コンポーネントの実装
- Icon Button コンポーネントの実装
- Inline Message コンポーネントの実装
- Input コンポーネントの実装
- Input Password コンポーネントの実装
- Link コンポーネントの実装
- Modal コンポーネントの実装
- Overlay コンポーネントの実装
- Radio コンポーネントの実装
- Select コンポーネントの実装
- Skeleton コンポーネントの実装
- Slider コンポーネントの実装
- Spinner コンポーネントの実装
- Switch コンポーネントの実装
- Tabs コンポーネントの実装
- Tag コンポーネントの実装
- Textarea コンポーネントの実装
- Toast コンポーネントの実装
- Tooltip コンポーネントの実装

#### デザインシステム

- CSS カスタムプロパティの自動生成機能
- Tailwind CSS との統合によるトークンベースのスタイリング

#### 開発ツール

- Storybook 8.6.14 によるコンポーネントカタログの構築 (`72bb0da`)
- アクセシビリティチェック機能の統合（@storybook/addon-a11y） (`a06e66e`)
- Storybook に URL コピー機能を追加 (`9e4c070`)
- Vitest による単体テスト環境の構築
- ESLint による コード品質管理

#### Figma 統合

- Figma Code Connect による デザイン・コード連携機能

#### ビルド・配布

- shadcn/ui 互換のコンポーネントレジストリシステム
- NPM パッケージとしての配布機能
- 公開用レジストリ JSON の自動生成

#### ドキュメント

- 包括的な README.md の作成
- コントリビューションガイドライン（CONTRIBUTING.md）の整備
- MCP（Model Context Protocol）に関するドキュメント
- CHANGELOG の作成 (`7276c4d`)

### 修正

- `sparkle-design-theme.json` の依存関係を削除し、ユーザー定義のテーマを優先するように変更
- Tailwind CSS JIT ビルドエラーの修正（`@utility` から `@layer utilities` への変更）
- Form コンポーネントのレイアウト調整（Grid レイアウトの適用、高さの自動調整）
- Tag コンポーネントの高さが親要素に合わせて伸長しないように修正
- Storybook の型安全性向上とレイアウト改善
