# Form a11yレビュー

## 対象

- Component: `Form`
- 関連ファイル
  - `src/components/ui/form/index.tsx`
  - `src/components/ui/form/label.tsx`
  - `src/components/ui/form/index.test.tsx`
  - `src/components/ui/form/index.stories.tsx`
  - `src/components/ui/form/index.figma.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`
- **WCAG 2.5.2**: Down系ハンドラは `@deprecated`

---

## チェック結果

> Result は `Pass / Fail / N/A / Needs review`。
> 本プロジェクトでは「Figma保証」の項目は、トークン逸脱が無い前提で Pass とし、Evidence に方針を記載します。

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキストがある | Pass | `FormErrorMessage` 内の `<Icon icon="error">` は `aria-hidden="true"` で装飾扱い（`index.tsx:348`）。エラーテキスト `{body}` が隣接して同等の情報を提供。`FormHeader` 内のヘルプアイコン `<Icon icon="help">` も `aria-hidden="true"`（`icon/index.tsx:56`）で、ツールチップがテキスト情報を補足。 | ヘルプアイコンのみの `TooltipTrigger` にアクセシブルネームが無い点は後述（4.1.2参照） |
| 1.3.4 | 表示の向き | AA | コンテンツが縦向き/横向きいずれかに限定されていない | Pass | CSSに向き固定の指定なし。`grid content-start`（`index.tsx:177`）はレスポンシブ対応。 | -- |
| 1.3.5 | 入力目的の特定 | AA | `autocomplete` 属性が適切に設定されている | N/A | Formコンポーネント自体は `autocomplete` を管理しない。子の `<Input>` / `<Textarea>` 側で設定する責務。Stories（`index.stories.tsx:104-108`）で `type="email"` を指定しているが `autocomplete` は明示していない。 | 消費者側の利用ガイドで `autocomplete` 属性の推奨を検討 |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma)。エラー状態は色（`text-negative-500`）だけでなくエラーアイコン `<Icon icon="error">`（`index.tsx:348`）とテキストメッセージで表現。必須状態は `<Tag>` テキスト「必須」で明示（`index.tsx:242-244`）。 | トークン逸脱があれば `Needs review` |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma)。`text-text-high`、`text-text-low`、`text-negative-500` はデザイントークン。 | トークン逸脱があれば `Needs review` |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%拡大されてもコンテンツ/機能が損なわれない | Pass | `grid content-start` レイアウト（`index.tsx:177`）とフレキシブルなflex構造（`index.tsx:239`）。固定幅の指定なし。 | -- |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | 固定幅やoverflowの制約なし。`grid` / `flex` ベースのレイアウト。 | -- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスリング等のコントラスト | Pass (Figma) | Design-system guaranteed (Figma)。Formコンポーネント自体にフォーカスリングなし（子のInput等が担当）。 | トークン逸脱があれば `Needs review` |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップが要件を満たす（解除可能、ホバー維持可能、永続表示） | Needs review | `FormHeader` の `helpText` は `<Tooltip>` + `<TooltipTrigger>` + `<TooltipContent>` で実装（`index.tsx:247-253`）。Radix UIの `Tooltip` はポインターホバー維持・Escキー解除・遅延表示をサポートするが、**実機での動作確認が必要**。 | Tooltip コンポーネント自体のa11y レビューで詳細検証推奨 |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Formコンポーネントはネイティブ `<div>`, `<p>`, `<label>` を使用。子のInput等がキーボード操作を担う。`TooltipTrigger` はRadix UIがキーボードフォーカスを保証。 | -- |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | モーダルやトラップを作る要素なし。Tooltipはフォーカス非トラップ（Radix UI保証）。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットが無効化/変更可能 | N/A | 単一キーショートカットの実装なし。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM順序に従うネイティブ要素で構成。`tabIndex` の手動操作なし。FormHeader -> FormHelperMessage -> FormControl(Input) -> FormErrorMessage の順でDOMに配置。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | N/A | Formコンポーネント自体にフォーカス可能な要素なし（`<label>`, `<div>`, `<p>` はフォーカス対象外）。`TooltipTrigger` のフォーカスリングはRadix UI + Tooltipコンポーネント側で管理。 | 子コンポーネント（Input等）側で担保 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` や `position: fixed` によるフォーカス隠蔽なし。 | -- |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータの太さ・コントラスト | N/A | Formコンポーネント自体にフォーカス可能な要素がなく、フォーカスインジケータの責務は子コンポーネント側。 | -- |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | N/A | 複雑なジェスチャ操作なし。フォームコンポーネントは入力フィールドのラッパー。 | -- |
| 2.5.2 | ポインタ取消 | A | Downで確定しない / 取消できる | Pass | `onMouseDown` / `onPointerDown` / `onTouchStart` の使用なし（grep確認済み）。`onClick` ベース。 | -- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Pass | `FormLabel` は `<label htmlFor={formItemId}>` で可視ラベルテキストをそのままアクセシブルネームとして提供（`index.tsx:191-198`）。`htmlFor` と `FormControl` の `id` が一致（テスト `index.test.tsx:525-527` で検証済み）。 | -- |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーション操作なし。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作なし。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象が24x24px以上 | Needs review | `TooltipTrigger` 内のヘルプアイコンは `<Icon icon="help" size={5}>`（`index.tsx:249`）。`size={5}` のアイコンサイズがデザイントークンで20px相当の場合、24px未満の可能性。`className="flex items-center"` でパディングは無い。 | ヘルプアイコンの `TooltipTrigger` に `min-w-6 min-h-6`（24px）のパディングまたはサイズ確保を検討 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `onFocus` で副作用を起こすコードなし。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `onChange` で予期しないコンテキスト変更なし。react-hook-form の `Controller` がバリデーション管理。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | `FormHeader` が全フィールドで一貫したラベル構造（label + isRequired tag + helpText tooltip）を提供。Stories（`index.stories.tsx`）で一貫した使用パターン確認。 | -- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Pass | `FormControl` が `aria-invalid={!!error}`（`index.tsx:286`）と `aria-describedby` にエラーメッセージIDを追加（`index.tsx:281-285`）。`FormErrorMessage` がエラーアイコン + テキストでエラー内容を表示（`index.tsx:338-351`）。テスト `index.test.tsx:548-590` で検証済み。 | -- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Pass | `FormLabel` が `htmlFor` でinputと関連付け（`index.tsx:195`）。`FormHelperMessage` が `id={formDescriptionId}` で `aria-describedby` と連携（`index.tsx:306-315`）。テスト `index.test.tsx:530-546` で検証済み。 | -- |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示される | Needs review | エラーメッセージ表示の仕組み（`FormErrorMessage`）は実装済みだが、修正方法の提示は消費者側のバリデーションメッセージ内容に依存。Stories（`index.stories.tsx:52-67`）のzodスキーマでは「2文字以上」「有効なメールアドレス」等の具体的なヒントを含む。 | 消費者側のガイドラインで「修正方法を含むエラーメッセージ」を推奨する文書化を検討 |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存でない | N/A | 認証機能なし。Formコンポーネントは汎用的なフォームラッパー。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Needs review | **主要な関連付け**: `FormLabel` → `htmlFor` → `FormControl` の `id` で関連付け済み。`aria-invalid` でエラー状態を伝達。**懸念点**: (1) `FormHeader` の `isRequired` は視覚的な `<Tag>必須</Tag>` のみで、`aria-required` がinputに付与されない（`index.tsx:241-245`）。react-hook-form の `rules.required` は HTML `required` 属性を自動設定しないため、スクリーンリーダーに必須状態が伝わらない可能性あり。(2) `TooltipTrigger` 内のヘルプアイコンは `aria-hidden="true"` のIconのみで、トリガーボタン自体にアクセシブルネームがない（`index.tsx:248-249`）。 | (1) `FormControl` のSlotに `aria-required` を伝搬する仕組み、または消費者側で `required` / `aria-required` の付与を推奨するガイドを検討。(2) `TooltipTrigger` に `aria-label="ヘルプ"` 等のアクセシブルネーム付与を検討 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Needs review | エラーメッセージ（`FormErrorMessage`）は `aria-describedby` で関連付けされているが、**動的に出現するエラーメッセージに `role="alert"` や `aria-live` がない**（`index.tsx:338-351`）。`aria-describedby` はフォーカス時にのみ読み上げられ、エラー発生の即座の通知には `role="alert"` / `aria-live="assertive"` が必要。 | `FormErrorMessage` の `<p>` 要素に `role="alert"` または `aria-live="assertive"` の追加を検討 |

---

## 対応内容（修正が必要な場合）

本レビューはレポート作成のみであり、コード修正は実施していません。以下は検出された課題の優先順位付きまとめです。

### 優先度: 高

#### 1) FormErrorMessage に `role="alert"` が未設定（4.1.3）

- **現状**: エラーメッセージは `aria-describedby` で関連付けされているが、動的に出現した際にスクリーンリーダーへの即座の通知がない
- **推奨修正**: `FormErrorMessage` の `<p>` 要素に `role="alert"` を追加
- 該当: `src/components/ui/form/index.tsx:338-351`

#### 2) 必須状態のプログラム的な通知が不足（4.1.2）

- **現状**: `isRequired` は視覚的な `<Tag>必須</Tag>` で表示されるが、inputに `aria-required="true"` が付与されない
- **推奨修正**: `FormControl` のコンテキストで `isRequired` を伝搬し、`aria-required` をSlotに設定する仕組みを検討。または消費者側で `aria-required` を明示するガイドを作成
- 該当: `src/components/ui/form/index.tsx:231-256`, `src/components/ui/form/index.tsx:272-291`

### 優先度: 中

#### 3) TooltipTrigger のアクセシブルネーム不足（4.1.2）

- **現状**: ヘルプアイコンの `TooltipTrigger` 内に `<Icon>` のみがあり、`aria-hidden="true"` のため、トリガーボタンにアクセシブルネームがない
- **推奨修正**: `TooltipTrigger` に `aria-label="ヘルプ"` を追加
- 該当: `src/components/ui/form/index.tsx:248-249`

#### 4) ヘルプアイコンのターゲットサイズ（2.5.8）

- **現状**: `<Icon icon="help" size={5}>` のターゲットサイズが24x24px未満の可能性
- **推奨修正**: `TooltipTrigger` に最小サイズ（`min-w-6 min-h-6`）を確保
- 該当: `src/components/ui/form/index.tsx:248`

### 優先度: 低

#### 5) autocomplete 属性のガイドライン（1.3.5）

- **現状**: Form自体の責務外だが、消費者が `autocomplete` を適切に指定するガイドがない
- **推奨対応**: ドキュメントに `autocomplete` 利用の推奨を追記

#### 6) エラーメッセージに修正方法を含めるガイドライン（3.3.3）

- **現状**: エラーメッセージの表示機構は完備。修正方法の提示は消費者側に委ねられている
- **推奨対応**: Stories / ドキュメントで具体的な修正ヒントを含むエラーメッセージのベストプラクティスを例示

---

## テスト / 検証

- 既存テスト `src/components/ui/form/index.test.tsx` でa11y関連の以下を検証済み:
  - label と input の `htmlFor` / `id` 関連付け（L514-528）
  - `aria-describedby` によるヘルパーメッセージの関連付け（L530-546）
  - エラー時の `aria-invalid="true"` 設定（L548-591）
  - エラー時の `aria-describedby` へのエラーメッセージID追加（L593-641）
  - エラー時の `data-error` 属性設定（L643-687）
- **追加テスト推奨**:
  - `FormErrorMessage` に `role="alert"` が設定されることのテスト
  - `TooltipTrigger` のアクセシブルネーム存在確認テスト
  - `isRequired` 時のスクリーンリーダー通知テスト

---

## 補足

- Formコンポーネントは react-hook-form + Radix UI のラッパーとして設計されており、基本的なa11y機構（label関連付け、aria-describedby、aria-invalid）は適切に実装されている
- 最も影響の大きい課題は **`FormErrorMessage` への `role="alert"` 追加**（4.1.3）。これにより、バリデーションエラー発生時にスクリーンリーダーが即座にエラーを通知できるようになる
- `isRequired` の `aria-required` 伝搬（4.1.2）は、Formコンポーネント内部で解決するか消費者側のガイドで対応するかの設計判断が必要
- Tooltip のa11yは Tooltip コンポーネント自体の専用レビューで詳細検証を推奨
