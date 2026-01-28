# Checkbox a11yレビュー

## 対象

- Component: `Checkbox`
- 関連ファイル
  - `src/components/ui/checkbox/index.tsx`
  - `src/components/ui/checkbox/index.test.tsx`
  - `src/components/ui/checkbox/index.stories.tsx`

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
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Pass | チェックマーク用の `Icon` コンポーネントは `aria-hidden="true"` を付与。Radix UI の `CheckboxPrimitive.Root` が `role="checkbox"` を出力し、`label` prop 付きなら `<label htmlFor={id}>` で関連付け。`aria-label` も `...props` 経由で渡せる。テスト `has proper ARIA attributes` で `aria-label` の確認済み。 | `label` なしかつ `aria-label` なしの場合、アクセシブルネームが空になる。使用側ガイドラインで `label` または `aria-label` の必須化を推奨。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を、縦向きまたは横向きのいずれかに限定していない | Pass | CSS に `orientation` 固定はなし。`flex items-center` のみで縦横に適応可能。 | -- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されており、入力目的がプログラムで特定できる | N/A | チェックボックスは `autocomplete` の対象外。 | -- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). チェック済みはアイコン表示、エラーはボーダー色変更に加え `isInvalid` prop をフォーム全体のエラーメッセージと併用する前提。 | エラー状態は色のみでの伝達ではなく、フォーム側でのテキスト表示が前提。フォーム統合での検証が必要。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). ラベルテキストは `text-text-middle` / `text-text-disabled` トークンを使用。 | トークン逸脱なし。 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | サイズは `h-8/10/12 w-8/10/12`（rem ベース）で固定。ラベルテキストは `character-*-regular-pro` トークンで相対サイズ。200%拡大でもレイアウト崩れなし（flex ベース）。 | -- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). フォーカスリングは `ring-[var(--color-ring-normal)]` トークンを使用。ボーダーは `border-neutral-500` / `border-negative-500` トークンを使用。 | トークン逸脱なし。 |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | コンポーネントは `flex items-center` の単一行構成。固定幅はチェックボックス本体のみ（最大 `w-12` = 3rem）で、ビューポートを占有しない。 | -- |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | チェックボックスにはホバー/フォーカスで追加表示されるコンテンツ（ツールチップ等）がない。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Radix UI `CheckboxPrimitive.Root` は `<button>` をレンダリングし、Space キーでトグル操作可能。テストで `is focusable when not disabled` を確認済み。キーボードテストは `it.skip` だが、これは jsdom 制限のため。Radix UI 自体がキーボード操作を保証。 | E2E テストでの Space キー操作確認を推奨。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | 単一のインタラクティブ要素（`<button>`）で構成。フォーカストラップのロジックなし。Tab キーで次の要素へ移動可能。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | カスタムキーボードショートカットは実装されていない。Radix UI の Space キーはフォーカス中のみ有効（修飾キー不要だがフォーカス必要）。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM順序に従う（`<button>` + `<label>` の構成）。`tabIndex` のカスタマイズなし。ラベルクリックは `htmlFor` でチェックボックスに委任。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `[.group:focus-visible_&]:ring-2 [.group:focus-visible_&]:ring-[var(--color-ring-normal)] [.group:focus-visible_&]:ring-offset-2` が内側の `div` に適用。`:focus-visible` 擬似クラスを使用し、キーボード操作時のみリングを表示。 | -- |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` や `position: fixed/absolute` による遮蔽なし。`ring-offset-2` によりフォーカスリングが要素外に表示される。 | 親コンテナで `overflow: hidden` を使用する場合は注意。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Needs review | `ring-2`（2px）で太さは十分。`ring-offset-2`（2px）でオフセットあり。ただし `--color-ring-normal` の実際のコントラスト比はトークン定義に依存。 | AAA 基準のため厳密検証にはトークン値の確認が必要。デザインシステム側での保証が前提。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | クリック（シングルタップ）のみで操作。ドラッグ、マルチタッチ等の複雑操作なし。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Pass | `onClick` ベース（release で確定）。`onMouseDown` / `onPointerDown` / `onTouchStart` のハンドラは定義されていない。Radix UI の内部実装も `click` イベントベース。 | -- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Needs review | `label` prop 使用時は `<label htmlFor={id}>` でテキストが可視ラベルとして表示され、`htmlFor` 経由でチェックボックスと関連付け。ただし `id` が未指定の場合、`htmlFor` が `undefined` となりラベルとチェックボックスの関連付けが切れる。 | **`label` を指定する場合は `id` も必須とすべき**。`id` 未指定時の dev warn 追加、または内部で `useId()` による自動 ID 生成を推奨。 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーションによる操作は実装されていない。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass | 外側のタップ領域: sm=`h-8 w-8`（32px）、md=`h-10 w-10`（40px）、lg=`h-12 w-12`（48px）。全サイズで 24x24px 以上を満たす。 | -- |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | フォーカス時に `onFocus` でのコンテキスト変更やページ遷移等なし。フォーカスリング表示のみ。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `onCheckedChange` コールバックは状態変更の通知のみ。ページ遷移やフォーム送信等の副作用なし。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | 同一コンポーネントを再利用する設計。Storybook の各ストーリーで一貫したラベル付け（`label` prop）を使用。 | -- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Pass (修正済み) | `index.tsx` — `isInvalid={true}` の場合に `aria-invalid="true"` を `CheckboxPrimitive.Root` に付与するよう修正済み。スクリーンリーダーがエラー状態を認識可能。 | 修正コミット: `♿ fix(checkbox): アクセシビリティ改善` |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Needs review | `label` prop で `<label htmlFor={id}>` を生成。ただし前述の通り `id` 未指定時は関連付けが切れる。`aria-describedby` による追加説明のサポートは `...props` 経由で可能だが、明示的な prop としては提供されていない。 | `id` 未指定時の自動生成を推奨。`description` prop の追加も検討。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | チェックボックスのエラー修正は「チェックする/外す」のみで自明。フォーム全体でのエラーメッセージ表示はフォーム側の責務。 | -- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証コンポーネントではない。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Needs review | Radix UI が `role="checkbox"` を出力。`aria-checked` が `true` / `false` / `mixed` で状態を反映。`disabled` 属性で無効状態を反映。テストで確認済み。ただし `label` なし + `aria-label` なしの場合にアクセシブルネームが空になる問題あり。 | アクセシブルネーム未設定時の dev warn を推奨。 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | チェック状態の変化は `aria-checked` の値変更（`true` / `false` / `mixed`）で自動的に支援技術に伝わる。Radix UI の `CheckboxPrimitive` が適切に管理。 | -- |

---

## 対応が必要な項目のサマリ

### ~~Fail~~ → 修正済み: 1件

#### 3.3.1 エラーの特定 (Level A) → **修正済み**

- **問題**: `isInvalid` prop によるエラー状態が視覚的（ボーダー色変更）のみで、`aria-invalid` 属性がセットされない
- **対応**: `CheckboxPrimitive.Root` に `aria-invalid={isInvalid || undefined}` を追加（コミット: `♿ fix(checkbox): アクセシビリティ改善`）

```tsx
// 適用された修正
<CheckboxPrimitive.Root
  aria-invalid={isInvalid || undefined}
  // ...
>
```

### Needs review: 3件

#### 2.4.13 フォーカスの外観 (Level AAA)

- **懸念**: `--color-ring-normal` トークンの実際のコントラスト比が不明
- **対応**: デザインシステム側のトークン定義で AAA 基準を満たしているか確認が必要

#### 2.5.3 ラベルを含む名前 / 3.3.2 ラベル又は説明 (Level A)

- **懸念**: `label` prop を指定しても `id` が未指定の場合、`<label htmlFor={undefined}>` となりプログラム的な関連付けが切れる
- **修正提案**:
  1. `React.useId()` を利用して内部で自動 ID を生成する
  2. `label` 指定時に `id` がない場合は dev warn を出す

```tsx
// 修正案（概念）
const autoId = React.useId();
const checkboxId = id ?? autoId;
```

#### 4.1.2 名前・役割・値 (Level A)

- **懸念**: `label` なし + `aria-label` / `aria-labelledby` なしの場合、アクセシブルネームが空
- **修正提案**: dev 環境で `label` も `aria-label` も `aria-labelledby` もない場合に警告を出す

---

## テスト / 検証

### 既存テストの評価

- **初期状態テスト**: `aria-checked` の値（`false` / `true` / `mixed`）を検証 -- Pass
- **ユーザー操作テスト**: クリックによる状態トグル、コールバック呼び出し -- Pass
- **無効状態テスト**: クリック無効、フォーカス不可 -- Pass
- **a11yテスト**: `role="checkbox"`, `aria-label`, フォーカス可否 -- Pass
- **キーボードテスト**: `it.skip` 状態（jsdom 制限）-- 要 E2E テスト
- **indeterminate テスト**: `aria-checked="mixed"` を確認 -- Pass

### 追加が望ましいテスト

1. `isInvalid` 時の `aria-invalid="true"` 検証（修正後）
2. `label` + `id` の `<label htmlFor>` 関連付け検証（現在 `htmlFor` の値自体は未検証）
3. `label` なし + `aria-label` なしでの警告テスト（修正後）
4. E2E: Space キーでのトグル操作

---

## 補足

- Radix UI の `CheckboxPrimitive` はネイティブな `<button>` ベースでレンダリングされるため、基本的なキーボード操作・フォーカス管理は堅牢
- `indeterminate` 状態の `aria-checked="mixed"` 対応は既に適切に実装されている
- アイコン（チェックマーク/インデターミネートマーク）は `aria-hidden="true"` で適切に非表示化されている
- 今後のフォーム統合において、`aria-describedby` / `aria-errormessage` による外部エラーメッセージとの関連付けパターンをドキュメント化することを推奨
