# Modal a11yレビュー

## 対象

- Component: `Modal`
- 関連ファイル
  - `src/components/ui/modal/index.tsx`
  - `src/components/ui/modal/index.test.tsx`
  - `src/components/ui/modal/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1 / 1.4.3 / 1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`
- **WCAG 2.5.2**: `onMouseDown`/`onPointerDown`/`onTouchStart` は `@deprecated` + dev warn で段階的に抑止

---

## チェック結果

> Result は `Pass / Fail / N/A / Needs review`。
> 本プロジェクトでは「Figma保証」の項目は、トークン逸脱が無い前提で Pass とし、Evidence に方針を記載します。

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Fail | `ModalClose`（`index.tsx:77-92`）は `IconButton` に `icon="close"` を渡すが、`aria-label` を明示的に設定していない。`IconButton` コンポーネント自体もアイコンのみの場合にデフォルトの `aria-label` を付与しない（利用者が props で渡す必要がある）。スクリーンリーダーでは閉じるボタンの目的が伝わらない可能性がある。 | `ModalClose` に `aria-label="閉じる"` をデフォルトで付与すべき（例: `<IconButton icon="close" aria-label="閉じる" ...>`）。利用者が上書き可能なように props 経由で受け付ける設計が望ましい。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を、縦向きまたは横向きのいずれかに限定していない | Pass | CSS に `orientation` を制限するスタイルなし。`fixed` + `top-[50%] left-[50%] translate` で中央配置しており、向きに依存しない（`index.tsx:179`）。 | -- |
| 1.3.5 | 入力目的の特定 | AA | `autocomplete` 属性が適切に設定されており、入力目的がプログラムで特定できる | N/A | モーダルは入力フィールドではないため `autocomplete` は該当しない。 | -- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). モーダルのオーバーレイ（`bg-black/50`）は視覚的な背景暗転であり、情報伝達は色に依存していない。モーダルの開閉状態は `role="dialog"` + `aria-modal`（Radix 内部）で支援技術に伝達される。 | トークン逸脱があれば `Needs review` |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). モーダル本体は `bg-white`（`index.tsx:179`）を使用。テキスト色はデザイントークン経由。独自色指定なし。 | トークン逸脱があれば `Needs review` |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | `max-h-[calc(100vh-80px)]`（`index.tsx:179`）でビューポート相対の最大高さを設定。`ModalBody` は `overflow-auto`（`index.tsx:215`）でスクロール可能。Tailwind の rem ベースのサイズ指定を使用。 | -- |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | `w-full` + `max-w-*` によるレスポンシブ幅指定（`index.tsx:179`）。`flex flex-col` でコンテンツが縦方向に伸長。`max-h-[calc(100vh-80px)]` + `overflow-auto` で縦スクロール対応（`index.tsx:179, 215`）。 | `size="full"` 時は `max-w-[calc(100vw-80px)]`（`index.tsx:170`）で余白を確保。 |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). モーダル内のフォーカス可能要素（`ModalClose` = `IconButton`）は `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2`（`icon-button/index.tsx:17`）でフォーカスリングを描画。トークン `--color-ring-normal` を使用。 | トークン逸脱があれば `Needs review` |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | モーダルはホバー/フォーカスで出現するコンテンツではなく、明示的なトリガー操作（`ModalTrigger` のクリック）により表示される。ツールチップやポップオーバーのパターンに該当しない。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Radix UI `Dialog` をベースとしており、以下のキーボード操作が保証される: (1) `Escape` キーでモーダルを閉じる、(2) `Tab`/`Shift+Tab` でモーダル内のフォーカス移動、(3) `ModalTrigger` は `<button>` 要素（Enter/Space で起動）。`ModalClose` は `IconButton`（ネイティブ `<button>` 要素、`icon-button/index.tsx:362`）で Enter/Space での操作が可能。 | テスト（`index.test.tsx`）は全項目 `.todo` 状態で未実装（L11-18）。キーボード操作の自動テスト追加を推奨。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められないか？ | Pass | Radix UI `Dialog` はモーダルが開いている間、意図的にフォーカスをトラップする（`aria-modal="true"` のモーダルダイアログとして適切な動作）。`Escape` キーでモーダルを閉じてフォーカストラップを解除可能。これは WCAG 2.1.2 の「標準的な方法でフォーカストラップから抜けられる」要件を満たす。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能か？ | N/A | Modal コンポーネントは単一文字キーのショートカットを実装していない。`Escape` は修飾キーなしの単一キーだが、モーダルダイアログの標準的な閉じ操作であり WCAG 2.1.4 の例外（アクティブコンポーネントのフォーカス中のみ有効）に該当。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的か？ | Pass | Radix UI `Dialog` がモーダルオープン時に最初のフォーカス可能要素にフォーカスを移動。DOM 順序は Header -> Body -> Footer の論理的な構造（`index.tsx:184-186`）。モーダルを閉じた際はトリガー要素にフォーカスが戻る（Radix の標準動作）。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能か？ | Pass | モーダル内のインタラクティブ要素（`ModalClose` = `IconButton`、フッター内の `Button`）は各々 `focus-visible:ring-2` でフォーカスリングを描画。`ModalContent` 自体（`DialogPrimitive.Content`）は Radix によりフォーカス可能だが、視覚的なフォーカスインジケータのスタイルは `index.tsx:177-181` に定義なし。 | `ModalContent` のフォーカスリングスタイルについては Needs review（通常ユーザーは内部要素にフォーカスするため影響は限定的）。 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れないか？ | Pass | モーダルは `fixed` + `z-50`（`index.tsx:179`）で最前面に表示。`ModalBody` は `overflow-auto`（`index.tsx:215`）でスクロール可能だが、フォーカス要素がスクロール外に隠れた場合のブラウザ標準のスクロール追従により表示される。 | ページレイアウトに依存する部分あり。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラストか？ | Pass | `IconButton` のフォーカスリング: `ring-2`（2px 幅）+ `ring-offset-2`（2px オフセット）（`icon-button/index.tsx:17`）。AAA レベルの要件（2px 以上の太さ）を満たす。色はデザイントークン `--color-ring-normal` で制御。 | AAA レベル。コントラスト比はデザイントークン側で保証。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能か？ | Pass | モーダルの操作は単一クリック（`ModalTrigger` でのクリック開く、`ModalClose` でのクリック閉じる）のみ。マルチタッチやパスベースのジェスチャは不要。`closeOnOverlayClick` によるオーバーレイクリックも単一操作。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Pass | Modal コンポーネントのコード内に `onPointerDown`/`onMouseDown`/`onTouchStart` のハンドラ定義なし（`index.tsx` 全体を確認）。`onInteractOutside` は Radix の PointerDown イベントで発火するが、デフォルトで `closeOnOverlayClick = false`（`index.tsx:143`）のため外部クリックでの閉じ動作は無効。有効化時も Radix の `onInteractOutside` 経由であり、直接の Down 確定ではない。 | -- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Needs review | `ModalTrigger`（`index.tsx:49-53`）は Radix `DialogPrimitive.Trigger` を使用しており、子要素のテキストがアクセシブルネームになる。Storybook の例（`index.stories.tsx:43`）では `<Button>モーダルを開く</Button>` を `asChild` で使用しており問題なし。しかし `ModalClose`（`index.tsx:77-92`）は `IconButton` にアイコンのみで可視ラベルがなく、`aria-label` も未設定のため、名前の一致性以前にアクセシブルネーム自体が不足。 | 1.1.1 の Fix と同様、`ModalClose` に `aria-label` の付与が必要。 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能か？ | N/A | Modal コンポーネントはデバイスモーション（加速度センサー等）による操作を実装していない。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作があるか？ | N/A | Modal コンポーネントはドラッグ操作を実装していない。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上か？ | Pass | `ModalClose` は `IconButton size="xs"`（`index.tsx:85`）を使用。`icon-button/index.tsx:28` で `xs` サイズは `w-6 h-6`（24x24px）。WCAG 2.5.8 の最小要件（24x24px）をちょうど満たす。 | 24x24px はギリギリの最小値。より大きいサイズ（`sm` = 32x32px）の検討を推奨するが、現状は Pass。 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きないか？ | Pass | Modal コンポーネントに `onFocus` の副作用的なハンドラなし（`index.tsx` 全体を確認、grep 結果: マッチなし）。Radix Dialog のフォーカス管理はモーダルオープン時の初期フォーカス移動のみ（ユーザーの明示的なトリガー操作後）。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きないか？ | N/A | モーダルは入力フィールドではないため `onChange` は該当しない。モーダル内に配置される入力要素は利用者の責任。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベルか？ | Pass | `ModalClose` は常に同一の `IconButton`（`icon="close"`, `size="xs"`, `variant="ghost"`, `theme="neutral"`）をレンダリング（`index.tsx:82-88`）。`ModalTitle` は `DialogPrimitive.Title` を使用し一貫したスタイル（`character-4-bold-pro`: `index.tsx:70`）。 | 利用者がコンポーネントを一貫して使用することが前提。 |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わるか？ | N/A | モーダルコンポーネント自体はフォーム入力のエラー表示機能を持たない。モーダル内のフォーム要素は利用者の責任。 | -- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明があるか？ | N/A | モーダルは入力フィールドではない。ただし Radix Dialog は `aria-labelledby`（`DialogPrimitive.Title` に紐付け）と `aria-describedby`（`DialogPrimitive.Description` に紐付け）を自動管理する。 | `DialogPrimitive.Description`（`ModalDescription`）が export されていないため、利用者がモーダルの説明を提供する手段が限定的（後述の 4.1.2 参照）。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されているか？ | N/A | モーダルコンポーネント自体はエラー修正機能を持たない。 | -- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていないか？ | N/A | モーダルコンポーネントは認証機能を持たない。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持ち、状態変化でネームが失われない | Needs review | **Role**: Radix `DialogPrimitive.Content` は `role="dialog"` + `aria-modal="true"` を自動付与（Radix 内部実装）。**Name**: `DialogPrimitive.Title` 使用時は `aria-labelledby` が自動設定される。しかし `HeaderHidden` ストーリー（`index.stories.tsx:115-144`）では `ModalTitle` が省略されており、ダイアログに `aria-labelledby` が設定されない。この場合、Radix はコンソール警告を出すが、支援技術にはダイアログの目的が伝わらない。**Description**: `DialogPrimitive.Description`（`ModalDescription`）が export されておらず（`index.tsx:238-249`）、利用者が `aria-describedby` を活用できない。 | (1) `ModalTitle` 省略時に `aria-label` の提供を推奨するドキュメント/dev warn の追加を検討。(2) `ModalDescription` の export 追加を検討（Radix の `DialogPrimitive.Description` ラッパー）。 |
| 4.1.3 | 状態メッセージ | AA | 非同期処理や状態変化が支援技術に伝わる | N/A | モーダルコンポーネント自体は非同期処理（loading 等）の状態メッセージ機能を持たない。モーダルの開閉はフォーカス管理と `role="dialog"` により支援技術に伝達される（Radix が管理）。 | モーダル内で非同期処理を行う場合は利用者の責任。 |

---

## 対応内容（修正が必要な場合）

### Fail: 1.1.1 非テキストコンテンツ

- **問題**: `ModalClose` コンポーネントが `IconButton` に `aria-label` を付与していない
- **影響**: スクリーンリーダーが閉じるボタンの目的を読み上げられない
- **推奨修正**: `ModalClose` に `aria-label="閉じる"` をデフォルトで付与し、props で上書き可能にする
- **該当箇所**: `src/components/ui/modal/index.tsx:77-92`

### Needs review: 2.5.3 ラベルを含む名前

- **問題**: `ModalClose` にアクセシブルネームが不足（1.1.1 と同根）
- **対応**: 1.1.1 の修正により解消される

### Needs review: 4.1.2 名前・役割・値

- **問題1**: `ModalTitle` 省略時にダイアログのアクセシブルネームが失われる
- **推奨対応**: `ModalTitle` 省略パターンのドキュメントに `aria-label` の代替手段を明記。可能であれば `ModalContent` に `aria-label` 省略時の dev warn を追加
- **問題2**: `DialogPrimitive.Description`（`ModalDescription`）が export されていない
- **推奨対応**: `ModalDescription` コンポーネントの追加・export を検討
- **該当箇所**: `src/components/ui/modal/index.tsx:238-249`（export 一覧）、`src/components/ui/modal/index.stories.tsx:115-144`（HeaderHidden ストーリー）

## テスト / 検証

- `index.test.tsx` は全テストケースが `.todo`（未実装）状態（L7-20）
- 以下のテスト追加を推奨:
  1. `ModalClose` に `aria-label` が設定されていることの検証
  2. `ModalTitle` 使用時に `aria-labelledby` が `DialogPrimitive.Content` に設定されることの検証
  3. キーボード操作（Escape キーで閉じる、Tab/Shift+Tab でフォーカス移動）の検証
  4. フォーカス管理（モーダルオープン時の初期フォーカス、クローズ時のフォーカス復帰）の検証
- jsdom 環境ではポータル・フォーカス管理のテストに制限があるため、ヘッドレスブラウザテスト（Playwright 等）の導入を推奨

## 補足

- Radix UI `Dialog` は WAI-ARIA Dialog (Modal) パターンに準拠しており、`role="dialog"`, `aria-modal="true"`, フォーカストラップ、Escape キーでの閉じ操作が内部で保証される
- `closeOnOverlayClick` のデフォルトが `false`（`index.tsx:143`）であることは、意図しないモーダル閉じを防ぐ設計として適切
- `ModalOverlay` のアニメーション（`animate-in`/`animate-out`）は装飾的であり、`prefers-reduced-motion` への対応は Tailwind CSS の `motion-safe`/`motion-reduce` ユーティリティで必要に応じて追加可能
- `bg-white` のハードコードされた背景色（`index.tsx:179`）はダークモード非対応だが、これはアクセシビリティ要件ではなくデザイン要件として別途対応が必要
