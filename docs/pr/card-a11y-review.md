# Card a11yレビュー

## 対象

- Component: `Card`
- 関連ファイル
  - `src/components/ui/card/index.tsx`
  - `src/components/ui/card/index.test.tsx`
  - `src/components/ui/card/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1 / 1.4.3 / 1.4.11）は原則Figma側で保証**
  - コードレビューでは原則として修正要求しない
  - ただしトークン逸脱（独自色指定/上書き等）がある場合は `Needs review`

---

## コンポーネント概要

Card コンポーネントは以下のサブコンポーネントで構成される複合コンポーネント:

| サブコンポーネント | HTML要素 | 役割 |
|---|---|---|
| `Card` | `<div>` | 静的なコンテナ（グルーピング用） |
| `ClickableCard` | `<button>` | クリック可能なカード |
| `CardHeader` | `<div>` | ヘッダー領域 |
| `CardTitle` | `<div>` | タイトル表示 |
| `CardDescription` | `<div>` | 説明文 |
| `CardControl` | `<div>` | コントロール配置領域 |
| `CardContent` | `<div>` | 本文コンテンツ領域 |
| `CardFooter` | `<div>` | フッター領域 |

---

## チェック結果

> Result は `Pass / Fail / N/A / Needs review`。
> 本プロジェクトでは「Figma保証」の項目は、トークン逸脱が無い前提で Pass とし、Evidence に方針を記載します。

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Needs review | Card / ClickableCard 自体はアイコンを内包しない。ただし `ClickableCard` は `<button>` であり、利用側で children にテキストを含めないケース（アイコンのみ等）では `aria-label` が必要。コンポーネント側でアクセシブルネーム未指定時の警告は無い。 | 利用ガイドラインで「`ClickableCard` にテキストが含まれない場合は `aria-label` を付与すること」を明記することを推奨。dev warn の追加も検討。 |
| 1.3.4 | 表示の向き | AA | コンテンツの表示を縦横いずれかに限定していない | Pass | CSS に `orientation` 制約なし。Flexbox レイアウトは通常のフロー。 | -- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されている | N/A | Card コンポーネントは入力フィールドを持たない。 | -- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). `ClickableCard` の disabled 状態は `disabled` HTML属性 + `cursor-not-allowed` で色以外にも伝達。 | -- |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). テキスト色は `text-text-middle`、背景は `bg-white` でトークンベース。disabled時は `text-secondary-200` / `bg-white`。 | トークン逸脱があれば `Needs review` |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | フォントサイズに固定px指定なし。`character-4-bold-pro` はトークンベースのタイポグラフィ。パディングは `px-6 py-2 py-4` で相対的なレイアウト。 | -- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). フォーカスリングは `ring-[var(--color-ring-normal)]` でトークンベース。`--color-ring-normal: oklch(0.5478 0.1896 257)` -- 青系。 | トークン逸脱があれば `Needs review` |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | 固定幅指定なし（Stories 内の `w-[272px]` はデモ用）。コンポーネント自体は幅制約なし。 | -- |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | ホバー/フォーカスで追加コンテンツを表示する機能なし。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | `ClickableCard` はネイティブ `<button>` 要素でレンダリング。`type="button"` 指定あり。Enter/Space でのアクティベーションはブラウザネイティブ動作。テストでもキーボード操作を確認済み。 | -- |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | フォーカストラップを実装する要素なし。`tabIndex` の明示的な操作なし。ネイティブのフォーカスフロー。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | カスタムキーボードショートカットの実装なし。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM順序に従う自然なフォーカスフロー。`tabIndex` の明示的な操作なし。`ClickableCard` はネイティブ `<button>` のためデフォルトのタブ順序に含まれる。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `ClickableCard` に `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` を適用。テストでもフォーカススタイルの存在を確認済み（`CLICKABLE_CARD_FOCUS_CLASSES`）。 | -- |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` 等のフォーカスを隠す CSS なし。 | -- |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Pass | `ring-2`（2px）+ `ring-offset-2`（2px offset）。WCAG 2.4.13 の最低 2px 要件を満たす。色は `--color-ring-normal` トークンベース。 | -- |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | `onClick` のみで操作完結。マルチタッチ等の複雑ジェスチャなし。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Pass | `onClick`（release確定）ベース。`onMouseDown` / `onPointerDown` / `onTouchStart` のハンドラ定義なし。 | プロジェクトポリシーに沿い、Down系ハンドラの `@deprecated` + dev warn は未実装だが、そもそもpropsにDown系を独自定義していないため現時点では問題なし。`ButtonHTMLAttributes` 経由で渡すことは可能だが、コンポーネント設計としてリスクは低い。 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Needs review | `ClickableCard` の children がアクセシブルネームとなる。ただし Card 内に複数のサブコンポーネント（CardHeader, CardContent等）を配置する構成では、button の accessible name が全children のテキスト連結となり冗長になる可能性がある。 | 複雑な内容を持つ `ClickableCard` では `aria-label` または `aria-labelledby` で明示的にアクセシブルネームを指定することを推奨。利用ガイドラインへの明記を推奨。 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーション機能なし。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作の実装なし。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass | `ClickableCard` は `py-4`（16px上下パディング）+ コンテンツ分。最小でも 32px 以上の高さ。幅もコンテンツに依存するが、カードコンポーネントの性質上 24px 未満にはならない。 | -- |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `onFocus` でコンテキスト変更を行う実装なし。フォーカス時はスタイル変更のみ（`focus-visible:ring-*`）。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | N/A | Card は入力コンポーネントではない。`ClickableCard` のクリック動作はユーザーが明示的に開始。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | コンポーネントは一貫したAPIとスタイリングを提供。同じ props に対して同じ出力。 | -- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | Card はフォーム入力コンポーネントではない。 | -- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | N/A | Card はフォーム入力コンポーネントではない。 | -- |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | Card はフォーム入力コンポーネントではない。 | -- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証機能なし。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Needs review | **ClickableCard**: `<button>` 要素のため `role="button"` は暗黙的に付与。`disabled` 属性で状態を伝達。ただしアクセシブルネームは children に依存し、保証されていない。**Card**: `<div>` 要素で暗黙の role なし。セマンティック上は `role="region"` や `role="article"` 等が適切な場合があるが、利用側に委ねている（テストでは `role="article"` の例あり）。 | (1) `ClickableCard` に children もしくは `aria-label` が未指定の場合の dev warn 追加を推奨。(2) `Card` のセマンティックロールについて利用ガイドラインへの明記を推奨（`role="region"` + `aria-label` や `<article>` / `<section>` の使い分け等）。 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | N/A | Card コンポーネントには動的な状態メッセージ（loading, success等）の実装なし。`ClickableCard` の disabled 状態は `disabled` HTML属性で伝達。 | -- |

---

## 対応内容（修正が必要な場合）

### Fail 項目: なし

現時点で明確な Fail はありません。

### Needs review 項目: 3件

#### 1) 1.1.1 非テキストコンテンツ / 2.5.3 ラベルを含む名前

**現状**: `ClickableCard` は `<button>` 要素であり、children 全体がアクセシブルネームとなる。以下のリスクがある:

- children がアイコンのみの場合、代替テキストが提供されない
- children が複雑な構造（CardHeader + CardContent + CardFooter）の場合、アクセシブルネームが冗長なテキスト連結になる

**推奨対応**:
1. 利用ガイドラインに以下を明記:
   - `ClickableCard` にはテキストを含む children、または `aria-label` / `aria-labelledby` を必ず指定すること
   - 複雑な内容を持つ `ClickableCard` では `aria-labelledby` で特定の要素（例: CardTitle）を参照することを推奨
2. 開発時警告の追加（オプション）:
   - children が空、または `aria-label` / `aria-labelledby` いずれも未指定の場合に dev warn を出力

#### 2) 4.1.2 名前・役割・値

**現状**:
- `Card`（`<div>`）にはセマンティックな role が付与されていない
- 利用側で `role="article"` 等を指定可能（テストで確認済み）だが、デフォルトでは汎用 `<div>`

**推奨対応**:
1. 利用ガイドラインに `Card` の推奨セマンティクスを明記:
   - 独立したコンテンツ: `role="article"` または `<article>` タグ
   - グルーピング用途: `role="group"` + `aria-label`
   - ランドマーク: `role="region"` + `aria-label`
2. `Card` のデフォルト role 付与は慎重に検討（汎用コンテナとしての柔軟性を損なう可能性あり）

---

## テスト / 検証

### 既存テストの a11y カバレッジ

既存テスト (`index.test.tsx`) では以下の a11y 関連項目がカバーされている:

- **Accessibility describe ブロック** (L611-672):
  - `role="article"` 等の ARIA 属性のパススルー
  - `ClickableCard` への `aria-label`, `aria-describedby` のパススルー
  - キーボードナビゲーション（フォーカス + Enter キー）
- **Disabled State** (L267-293):
  - `disabled` 属性の正しい設定
  - disabled 時のクリック無効化
- **Focus styles** (L201-208):
  - `focus-visible:ring-*` クラスの存在確認
- **Button type** (L180-188):
  - `type="button"` の確認

### 追加テスト推奨

以下のテストケースの追加を推奨:

1. `ClickableCard` に `aria-label` なし + children なしの場合のアクセシブルネーム検証
2. `Card` に `role` 属性を指定した場合の DOM 反映確認（既存テストでカバー済み）
3. `ClickableCard` の disabled 状態で `aria-disabled` も確認

---

## 補足

### 良い点

1. **ネイティブ HTML 要素の活用**: `ClickableCard` が `<button>` を使用しており、キーボード操作・フォーカス管理・disabled 状態がブラウザネイティブで対応される
2. **フォーカススタイル**: `focus-visible` を使用した適切なフォーカスインジケータ実装
3. **type="button"** の明示的指定: フォーム内で意図しない submit を防止
4. **ref 転送**: 全サブコンポーネントで `forwardRef` を使用、外部からの DOM アクセスが可能
5. **props スプレッド**: `...props` パターンにより、利用側で任意の ARIA 属性を追加可能

### 今後の改善候補

1. `ClickableCard` のアクセシブルネーム未指定時の dev warn 追加
2. `Card` のセマンティックロールに関する利用ガイドラインの整備
3. Storybook stories への `aria-label` / `role` の使用例追加
4. `ClickableCard` の `onMouseDown` / `onPointerDown` / `onTouchStart` に対する `@deprecated` + dev warn（プロジェクトポリシー WCAG 2.5.2 準拠、Button と同様の対応）
5. `CardTitle` のセマンティクス検討: 現在 `<div>` だが、見出しレベル（`<h2>` 等）の利用をガイドラインで推奨するか検討
