# Dialog a11yレビュー

## 対象

- Component: `Dialog`
- 関連ファイル
  - `src/components/ui/dialog/index.tsx`
  - `src/components/ui/dialog/index.test.tsx`
  - `src/components/ui/dialog/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`

### 実装の前提

- Radix UI `AlertDialog` プリミティブを使用（`role="alertdialog"` を自動付与）
- `AlertDialog.Title` / `AlertDialog.Description` により `aria-labelledby` / `aria-describedby` を自動設定
- AlertDialog はモーダルダイアログであり、開いた時にフォーカストラップが有効化される
- Escape キーでダイアログが閉じる（Radix AlertDialog のデフォルト動作）
- 閉じた後フォーカスはトリガー要素に戻る（Radix AlertDialog のデフォルト動作）

---

## チェック結果

> Result は `Pass / Fail / N/A / Needs review`。
> 本プロジェクトでは「Figma保証」の項目は、トークン逸脱が無い前提で Pass とし、Evidence に方針を記載します。

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等に代替テキストがある | Pass | `DialogIcon` は `Icon` コンポーネントを使用し、`aria-hidden="true"` を設定（`src/components/ui/icon/index.tsx:56`）。アイコンはタイトルテキストと併用されるため装飾目的で適切。Stories の Warning / Negative ストーリーでもアイコン＋テキストの併用を確認（`index.stories.tsx:62-65, 87-89`） | アイコンのみでタイトルを構成するユースケースが発生した場合は `aria-label` の付与が必要 |
| 1.3.4 | 表示の向き | AA | 縦横限定していない | Pass | CSSに `orientation` 等の向き制限なし。`fixed` 配置 + `translate` でセンタリング（`index.tsx:89`）。`max-w-[calc(100%-2rem)]` でビューポート幅に追従 | ― |
| 1.3.5 | 入力目的の特定 | AA | autocomplete属性が適切 | N/A | Dialog コンポーネント自体は入力フィールドを持たない。フォームコンテンツは利用側で children として渡す | 利用側で入力要素を含める場合は autocomplete の適切な設定が必要 |
| 1.4.1 | 色の使用 | A | 色だけで情報を伝えていない | Pass (Figma) | デザインシステムのトークンを使用。Warning ストーリーでは `text-warning-500` のアイコンだがテキスト「変更内容を保存せずに移動」も併記（`index.stories.tsx:63-64`）。Negative も同様にテキスト併記 | トークン逸脱があれば `Needs review` |
| 1.4.3 | コントラスト | AA | テキストコントラスト基準 | Pass (Figma) | `text-text-high`（タイトル・説明）等のデザインシステムトークンを使用（`index.tsx:135, 150`）。`bg-white` 背景（`index.tsx:89`）に対して適切 | トークン逸脱があれば `Needs review` |
| 1.4.4 | テキストのサイズ変更 | AA | 200%拡大で問題なし | Needs review | `max-w-[calc(100%-2rem)]` + `sm:max-w-lg`（`index.tsx:89`）により幅制限あり。`character-*-bold-pro` / `character-*-regular-pro` のカスタムクラスを使用しており、rem/em ベースかどうか要確認 | ブラウザの200%拡大時に実機確認を推奨。カスタムフォントクラスが相対単位ベースであることを確認する |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスリング等 | Pass (Figma) | Button コンポーネントが `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` を付与（`src/components/ui/button/index.tsx:20`）。トークンベースの色指定 | トークン逸脱があれば `Needs review` |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールなし | Needs review | `fixed` 配置 + `max-w-[calc(100%-2rem)]`（`index.tsx:89`）は画面幅に追従するが、400%拡大時の挙動は実機確認が必要。フッターは `flex-col-reverse` / `sm:flex-row`（`index.tsx:114-115`）でレスポンシブ対応 | 400%拡大（320px相当）での実機確認を推奨 |
| 1.4.13 | ホバー/フォーカス表示コンテンツ | AA | ツールチップ等の要件 | N/A | Dialog コンポーネントにホバー/フォーカスで表示されるツールチップ等のコンテンツは存在しない。ダイアログ自体は Trigger のクリックで表示される | ― |
| 2.1.1 | キーボード | A | キーボードだけで操作可能 | Pass | Radix AlertDialog がキーボード操作を完全サポート。テストで Escape キーによる閉じ動作を確認（`index.test.tsx:74-104`）。Trigger はネイティブ `<button>` にバインド。Cancel / Action も Button コンポーネント経由でネイティブ button にレンダリング | ― |
| 2.1.2 | キーボードトラップなし | A | フォーカス閉じ込めなし | Pass | Radix AlertDialog はモーダルダイアログとして意図的にフォーカストラップを実装しているが、これは WAI-ARIA Dialog パターンとして正しい挙動。Escape キーでダイアログを閉じてフォーカスを解放可能（`index.test.tsx:99`）。Cancel / Action ボタンでも閉じ可能 | モーダルダイアログのフォーカストラップは WCAG 2.1.2 の例外に該当（意図的なトラップ + 脱出手段あり） |
| 2.1.4 | 文字キーショートカット | A | 単一キーショートカット無効化可能 | N/A | カスタムの単一文字キーショートカットは実装されていない。Escape キーは修飾キーではないが、ダイアログの閉じ動作は WAI-ARIA パターンの標準動作であり本基準の対象外 | ― |
| 2.4.3 | フォーカス順序 | A | 論理的なフォーカス移動 | Pass | Radix AlertDialog がオープン時にコンテンツへフォーカスを自動移動。フッター内のボタンは DOM 順に Cancel -> Action で配置（`index.tsx:162-183`）。`flex-col-reverse` は視覚的な並び順のみで Tab 順序には影響しない | `flex-col-reverse` により、モバイルでは視覚順と Tab 順が逆転する可能性あり。ただし Cancel -> Action の Tab 順序は論理的 |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータ視認可能 | Pass | Button コンポーネントが `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` を適用（`src/components/ui/button/index.tsx:20`）。Cancel / Action ともに Button 経由でレンダリングされるため適用される | ― |
| 2.4.11 | 隠されないフォーカス | AA | フォーカス要素が隠れない | Pass | ダイアログは `z-50` + `fixed` でビューポート中央に表示（`index.tsx:89`）。オーバーレイ（`z-50`）の上に配置され、フォーカス可能な要素がオーバーレイ配下に隠れることはない。フォーカストラップによりダイアログ外の要素にフォーカスが移動しない | ― |
| 2.4.13 | フォーカスの外観 | AAA | 十分な太さ・コントラスト | Needs review | `ring-2`（2px）+ `ring-offset-2`（2px offset）を使用。AAA 基準の「最小 2px の太さ」は満たしている可能性があるが、`var(--color-ring-normal)` の具体的なコントラスト値は Figma/トークン定義の確認が必要 | AAA 基準。トークン値の実コントラスト比を確認推奨 |
| 2.5.1 | ポインタジェスチャ | A | 単一操作で代替可能 | Pass | マルチポイントジェスチャやパス依存のジェスチャは使用していない。Trigger / Cancel / Action はすべてシングルクリック操作 | ― |
| 2.5.2 | ポインタ取消 | A | Down確定しない | Pass | Button コンポーネントが `onClick`（release時確定）をベースに動作。`onMouseDown` / `onPointerDown` / `onTouchStart` は `@deprecated` 化済み（`src/components/ui/button/index.tsx:313-338`）。Radix Trigger / Cancel / Action もクリック（release）で発火 | プロジェクトポリシーに準拠 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをnameに含む | Pass | DialogTrigger: Stories では `asChild` + Button で可視テキストがアクセシブルネームになる（`index.stories.tsx:36`）。DialogCancel / DialogAction: children テキストがそのままアクセシブルネーム（`index.tsx:162-183`）。DialogTitle: Radix が `aria-labelledby` でダイアログのアクセシブルネームとして使用（テスト `index.test.tsx:136` で確認） | ― |
| 2.5.4 | モーション起動 | A | デバイス動作以外で操作可能 | N/A | デバイスモーション（シェイク、傾き等）による操作は実装されていない | ― |
| 2.5.7 | ドラッグ操作 | AA | 代替操作あり | N/A | ドラッグ操作は実装されていない | ― |
| 2.5.8 | ターゲットサイズ | AA | 24x24px以上 | Pass | Cancel / Action ボタンは `size="sm"` で `h-8 min-w-16`（32px x 64px 以上）（`src/components/ui/button/index.tsx:30`）。24x24px の最低基準を十分に満たす | ― |
| 3.2.1 | フォーカス時 | A | 予期しない動作なし | Pass | フォーカス移動のみでダイアログが開いたり閉じたりすることはない。Trigger はクリック/Enter/Space でのみ発火。Radix AlertDialog のデフォルト動作に準拠 | ― |
| 3.2.2 | 入力時 | A | 意図しない動作なし | N/A | Dialog コンポーネント自体には入力フィールドがない。利用側で children に入力要素を含める場合は利用側の責任 | ― |
| 3.2.4 | 一貫した識別性 | AA | 一貫したラベル | Pass | Cancel / Action は一貫してボタンとしてレンダリングされ、子テキストがラベルになる。Stories の全パターンで「キャンセル」ラベルを一貫使用（`index.stories.tsx:46, 71, 96`） | ― |
| 3.3.1 | エラーの特定 | A | エラーが伝わる | N/A | Dialog コンポーネント自体はフォーム入力やバリデーション機能を持たない | ― |
| 3.3.2 | ラベル又は説明 | A | ラベル/説明あり | Pass | `DialogTitle` と `DialogDescription` を提供。Radix AlertDialog が `aria-labelledby` / `aria-describedby` を自動設定。テスト（`index.test.tsx:106-138`）で aria 属性の紐付けを検証済み | ― |
| 3.3.3 | エラー修正方法 | AA | 修正方法提示 | N/A | Dialog コンポーネント自体はエラーハンドリング機能を持たない | ― |
| 3.3.8 | アクセシブル認証 | AA | 記憶依存でない | N/A | 認証機能は実装されていない | ― |
| 4.1.2 | 名前・役割・値 | A | name/role/状態適切 | Pass | Radix AlertDialog が `role="alertdialog"` を自動付与。`aria-labelledby`（Title由来）/ `aria-describedby`（Description由来）が自動設定されテストで検証済み（`index.test.tsx:136-137`）。Trigger は `<button>` にレンダリングされ適切な role を持つ。Cancel / Action も Button コンポーネント経由でネイティブ button にマッピング | `showCloseButton` prop が存在するが閉じるボタンの実装がない点は別途検討（後述） |
| 4.1.3 | 状態メッセージ | AA | 状態変化が伝わる | Pass | `role="alertdialog"` により、ダイアログの出現が支援技術に通知される。開閉状態は Radix が `data-state="open"/"closed"` で管理し、DOM への追加/削除でスクリーンリーダーに伝達される | ― |

---

## 対応内容（修正が必要な場合）

本レビューはレポート作成のみであり、コード修正は行っていません。以下は検出事項と推奨修正案です。

### 検出事項

#### 1) `showCloseButton` prop の未使用（Needs review）

- **箇所**: `src/components/ui/dialog/index.tsx:78, 81`
- **内容**: `DialogContent` に `showCloseButton` prop（デフォルト `true`）が定義されているが、実際の閉じるボタン（X ボタン）のレンダリングは実装されていない
- **影響**: WAI-ARIA Dialog パターンでは、Escape キー以外にも明示的な閉じる手段を提供することが推奨される。現状は Cancel / Action ボタンで閉じることが可能だが、`showCloseButton=true` のデフォルト値と実際の動作が乖離している
- **推奨**:
  - `showCloseButton` が `true` の場合に X ボタンを表示する実装を追加する
  - または、prop が不要であれば削除して API の一貫性を保つ
  - AlertDialog（確認ダイアログ）の特性上、ユーザーの意図的な選択（Cancel/Action）を求めるのが適切であり、X ボタンを意図的に除外している可能性もある。その場合は prop を削除するか、JSDoc コメントで意図を明記する

#### 2) `flex-col-reverse` による視覚順とフォーカス順の不一致（軽微）

- **箇所**: `src/components/ui/dialog/index.tsx:114`
- **内容**: `DialogFooter` で `flex-col-reverse` を使用しているため、モバイル表示時に Cancel と Action の視覚的な上下順序と Tab キーのフォーカス順序が逆転する
- **影響**: WCAG 2.4.3（フォーカス順序）に厳密に抵触する可能性は低いが、ユーザビリティの観点では注意が必要
- **推奨**: 現状維持で可。ただし、ユーザーテストでフォーカス順の混乱が報告された場合は DOM 順序の見直しを検討

---

## テスト / 検証

- **既存テスト**: `src/components/ui/dialog/index.test.tsx`
  - Trigger + Cancel による開閉テスト（Pass）
  - Escape キーによる閉じ動作テスト（Pass）
  - `aria-labelledby` / `aria-describedby` の自動紐付けテスト（Pass）
- **追加テスト推奨**:
  - フォーカストラップの検証（ダイアログ内でのみ Tab 移動可能であること）
  - ダイアログ閉じ後のフォーカス復帰の検証（Trigger 要素にフォーカスが戻ること）
  - Action ボタンクリック時の閉じ動作テスト
  - `role="alertdialog"` の存在確認テスト

---

## 補足

### Radix AlertDialog vs Dialog の選択について

- 現在の実装では Radix `AlertDialog` を使用しているが、コンポーネント名は `Dialog` となっている
- `AlertDialog` は `role="alertdialog"` を付与し、ユーザーに確認を求めるシナリオ（破壊的アクション等）に適している
- Stories の用途（ネットワーク再試行確認、保存せずに移動の確認、アドレス削除の確認）は `AlertDialog` の意図に合致しており適切
- 汎用的なダイアログ（情報表示、フォーム入力等）にも使う場合は Radix `Dialog`（`role="dialog"`）を別途提供するか、利用ガイドラインに AlertDialog としての用途を明記することを推奨

### 今後のフォローアップ候補

- Storybook の `@storybook/addon-a11y` による自動検査の CI 組み込み
- 1.4.4（テキストサイズ変更）/ 1.4.10（リフロー）の実機ブラウザ検証
- 2.4.13（フォーカスの外観）の `--color-ring-normal` トークン値のコントラスト比確認
- フォーカストラップ・フォーカス復帰のテスト追加
