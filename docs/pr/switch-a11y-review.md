# Switch a11yレビュー

## 対象

- Component: `Switch`
- 関連ファイル
  - `src/components/ui/switch/index.tsx`
  - `src/components/ui/switch/index.test.tsx`
  - `src/components/ui/switch/index.stories.tsx`

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
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Needs review | Radix UI `SwitchPrimitive.Root` が `role="switch"` を出力（`index.tsx:97`）。`...props` 経由で `aria-label` / `aria-labelledby` を渡せる（`index.tsx:100`）。テストで `aria-label` の受け渡しを確認済み（`index.test.tsx:262-274`）。ただしコンポーネント自体は可視ラベルを内包しない。 | **`aria-label` や外部 `<label>` なしで使用するとアクセシブルネームが空になる。** 使用側ガイドラインで `aria-label` または外部 `<label htmlFor>` の必須化を推奨。dev 環境での未設定警告の追加も検討。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を、縦向きまたは横向きのいずれかに限定していない | Pass | CSS に `orientation` 固定はなし。`inline-flex` ベースで縦横に適応可能（`index.tsx:16`）。 | -- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されており、入力目的がプログラムで特定できる | N/A | スイッチは `autocomplete` の対象外。 | -- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). チェック済み状態は thumb の位置変化（`translate-x` による移動、`index.tsx:41-43`）と色変化の両方で表現。無効状態は `disabled` 属性（`index.tsx:20`）+ `cursor-not-allowed` で視覚的にも伝達。 | トークン逸脱なし。色だけでなく thumb 位置でもオン/オフが区別可能。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). コンポーネント自体にテキストは含まれない。背景色はデザイントークン（`primary-500`, `neutral-500` 等）を使用（`index.tsx:18-19`）。 | トークン逸脱なし。 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | コンポーネント自体にテキストは含まれない。サイズは Tailwind クラス（`h-4/6/8`, `w-7/11/[60px]`）で指定（`index.tsx:25-27`）。`inline-flex` 構成のため200%拡大でもレイアウト崩れなし。 | -- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). フォーカスリングは `ring-[var(--color-ring-normal)]` トークンを使用（`index.tsx:17`）。ボーダーは `border-neutral-600` / `border-primary-600` トークンを使用（`index.tsx:18-19`）。 | トークン逸脱なし。 |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | コンポーネントは `inline-flex` の単一要素構成。最大幅は `w-[60px]`（lg サイズ、`index.tsx:27`）でビューポートを占有しない。 | -- |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | スイッチにはホバー/フォーカスで追加表示されるコンテンツ（ツールチップ等）がない。ホバー時は背景色変化のみ（`index.tsx:18-19`）。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Radix UI `SwitchPrimitive.Root` は `<button>` をレンダリングし、Space キーでトグル操作可能。テストで Space / Enter キーイベントのハンドリングを確認済み（`index.test.tsx:151-168`）。`role="switch"` の検証済み（`index.test.tsx:52`）。 | jsdom 環境ではキーボードによるネイティブ状態トグルが動作しないため、E2E テストでの Space キー操作確認を推奨。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | 単一のインタラクティブ要素（`<button>`）で構成（`index.tsx:97-106`）。フォーカストラップのロジックなし。Tab キーで次の要素へ移動可能。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | カスタムキーボードショートカットは実装されていない。Radix UI の Space キーはフォーカス中のみ有効（フォーカスが必須条件）。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM 順序に従う（単一の `<button>` 要素）。`tabIndex` のカスタマイズなし（`index.tsx:95-108`）。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` が適用（`index.tsx:17`）。テストで `focus-visible:outline-hidden` と `focus-visible:ring-2` の存在を確認済み（`index.test.tsx:250-259`）。 | -- |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` や `position: fixed/absolute` による遮蔽なし。`ring-offset-2` によりフォーカスリングが要素外に表示される（`index.tsx:17`）。 | 親コンテナで `overflow: hidden` を使用する場合は注意。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Needs review | `ring-2`（2px）で太さは十分。`ring-offset-2`（2px）でオフセットあり（`index.tsx:17`）。ただし `--color-ring-normal` の実際のコントラスト比はトークン定義に依存。 | AAA 基準のため厳密検証にはトークン値の確認が必要。デザインシステム側での保証が前提。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | クリック（シングルタップ）のみで操作。ドラッグ、マルチタッチ等の複雑操作なし。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Pass | `onClick` ベース（release で確定）。`onMouseDown` / `onPointerDown` / `onTouchStart` のハンドラはコンポーネント内で定義されていない（grep で確認済み）。Radix UI の内部実装も `click` イベントベース。 | -- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | N/A | コンポーネント自体に可視ラベルは含まれない（thumb のみの構成、`index.tsx:95-108`）。アクセシブルネームは外部から `aria-label` / `aria-labelledby` / 外部 `<label>` で付与する設計。可視ラベルが無い場合は 1.1.1 / 4.1.2 で担保。 | -- |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーションによる操作は実装されていない。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass (修正済み) | `index.tsx` — sm サイズに `::before` 疑似要素（`before:min-h-6`）を追加し、タッチターゲットを 24px 以上に拡張。ベーススタイルに `relative` を追加して疑似要素の基準点を設定。視覚的なサイズ（16px 高）は維持しつつ要件を満たす。md（24px）/ lg（32px）は元から 24px 以上。 | 修正コミット: `♿ fix(switch): アクセシビリティ改善` |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | フォーカス時に `onFocus` でのコンテキスト変更やページ遷移等なし。フォーカスリング表示のみ（`index.tsx:17`）。フォーカス可能であることをテストで確認済み（`index.test.tsx:241-248`）。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `onCheckedChange` コールバックは状態変更の通知のみ（`index.tsx:78`）。ページ遷移やフォーム送信等の副作用なし。テストで確認済み（`index.test.tsx:115-137`）。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | 同一コンポーネントを再利用する設計。Storybook の各ストーリーで一貫した構成（`index.stories.tsx`）。CVA によるバリアント管理で視覚的にも一貫性を担保（`index.tsx:14-54`）。 | -- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | スイッチコンポーネントにはエラー状態（`isInvalid` 等）の概念がない。オン/オフのトグルのみで、バリデーションエラーは発生しない。 | -- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Needs review | コンポーネント自体は `<label>` を内包しない（`index.tsx:95-108`）。`aria-label` / `aria-labelledby` は `...props` 経由で渡せる（`index.tsx:100`）。テストで `aria-label` サポートを確認済み（`index.test.tsx:262-274`）。ただし、ラベル付与は使用側の責務であり、コンポーネント単体ではラベルなしで使用可能。 | **使用側でラベルが必ず付与されるようガイドラインを整備すべき。** Storybook のストーリーにも `aria-label` または外部 `<label>` を組み合わせた使用例を追加することを推奨。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | スイッチにはエラー状態がないため該当しない。 | -- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証コンポーネントではない。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Needs review | Radix UI が `role="switch"` を出力（テスト `index.test.tsx:52` で確認）。`aria-checked` が `true` / `false` で状態を反映（テスト `index.test.tsx:99-113` で確認）。`disabled` 属性で無効状態を反映（テスト `index.test.tsx:183-189` で確認）。ただし `aria-label` / `aria-labelledby` / 外部 `<label>` なしの場合にアクセシブルネームが空になる。 | **アクセシブルネーム未設定時の dev warn を推奨。** `role="switch"` + `aria-checked` + `disabled` の基本構造は適切。 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | スイッチの状態変化は `aria-checked` の値変更（`true` / `false`）で自動的に支援技術に伝わる。Radix UI の `SwitchPrimitive` が `data-state` と `aria-checked` を適切に管理（テスト `index.test.tsx:99-113` で確認）。 | -- |

---

## 対応が必要な項目のサマリ

### ~~Fail~~ → 修正済み: 1件

#### 2.5.8 ターゲットサイズ（最小） (Level AA) → **修正済み**

- **問題**: sm サイズの高さが `h-4`（16px）で、WCAG 2.5.8 の最小ターゲットサイズ 24x24px を満たさない
- **対応**: sm サイズに `::before` 疑似要素（`before:min-h-6`）を追加し、タッチターゲットを 24px 以上に拡張。ベーススタイルに `relative` を追加（コミット: `♿ fix(switch): アクセシビリティ改善`）
- 視覚的なサイズ（16px 高）は維持しつつ、透明なヒット領域で要件を満たす

### Needs review: 4件

#### 1.1.1 非テキストコンテンツ / 4.1.2 名前・役割・値 (Level A)

- **懸念**: `aria-label` / `aria-labelledby` / 外部 `<label>` なしで使用するとアクセシブルネームが空になる
- **対応**:
  1. 使用ガイドラインに `aria-label` または外部 `<label htmlFor>` の必須化を明記
  2. dev 環境で未設定時に `console.warn` を出す仕組みを検討
  3. Storybook のサンプルにラベル付き使用例を追加

#### 2.4.13 フォーカスの外観 (Level AAA)

- **懸念**: `--color-ring-normal` トークンの実際のコントラスト比が不明
- **対応**: デザインシステム側のトークン定義で AAA 基準を満たしているか確認が必要

#### 3.3.2 ラベル又は説明 (Level A)

- **懸念**: コンポーネント単体ではラベルを持たず、使用側でのラベル付与が必要
- **対応**:
  1. Storybook のストーリーに `aria-label` または `<label>` との組み合わせ例を追加
  2. ドキュメントにラベル付与の必須性を明記

---

## テスト / 検証

### 既存テストの評価

- **初期状態テスト**: `role="switch"`, `data-state`, `aria-checked` の検証 -- Pass（`index.test.tsx:48-54, 99-113`）
- **サイズバリアントテスト**: sm/md/lg の CSS クラスを検証 -- Pass（`index.test.tsx:57-96`）
- **ユーザー操作テスト**: クリックによる状態トグル、コールバック呼び出し -- Pass（`index.test.tsx:140-179`）
- **無効状態テスト**: クリック無効、disabled 属性、disabled スタイリング -- Pass（`index.test.tsx:182-223`）
- **a11yテスト**: `role="switch"`, `aria-checked`, `aria-label`, フォーカス可否、フォーカススタイル -- Pass（`index.test.tsx:225-275`）
- **キーボードテスト**: Space / Enter キーの `onKeyDown` ハンドラ呼び出し -- Pass（`index.test.tsx:151-168`）※ ネイティブ状態トグルの確認は jsdom 制限により不可

### 追加が望ましいテスト

1. sm サイズのターゲットサイズ検証（修正後）
2. `aria-label` なし + 外部 `<label>` なしでの dev warn テスト（導入時）
3. E2E: Space キーでの実際の状態トグル操作
4. Storybook: ラベル付きの使用パターン（`aria-label` / 外部 `<label>`）

---

## 補足

- Radix UI の `SwitchPrimitive` はネイティブな `<button>` ベースでレンダリングされるため、基本的なキーボード操作・フォーカス管理は堅牢
- `role="switch"` + `aria-checked` により、支援技術がスイッチの状態を正しく認識可能
- thumb の位置変化（`translate-x`）により、色以外の視覚的手がかりでもオン/オフ状態を区別できる（1.4.1 に貢献）
- `onMouseDown` / `onPointerDown` / `onTouchStart` 等の Down 系ハンドラは使用されておらず、WCAG 2.5.2 に適合（プロジェクトポリシーの `@deprecated` 方針に合致）
- コンポーネントが可視ラベルを内包しない設計のため、使用側でのラベル付与ガイドラインの整備が最も重要なアクション項目
