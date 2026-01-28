# Textarea a11yレビュー

## 対象

- Component: `Textarea`
- 関連ファイル
  - `src/components/ui/textarea/index.tsx`
  - `src/components/ui/textarea/index.test.tsx`
  - `src/components/ui/textarea/index.stories.tsx`

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
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | N/A | `<textarea>` はテキスト入力要素であり、非テキストコンテンツ（アイコン等）を含まない。アクセシブルネームは使用側で `aria-label` または `<label htmlFor>` 経由で付与可能（テスト `index.test.tsx:130-149` で `aria-label` と `id/for` の両パターンを確認済み）。 | コンポーネント単体としては非テキストコンテンツを持たないため N/A。ラベル付与は使用側の責務（4.1.2 で評価）。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を、縦向きまたは横向きのいずれかに限定していない | Pass | CSS に `orientation` 固定なし。`flex w-full` ベースで親コンテナに応じて伸縮する。`resize` クラスにより縦横両方向のリサイズが可能（`index.tsx:19`）。 | -- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されており、入力目的がプログラムで特定できる | Needs review | `autocomplete` 属性は明示的な prop として定義されていないが、`React.TextareaHTMLAttributes` を継承しているため `...props` 経由で渡すことは可能（`index.tsx:69-71`）。Storybook やドキュメントでの `autocomplete` 使用例はなし。 | `<textarea>` は住所やメッセージなど多行入力に使われるケースがあるため、使用側で `autocomplete` を適切に設定するガイダンスが望ましい。コンポーネント自体の修正は不要。 |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). エラー状態は `border-negative-500` によるボーダー色変更（`index.tsx:30`）だが、フォーム全体でのエラーメッセージテキスト表示と併用する前提。無効状態は `cursor-not-allowed` + `disabled` 属性で視覚・プログラム両面で伝達（`index.tsx:37, 113`）。トークン逸脱なし。 | エラー状態は色のみでの伝達ではなく、フォーム側でのテキスト表示が前提。フォーム統合での検証が必要。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). プレースホルダーは `placeholder:text-base-400` トークン、無効時テキストは `text-base-300` トークンを使用（`index.tsx:19, 37`）。トークン逸脱なし。 | トークン逸脱なし。 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | サイズは `min-h-[56px]` / `min-h-[64px]` で最小高のみ指定（`index.tsx:24-26`）。`w-full` で親幅に追従し、`resize` で手動リサイズも可能。フォントサイズは `character-*-regular-pro` トークンで相対指定。200%拡大でもレイアウト破綻しない構成。 | -- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). フォーカスリングは `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2`（`index.tsx:19`）。ボーダーは `border-neutral-500` / `border-negative-500` トークンを使用（`index.tsx:30-32`）。トークン逸脱なし。 | disabled 時に `focus-visible:ring-0` を指定（`index.tsx:37`）しフォーカスリングを無効化しているが、`disabled` 属性が付与されているためフォーカス自体が不可であり問題なし。 |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | `w-full` でコンテナ幅に追従する設計（`index.tsx:19`）。固定幅の指定なし。`resize` プロパティにより手動で幅調整も可能。 | -- |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | テキストエリアにはホバー/フォーカスで追加表示されるコンテンツ（ツールチップ等）がない。ホバー時はボーダー色変更のみ（`hover:border-neutral-600` / `hover:border-negative-600`）。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | ネイティブ `<textarea>` 要素を使用（`index.tsx:104`）。Tab キーでフォーカス可能、テキスト入力・選択・コピー等すべてのキーボード操作がブラウザネイティブで保証される。`tabIndex` のカスタマイズなし。 | -- |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | 単一の `<textarea>` 要素で構成（`index.tsx:104`）。フォーカストラップのロジックなし。Tab キーで次の要素へ移動可能（`<textarea>` 内では Tab はインデントではなくフォーカス移動がデフォルト動作）。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | カスタムキーボードショートカットは実装されていない。`onKeyDown` / `onKeyUp` / `onKeyPress` のハンドラ定義なし。ネイティブのテキスト入力操作のみ。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM 順序に従う単一の `<textarea>` 要素（`index.tsx:104`）。`tabIndex` のカスタマイズなし。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2`（`index.tsx:19`）。`:focus-visible` 擬似クラスを使用し、キーボード操作時にリングを表示。disabled 時は `focus-visible:ring-0`（`index.tsx:37`）だが、`disabled` 属性により要素がフォーカス不可のため問題なし。 | -- |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` や `position: fixed/absolute` による遮蔽なし。`ring-offset-2` によりフォーカスリングが要素外に表示される。コンポーネント自体に z-index の指定もなし。 | 親コンテナで `overflow: hidden` を使用する場合は注意。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Needs review | `ring-2`（2px）で太さは十分。`ring-offset-2`（2px）でオフセットあり。ただし `--color-ring-normal` の実際のコントラスト比はトークン定義に依存（`index.tsx:19`）。 | AAA 基準のため厳密検証にはトークン値の確認が必要。デザインシステム側での保証が前提。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | クリック（シングルタップ）でフォーカスし、テキスト入力が可能。ドラッグ、マルチタッチ等の複雑操作なし。`resize` はブラウザネイティブのドラッグ操作だが、これは補助的機能でありコンテンツ入力には不要。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Pass | `onMouseDown` / `onPointerDown` / `onTouchStart` のハンドラは定義されていない（grep で確認済み）。ネイティブ `<textarea>` のクリック動作（フォーカス移動）は release ベース。 | -- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Needs review | コンポーネント自体は `<textarea>` 要素のみをレンダリングし、ラベルは含まない（`index.tsx:104-116`）。使用側で `<label htmlFor>` や `aria-label` を付与する設計。テスト `index.test.tsx:130-149` で `aria-label` と `id/for` の両パターンを確認済み。ただし、Storybook の全ストーリーでは `<label>` なしで `placeholder` のみ使用（`index.stories.tsx:55-108`）。 | Storybook のストーリーに `<label>` 付きの使用例を追加することを推奨。使用側でのラベル付与をガイドラインで明記すべき。 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーションによる操作は実装されていない。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない。`resize` はブラウザネイティブ機能であり、テキスト入力の本質的操作ではない。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass | 最小高さは `min-h-[56px]`（sm/md）/ `min-h-[64px]`（lg）、幅は `w-full`（`index.tsx:19, 24-26`）。全サイズで 24x24px を大幅に超える。 | -- |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | フォーカス時のカスタムハンドラなし（`onFocus` / `onBlur` の定義なし、grep で確認済み）。フォーカスリング表示のみ。`...props` で外部から渡すことは可能だが、コンポーネント自体は副作用を持たない。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `onChange` コールバックは `...props` 経由で渡される（`index.tsx:115`）。コンポーネント自体は入力時に副作用（ページ遷移、フォーム送信等）を起こさない。テスト `index.test.tsx:104-127` で onChange の正常動作を確認済み。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | 単一の `Textarea` コンポーネントとして一貫した API を提供。CVA バリアントによるスタイル分岐のみで、構造的な差異なし。Storybook で各バリアントを網羅（`index.stories.tsx:55-108`）。 | -- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Fail | `isInvalid` prop でボーダー色が `border-negative-500` に変わるが（`index.tsx:30`）、`aria-invalid` 属性が設定されない（`index.tsx:104-116` に `aria-invalid` の記述なし）。スクリーンリーダーがエラー状態を認識できない。テストでも `aria-invalid` の検証なし。 | **`isInvalid={true}` の場合、`aria-invalid="true"` を `<textarea>` に付与すべき。** 併せて `aria-errormessage` または `aria-describedby` でエラーメッセージへの参照も検討。 |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Needs review | コンポーネントは `<textarea>` 要素のみをレンダリングし、ラベルや説明を内包しない（`index.tsx:104-116`）。使用側で `<label>` / `aria-label` / `aria-describedby` を付与する設計。テスト `index.test.tsx:129-149` で `aria-label` と `id/for` によるラベル関連付けを確認済み。ただし Storybook の全ストーリーではラベルなしで使用（`index.stories.tsx`）。 | Storybook に `<label>` 付きの正しい使用例を追加すべき。使用側ガイドラインで `<label>` または `aria-label` の必須化を推奨。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | テキストエリア自体はエラーメッセージ表示の責務を持たない。フォーム全体でのエラーメッセージ表示はフォーム側の責務。`isInvalid` prop によりエラー状態の視覚的表示は可能。 | フォーム統合時に `aria-describedby` でエラーメッセージと関連付けるパターンのドキュメント化を推奨。 |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証コンポーネントではない。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Needs review | ネイティブ `<textarea>` 要素のため `role` は暗黙的に `textbox`（複数行）。`disabled` 属性は `isDisabled` / `disabled` prop から適切に設定（`index.tsx:101, 113`）。テスト `index.test.tsx:58-72` で disabled の検証済み。ただし、`isInvalid` 時に `aria-invalid` が付与されない（3.3.1 で指摘済み）。また、`aria-label` / `<label>` なしの場合にアクセシブルネームが空になる。 | `aria-invalid` の付与（3.3.1 の修正で対応）。アクセシブルネーム未設定時の dev warn 追加を推奨。 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | N/A | テキストエリアは入力値の変更が主要な状態変化であり、これは支援技術がネイティブに追跡する。非同期処理（loading）やステータス通知の機能はない。エラー状態の通知は 3.3.1 / 4.1.2 で評価。 | -- |

---

## 対応が必要な項目のサマリ

### Fail: 1件

#### 3.3.1 エラーの特定 (Level A)

- **問題**: `isInvalid` prop によるエラー状態が視覚的（ボーダー色変更）のみで、`aria-invalid` 属性がセットされない
- **箇所**: `src/components/ui/textarea/index.tsx:104-116`
- **影響**: スクリーンリーダー利用者がエラー状態を認識できない
- **修正提案**:
  1. `isInvalid={true}` の場合に `aria-invalid="true"` を `<textarea>` に付与する
  2. オプションで `aria-errormessage` / `aria-describedby` によるエラーメッセージ参照をサポートする

```tsx
// 修正案（概念）
<textarea
  aria-invalid={isInvalid || undefined}
  className={cn(textareaVariants({ size, isInvalid, isDisabled: isTextareaDisabled }), className)}
  disabled={isTextareaDisabled}
  ref={ref}
  {...props}
/>
```

### Needs review: 4件

#### 1.3.5 入力目的の特定 (Level AA)

- **懸念**: `autocomplete` 属性の使用例やガイダンスがない
- **対応**: コンポーネント自体の修正は不要だが、使用側ガイドラインで `autocomplete` 属性の適切な設定を推奨するドキュメントの追加が望ましい

#### 2.4.13 フォーカスの外観 (Level AAA)

- **懸念**: `--color-ring-normal` トークンの実際のコントラスト比が不明
- **対応**: デザインシステム側のトークン定義で AAA 基準を満たしているか確認が必要

#### 2.5.3 ラベルを含む名前 / 3.3.2 ラベル又は説明 (Level A)

- **懸念**: コンポーネントが `<textarea>` のみをレンダリングし、ラベルを内包しない設計のため、使用側でのラベル付与が必須だが、Storybook に正しい使用例がない
- **修正提案**:
  1. Storybook に `<label htmlFor>` 付きのストーリーを追加する
  2. 使用側ガイドラインで `<label>` または `aria-label` の必須化を明記する
  3. 可能であれば、アクセシブルネーム未設定時に dev 環境で `console.warn` を出す

#### 4.1.2 名前・役割・値 (Level A)

- **懸念**: `isInvalid` 時の `aria-invalid` 未付与（3.3.1 の修正で解消）。`aria-label` / `<label>` なしの場合にアクセシブルネームが空になる
- **対応**: 3.3.1 の修正と、上記 2.5.3 / 3.3.2 の対応で改善

---

## テスト / 検証

### 既存テストの評価

- **基本レンダリングテスト**: `<textarea>` の存在確認、placeholder、value -- Pass (`index.test.tsx:23-55`)
- **無効状態テスト**: `isDisabled` での `disabled` 属性、`isDisabled` と `disabled` の優先順位 -- Pass (`index.test.tsx:57-73`)
- **エラー状態テスト**: `isInvalid` でのクラス適用（`border-negative-500`） -- Pass (`index.test.tsx:75-83`)
- **サイズバリアントテスト**: 3サイズのクラス適用 -- Pass (`index.test.tsx:85-101`)
- **イベントテスト**: `onChange` コールバック（非制御/制御モード） -- Pass (`index.test.tsx:103-127`)
- **a11yテスト**: `aria-label` サポート、`id/for` によるラベル関連付け -- Pass (`index.test.tsx:129-149`)
- **エッジケーステスト**: 最小 props、連続変更 -- Pass (`index.test.tsx:152-173`)

### 追加が望ましいテスト

1. `isInvalid` 時の `aria-invalid="true"` 検証（修正後）
2. `aria-describedby` の透過（`...props` 経由）検証
3. `disabled` 時にフォーカスが不可であることの検証
4. Storybook に `<label>` 付きストーリーの追加

---

## 補足

- ネイティブ `<textarea>` 要素を使用しているため、キーボード操作・フォーカス管理はブラウザにより堅牢に保証されている
- `React.forwardRef` を使用しており、外部からの ref アクセスが可能（`index.tsx:98`）
- `...props` パターンにより `aria-*` 属性を自由に渡せる柔軟な設計だが、`aria-invalid` のような重要な属性はコンポーネント内部で自動設定すべき
- `isDisabled` と `disabled` の後方互換性処理（`index.tsx:101`）は適切に実装されている
- 今後のフォーム統合において、`aria-describedby` / `aria-errormessage` による外部エラーメッセージとの関連付けパターンをドキュメント化することを推奨
