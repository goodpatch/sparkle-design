# Select a11y レビュー

## 対象

- Component: `Select`
- 関連ファイル:
  - `src/components/ui/select/index.tsx` (メインコンポーネント)
  - `src/components/ui/select/index.test.tsx` (テストファイル -- 全テストが `it.todo` で未実装)
  - `src/components/ui/select/index.stories.tsx` (Storybook)
  - `src/components/ui/select/index.figma.tsx` (Figma Code Connect)
  - `src/components/ui/icon/index.tsx` (依存コンポーネント)

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則 Figma 側で保証**
- **WCAG 2.5.2**: Down 系ハンドラは `@deprecated` で段階的廃止推奨

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキストがある | Pass | `icon/index.tsx:56` で `aria-hidden="true"` を設定。`select/index.tsx:200` で `SelectPrimitive.Icon asChild` 経由で装飾アイコンとして使用。Radix の `SelectPrimitive.Trigger` はネイティブ `button` ロールを持ち、子要素のテキスト内容がアクセシブルネームとなる | 装飾アイコン（arrow_drop_down, check, expand_less, expand_more）は全て `aria-hidden="true"` で適切に隠蔽されている |
| 1.3.4 | 表示の向き | AA | 縦向き/横向き限定していない | Pass | CSS に `orientation` 固定の指定なし。`flex` レイアウトのみ使用（`index.tsx:17`） | レスポンシブ対応で向きの制約なし |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されている | N/A | Select コンポーネントはドロップダウン選択型 UI であり、`autocomplete` 属性が適用される入力フィールドではない | ネイティブ `<select>` ではなく Radix のカスタム Select を使用しているため `autocomplete` は対象外 |
| 1.4.1 | 色の使用 | A | 情報を色だけで伝えていない | Pass | Figma/デザインシステム側で保証。コード上: エラー状態は `aria-invalid` 属性（`index.tsx:187`）＋ボーダー色変更（`index.tsx:29`）で二重伝達。無効状態は `disabled` 属性（`index.tsx:196`）＋ `cursor-not-allowed`（`index.tsx:34`）で伝達。独自色指定・トークン逸脱なし | Figma 保証。コード上もトークン準拠を確認 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラスト基準を満たす | Pass | Figma/デザインシステム側で保証。デザイントークン (`text-text-high`, `text-text-disabled`, `text-neutral-700`) を使用（`index.tsx:17,34,62,73,273,315`）。独自色指定なし | Figma 保証。コード上もトークン準拠を確認 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが 200% まで拡大されても機能が損なわれない | Pass | 相対的なサイズ指定（Tailwind ユーティリティ）を使用。`overflow-hidden`（`index.tsx:19`）はトリガー内テキストの `truncate`（`index.tsx:199`）用途であり、テキスト拡大時のコンテンツ表示自体は `SelectContent` の `overflow-y-auto`（`index.tsx:76`）で確保 | ドロップダウン内はスクロール可能なため拡大時も選択肢にアクセス可能 |
| 1.4.10 | リフロー | AA | 400% まで拡大しても情報が失われない | Needs review | `w-full`（`index.tsx:17`）でトリガーは親幅に追従。ドロップダウンは `min-w-[8rem]`（`index.tsx:76`）+ `min-w-[var(--radix-select-trigger-width)]`（`index.tsx:97`）で幅制御。ただし Stories で `className="w-[480px]"` / `className="w-[240px]"` の固定幅指定あり（`stories:59,130` 等） | コンポーネント自体は `w-full` でリフロー対応。Stories のデモ用固定幅は実使用時の問題ではないが、利用者向けガイドでレスポンシブ幅の推奨を検討 |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等のコントラストが十分 | Pass | Figma/デザインシステム側で保証。`focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2`（`index.tsx:18`）でフォーカスリング表示。ボーダーは `border-neutral-500`（`index.tsx:31`）等のトークン使用。独自色指定なし | Figma 保証。コード上もトークン準拠を確認 |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ホバー/フォーカスで出現するコンテンツが要件を満たす | Pass | Radix Select の仕様により: (1) Escape キーで解除可能、(2) ポインタでドロップダウンコンテンツにホバー可能、(3) ユーザー操作まで非表示にならない。`SelectContent` は `SelectPrimitive.Portal` 経由で表示（`index.tsx:234`）され、Radix のイベント管理に従う | Radix UI の標準的なポップオーバー制御に依存。WCAG 1.4.13 の 3 条件を満たす |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Radix `SelectPrimitive.Trigger` は `button` 要素としてレンダリングされ、Enter/Space で開閉可能。Arrow Up/Down で選択肢移動、Enter で確定、Escape で閉じる動作は Radix が保証。`index.tsx:184` で `SelectPrimitive.Trigger` を使用 | Radix UI がキーボード操作を完全にサポート。WAI-ARIA Listbox パターンに準拠 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | Radix Select はドロップダウン開閉時に適切なフォーカス管理を行う。Escape キーでドロップダウンを閉じてトリガーにフォーカスを戻す。Tab キーでフォーカスを移動可能 | Radix UI のフォーカス管理に依存 |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | 独自の単一キーショートカットは実装されていない。Radix Select の型検索（文字入力で選択肢を絞り込む）はネイティブ select と同等の標準動作 | 該当するカスタムショートカットなし |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM 順序に従った自然なフォーカス順序。`tabIndex` のカスタム指定なし。Radix が内部的にドロップダウン内のフォーカス管理を行う | 単体コンポーネントとしては問題なし。画面全体でのフォーカス順序は利用箇所で確認が必要 |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2`（`index.tsx:18`）で明確なフォーカスリング表示。ドロップダウン内項目は `focus:bg-neutral-100`（`index.tsx:316`）でハイライト | トリガー: リングスタイル、アイテム: 背景色変更で視認可能 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `SelectContent` は `SelectPrimitive.Portal` でポータルレンダリング（`index.tsx:234`）されるため、親要素の `overflow: hidden` に影響されない。`z-50`（`index.tsx:76`）で他の要素に隠れない | Portal + z-index でフォーカス要素の可視性を確保 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータが十分な太さ・コントラスト | Pass | `ring-2`（2px 幅）+ `ring-offset-2`（2px オフセット）で十分な視認性（`index.tsx:18`）。色は `--color-ring-normal` トークンで管理 | AAA レベルだが、リング幅・オフセットともに十分 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | Select のすべての操作はシングルクリック/タップで完結。ドラッグ・マルチタッチ・パスジェスチャ等の複雑操作は不要 | 単一ポインタ操作のみ |
| 2.5.2 | ポインタ取消 | A | アクションを Down で確定させていない | Pass | コンポーネント内に `onMouseDown` / `onPointerDown` / `onTouchStart` の直接ハンドリングなし。Radix Select は `onClick`（release ベース）で開閉を制御。Props に Down 系ハンドラの公開なし | Radix UI の標準的なイベントハンドリングに依存。プロジェクトポリシーの Down 系廃止方針にも適合 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルがアクセシブルネームに含まれる | Needs review | `SelectTrigger` 自体には `aria-label` / `aria-labelledby` の設定がない。Radix の `SelectPrimitive.Trigger` は button として子テキスト（`SelectValue` の placeholder や選択値）をアクセシブルネームに使用する。ただし、外部ラベル（`<label>` 要素や `aria-labelledby`）の紐付けはコンポーネント利用側の責務 | コンポーネント単体では外部ラベルとの紐付け手段が限定的。利用ガイドで `aria-label` または外部 `<label>` との紐付け方法のドキュメント追加を推奨 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | DeviceMotion / DeviceOrientation API の使用なし | モーション操作機能なし |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない | ドラッグ機能なし |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は 24x24px 以上 | Pass | トリガー: `h-8`(32px) / `h-10`(40px) / `h-12`(48px)（`index.tsx:24-26`）で全サイズ 24px 超。アイテム: `py-1.5`(6px*2) + テキスト行高で 24px 以上確保（`index.tsx:314`）。スクロールボタン: `py-1`(4px*2) + アイコンサイズ `size={4}`(16px) = 24px（`index.tsx:377,410`） | 全操作対象が 24x24px 以上を満たす |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `onFocus` のカスタムハンドラなし。フォーカス時はスタイル変更（`focus-visible:ring-*`）のみ（`index.tsx:18`）。コンテキスト変更や自動送信等の副作用なし | フォーカスはスタイル変更のみ |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `Select` コンポーネントの `onValueChange` は値選択時のみ発火（Radix の仕様）。選択による意図しないページ遷移やコンテキスト変更はコンポーネント側では発生しない | 利用側の `onValueChange` ハンドラ実装に依存するが、コンポーネント自体は安全 |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | CVA を使用した一貫したバリアント管理（`index.tsx:15-51`）。全サイズ・状態で同一の構造（トリガー + アイコン + ドロップダウン）。Stories で一貫した使用パターンを確認（`stories:55-226`） | コンポーネント API が統一されており一貫性あり |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Pass | `aria-invalid` 属性を `isInvalid` prop から設定（`index.tsx:187`）。スクリーンリーダーはフィールドがエラー状態であることを認識可能。視覚的にはボーダー色変更（`border-negative-500`、`index.tsx:29`）で表示 | `aria-invalid` によるプログラム的なエラー伝達あり。ただしエラーメッセージ表示は利用側の責務（`aria-describedby` で紐付けるエラーメッセージ要素は別途必要） |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Needs review | `SelectValue` の `placeholder` prop でプレースホルダテキストを表示可能（`index.tsx:141-145`）。しかし、`<label>` 要素との紐付けや `aria-label` / `aria-labelledby` / `aria-describedby` の props は `SelectTrigger` に明示的に用意されていない（Radix の spread props 経由では渡せる） | コンポーネント単体ではラベル紐付け手段が暗黙的。利用ガイドで `<label>` 要素の使用方法または `aria-label` / `aria-labelledby` の渡し方をドキュメント化することを推奨。Stories にもラベル付きの使用例追加を推奨 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | エラーメッセージの表示はコンポーネントの責務外（Select はエラー状態の視覚的表現のみを担当）。修正方法の提案はフォーム全体の設計に依存 | 利用側でエラーメッセージコンポーネントと組み合わせて使用する前提 |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | Select コンポーネントは認証 UI ではない | 認証機能なし |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Pass | Radix `SelectPrimitive.Trigger` は `role="combobox"` をレンダリングし、`aria-expanded`（開閉状態）、`aria-haspopup="listbox"` を自動設定。`disabled` 属性は `index.tsx:196` で渡され、`aria-disabled` に反映。`aria-invalid` は `index.tsx:187` で設定。`SelectPrimitive.Item` は `role="option"` + `aria-selected` を自動設定 | Radix UI がセマンティック HTML と ARIA 属性を適切に管理。`aria-invalid` もカスタム追加済み |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | Radix Select は内部的に `aria-expanded` の状態変更を管理し、ドロップダウンの開閉を支援技術に伝達。選択値の変更は `SelectPrimitive.Value` のテキスト更新として反映され、`combobox` ロールの値としてアクセス可能 | 非同期処理（loading 等）は Select コンポーネントの責務外。値選択の状態変化は Radix が適切に管理 |

---

## 対応内容（修正が必要な場合）

### Needs review: 3 件

#### 1. 1.4.10 リフロー

- **状態**: Needs review
- **内容**: コンポーネント自体は `w-full` でリフロー対応されているが、利用時に固定幅を指定した場合の 400% ズーム時の挙動は実機確認が必要
- **推奨アクション**: Storybook で 400% ズームテストを実施し、固定幅指定時の挙動を確認

#### 2. 2.5.3 ラベルを含む名前

- **状態**: Needs review
- **内容**: `SelectTrigger` のアクセシブルネームは子要素のテキスト（placeholder/選択値）に依存するが、外部ラベルとの紐付け（`aria-labelledby` 等）は利用側に委ねられている
- **推奨アクション**:
  - Stories に `<label>` 付きの使用例を追加
  - コンポーネントドキュメントに外部ラベル紐付けのガイダンスを追加

#### 3. 3.3.2 ラベル又は説明

- **状態**: Needs review
- **内容**: ラベル/説明の紐付けが暗黙的であり、利用者が適切にラベルを設定しない可能性がある
- **推奨アクション**:
  - Stories にラベル付き使用例（`<label htmlFor>` や `aria-label` 使用）を追加
  - フォーム統合パターンのドキュメント追加を検討
  - `aria-describedby` を使用したヘルプテキスト/エラーメッセージとの紐付け例を追加

---

## テスト / 検証

### テストファイルの状態

- `src/components/ui/select/index.test.tsx` に 9 件のテストケースが定義されているが、**全て `it.todo` で未実装**
- コメント（line 8-9）で「Portal-based components are challenging to test with jsdom」と記載あり

### 推奨テスト項目（a11y 観点）

1. **aria-invalid 属性テスト**: `isInvalid={true}` 時に `aria-invalid="true"` が設定されること
2. **disabled 属性テスト**: `disabled={true}` 時にトリガーが `disabled` 状態になること
3. **アクセシブルネームテスト**: `SelectValue` の placeholder が支援技術に伝わること
4. **キーボード操作テスト**: Enter/Space で開閉、Arrow キーで移動（Portal の制約あり）
5. **フォーカス管理テスト**: 開閉時のフォーカス移動が適切であること

### 検証方法

- Portal コンポーネントのため、jsdom での完全テストは困難
- **推奨**: Playwright / Cypress 等のブラウザテスト、または Storybook の a11y アドオンでの自動チェック

---

## 補足

### Radix UI による a11y 保証

このコンポーネントは `radix-ui` の `Select` プリミティブを基盤としており、以下の a11y 機能が Radix によって提供されている:

- WAI-ARIA Listbox パターンに準拠した `role` 属性（`combobox`, `listbox`, `option`）
- キーボードナビゲーション（Arrow, Enter, Space, Escape, Type-ahead search）
- フォーカス管理（開閉時のフォーカストラップ＋復帰）
- `aria-expanded`, `aria-haspopup`, `aria-selected` 等の自動管理

### カスタム拡張の a11y 対応

Sparkle Design 側で追加した a11y 対応:

- `aria-invalid` 属性による エラー状態の伝達（`index.tsx:187`）
- 装飾アイコンの `aria-hidden="true"`（`icon/index.tsx:56`）
- `focus-visible` によるフォーカスリング表示（`index.tsx:18`）
- `disabled` 属性の適切な伝播（`index.tsx:196`）

### 改善の優先度

| 優先度 | 項目 | 内容 |
|:---:|---|---|
| 中 | Stories / ドキュメント | ラベル付き使用例の追加（2.5.3 / 3.3.2 対応） |
| 低 | リフロー検証 | 400% ズームでの実機テスト（1.4.10） |
| 低 | テスト実装 | `index.test.tsx` の todo テストの実装 |
