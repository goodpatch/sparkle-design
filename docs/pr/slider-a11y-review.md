# Slider a11yレビュー

## 対象

- Component: `Slider`
- 関連ファイル
  - `src/components/ui/slider/index.tsx`
  - `src/components/ui/slider/utils.ts`
  - `src/components/ui/slider/index.test.tsx`
  - `src/components/ui/slider/index.stories.tsx`

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
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Needs review | Radix UI `SliderPrimitive.Root` は内部で `role="slider"` を Thumb に付与し、`aria-valuemin` / `aria-valuemax` / `aria-valuenow` を自動設定（テストで確認済み: `index.test.tsx:56-58`）。ただし、コンポーネント自体に `aria-label` や `aria-labelledby` の明示的な prop が定義されていない。`...props` 経由で渡すことは可能だが、使用側で省略されるリスクがある。 | **スライダーの用途を示すアクセシブルネーム（`aria-label` または `aria-labelledby`）が使用側で必須。** 使用ガイドラインでの明記、または dev warn の追加を推奨。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を、縦向きまたは横向きのいずれかに限定していない | Pass | `orientation` prop は型定義で除外されており（`index.tsx:63-64`）、横方向のみの設計。ただしこれはコンポーネントの UI パターンとして合理的であり、ページ全体の向き固定ではないため問題なし。CSS に `@media (orientation: ...)` による制限もない。 | -- |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されており、入力目的がプログラムで特定できる | N/A | スライダーは `autocomplete` の対象外。テキスト入力フィールドではない。 | -- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). 無効状態は `disabled` 属性 + `aria-disabled="true"`（`index.tsx:176-177`）で伝達。色変化（`bg-neutral-200` / `text-text-disabled`）に加え、`cursor-not-allowed` でカーソル形状も変更。`pointer-events-none` で操作不可を明示。 | トークン逸脱なし。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). 値表示テキストは `text-text-middle`（有効時）/ `text-text-disabled`（無効時）のデザイントークンを使用（`index.tsx:209-211`）。 | トークン逸脱なし。 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | レイアウトは `flex` ベース（`index.tsx:173`）。Thumb サイズは `h-4 w-4`（1rem = 16px、rem ベース）で相対サイズ。値表示は `character-3-regular-mono` トークンで相対サイズ。`min-w-0` と `flex-1` により柔軟なリサイズが可能。 | -- |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). フォーカスリングは `ring-[var(--color-ring-normal)]` トークンを使用（`index.tsx:45`）。Thumb ボーダーは `border-neutral-500` トークン（`index.tsx:42`）。Track は `bg-neutral-200`、Range は `bg-primary-500` トークンを使用。 | トークン逸脱なし。 |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | コンテナは `flex w-full`（`index.tsx:173`）で親幅に追従。スライダー本体は `flex-1 min-w-0`（`index.tsx:16`）で縮小可能。値表示は `flex-shrink-0`（`index.tsx:208`）だが、`minWidth` は `ch` 単位の相対指定で最小限。 | 極端に狭いビューポートでは値表示領域がスライダーを圧迫する可能性あり。実機での確認推奨。 |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | スライダーにはホバー/フォーカスで追加表示されるコンテンツ（ツールチップ等）がない。値表示は常時可視。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | Radix UI `SliderPrimitive` がキーボード操作を保証。Thumb に `role="slider"` と `tabindex="0"` が自動付与（テスト `index.test.tsx:347` で確認）。Arrow Left/Right で値変更、Home/End で最小/最大値設定が可能（テスト `index.test.tsx:169-238` で確認）。 | -- |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | 単一の Thumb 要素（`tabindex="0"`）で構成。フォーカストラップのロジックなし。Tab キーで次の要素へ移動可能。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | カスタムキーボードショートカットは実装されていない。Arrow / Home / End キーはフォーカス中のみ有効であり、WCAG 2.1.4 の対象外（フォーカス中の操作キーは許容）。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | DOM 順序に従い、スライダー Thumb → 値表示（非フォーカス要素）の構成。`tabIndex` のカスタマイズなし。外側の `div` はフォーカス不可。 | -- |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | Thumb に `focus:ring-2 focus:ring-[var(--color-ring-normal)] focus:ring-offset-2` を適用（`index.tsx:45`）。`focus:outline-hidden` で outline を非表示にし、ring で代替。`focus:bg-primary-100 focus:border-primary-200` で背景色・ボーダー色も変更。 | `focus-visible` ではなく `focus` を使用しているため、マウスクリック時にもリングが表示される。スライダーは drag 操作を伴うため許容範囲だが、`focus-visible` への変更も検討可。 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `overflow: hidden` による遮蔽なし。Track に `overflow-hidden`（`index.tsx:190`）があるが、これは Range のスタイリング用であり Thumb には影響しない（Thumb は Track の外に配置）。`ring-offset-2` によりフォーカスリングが要素外に表示される。 | 親コンテナで `overflow: hidden` を使用する場合は注意。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Needs review | `ring-2`（2px）で太さは十分。`ring-offset-2`（2px）でオフセットあり。ただし `--color-ring-normal` の実際のコントラスト比はトークン定義に依存し、AAA 基準（3:1 以上の面積比）の厳密検証にはトークン値の確認が必要。 | AAA 基準のため厳密検証にはトークン値の確認が必要。デザインシステム側での保証が前提。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | スライダーはドラッグ操作（Track/Thumb のポインタ移動）に加え、クリック（Track 上の任意位置をクリック）でも値設定可能。Radix UI がネイティブに提供。キーボード操作（Arrow / Home / End）でも完全に代替可能。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させない | Pass | コンポーネントコードに `onMouseDown` / `onPointerDown` / `onTouchStart` ハンドラの定義なし。Radix UI の内部実装ではドラッグ操作に `pointerdown` を使用するが、これはスライダーの操作特性上必要であり、ドラッグ中にポインタを離すことで値が確定する（ドラッグ中のキャンセルが可能）。プロジェクトポリシーに従い、Down 系ハンドラは @deprecated 対象だが、スライダーのドラッグ操作は例外的に許容。 | -- |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Needs review | スライダー自体には可視ラベル（テキストラベル）がない。値表示（`currentValue[0]` + `unit`）はラベルではなく現在値の表示。コンポーネント単体では `aria-label` / `aria-labelledby` が未設定のため、使用側でラベルを関連付ける必要がある。 | **使用側で `aria-label` または `aria-labelledby` を指定するガイドラインが必要。** 例: `<label id="volume-label">音量</label><Slider aria-labelledby="volume-label" />` |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | デバイスモーションによる操作は実装されていない。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | Pass | ドラッグ操作の代替としてキーボード操作（Arrow Left/Right で増減、Home/End で最小/最大値、Page Up/Down でステップ倍増減）が Radix UI により提供。Track のクリックでも値設定可能。テスト `index.test.tsx:169-238` で Arrow / Home / End キーの動作を確認済み。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass (修正済み) | `index.tsx` — Thumb に `::before` 疑似要素（`before:min-h-6 before:min-w-6`）を追加し、タッチターゲットを 24x24px 以上に拡張。視覚的なサイズ（16x16px）は維持しつつ、透明なヒット領域で WCAG 2.5.8 を満たす。 | 修正コミット: `♿ fix(slider): アクセシビリティ改善` |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | フォーカス時に値の変更やページ遷移等の副作用なし。フォーカスリング表示と背景色変更（`focus:bg-primary-100`）のみ（`index.tsx:44`）。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `onValueChange` コールバックは状態変更の通知のみ（`index.tsx:154-162`）。ページ遷移やフォーム送信等の副作用はコンポーネント内にない。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | 同一コンポーネントを再利用する設計。Storybook の各ストーリー（Default / Disabled / Controlled / WithUnit）で一貫した構造を使用（`index.stories.tsx`）。 | -- |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | スライダーは min/max の範囲制約が内蔵されており、ユーザーが無効な値を入力することができない設計。`aria-valuemin` / `aria-valuemax` で範囲が明示されている。エラー状態の概念がない。 | -- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Needs review | コンポーネント単体にはラベル要素（`<label>`）や `aria-label` が含まれていない。`...props` 経由で `aria-label` / `aria-labelledby` を渡すことは可能だが、明示的な `label` prop は提供されていない。`aria-valuetext` の指定もサポートされていない（数値の意味を文脈で説明するため）。 | **1. 使用ガイドラインで `aria-label` または外部 `<label>` との関連付けを必須と明記。** **2. `aria-valuetext` prop の追加を検討**（例: 値が「50%」の場合に「半分」と読み上げるため）。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | スライダーは範囲制約が内蔵されており、無効な入力が発生しない設計。エラー修正の提案は不要。 | -- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | 認証コンポーネントではない。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Needs review | Radix UI が `role="slider"` を Thumb に付与（テスト `index.test.tsx:335` で確認）。`aria-valuenow` / `aria-valuemin` / `aria-valuemax` が自動設定（テスト `index.test.tsx:56-58, 337-339` で確認）。`disabled` 属性と `aria-disabled` が Root に設定（`index.tsx:176-177`）。ただし **アクセシブルネーム（`aria-label` / `aria-labelledby`）が未設定の場合、スクリーンリーダーは「スライダー、50」のように用途不明の読み上げになる。** | **`aria-label` または `aria-labelledby` が未指定の場合に dev warn を出す仕組みの追加を推奨。** `aria-valuetext` のサポートも検討（数値の文脈的意味を伝えるため）。 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | スライダー値の変化は `aria-valuenow` の値変更で自動的に支援技術に伝わる。Radix UI の `SliderPrimitive` が適切に管理。値表示テキスト（`index.tsx:215-216`）は視覚的な補助であり、`aria-valuenow` が主要な伝達手段。 | -- |

---

## 対応が必要な項目のサマリ

### ~~Fail~~ → 修正済み: 1件

#### 2.5.8 ターゲットサイズ（最小）(Level AA) → **修正済み**

- **問題**: Thumb の視覚サイズが `h-4 w-4`（16x16px）で、WCAG 2.5.8 の最小基準 24x24px を満たさない
- **対応**: Thumb に `::before` 疑似要素（`before:min-h-6 before:min-w-6`）を追加し、タッチターゲットを 24x24px 以上に拡張（コミット: `♿ fix(slider): アクセシビリティ改善`）
- 視覚的なサイズ（16x16px）は維持しつつ、透明なヒット領域で要件を満たす

### Needs review: 5件

#### 1.1.1 非テキストコンテンツ / 2.5.3 ラベルを含む名前 / 3.3.2 ラベル又は説明 / 4.1.2 名前・役割・値 (共通課題)

- **問題**: コンポーネント単体に `aria-label` / `aria-labelledby` / `<label>` の明示的な仕組みがない
- **影響**: 使用側で適切なラベルを付与しないと、スクリーンリーダーがスライダーの用途を認識できない
- **修正提案**:
  1. 使用ガイドライン/Storybook ドキュメントで `aria-label` または `aria-labelledby` の指定を必須と明記
  2. 開発環境での dev warn 追加（`aria-label` も `aria-labelledby` も未指定の場合に警告）
  3. `aria-valuetext` prop のサポート追加を検討（数値の文脈的意味を伝えるため）

#### 2.4.13 フォーカスの外観 (Level AAA)

- **問題**: フォーカスリングの `--color-ring-normal` トークン値のコントラスト比が未検証
- **影響**: AAA 基準の厳密な充足が不明
- **修正提案**: デザインシステム側でトークン値のコントラスト比を確認

---

## テスト / 検証

### 既存テストのカバレッジ

テストファイル `src/components/ui/slider/index.test.tsx` で以下のアクセシビリティ関連項目が検証済み:

- **ARIA 属性の正確性**: `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`（テスト `has proper ARIA attributes`）
- **キーボード操作**: Arrow Left/Right, Home/End キーでの値変更（テスト `handles keyboard navigation with arrow keys`, `handles Home and End keys`）
- **フォーカス管理**: `tabindex="0"`, フォーカス可能性（テスト `supports keyboard navigation`, `provides proper focus management`）
- **無効状態**: `aria-disabled="true"`, キーボード操作の無効化（テスト `applies disabled state`, `does not respond to keyboard events when disabled`）
- **値更新**: `aria-valuenow` の値変更反映（テスト `updates aria-valuenow when value changes`）

### 追加検証の推奨事項

1. **スクリーンリーダーテスト**: `aria-label` 指定時と未指定時の読み上げ内容を VoiceOver / NVDA で確認
2. **ターゲットサイズ**: 実機（タッチデバイス）での Thumb タップ精度を確認
3. **E2E テスト**: Playwright 等でのドラッグ操作 + キーボード操作の統合テスト
4. **200%/400% ズーム**: 実ブラウザでのレイアウト崩れ確認

---

## 補足

### Radix UI SliderPrimitive の保証範囲

Radix UI の `Slider` プリミティブは以下のアクセシビリティ機能をネイティブに提供:

- `role="slider"` の Thumb 要素
- `aria-valuenow` / `aria-valuemin` / `aria-valuemax` / `aria-orientation` の自動管理
- キーボード操作（Arrow, Home, End, Page Up/Down）
- `disabled` 属性によるインタラクション無効化
- ポインタ操作（Track クリック + Thumb ドラッグ）

### orientation の制限について

`orientation` prop が型定義で除外されている（`index.tsx:63-64`）のは、Sparkle Design が横方向のみをサポートする設計判断であり、WCAG 1.3.4（表示の向き）には影響しない。これはコンポーネントの方向であり、ページの表示向きの制限ではないため。

### 値表示（Value Indicator）について

スライダーの右側に表示される値テキスト（`index.tsx:206-217`）は `<span>` 要素で、ARIA ロールなし。この値は `aria-valuenow` と同期しており、視覚的な補助として機能。`aria-live` は不要（`aria-valuenow` の変更が支援技術に自動伝達されるため）。
