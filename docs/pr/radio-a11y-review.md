# Radio a11y レビュー

## 対象

- Component: `Radio` / `RadioItem`
- `src/components/ui/radio/index.tsx`
- `src/components/ui/radio/index.test.tsx`
- `src/components/ui/radio/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則 Figma 側で保証**
- **WCAG 2.5.2**: Down 系ハンドラは `@deprecated` 方針（本コンポーネントでは Down 系ハンドラ不使用のため該当なし）

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキストがある | Pass | `index.tsx:297-303` — `label` prop が存在する場合は `<label htmlFor={id}>` で関連付け。Radix UI `RadioGroup.Item` が `role="radio"` を自動付与。 | ラベルなしで使う場合は利用側で `aria-label` を付ける必要があるが、コンポーネント設計として妥当。 |
| 1.3.4 | 表示の向き | AA | 表示を縦向き/横向きに限定していない | Pass | `index.tsx:202` — `className="grid gap-y-2 gap-x-4"` は向き固定なし。CSS で `orientation` を強制する記述もなし。 | - |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されている | N/A | - | ラジオボタンは autocomplete の対象外。 |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass | **Figma/デザインシステム側で保証。** `index.tsx:68` — `isInvalid` 時は `border-negative-500` で視覚的に区別されるが、Radix UI が `data-state="checked"` / `aria-checked` を付与するためプログラム的にも状態が伝わる。`disabled` 属性（L275）も HTML ネイティブ。独自色指定・トークン逸脱なし。 | Figma 保証 + コード上も状態属性で伝達。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラスト比が基準を満たす | Pass | **Figma/デザインシステム側で保証。** デザイントークン（`text-text-medium`, `text-text-disabled`, `neutral-500`, `negative-500` 等）のみ使用。独自色指定なし。 | Figma 保証。コード上トークン逸脱なし。 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが 200% まで拡大されても機能が損なわれない | Pass | `index.tsx:16-18` — ラベルサイズは `character-*-regular-pro` クラスで指定。固定 px 指定ではなくデザイントークン経由。レイアウトは `flex` / `grid` ベースで相対配置。 | ブラウザズーム検証は別途推奨。 |
| 1.4.10 | リフロー | AA | 400% まで拡大しても横スクロールが発生しない | Pass | `index.tsx:202` — `grid gap-y-2 gap-x-4` レイアウトは幅に追従してリフローする。固定幅指定なし。 | 実際の 400% テストはブラウザ確認推奨。 |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスリング・ボーダー等が十分なコントラストを持つ | Pass | **Figma/デザインシステム側で保証。** `index.tsx:58` — `ring-[var(--color-ring-normal)]` トークン使用。`border-neutral-500`, `border-negative-500` 等もデザイントークン。独自色指定なし。 | Figma 保証。コード上トークン逸脱なし。 |
| 1.4.13 | ホバー/フォーカスで表示されるコンテンツ | AA | ツールチップ等が要件を満たす | N/A | - | ホバー/フォーカスで出現するコンテンツ（ツールチップ等）は本コンポーネントに存在しない。 |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | `index.tsx:9` — Radix UI `RadioGroup` を使用。Radix UI は矢印キーによるラジオグループ内ナビゲーション、Space/Enter による選択をネイティブ実装。テスト `index.test.tsx:413-425` でキーボードテストが `.skip` されているが、これは jsdom 制限であり Radix UI 保証。 | E2E テストでのキーボード操作検証を推奨。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | Radix UI `RadioGroup` はフォーカストラップを実装しない。Tab キーでグループ外に移動可能（Radix UI の仕様）。 | - |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | - | 本コンポーネントは独自の単一キーショートカットを実装していない。 |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | `index.tsx:266-306` — DOM 順に `RadioPrimitive.Item` が配置され、`tabIndex` の手動操作なし。Radix UI が `roving tabindex` パターンを実装し、グループ内は矢印キー、グループ外は Tab で論理的に移動。 | - |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `index.tsx:58` — `[.group:focus-visible_&]:ring-2 [.group:focus-visible_&]:ring-[var(--color-ring-normal)] [.group:focus-visible_&]:ring-offset-2` が設定済み。`:focus-visible` 使用でキーボード操作時のみ表示。 | - |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | コンポーネント単体では `overflow: hidden` 等のフォーカス隠蔽要素なし。`index.tsx:202` — `grid` レイアウトで要素の重なり・隠蔽なし。 | ページレベルのレイアウトで確認が必要な場合あり。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータが十分な太さ/コントラスト | Pass | `index.tsx:58` — `ring-2`（2px 幅）と `ring-offset-2`（2px オフセット）が設定。`ring-[var(--color-ring-normal)]` トークン使用。十分な太さを確保。 | AAA 基準の厳密なコントラスト比検証は Figma/デザインシステム側で確認。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | `index.tsx:267-276` — Radix UI `RadioGroup.Item` は単一クリック（タップ）で操作完結。複雑なジェスチャは不要。 | - |
| 2.5.2 | ポインタ取消 | A | アクションを Down イベントで確定していない | Pass | Grep 検索で `onMouseDown` / `onPointerDown` / `onTouchStart` の使用なし。Radix UI `RadioGroup.Item` は `onClick` ベースで動作。プロジェクトポリシー準拠。 | - |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルがアクセシブルネームに含まれる | Needs review | `index.tsx:297-303` — `label` prop を `<label htmlFor={id}>` で描画。ただし `id` prop が必須ではなく、`id` なしで `label` を指定した場合、`<label htmlFor={undefined}>` となり関連付けが壊れる。 | `label` を指定する場合は `id` も必ず指定する必要がある。Props の型定義で `label` と `id` のセット必須化、または `useId()` によるフォールバック生成を検討。 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | - | 本コンポーネントはデバイスモーション（加速度センサー等）を使用しない。 |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | - | 本コンポーネントにドラッグ操作は存在しない。 |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は 24x24px 以上 | Pass | `index.tsx:39-41` — sm: `h-8 w-8`（32px）、md: `h-10 w-10`（40px）、lg: `h-12 w-12`（48px）。全サイズで 24x24px 以上を確保。 | テスト `index.test.tsx:59-61,79-81,97-99` でサイズクラスを検証済み。 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | コンポーネントに `onFocus` による副作用的な処理（ページ遷移・ダイアログ表示等）なし。Radix UI の標準フォーカス挙動のみ。 | - |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `index.tsx:178` — `onValueChange` コールバックは値の変更のみ通知。コンポーネント内部でページ遷移等の副作用なし。テスト `index.test.tsx:145-162` でコールバック挙動を検証済み。 | - |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | `index.tsx:256-307` — `RadioItem` は統一的な Props（`size`, `isInvalid`, `disabled`, `label`）で制御。CVA バリアントにより一貫したスタイリング。Stories `index.stories.tsx` の各ストーリーでも一貫した使用パターン。 | - |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Needs review | `index.tsx:259,68-69` — `isInvalid` prop でエラー状態の視覚スタイル（`border-negative-500`）は適用されるが、`aria-invalid` 属性がプログラム的に設定されていない。スクリーンリーダーにエラー状態が伝わらない可能性がある。 | `isInvalid={true}` 時に `aria-invalid="true"` を `RadioPrimitive.Item` に付与することを推奨。また、エラーメッセージ用の `aria-errormessage` / `aria-describedby` の仕組みも検討。 |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Pass | `index.tsx:297-303` — `label` prop で `<label htmlFor={id}>` を描画。テスト `index.test.tsx:289-303` でラベルの関連付けを検証済み。 | `label` なしの使用も可能だが、その場合は利用側で `aria-label` 等の指定が必要（ドキュメントでの案内を推奨）。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | - | ラジオボタンは選択肢の中から選ぶ UI であり、修正方法の提案（「正しい形式は...」等）は通常不要。エラーメッセージの表示は親フォーム側の責務。 |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | - | 認証コンポーネントではない。 |
| 4.1.2 | 名前・役割・値 | A | 操作要素が適切な role/aria 属性を持つ | Pass | `index.tsx:9,267-276` — Radix UI `RadioGroup.Root` が `role="radiogroup"` を、`RadioGroup.Item` が `role="radio"` と `aria-checked` を自動付与。テスト `index.test.tsx:342-357` で `role="radio"` と `aria-checked` を検証済み。`disabled` は HTML ネイティブ属性で付与（L275）。 | - |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | N/A | - | ラジオボタンの選択変更は `aria-checked` の更新（Radix UI 自動）で伝達。非同期処理やローディング状態は本コンポーネントに存在しない。 |

---

## 対応内容（修正が必要な場合）

### Needs review: 2.5.3 ラベルを含む名前

**問題**: `label` prop を指定しても `id` prop を指定しないと `<label htmlFor={undefined}>` となり、ラベルとラジオボタンの関連付けが壊れる。

**推奨対応**:
- `React.useId()` を利用して、`id` prop が未指定の場合にフォールバック ID を自動生成する
- または TypeScript の型定義で `label` 指定時に `id` を必須にする

**該当箇所**: `src/components/ui/radio/index.tsx:262,269,299`

### Needs review: 3.3.1 エラーの特定

**問題**: `isInvalid` prop が `true` の場合、視覚的なエラースタイル（`border-negative-500`）は適用されるが、`aria-invalid="true"` がプログラム的に設定されていない。スクリーンリーダーユーザーにはエラー状態が伝わらない。

**推奨対応**:
- `RadioPrimitive.Item` に `aria-invalid={isInvalid || undefined}` を追加する
- 将来的にエラーメッセージとの関連付け（`aria-errormessage` / `aria-describedby`）も検討する

**該当箇所**: `src/components/ui/radio/index.tsx:267-276`

---

## テスト / 検証

- 既存テスト `index.test.tsx` は基本的な ARIA 属性（`role="radio"`, `aria-checked`）、disabled 状態、ラベル関連付けをカバー
- キーボードナビゲーションテスト（矢印キー・Space キー）は jsdom 制限のため `.skip` されている（`index.test.tsx:413-425`）
- E2E テスト（Playwright 等）でのキーボード操作検証を推奨
- `aria-invalid` の付与を実装した場合、対応するユニットテストの追加を推奨

---

## 補足

- Radix UI `RadioGroup` は WAI-ARIA Radio Group パターンに準拠しており、`role="radiogroup"` / `role="radio"` / `aria-checked` / roving tabindex / 矢印キーナビゲーション等の基本的なアクセシビリティ機能を内蔵している
- ターゲットサイズは全サイズバリアント（sm=32px, md=40px, lg=48px）で WCAG 2.5.8 の 24x24px 基準を満たしている
- フォーカスインジケータは `:focus-visible` で適切に表示され、`ring-2` + `ring-offset-2` で十分な視認性を確保している
- Down 系イベントハンドラの使用はなく、WCAG 2.5.2 ポインタ取消のプロジェクトポリシーに準拠している
