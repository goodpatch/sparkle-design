# IconButton a11y レビュー

## 対象

- Component: `IconButton`
- 関連ファイル:
  - `src/components/ui/icon-button/index.tsx` (メインコンポーネント)
  - `src/components/ui/icon-button/index.test.tsx` (テスト)
  - `src/components/ui/icon-button/index.stories.tsx` (Storybook)
  - `src/components/ui/icon/index.tsx` (依存: Icon コンポーネント)
  - `src/components/ui/spinner/index.tsx` (依存: Spinner コンポーネント)

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則 Figma 側で保証**
- **WCAG 2.5.2**: Down 系ハンドラ (`onMouseDown` / `onPointerDown` / `onTouchStart`) は `@deprecated` 方針

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみの非テキストコンテンツに等価な代替テキスト（アクセシブルネーム）がある | **Fail** | `index.tsx:315` — `icon` は必須だが `aria-label` は任意。Icon は `aria-hidden="true"`（`icon/index.tsx:56`）で正しく装飾扱いだが、ボタン自体にアクセシブルネームが保証されていない | `aria-label` を必須 prop にするか、`aria-label` / `aria-labelledby` 未指定時にコンソール警告を出すことを推奨。アイコンのみのボタンは可視テキストがないため、代替テキストなしではスクリーンリーダーに「ボタン」としか読まれない |
| 1.3.4 | 表示の向き | AA | コンテンツの表示が縦横いずれかに限定されていない | **Pass** | `index.tsx:14-19` — CSS は `inline-flex` で固定方向の制約なし | — |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されている | **N/A** | IconButton はフォーム入力要素ではない | — |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | **Pass** | Figma/デザインシステム保証。disabled 状態は `disabled` 属性（`index.tsx:392`）＋ `cursor-not-allowed` クラスで色以外でも区別される。ローディング中はスピナーアニメーションで視覚的に区別 | Figma 保証。コード上でトークン逸脱なし |
| 1.4.3 | コントラスト（最低限） | AA | テキスト/ラベルのコントラスト比が基準を満たす | **Pass** | Figma/デザインシステム保証。デザイントークン（`primary-500`, `neutral-500` 等）のみ使用 | Figma 保証。コード上でトークン逸脱なし |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが 200% まで拡大されても機能が損なわれない | **Pass** | `index.tsx:28-31` — サイズは TailwindCSS のユーティリティ (`w-6 h-6` 等) で相対値ベース。テキスト拡大時のレイアウト崩れリスクは低い（アイコンのみのボタンのため） | — |
| 1.4.10 | リフロー | AA | 400% 拡大でも横スクロールが発生しない | **Pass** | `index.tsx:16` — `inline-flex` レイアウトで固定幅は小さい（最大 `w-12`）。単独ボタンのためリフロー問題は発生しにくい | — |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ・アイコン・境界線が必要なコントラストを満たす | **Pass** | Figma/デザインシステム保証。フォーカスリング (`focus-visible:ring-2`, `index.tsx:17`) はデザイントークン `--color-ring-normal` を使用 | Figma 保証。コード上でトークン逸脱なし |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ホバー/フォーカスで出現するコンテンツの解除・ホバー・持続性 | **N/A** | IconButton はホバー/フォーカスで追加コンテンツを表示しない（Tooltip 等は別コンポーネントで提供） | — |
| 2.1.1 | キーボード | A | キーボードだけで操作できるか | **Pass** | `index.tsx:362,379` — ネイティブ `<button>` 要素を使用（`type="button"`）。キーボード操作（Enter/Space でのアクティベーション）はブラウザネイティブで保証。テスト: `index.test.tsx:345-355` で `onKeyDown` テスト済み | — |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められないか | **Pass** | `index.tsx:362` — ネイティブ `<button>` 要素。フォーカストラップの実装なし。テスト: `index.test.tsx:357-370` で focus/blur テスト済み | — |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能か | **N/A** | IconButton は単一キーショートカットを実装していない | — |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的か | **Pass** | `index.tsx:362` — ネイティブ `<button>` 要素で DOM 順序に従ったフォーカス移動。`tabIndex` の明示的変更なし | 単体コンポーネントでは問題なし。画面全体での検証は別途必要 |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能か | **Pass** | `index.tsx:17` — `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` でフォーカスリングを明示実装。テスト: `index.test.tsx:413-421` で検証済み | — |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が他の要素に隠れないか | **N/A** | 単体コンポーネント検証範囲外。画面全体のレイアウトに依存 | 画面統合テストで別途検証推奨 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラストか | **Pass** | `index.tsx:17` — `ring-2`（2px 幅）＋ `ring-offset-2`（2px オフセット）で十分な視認性。`--color-ring-normal` トークンによるコントラスト保証 | — |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能か | **Pass** | `index.tsx:379-402` — `onClick` のみサポート（ネイティブ `<button>` のクリック）。複雑なジェスチャなし | — |
| 2.5.2 | ポインタ取消 | A | アクションを Down で確定させていない | **Pass** | `index.tsx:379-402` — ネイティブ `<button>` の `onClick`（ポインタアップで発火）のみ使用。`onMouseDown` / `onPointerDown` / `onTouchStart` のハンドラは props 型 (`ButtonHTMLAttributes`) に含まれるが、コンポーネント自体では使用していない | プロジェクト方針により Down 系ハンドラは `@deprecated` 推奨。現時点で IconButton は props 型で Down 系を許容しているが、コンポーネント内部では使用していないため Pass。利用側での誤用防止は今後の改善候補 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルとアクセシブルネームの一致 | **N/A** | IconButton は可視テキストラベルを持たない（アイコンのみ）。アクセシブルネームは `aria-label` で提供される想定で、1.1.1 / 4.1.2 の範囲で担保 | — |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能か | **N/A** | IconButton はデバイスモーション（加速度センサー等）を使用していない | — |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作があるか | **N/A** | IconButton はドラッグ操作を実装していない | — |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は 24x24px 以上か | **Pass** | `index.tsx:28-31` — 最小サイズ `xs` は `w-6 h-6`（24x24px, 1rem=16px 換算）。`sm`=32px, `md`=40px, `lg`=48px。すべて 24px 以上 | — |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きないか | **Pass** | `index.tsx:378-402` — `onFocus` でのコンテキスト変更やナビゲーション変更なし。フォーカス時はスタイル変更のみ（`focus-visible:ring-2`） | — |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きないか | **N/A** | IconButton はフォーム入力要素ではない。クリック/キーボードアクティベーションは意図的操作 | — |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベルか | **Pass** | CVA によるバリアント管理（`index.tsx:14-286`）で一貫したスタイリング。`variant` / `theme` / `size` の組み合わせで予測可能な外観 | 利用側でのラベル一貫性は別途検証推奨 |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わるか | **N/A** | IconButton はフォーム入力要素ではなくエラー状態を持たない | — |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明があるか | **N/A** | IconButton はフォーム入力要素ではない | — |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されているか | **N/A** | IconButton はフォーム入力要素ではない | — |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていないか | **N/A** | IconButton は認証機能を提供しない | — |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | **Needs review** | `index.tsx:362,379-393` — ネイティブ `<button>` で `role="button"` は暗黙的に保証。`disabled` 属性は `isDisabled` / `isLoading` 時に正しく設定（`index.tsx:360,392`）。ただし `aria-label` が任意のため、利用側で未指定の場合アクセシブルネームが欠落する。`asChild`（`index.tsx:362`）使用時はネイティブ button ではなくなるため、role/name の保証が利用側に委ねられる | `aria-label` 未指定時の開発者向け警告（`console.warn`）の追加を推奨。`asChild` 使用時のガイドライン文書化も推奨 |
| 4.1.3 | 状態メッセージ | AA | 非同期処理や状態変化が支援技術に伝わる | **Pass** | `index.tsx:395-401` — ローディング時に `<Spinner>` を表示。Spinner は `role="status"` + `aria-label="読み込み中"`（`spinner/index.tsx:38-39`）で支援技術に状態を通知。disabled 状態はネイティブ `disabled` 属性で通知 | Spinner の `aria-label` はハードコード日本語（「読み込み中」）。多言語対応が必要な場合は i18n 対応を検討 |

---

## 対応内容（修正が必要な場合）

### Fail: 1.1.1 非テキストコンテンツ

**問題**: `IconButton` はアイコンのみで構成されるボタンだが、`aria-label` が任意 prop のため、利用側で未指定の場合にアクセシブルネームが欠落する。スクリーンリーダーはボタンの目的を伝えられない。

**推奨対応**:
1. `aria-label` を必須 prop にする（型レベルでの保証）
2. または、ランタイムで `aria-label` / `aria-labelledby` 未指定時に `console.warn` を出力する
3. Storybook の Default story に `aria-label` の使用例を追加する

**該当箇所**: `src/components/ui/icon-button/index.tsx:289-326`（IconButtonProps 定義）

### Needs review: 4.1.2 名前・役割・値

**問題**: `aria-label` 任意の件は 1.1.1 と同根。加えて `asChild` 使用時にネイティブ `<button>` セマンティクスが失われる可能性がある。

**推奨対応**:
1. 1.1.1 の対応を実施することで解消
2. `asChild` 使用時のアクセシビリティガイドラインをドキュメントに追加

**該当箇所**: `src/components/ui/icon-button/index.tsx:310-311`（asChild prop）, `index.tsx:362`（Comp 切り替え）

---

## テスト / 検証

### 既存テストのカバレッジ

- `index.test.tsx:396-430` — Accessibility テストセクションあり
  - ボタンセマンティクス: Pass (`tagName === "BUTTON"`, `type === "button"`)
  - `aria-label` サポート: テスト済み（`index.test.tsx:405-411`）
  - フォーカススタイル: テスト済み（`index.test.tsx:413-421`）
  - アイコンの `aria-hidden`: テスト済み（`index.test.tsx:423-429`）

### 追加テスト推奨

1. **`aria-label` 未指定時の警告テスト**: `aria-label` なしでレンダリングした際に `console.warn` が発行されることを検証（修正実施後）
2. **ローディング時のアクセシビリティテスト**: ローディング状態で `role="status"` を持つ要素が存在することを検証
3. **`asChild` 使用時のアクセシビリティテスト**: `asChild` で `<a>` 要素を渡した場合に適切な role が維持されるかを検証

---

## 補足

### 評価サマリー

| Result | 件数 |
|--------|------|
| Pass | 18 |
| Fail | 1 |
| Needs review | 1 |
| N/A | 12 |
| **合計** | **32** |

### 主要な所見

1. **最重要 (Fail)**: アイコンのみのボタンに対する `aria-label` の必須化（WCAG 1.1.1 A）。これはアクセシビリティの根幹に関わる問題であり、優先的に対応すべき。

2. **要検討 (Needs review)**: `asChild` 使用時のセマンティクス保証（WCAG 4.1.2 A）。利用側に委ねる設計は合理的だが、ドキュメントでの注意喚起が必要。

3. **良好な実装**:
   - ネイティブ `<button>` 要素の使用によりキーボード操作・フォーカス管理が暗黙的に保証
   - `focus-visible:ring-2` + `ring-offset-2` による明確なフォーカスインジケータ
   - Spinner コンポーネントが `role="status"` + `aria-label` で状態変化を支援技術に通知
   - Icon コンポーネントの `aria-hidden="true"` で装飾アイコンを正しく非表示化
   - `disabled` 属性の適切な管理（`isLoading` / `isDisabled` / `disabled` の統合）
   - 最小ターゲットサイズ 24x24px（xs サイズ）で WCAG 2.5.8 を充足

4. **Figma 保証範囲**: 色/コントラスト関連（1.4.1, 1.4.3, 1.4.11）はデザイントークンのみ使用しており、逸脱なし。
