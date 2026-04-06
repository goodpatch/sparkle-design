# Link (asChild 追加) a11y レビュー

## 対象

- Component: `Link`
- 関連ファイル
  - `src/components/ui/link/index.tsx`
  - `src/components/ui/link/index.test.tsx`
  - `src/components/ui/link/index.stories.tsx`

## チェック結果

| ID | 項目 | Level | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | Pass | `isOpenInNew` の `open_in_new` アイコンはテキストと併用。asChild 時も自動付与 | --- |
| 1.4.1 | 色の使用 | A | Pass (Figma) | `text-info-500` + `underline` で色以外の手がかりあり | --- |
| 1.4.3 | コントラスト | AA | Pass (Figma) | デザインシステム保証 | --- |
| 2.1.1 | キーボード | A | Pass | `<a>` はネイティブでキーボード操作可能。asChild で next/link も `<a>` を出力 | --- |
| 2.1.2 | キーボードトラップなし | A | Pass | 単一リンク要素 | --- |
| 2.4.7 | フォーカスの可視化 | AA | Needs review | フォーカスリングはブラウザデフォルトに依存。実機確認が必要 | --- |
| 2.5.2 | ポインタ取消 | A | Pass | `<a>` の click イベント | --- |
| 2.5.3 | ラベルを含む名前 | A | Pass | 可視テキスト（children）がアクセシブルネーム | --- |
| 4.1.2 | 名前・役割・値 | A | Pass (修正済み) | asChild に非リンク要素を渡した場合の dev 警告を追加。JSDoc にも注意書きを追記 | --- |

## 対応内容

### 4.1.2 — asChild に非リンク要素を渡した場合のガード

- JSDoc に「`<a>` または next/link 等を渡すこと」の注意書きを追加
- 開発環境で `<span>` / `<div>` を渡した場合に `console.warn` を出力
