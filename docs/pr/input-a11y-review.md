# Input a11yレビュー

## 対象

- Component: `Input`
- 関連ファイル
  - `src/components/ui/input/index.tsx`
  - `src/components/ui/input/index.test.tsx`
  - `src/components/ui/input/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`

---

## チェック結果

> Result は `Pass / Fail / N/A / Needs review`。
> 本プロジェクトでは「Figma保証」の項目は、トークン逸脱が無い前提で Pass とし、Evidence に方針を記載します。

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキストがある | Needs review | `index.tsx:341` — `aria-label={triggerAriaLabel}` でアイコンボタンにラベルを付与可能だが、`triggerAriaLabel` は必須propではなくデフォルト値もない | `isTrigger=true` 時に `triggerAriaLabel` が未指定だとアイコンボタンのアクセシブルネームが空になる。必須化またはデフォルト値の設定を推奨 |
| 1.3.4 | 表示の向き | AA | 縦向き/横向きを限定していない | Pass | CSS上で `orientation` を固定するスタイル指定なし。`flex` レイアウトで柔軟に対応 | ― |
| 1.3.5 | 入力目的の特定 | AA | `autocomplete` 属性が適切に設定されている | Pass | `index.tsx:169` — `...props` のスプレッドにより、利用側で `autocomplete` を自由に指定可能。コンポーネント自体がブロックしていない | 利用側で適切な `autocomplete` 属性を付与する責務あり |
| 1.4.1 | 色の使用 | A | 色だけで情報を伝えていない | Pass (Figma) | Design-system guaranteed (Figma)。エラー状態は `border-negative-500` トークンで表現（トークン逸脱なし）。disabled状態は `cursor-not-allowed` + `disabled` 属性で色以外でも区別可能 | トークン逸脱があれば `Needs review` |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma)。テキストカラーはデザイントークン（`text-text-high`, `text-text-placeholder`, `text-neutral-400`）を使用 | トークン逸脱があれば `Needs review` |
| 1.4.4 | テキストのサイズ変更 | AA | 200%拡大でコンテンツ・機能が損なわれない | Pass | `index.tsx:18-20` — サイズは `h-8/h-10/h-12` の固定高だが、テキストは `character-*-regular-pro` トークンで相対的に定義。横方向は `w-full` で追従 | 固定高がブラウザのフォントサイズ拡大時に切り詰めを起こす可能性はあるが、inputのデフォルト動作として許容範囲 |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | `index.tsx:14` — `w-full` でコンテナ幅に追従。固定幅指定なし | ― |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスリング等のコントラスト | Pass (Figma) | Design-system guaranteed (Figma)。`index.tsx:31` — `ring-2 ring-[var(--color-ring-normal)] ring-offset-2` でフォーカスリング表示。CSS変数はデザインシステム管理 | トークン逸脱があれば `Needs review` |
| 1.4.13 | ホバー/フォーカスで表示されるコンテンツ | AA | ツールチップ等の要件 | N/A | Inputコンポーネントはホバー/フォーカスで追加コンテンツを表示しない | ― |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | ネイティブ `<input>` 要素を使用（`index.tsx:312`）。キーボードで入力・フォーカス移動が可能。アイコンボタンもネイティブ `<button>` で Tab 到達可能（`index.test.tsx:331`） | ― |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | `index.tsx:205-214` — `onBlur` でフォーカス離脱を適切に処理。ボタンへの移動時のみフォーカス維持（`relatedTarget` チェック）。外部クリックハンドラ（`index.tsx:256-278`）もフォーカス解除をサポート | ― |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットが無効化/変更可能 | N/A | コンポーネント内に独自のキーボードショートカットは実装されていない | ― |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM順序に従うネイティブフォーカス管理。`input` → `button`（存在時）の順序が論理的。`tabIndex=-1` はコンテナ `div` のみ（`index.tsx:310`）で、操作要素には影響なし | ― |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `index.tsx:31` — `ring-2 ring-[var(--color-ring-normal)] ring-offset-2 outline-hidden` でフォーカスリングを表示。`IconButton` も `focus-visible:ring-2` を持つ（`icon-button/index.tsx:17`） | ― |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | N/A | Inputコンポーネント単体では `overflow:hidden` 等でフォーカス要素を隠す構造なし。ページレイアウト依存のため単体では N/A | 利用側のレイアウトで確認が必要 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータの太さ・コントラスト | Pass | `index.tsx:31` — `ring-2`（2px幅）+ `ring-offset-2`（2pxオフセット）で視覚的に十分な太さ。色はデザイントークン `--color-ring-normal` 管理 | AAA基準のため参考評価 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | `index.tsx:308` — コンテナの `onClick`、`index.tsx:337` — アイコンボタンの `onClick`。複雑なジェスチャ（マルチタッチ等）は不要 | ― |
| 2.5.2 | ポインタ取消 | A | アクションをDown系で確定しない | Needs review | `index.tsx:272` — `document.addEventListener("mousedown", handleOutsideClick)` で外部クリック検出に `mousedown` を使用。ただしこれは「フォーカス解除」という副作用が `mousedown` で発動する。機能的なアクション確定ではないため厳密にはセーフだが、プロジェクトポリシーとの整合性を確認推奨 | `onIconButtonClick` は `onClick`（release確定）で適切。`mousedown` はフォーカス管理用途のため実質的にWCAG 2.5.2違反リスクは低い |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Pass | `<input>` はネイティブ要素で、利用側が `<label>` や `aria-label` を付与する設計。`...props` でpass-through可能（`index.tsx:169`）。テスト: `index.test.tsx:270-274` で `aria-label` の動作確認済み | 利用側で適切なラベルを付与する責務あり |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーション関連の機能なし | ― |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない | ― |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass | `index.tsx:17-20` — Input高さ: sm=32px(`h-8`), md=40px(`h-10`), lg=48px(`h-12`)。IconButton最小サイズ: xs=24px(`w-6 h-6`, `icon-button/index.tsx:28`)。全て24px以上 | ― |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `index.tsx:196-203` — `handleInputFocus` はフォーカス状態の更新と `onFocus` コールバック呼び出しのみ。コンテキスト変更やページ遷移なし | ― |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `index.tsx:187-193` — `handleChange` は `onChange` コールバック呼び出しのみ。自動送信やコンテキスト変更なし | ― |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | CVAベースのバリアント管理で一貫したスタイル。propsによるカスタマイズはあるが基本構造は同一 | ― |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Fail | `index.tsx:307` — `aria-invalid` がコメントアウトされている。`isInvalid=true` 時に視覚的なエラー表示（`border-negative-500`）はあるが、`aria-invalid` 属性が `<input>` 要素に設定されないため、支援技術にエラー状態が伝わらない | `aria-invalid={isInvalid}` を `<input>` 要素に追加する必要あり。`aria-describedby` でエラーメッセージとの関連付けは利用側で可能（テスト: `index.test.tsx:291-303`） |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Pass | `...props` のスプレッドにより `aria-label`, `aria-labelledby`, `id`（`<label htmlFor>` 連携）を利用側で指定可能。テスト: `index.test.tsx:268-289` で `aria-label` と `<label>` 連携を確認済み | コンポーネント自体はラベルを強制しないため、利用側の責務 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | Inputコンポーネント単体ではエラーメッセージの表示機能を持たない。エラーメッセージの提供は利用側（Form等）の責務 | ― |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証フローはInputコンポーネントの責務外 | ― |
| 4.1.2 | 名前・役割・値 | A | name/role/状態が適切 | Needs review | `index.tsx:312` — ネイティブ `<input>` 要素でroleは暗黙的に適切。`disabled` 属性（`index.tsx:314`）で無効状態を伝達。`aria-disabled`（`index.tsx:326`）も設定。ただし `aria-invalid` がコメントアウト（`index.tsx:307`）されており、エラー状態が支援技術に伝わらない | 3.3.1と同様、`aria-invalid` の有効化が必要 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | N/A | Inputコンポーネント単体にはローディングや非同期更新の状態通知機能なし。エラー通知は利用側（`role="alert"` 等）の責務 | ― |

---

## 対応内容（修正が必要な場合）

### 1) `aria-invalid` のコメントアウト解除（3.3.1 / 4.1.2）

**重要度: 高（WCAG A基準の Fail）**

`index.tsx:307` にて `aria-invalid` がコメントアウトされている。

```tsx
// NOTE: not supportエラーがLintで出るためコメントアウト
// aria-disabled={isInputDisabled}
// aria-invalid={isInvalid === null ? undefined : isInvalid}
```

コンテナ `<div>` ではなく、`<input>` 要素側に `aria-invalid` を追加すべき。`<input>` 要素はネイティブに `aria-invalid` をサポートしているため、Lintエラーは発生しないはず。

```tsx
<input
  ref={mergedInputRef}
  disabled={isInputDisabled}
  aria-invalid={isInvalid || undefined}
  aria-disabled={isInputDisabled}
  ...
/>
```

### 2) `triggerAriaLabel` の未指定時のフォールバック検討（1.1.1）

**重要度: 中（Needs review）**

`isTrigger=true` で `triggerAriaLabel` が未指定の場合、アイコンボタンのアクセシブルネームが空になる。以下のいずれかの対策を推奨:

- `triggerAriaLabel` を必須prop化
- デフォルト値の設定（例: `triggerAriaLabel = "操作ボタン"`）
- 開発時の `console.warn` で警告

### 3) `mousedown` イベントの使用に関する確認（2.5.2）

**重要度: 低（実質的リスクは低い）**

`index.tsx:272` の `mousedown` イベントはフォーカス管理用途であり、ユーザーアクションの確定には使用されていないため、WCAG 2.5.2の違反には該当しない。ただしプロジェクトポリシーとの整合性として記録。

---

## テスト / 検証

- 既存テスト: `src/components/ui/input/index.test.tsx`
  - アクセシビリティ関連テスト
    - `aria-label` のサポート確認（L268-274）
    - `<label>` との `htmlFor` 連携確認（L277-289）
    - `aria-describedby` のサポート確認（L291-303）
    - キーボードナビゲーションの基本動作確認（L306-332）
    - disabled状態の属性確認（L206-223）
  - 不足しているテスト
    - `aria-invalid` のテスト（現在コメントアウトされているため未テスト）
    - `triggerAriaLabel` 未指定時の挙動テスト

---

## 補足

- **Storybookでの確認**: `index.stories.tsx` の `WithTrigger` ストーリーでは `triggerAriaLabel: "入力内容を消去する"` が適切に設定されている。`Size` ストーリーでも同様。ただし `Default` ストーリーでは `isTrigger` がfalseのため問題なし。
- **IconButton依存**: Input内のアイコンボタンは `IconButton` コンポーネントに委譲しており、`IconButton` 自体が `focus-visible:ring-2` 等のアクセシビリティスタイルを持つ。
- **`disabled` と `aria-disabled` の重複**: `<input>` 要素に `disabled`（L314）と `aria-disabled`（L326）の両方が設定されている。HTML仕様上、`disabled` 属性があれば `aria-disabled` は暗黙的に `true` になるため冗長だが、害はなく、明示的で堅実な実装と評価できる。
- **今後のフォローアップ候補**:
  - `aria-invalid` のコメントアウト解除後、対応するユニットテストの追加
  - `triggerAriaLabel` のprop設計の見直し
  - Storybook addon-a11y を用いた自動検査の導入検討
