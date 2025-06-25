# 変更履歴

本プロジェクトの主な変更点を記録します。
このファイルは [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に基づいて作成されています。

## [Unreleased]

### 追加

#### UI コンポーネント

- Badge コンポーネントの実装
- Button コンポーネント（複数バリアント対応）
- Card コンポーネントの実装
- Checkbox コンポーネントの実装
- Dialog コンポーネントの実装
- Divider コンポーネントの実装
- Icon コンポーネントの実装
- Icon Button コンポーネントの実装
- Inline Message コンポーネントの実装
- Input コンポーネントの実装
- Input Password コンポーネントの実装
- Link コンポーネントの実装
- Modal コンポーネントの実装
- Radio コンポーネントの実装
- Select コンポーネントの実装
- Skeleton コンポーネントの実装
- Slider コンポーネントの実装
- Spinner コンポーネントの実装
- Switch コンポーネントの実装
- Tag コンポーネントの実装
- Textarea コンポーネントの実装
- Toast コンポーネントの実装

#### デザインシステム

- Style Dictionary による デザイントークン管理システムの構築
- CSS カスタムプロパティの自動生成機能
- Tailwind CSS との統合によるトークンベースのスタイリング

#### 開発ツール

- Storybook 8.6.14 によるコンポーネントカタログの構築 (`72bb0da`)
- アクセシビリティチェック機能の統合（@storybook/addon-a11y） (`a06e66e`)
- Storybook に URL コピー機能を追加 (`9e4c070`)
- Vitest による単体テスト環境の構築
- Playwright による E2E テスト環境の整備
- ESLint による コード品質管理

#### Figma 統合

- Figma Code Connect による デザイン・コード連携機能
- コンポーネントと Figma デザインファイルの自動同期

#### ビルド・配布

- shadcn/ui 互換のコンポーネントレジストリシステム
- NPM パッケージとしての配布機能
- 公開用レジストリ JSON の自動生成

#### ドキュメント

- 包括的な README.md の作成
- コントリビューションガイドライン（CONTRIBUTING.md）の整備
- MCP（Model Context Protocol）に関するドキュメント
- CHANGELOG の作成 (`7276c4d`)
