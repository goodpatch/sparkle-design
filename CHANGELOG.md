# 変更履歴

本プロジェクトの主な変更点を記録します。
このファイルは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に基づいて作成されています。

## [Unreleased]

## [0.0.5] - 2026-03-12

### 追加

- README のサムネイル画像を絶対 URL に変更し、npm package 上でも参照切れしないよう調整

### 変更

- `sparkle-design-cli@1.3.6` を使うよう `build:css` / registry ビルドを更新

### 修正

- `sparkle-design-cli@1.3.6` で CSS を再生成し、Material Symbols import に `display=block` を反映
- npm パッケージが CSS 同梱を前提としないよう、package metadata を CLI 利用前提の形へ整理

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
