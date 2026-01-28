# Badge a11yレビュー

## 対象

- Component: `Badge`
- 関連ファイル
  - `src/components/ui/badge/index.tsx`
  - `src/components/ui/badge/index.test.tsx`
  - `src/components/ui/badge/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1 / 1.4.3 / 1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等に代替テキストがある | Fail | `index.tsx:134-143` — Badge は `<div>` でレンダリング。`xs`/`sm` サイズおよび `isNumberVisible=false` の場合、視覚的テキストが非表示になるが、`aria-label` や `sr-only` テキストがデフォルトで付与されない。利用者が `aria-label` を手動で渡すことは可能（`...props` スプレッド）だが、コンポーネント側で案内・強制がない | `xs`/`sm`/`isNumberVisible=false` 時に `aria-label` の指定を促す dev warn の追加、またはドキュメントでの明示を推奨。数字が非表示のバッジはドットインジケータとなり、支援技術に意味が伝わらない |
| 1.3.4 | 表示の向き | AA | 縦横の向き制限がない | Pass | CSS に向き制限なし。`inline-flex` + `rounded-full` でどちらの向きでも正常に表示される | --- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切 | N/A | Badge は入力フォーム要素ではない | --- |
| 1.4.1 | 色の使用 | A | 色だけで情報を伝えない | Needs review | `index.tsx:16-17` — `normal` は `bg-info-500`、`emphasis` は `bg-negative-500` で色のみによるバリアント区別。テキスト内容（数字）自体は色に依存しないが、`variant` の意味（通常/強調）は色のみで伝達されている。Design-system guaranteed (Figma)。ただし Badge が xs/sm で数字非表示の場合、色のみが情報を伝える手段となる | Figma 側で保証される前提。利用コンテキストによっては色以外の識別手段（アイコン、テキスト等）の併用を推奨 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラスト基準 | Pass (Figma) | Design-system guaranteed (Figma). `text-white` + `bg-info-500` / `bg-negative-500` はデザイントークンに基づく。No code-level action required unless token deviation exists. | --- |
| 1.4.4 | テキストのサイズ変更 | AA | 200%拡大で問題ない | Pass | `min-w-*` 指定により最小幅を確保しつつ、コンテンツに応じて拡張可能。`character-*-bold-mono` トークンで相対的フォントサイズを使用 | --- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等のコントラスト | Pass (Figma) | `index.tsx:12` — `focus:ring-2 focus:ring-[var(--color-ring-normal)] focus:ring-offset-2`。Design-system guaranteed (Figma). No code-level action required unless token deviation exists. | --- |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールなし | Pass | `inline-flex` レイアウトでリフロー対応。固定幅指定は `xs`(`w-2`) と `sm`(`w-4`) のみで、これらは極小のドットインジケータのため問題なし | --- |
| 1.4.13 | ホバー/フォーカスで表示されるコンテンツ | AA | ツールチップ等の要件 | N/A | Badge はホバー/フォーカスで追加コンテンツを表示しない | --- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | N/A | Badge は情報表示コンポーネントであり、インタラクティブな操作を主目的としない。`<div>` でレンダリングされデフォルトでフォーカス不可。`tabIndex={0}` を渡せばフォーカス可能になる（テスト `index.test.tsx:322` で確認済み） | Badge を操作可能にする場合は利用者が `tabIndex` と `onKeyDown` を明示的に渡す必要がある |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | Badge は単一の `<div>` 要素。内部にフォーカストラップを生成する構造はない | --- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットの無効化/変更 | N/A | Badge はキーボードショートカットを実装していない | --- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | N/A | Badge はデフォルトでフォーカス不可（`<div>` 要素）。フォーカス順序はページ側の責任 | --- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `index.tsx:12` — `focus:outline-hidden focus:ring-2 focus:ring-[var(--color-ring-normal)] focus:ring-offset-2`。`tabIndex` が付与された場合にフォーカスリングが表示される。テスト `index.test.tsx:383-397` で確認済み | --- |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | N/A | Badge はデフォルトでフォーカス不可。`overflow` による隠蔽リスクなし | --- |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータの太さ・コントラスト | Pass | `focus:ring-2`（2pxの太さ）+ `focus:ring-offset-2`（2pxのオフセット）で十分な視認性を確保。色は `--color-ring-normal` トークンで管理 | --- |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | N/A | Badge は複雑なジェスチャ操作を要求しない | --- |
| 2.5.2 | ポインタ取消 | A | DownでアクションをConfirmしない | Pass | `index.tsx` — `onMouseDown`/`onPointerDown` のハンドラをデフォルトで実装していない。`...props` スプレッドにより利用者が渡すことは可能だが、コンポーネント自体は `onClick`（release確定）ベース。テスト `index.test.tsx:291-315` で `onClick` での動作確認済み | プロジェクトポリシーに従い、Down系ハンドラの `@deprecated` 化は Badge では不要（情報表示コンポーネントのため） |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Needs review | `index.tsx:134-143` — Badge のアクセシブルネームは `children`（数字テキスト）に依存。`md`/`lg` で数字が可視の場合は可視テキストがそのままアクセシブルネームとなる。ただし `role` や `aria-label` がデフォルトで設定されないため、支援技術は `<div>` の中身をプレーンテキストとして読み上げる | 利用コンテキストに応じて `role="status"` と `aria-label` の明示を推奨（テスト `index.test.tsx:361-369` で `role="status"` の動作確認済み） |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | Badge はデバイスモーション操作を使用しない | --- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | Badge はドラッグ操作を実装していない | --- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | N/A | Badge は原則として情報表示コンポーネント。インタラクティブ要素ではないためターゲットサイズ基準の対象外。ただし `onClick` を渡して操作可能にする場合、`xs`（8x8px = `w-2 h-2`）や `sm`（16x16px = `w-4 h-4`）は 24x24px を下回る | Badge を操作対象とする場合は `md`（24px）以上を使用するか、親要素でタップ領域を拡張することを推奨 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | Badge はフォーカス時に自動的なコンテキスト変更を行わない | --- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | N/A | Badge は入力を受け付けないコンポーネント | --- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | CVA による一貫したスタイル生成。同じ `variant`/`size` の組み合わせは常に同じクラスが適用される。テスト `index.test.tsx:504-532` で複数の組み合わせの一貫性を確認済み | --- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | Badge は入力フォーム要素ではない | --- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | N/A | Badge は入力フォーム要素ではない | --- |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | Badge は入力フォーム要素ではない | --- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | Badge は認証機能を持たない | --- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がname/role/状態を持つ | Fail | `index.tsx:134-143` — Badge は `<div>` でレンダリングされるが、デフォルトで `role` 属性が設定されていない。通知バッジとしての意味を支援技術に伝えるには `role="status"` が適切。利用者が `role` を渡すことは可能（テスト `index.test.tsx:361-369` で確認）だが、コンポーネント側でデフォルトを提供していない | `role="status"` をデフォルトで付与することを推奨。数値が動的に変化する場合は `aria-live="polite"` も検討 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Fail | `index.tsx:134-143` — Badge の数値が動的に変化した場合（例: 通知カウントの増減）、支援技術にその変化が通知されない。`aria-live` や `role="status"` がデフォルトで設定されていないため、スクリーンリーダーは変更を検知できない。テスト `index.test.tsx:373-381` で `aria-live="polite"` の手動付与は確認済み | 動的な値変更を想定する場合、`role="status"` + `aria-live="polite"` をデフォルトで付与することを推奨 |

---

## 対応内容（修正が必要な場合）

本レビューはレポート作成のみであり、コード修正は実施していません。以下は推奨される修正事項です。

### Fail 項目

#### 1) 1.1.1 非テキストコンテンツ — `xs`/`sm` サイズの代替テキスト欠如

- **問題**: `xs`/`sm` サイズおよび `isNumberVisible=false` の場合、視覚的テキストが非表示になるが、支援技術に対する代替テキストが提供されない
- **推奨修正**:
  - `isNumberVisible=false` 時に `aria-label` が未指定の場合、dev warn を出力する
  - ドキュメント/Storybookで `aria-label` の併用を推奨する記載を追加

#### 2) 4.1.2 名前・役割・値 — デフォルト role の欠如

- **問題**: Badge は通知カウントを表示するコンポーネントだが、`role` がデフォルトで設定されていない
- **推奨修正**:
  - `role="status"` をデフォルトで付与（利用者がオーバーライド可能）
  - 例: `<div role="status" className={...} {...props}>`

#### 3) 4.1.3 状態メッセージ — 動的変更の通知欠如

- **問題**: Badge の数値が動的に変化しても、支援技術に通知されない
- **推奨修正**:
  - `aria-live="polite"` をデフォルトで付与（`role="status"` と合わせて）
  - `role="status"` は暗黙的に `aria-live="polite"` を持つため、`role="status"` のみの付与でも可

### Needs review 項目

#### 4) 1.4.1 色の使用 — variant の色のみ区別

- **状況**: `normal`/`emphasis` の区別が色のみで行われている
- **判断**: Figma/デザインシステム側で保証される前提。利用コンテキストに依存するため、利用者側で適切な補足情報を付与する責任がある

#### 5) 2.5.3 ラベルを含む名前

- **状況**: アクセシブルネームは `children` に依存し、`role` や `aria-label` がデフォルトで未設定
- **判断**: 4.1.2 の修正（`role="status"` 付与）と合わせて解消される見込み

---

## テスト / 検証

- 既存テスト: `src/components/ui/badge/index.test.tsx`
  - アクセシビリティ関連テストあり（`describe("Accessibility")` ブロック、4テスト）
    - `aria-label` の手動付与: 確認済み (`index.test.tsx:349-359`)
    - `role="status"` の手動付与: 確認済み (`index.test.tsx:361-369`)
    - `aria-live="polite"` の手動付与: 確認済み (`index.test.tsx:373-381`)
    - フォーカススタイルの存在: 確認済み (`index.test.tsx:383-397`)
  - ただし、これらはすべて「利用者が手動で属性を渡した場合」のテストであり、コンポーネントのデフォルト挙動としてのアクセシビリティは保証されていない
- 修正実施後に追加すべきテスト:
  - デフォルトで `role="status"` が付与されること
  - `xs`/`sm` サイズで `aria-label` 未指定時に dev warn が出ること（warn 方式を採用した場合）

---

## 補足

### 修正の優先度

1. **高**: `4.1.2` — `role="status"` のデフォルト付与（Badge の存在意義に直結）
2. **高**: `4.1.3` — `role="status"` 付与により暗黙的に解消
3. **中**: `1.1.1` — `xs`/`sm` サイズの代替テキスト案内（ドットインジケータの意味が支援技術に伝わらない）
4. **低**: `2.5.3` / `1.4.1` — 利用コンテキスト依存のため、ドキュメント整備で対応可能

### フォローアップ候補

- Storybook の a11y addon（`@storybook/addon-a11y`）による自動検査の導入
- `xs`/`sm` サイズ使用時の `aria-label` 必須化（TypeScript の型レベルでの制約も検討可能）
- Badge の利用ガイドライン整備（通知コンテキストでの推奨パターン：`role="status"` + `aria-label="通知 N 件"` 等）
