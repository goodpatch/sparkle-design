# Breadcrumb a11y レビュー

## 対象
- Component: `Breadcrumb`
- 関連ファイル
  - `src/components/ui/breadcrumb/index.tsx`
  - `src/components/ui/breadcrumb/index.test.tsx`
  - `src/components/ui/breadcrumb/index.stories.tsx`

## 参照したチェックリスト / 方針
- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）
- **色/コントラスト（1.4.1 / 1.4.3 / 1.4.11）は原則 Figma 側で保証**

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキストがある | Pass | `BreadcrumbSeparator` は装飾目的で `aria-hidden="true"` が設定済み。`BreadcrumbLink` はテキストノードを children として受け取り、`<a>` 要素のアクセシブルネームとなる。`BreadcrumbPage` も同様にテキストを持つ。 | --- |
| 1.3.4 | 表示の向き | AA | コンテンツの表示を縦/横に限定していない | Pass | `flex flex-wrap` で横方向に配置されるが、画面回転の制限は一切なし。CSS に `orientation` や固定幅の制約なし。 | --- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されている | N/A | Breadcrumb はナビゲーションコンポーネントであり、入力フィールドを含まない。 | --- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass | Design-system guaranteed (Figma). 現在ページは `aria-current="page"` と `aria-disabled="true"` で状態をプログラム的に伝達。リンクにはアンダーライン (`underline`) が適用されており、色以外でも区別可能。 | --- |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass | Design-system guaranteed (Figma). リンクは `text-info-500` を使用し、デザインシステムのトークンで管理。 | --- |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが 200% まで拡大されても問題ない | Pass | `flex-wrap` と `break-words` により折り返しが可能。固定幅・固定高の指定なし。`rem`/`var()` ベースのフォントサイズ（`character-3-regular-pro` = `font-size: var(--font-size-16)`）を使用。 | --- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Needs review | Design-system guaranteed (Figma). ただし、`BreadcrumbLink` (`<a>` 要素) にカスタムの `focus-visible` スタイルが明示的に定義されていない。ブラウザデフォルトのフォーカスリングに依存しているため、コントラスト要件はブラウザ実装に委ねられている。 | ブラウザデフォルトのフォーカスリングが十分なコントラストを提供する場合は Pass だが、カスタムの `focus-visible` スタイルを明示的に定義することを推奨。 |
| 1.4.10 | リフロー | AA | 400% 拡大で横スクロールが発生しない | Pass | `w-full`、`flex-wrap`、`break-words` が設定されており、コンテンツは親コンテナ幅に応じて折り返される。固定幅の指定なし。 | --- |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | ホバーやフォーカスで追加コンテンツ（ツールチップ等）を表示する機能はない。ホバー時の色変更（`group-hover:text-info-600`）は既存テキストのスタイル変化のみ。 | --- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | `BreadcrumbLink` は標準的な `<a>` 要素を使用しており、ネイティブにキーボード操作（Tab / Enter）が可能。`BreadcrumbPage` は操作対象ではないため Tab 不要。 | --- |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | フォーカストラップを作成するコード（`onKeyDown` でのフォーカス制御、`tabIndex` の動的変更等）は存在しない。標準的な `<a>` 要素のフォーカス遷移に依存。 | --- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | キーボードショートカットは実装されていない。`onKeyDown` ハンドラなし。 | --- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM 順序が視覚的な順序と一致（左から右にリンクが並ぶ）。`tabIndex` のカスタム設定なし。`React.Fragment` で順序を維持。 | --- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Needs review | `BreadcrumbLink`（`<a>` 要素）にカスタムの `focus-visible` / `outline` スタイルが明示的に定義されていない。ブラウザデフォルトの `outline` に完全に依存している。ただし Tailwind CSS v4 の preflight はデフォルトで `outline` をリセットしない（`outline: revert` 等はない）ため、ブラウザデフォルトのフォーカスリングは残る想定。 | プロジェクト内で統一されたフォーカスリングスタイル（例: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-500`）を `BreadcrumbLink` または `Link` コンポーネントに明示定義することを推奨。 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` 等のスタイルなし。`flex-wrap` によりコンテンツが折り返されるため、フォーカス要素が隠れるリスクは低い。 | --- |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Needs review | ブラウザデフォルトのフォーカスリングに依存しているため、太さ・コントラストの保証がコンポーネント側でされていない。AAA 達成には明示的なフォーカスインジケータスタイルが必要。 | `focus-visible:outline-2 focus-visible:outline-offset-2` 等の明示的スタイルを推奨（AAA 目標の場合）。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | リンクのクリック（単一ポインタ操作）のみ。複雑なジェスチャは不要。 | --- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタ Down で確定させていない | Pass | `onMouseDown` / `onPointerDown` / `onTouchStart` は使用されていない。標準の `<a>` 要素のクリック（pointer up）動作に準拠。 | --- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Pass | `BreadcrumbLink` のアクセシブルネームは children テキストそのもの（`<a>` 要素のテキストコンテンツ）。`aria-label` による上書きなし。`Breadcrumb` の `nav` 要素は `aria-label="breadcrumb"` が設定されているが、これはランドマーク名であり可視ラベルの上書きには該当しない。 | --- |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーション機能は実装されていない。 | --- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない。 | --- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は 24x24px 以上 | Needs review | `BreadcrumbItem` に `p-0.5`（= 2px のパディング）が設定されている。`BreadcrumbLink` の `<a>` 要素自体は `inline` 要素で、テキストの行の高さ（`line-height: var(--line-height-24)` = 24px）はあるが、クリック領域の横幅はテキスト長に依存する。短いテキスト（例: 1文字）の場合、24x24px を下回る可能性がある。 | 短いテキストラベルの場合にターゲットサイズ不足となる可能性あり。`min-h-6 min-w-6`（24px）を `BreadcrumbLink` のスタイルに追加するか、`BreadcrumbItem` のパディングを増やすことを検討。 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `onFocus` ハンドラは設定されていない。フォーカス時のコンテキスト変更なし。 | --- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | N/A | 入力フィールドは含まれていない。 | --- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | 全ての `BreadcrumbLink` が同一のコンポーネント構造（`Link` コンポーネント経由の `<a>` 要素）で統一。`BreadcrumbPage` も `<span>` で統一。Storybook の例でも一貫した使用パターンが確認できる。 | --- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | Breadcrumb はナビゲーションコンポーネントであり、入力フィールドやフォームを含まない。 | --- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | N/A | 入力フィールドは含まれていない。`nav` 要素に `aria-label="breadcrumb"` があり、ナビゲーションランドマークとしての説明は適切。 | --- |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | 入力フィールドは含まれていない。 | --- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証機能は含まれていない。 | --- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Pass | `<nav aria-label="breadcrumb">` でナビゲーションランドマークの名前・役割が明示。`<ol>` でリスト構造を提供。`<a>` 要素はネイティブにリンクの role を持ち、テキストコンテンツがアクセシブルネーム。`BreadcrumbPage` は `aria-current="page"` で現在ページの状態を伝達し、`aria-disabled="true"` で無効状態を明示。 | --- |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | N/A | Breadcrumb は静的なナビゲーションコンポーネントであり、動的な状態メッセージ（ローディング、成功、エラー等）を表示する機能はない。ページ遷移はブラウザのネイティブナビゲーションに委ねられる。 | --- |

---

## サマリ

| Result | 件数 |
|---|---:|
| Pass | 21 |
| Fail | 0 |
| N/A | 8 |
| Needs review | 3 |
| **合計** | **32** |

---

## Needs review 項目の詳細

### 1. フォーカスの可視化 (2.4.7 / 2.4.13 / 1.4.11)

**現状:**
`BreadcrumbLink`（内部的には `Link` コンポーネント = `<a>` 要素）に、明示的なフォーカスインジケータスタイル（`focus-visible:outline-*` 等）が定義されていない。ブラウザデフォルトのフォーカスリングに完全に依存している。

**確認が必要な理由:**
- Tailwind CSS v4 の preflight はブラウザのデフォルト `outline` を除去しないため、デフォルトのフォーカスリングは表示される想定
- しかし、プロジェクト内の CSS にカスタムのフォーカスリセット（`outline: none` 等）が含まれていないことを実行時に確認する必要がある
- AAA（2.4.13）達成にはフォーカスインジケータの太さ・コントラストの保証が必要

**推奨対応:**
`Link` コンポーネント（`src/components/ui/link/index.tsx`）に以下のようなフォーカスインジケータスタイルを明示的に追加する:

```tsx
// Link コンポーネントの <a> 要素の className に追加
"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info-500"
```

この変更により `BreadcrumbLink` を含む全ての `Link` 使用箇所でフォーカスが視覚的に明確になる。

### 2. ターゲットサイズ (2.5.8)

**現状:**
`BreadcrumbItem` のパディングは `p-0.5`（= 2px）で、`BreadcrumbLink` の `<a>` 要素は `inline` 表示。テキストの行の高さは 24px（`line-height-24`）だが、短いテキストラベルの場合にクリッカブル領域が 24x24px を下回る可能性がある。

**確認が必要な理由:**
- 通常のパンくずテキスト（"Home"、"Components" 等）では横幅が十分あるため問題にならない
- しかし、1-2 文字の短いラベルやアイコンのみのリンクが使用された場合にはターゲットサイズ不足となる可能性がある

**推奨対応:**
`BreadcrumbLink` または `BreadcrumbItem` に最小サイズを設定する:

```tsx
// BreadcrumbItem に最小サイズを追加
className={cn("inline-flex items-center p-0.5 min-h-6 min-w-6", className)}
```

---

## HTML 構造に関する注記

### BreadcrumbSeparator の DOM 位置

`BreadcrumbSeparator` は `<span>` 要素であり、`<ol>` の直接の子要素として配置される使用パターンが Storybook やテストで確認される。HTML 仕様上、`<ol>` の直接の子要素は `<li>` であるべきだが、`aria-hidden="true"` が設定されているため支援技術からは見えず、実質的なアクセシビリティ上の問題にはならない。ただし、HTML バリデーション上は `<li>` でラップするか、`BreadcrumbItem` 内部に配置することが厳密には正しい。

---

## テスト / 検証

### 既存テストのカバレッジ（index.test.tsx）

以下のアクセシビリティ関連テストが存在:

1. **`provides proper navigation labeling`** - `<nav>` に `aria-label` が存在することを確認 (Pass)
2. **`marks current page with aria-current`** - 現在ページに `aria-current="page"` と `aria-disabled="true"` が設定されていることを確認 (Pass)
3. **`provides semantic HTML structure`** - `<nav>` と `<ol>` が使用されていることを確認 (Pass)
4. **`hides separators from screen readers`** - 区切り文字に `aria-hidden="true"` が設定されていることを確認 (Pass)

### 追加推奨テスト

- フォーカスインジケータスタイルが適用されていることのテスト（`focus-visible` スタイルを追加した場合）
- `BreadcrumbLink` がキーボード Tab で到達可能であることのテスト（jsdom 制約によりブラウザテスト推奨）

---

## 補足

- Breadcrumb コンポーネントは全体的に良好なアクセシビリティ実装がされている
- `<nav aria-label="breadcrumb">` によるランドマーク識別、`<ol>` によるセマンティックなリスト構造、`aria-current="page"` による現在ページの明示、`aria-hidden="true"` による装飾要素の非表示化が適切に実装されている
- 主な改善余地はフォーカスインジケータの明示的な定義であり、これは `Link` コンポーネント側で一括対応することが効率的
- Fail 項目は 0 件であり、Needs review の 3 件もブラウザデフォルト動作で概ね対応されている可能性が高い
