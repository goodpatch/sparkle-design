# Tooltip a11yレビュー

## 対象

- Component: `Tooltip`
- 関連ファイル
  - `src/components/ui/tooltip/index.tsx`
  - `src/components/ui/tooltip/index.test.tsx`
  - `src/components/ui/tooltip/index.stories.tsx`

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
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等に代替テキストがある | N/A | Tooltip はテキスト補足情報を表示するオーバーレイコンポーネントであり、それ自体が非テキストコンテンツではない。`TooltipContent` の `children` はテキストとして支援技術に伝わる。Radix UI が `role="tooltip"` を自動付与し、トリガー要素に `aria-describedby` を紐付ける | --- |
| 1.3.4 | 表示の向き | AA | 縦横の向き制限がない | Pass | `index.tsx:102-108` — CSS に向き制限なし。`w-fit` + `z-50` で Radix のポジショニング機構に従い、ビューポートの向きに関係なく表示される。`side` prop（top/right/bottom/left）はユーザー指定のプリファレンスであり、強制的な向き制限ではない | --- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切 | N/A | Tooltip は入力フォーム要素ではない | --- |
| 1.4.1 | 色の使用 | A | 色だけで情報を伝えない | Pass (Figma) | `index.tsx:103` — `bg-neutral-900` + `text-white` はデザイントークンに基づく。Tooltip は情報補足のためのテキスト表示であり、色のみで状態や情報を区別していない。Figma/デザインシステム側で保証 | --- |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラスト基準 | Pass (Figma) | `index.tsx:103,108` — `text-white` on `bg-neutral-900` はデザイントークンに基づく高コントラストの組み合わせ。Figma/デザインシステム側で保証。トークン逸脱なし | --- |
| 1.4.4 | テキストのサイズ変更 | AA | 200%拡大で問題ない | Pass | `index.tsx:107-108` — `w-fit` によりコンテンツに応じて幅が可変。固定幅指定なし。`character-2-regular-pro` トークンでフォントサイズ管理。テキスト拡大時にコンテンツが切れる固定サイズ制約はない | --- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等のコントラスト | Pass (Figma) | Tooltip 自体はフォーカスを受けないオーバーレイ要素。`TooltipTrigger` のフォーカススタイルは Radix のデフォルト挙動に依存。デザイントークン（`bg-neutral-900`）による背景色はFigma側で保証 | --- |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールなし | Pass | `index.tsx:107` — `w-fit` + Radix のポジショニングにより、ビューポートに収まるようコンテンツが配置される。固定幅指定なし。Radix Tooltip は `collisionPadding` 等でビューポート境界を考慮する | --- |
| 1.4.13 | ホバー/フォーカスで表示されるコンテンツ | AA | 1) ポインタ操作なしで解除可能 2) ポインターを当ててホバー可能 3) ユーザーが解除するまで非表示にならない | Needs review | `index.tsx:65-73,89-118` — Radix UI Tooltip は (1) Escape キーで解除可能、(2) `disableHoverableContent` がデフォルト `false` のためコンテンツにホバー可能、(3) フォーカスが外れるかEscapeが押されるまで表示を維持。ただし、**Radix Tooltip はポインターがコンテンツから離れると自動的に閉じる**仕様であり、WCAG 1.4.13 の「ユーザーが解除するまで非表示にならない」要件との適合性は利用文脈に依存する。また `delayDuration=0`（`index.tsx:36`）により即時表示されるが、閉じるまでの猶予が十分かは動作確認が必要 | Radix Tooltip の仕様上、ポインターがトリガーおよびコンテンツから離れると閉じる。これは WCAG 1.4.13 の「persistent」要件に対してグレーゾーンとなりうる。ブラウザでの実動作確認を推奨。長文ツールチップの場合は Popover コンポーネントへの切り替えも検討 |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Radix UI Tooltip はキーボードアクセシビリティを内蔵。`TooltipTrigger` はフォーカス可能な要素として `<button>` をデフォルトでレンダリングし、フォーカス時にTooltipが表示される。テスト `index.test.tsx:15-36` でホバーによる表示を確認済み。Radix はフォーカスによるトリガーもサポート | --- |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | Tooltip はフォーカストラップを生成しない。`TooltipContent` は `Portal` 経由でレンダリングされるが、フォーカスは `TooltipTrigger` に留まり、Tab キーで自然に次の要素へ移動できる。Radix Tooltip は意図的にフォーカスをコンテンツに移動させない設計 | --- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットの無効化/変更 | N/A | Tooltip は独自のキーボードショートカットを実装していない。Escape キーによる閉じ操作は修飾キー不要だが、これは WCAG 1.4.13 で推奨される解除手段であり、問題なし | --- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | `TooltipTrigger` は DOM 順序に従いフォーカスを受ける。`TooltipContent` は `Portal` でレンダリングされるがフォーカスを受けないため、フォーカス順序に影響しない。Radix の設計によりフォーカスは `TooltipTrigger` に留まる | --- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Needs review | `index.tsx:79-83` — `TooltipTrigger` は Radix の `Trigger` をそのままレンダリングし、カスタムのフォーカススタイルを付与していない。ブラウザデフォルトのフォーカスインジケータに依存する。`TooltipContent` のクラス（`index.tsx:102-108`）にも `focus-visible` や `outline` の指定はない | `TooltipTrigger` に `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)]` 等のフォーカススタイルの追加を検討。ただし `TooltipTrigger` は `asChild` パターンで子要素のフォーカススタイルを継承する使い方が一般的なため、利用文脈での確認が必要 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `TooltipTrigger` はインラインの `<button>` 要素としてレンダリングされ、`overflow: hidden` 等で隠蔽されるリスクは低い。`TooltipContent` はフォーカスを受けないため対象外 | --- |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータの太さ・コントラスト | Needs review | 2.4.7 と同様、`TooltipTrigger` にカスタムのフォーカススタイルが未設定。ブラウザデフォルトの `outline` に依存しており、AAA レベルの太さ・コントラスト要件（最小面積、3:1 コントラスト）を満たすかは環境依存 | 2.4.7 と合わせてフォーカススタイルの追加を検討 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | Tooltip はホバー（単一ポインタ操作）でのみ起動。複雑なジェスチャ（マルチタッチ、パス描画等）は不要 | --- |
| 2.5.2 | ポインタ取消 | A | DownでアクションをConfirmしない | Pass | `index.tsx` — `onMouseDown`/`onPointerDown`/`onTouchStart` のハンドラをコンポーネント側で実装していない。Tooltip はホバーおよびフォーカスで起動し、Down イベントでアクションを確定しない。プロジェクトポリシーに準拠 | --- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Pass | `index.tsx:79-83` — `TooltipTrigger` は子要素のテキストコンテンツをアクセシブルネームとして使用。Radix は `aria-describedby` で `TooltipContent` をトリガーに紐付けるため、ツールチップのテキストは「説明」として関連付けられる。ストーリー（`index.stories.tsx:38-44`）でも可視テキスト（"Tooltip Trigger"）がそのままアクセシブルネームとなる | --- |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | Tooltip はデバイスモーション操作を使用しない | --- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | Tooltip はドラッグ操作を実装していない | --- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Needs review | `index.tsx:79-83` — `TooltipTrigger` はデフォルトで `<button>` をレンダリングするが、サイズは `children` のテキスト内容に依存する。コンポーネント側で `min-width`/`min-height` を指定していない。ストーリー（`index.stories.tsx:39`）では "Tooltip Trigger" テキストが十分な大きさだが、短いテキストやアイコンのみの場合は 24x24px を下回る可能性がある | 利用者側で `TooltipTrigger` のターゲットサイズを確保する責任がある。アイコンのみのトリガーの場合は `min-w-6 min-h-6`（24px）以上を確保するか、`IconButton` との組み合わせを推奨 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `index.tsx:65-73` — Tooltip はフォーカス時にツールチップを表示するが、これは「追加情報の表示」であり、コンテキスト変更（ページ遷移、フォーム送信等）は発生しない。WCAG 3.2.1 の「コンテキストの変化」には該当しない | --- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | N/A | Tooltip は入力を受け付けないコンポーネント | --- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | `index.tsx:102-108` — `cn()` による一貫したクラス生成。同じ `side`/`sideOffset` の組み合わせは常に同じスタイルが適用される。ストーリー（`index.stories.tsx:47-69`）の `Positioning` ストーリーで 4 方向すべてが一貫した見た目で表示されることを確認可能 | --- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | Tooltip は入力フォーム要素ではない | --- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | N/A | Tooltip は入力フォーム要素ではない | --- |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | Tooltip は入力フォーム要素ではない | --- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | Tooltip は認証機能を持たない | --- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がname/role/状態を持つ | Pass | Radix UI Tooltip が自動的に `role="tooltip"` を `TooltipContent` に付与し、`TooltipTrigger` に `aria-describedby` を設定してコンテンツとトリガーを関連付ける。`data-state` 属性（`delayed-open`/`closed`）で開閉状態も管理される。テスト `index.test.tsx:32-35` で `data-state="delayed-open"` の確認済み | --- |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | Tooltip の表示/非表示は `aria-describedby` の動的な付与/除去によって支援技術に伝わる。Radix UI が内部的にこの紐付けを管理。Tooltip は `role="tooltip"` を持ち、トリガーにフォーカスした際にスクリーンリーダーが説明テキストとして読み上げる。非同期的な状態メッセージ（loading等）は Tooltip の責務外 | --- |

---

## 対応内容（修正が必要な場合）

本レビューはレポート作成のみであり、コード修正は実施していません。以下は推奨される対応事項です。

### Fail 項目

Fail 判定の項目はありません。

### Needs review 項目

#### 1) 1.4.13 ホバー/フォーカスで表示されるコンテンツ — Tooltip の WCAG 1.4.13 適合性

- **問題**: Radix UI Tooltip はポインターがトリガーおよびコンテンツから離れると自動的に閉じる仕様。WCAG 1.4.13 の「persistent（ユーザーが解除するまで非表示にならない）」要件との適合性はグレーゾーン
- **推奨対応**:
  - ブラウザでの実動作確認（Escape キーでの解除、コンテンツへのホバー可能性、dismissal の挙動）
  - 長文やインタラクティブなコンテンツの場合は `Popover` コンポーネントへの切り替えを検討
  - Radix Tooltip の `disableHoverableContent` が `false`（デフォルト）であることを確認済み

#### 2) 2.4.7 / 2.4.13 フォーカスの可視化・外観 — カスタムフォーカススタイルの不在

- **問題**: `TooltipTrigger` にカスタムのフォーカスインジケータ（`focus-visible` 等）が設定されておらず、ブラウザデフォルトに依存
- **推奨対応**:
  - `TooltipTrigger` は `asChild` パターンで子要素のスタイルを継承する使い方が一般的なため、まず利用パターンを確認
  - 素の `<button>` としてレンダリングされる場合は、`focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:outline-hidden` 等の追加を検討
  - ストーリーで `asChild` パターンの使用例を追加し、フォーカススタイルの継承が正しく動作することを確認

#### 3) 2.5.8 ターゲットサイズ（最小） — トリガーのサイズ保証

- **問題**: `TooltipTrigger` にサイズの最小値が設定されておらず、短いテキストやアイコンのみの場合に 24x24px を下回る可能性
- **推奨対応**:
  - コンポーネント利用ガイドラインで、アイコンのみのトリガーには `min-w-6 min-h-6` 以上を確保するよう記載
  - `IconButton` との組み合わせパターンをストーリーに追加

---

## テスト / 検証

- 既存テスト: `src/components/ui/tooltip/index.test.tsx`
  - 基本レンダリングテスト: 確認済み (`index.test.tsx:15-36`)
  - ホバーによる表示テスト: 確認済み (`index.test.tsx:38-57`)
  - デフォルト side テスト: 確認済み (`index.test.tsx:59-78`)
  - side prop 反映テスト: 確認済み (`index.test.tsx:80-99`)
  - `data-state="delayed-open"` の確認: テスト内で使用 (`index.test.tsx:32-35`)
- 不足しているテスト:
  - キーボードフォーカスによる Tooltip 表示テスト（Tab キーでトリガーにフォーカスし、Tooltip が表示されることを確認）
  - Escape キーによる Tooltip 閉じテスト
  - `role="tooltip"` の自動付与テスト
  - `aria-describedby` の自動紐付けテスト
  - 注: jsdom 環境では Escape キーや Portal の一部挙動が正確に再現できない場合があるため、ブラウザ実動作確認との併用を推奨

---

## 補足

### Radix UI Tooltip のアクセシビリティ設計

Radix UI Tooltip は以下のアクセシビリティ機能を内蔵しており、コンポーネント側で明示的な ARIA 属性の設定が不要：

- `role="tooltip"` の自動付与（`TooltipContent`）
- `aria-describedby` の自動紐付け（`TooltipTrigger` -> `TooltipContent`）
- `data-state` による開閉状態管理（`delayed-open` / `instant-open` / `closed`）
- フォーカスによるトリガー表示
- Escape キーによる閉じ操作
- `disableHoverableContent` によるホバーアクセシビリティ制御

### 修正の優先度

1. **中**: `1.4.13` — ブラウザ実動作での WCAG 1.4.13 適合性確認（Radix の仕様上、完全な persistent は困難。長文コンテンツの場合は Popover への切り替え方針を策定）
2. **低**: `2.4.7` / `2.4.13` — フォーカススタイルの整備（`asChild` パターンでの利用が一般的なため、利用パターン次第）
3. **低**: `2.5.8` — ターゲットサイズのガイドライン整備（利用者側の責任範囲だが、ドキュメントでの案内が有効）

### フォローアップ候補

- キーボード操作の自動テスト追加（フォーカス表示、Escape閉じ）
- `role="tooltip"` / `aria-describedby` の存在確認テスト追加
- Storybook での `asChild` パターン使用例追加（`IconButton` + `Tooltip` の組み合わせ）
- 長文ツールチップと Popover の使い分けガイドライン策定
- ブラウザ実動作による WCAG 1.4.13 適合性テスト実施
