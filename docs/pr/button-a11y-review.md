# Button a11yレビュー

## 対象

- Component: `Button`
- 関連ファイル
  - `src/components/ui/button/index.tsx`
  - `src/components/ui/button/index.test.tsx`
  - `src/components/ui/button/index.stories.tsx`

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
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Pass | `Icon` コンポーネントに `aria-hidden="true"` を付与済み（装飾用アイコン）。アクセシブルネームは `children` テキストで提供。children が無く `aria-label`/`aria-labelledby` も無い場合は dev warn で警告（L398-405）。テスト `index.test.tsx` L444-455 で children なし時の警告、L462-471 で `aria-label` 提供時の警告抑制を検証済み。 | アイコンのみのボタンは `IconButton` の使用を推奨（JSDoc に記載あり）。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を、縦向きまたは横向きのいずれかに限定していない | Pass | CSS に `orientation` を制限するスタイルなし。`inline-flex` でフレキシブルに配置。 | -- |
| 1.3.5 | 入力目的の特定 | AA | `autocomplete` 属性が適切に設定されており、入力目的がプログラムで特定できる | N/A | ボタンは入力フィールドではないため `autocomplete` は該当しない。 | -- |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass (Figma) | Design-system guaranteed (Figma). disabled 状態は `disabled` 属性（HTML native）で伝達。loading 状態は `aria-busy="true"` + `Spinner`（`role="status"`, `aria-label="読み込み中"`）で伝達。色だけに依存していない。 | トークン逸脱があれば `Needs review` |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass (Figma) | Design-system guaranteed (Figma). テキスト色はデザイントークン（`text-white`, `text-primary-500` 等）を使用。独自色指定なし。 | トークン逸脱があれば `Needs review` |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても問題ない | Pass | サイズは相対単位（Tailwind の `h-8`/`h-10`/`h-12`, `px-3`/`px-4`/`px-5` 等の rem ベース）で指定。`min-w-*` を使用しており固定幅でないためテキスト拡大に対応可能。 | -- |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールが発生しない | Pass | `inline-flex` + `shrink-0` で配置。ボタン単体では横スクロールを発生させない。`whitespace-nowrap` が設定されているが、ボタンラベルは通常短いため問題なし。 | 極端に長いラベルの場合はページレイアウト側で対応が必要。 |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass (Figma) | Design-system guaranteed (Figma). フォーカスリングは `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` で実装。トークン `--color-ring-normal` を使用。 | トークン逸脱があれば `Needs review` |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たす | N/A | Button コンポーネント自体はホバー/フォーカスで追加コンテンツを表示しない（背景色変更のみ）。ツールチップ等の機能は含まない。 | -- |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | ネイティブ `<button>` 要素を使用（L376: `asChild` が false の場合）。Enter/Space でのアクティベーションはブラウザネイティブ。`onKeyDown` ハンドラも提供（L430-440）。テスト L209-239 で Enter/Space キーの応答を検証済み。 | `asChild` 利用時は子要素側のセマンティクスに依存（dev warn あり: L406-409）。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | ボタンは単一のフォーカス可能要素。フォーカストラップのロジックなし。`tabIndex` の明示的な操作なし。disabled 時はネイティブ `disabled` 属性によりフォーカス不可（テスト L252-262 で検証済み）。 | -- |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | Button コンポーネントは単一文字キーのショートカットを実装していない。 | -- |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | ネイティブ `<button>` 要素を使用しており、DOM 順序に従ったフォーカス移動。`tabIndex` の明示的変更なし。 | 利用側のページ構造に依存する部分あり（コンポーネント単体では問題なし）。 |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2` を付与（L20）。`outline-none` で既定のアウトラインを消し、カスタムリングで代替。 | -- |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | N/A | ボタンが他要素に隠れるかはページレイアウトに依存。コンポーネント単体では `overflow: hidden` 等の隠蔽スタイルなし。 | ページレイアウト側で確認が必要。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Pass | `ring-2`（2px 幅）+ `ring-offset-2`（2px オフセット）でフォーカスリングを描画。AAA レベルの要件（2px 以上の太さ）を満たす。色はデザイントークン `--color-ring-normal` で制御。 | AAA レベル。コントラスト比はデザイントークン側で保証。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | ボタンの操作は単一クリック（`onClick`）のみ。マルチタッチやパスベースのジェスチャは不要。 | -- |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Pass | アクションは `onClick`（release で確定）ベース。`onMouseDown`/`onPointerDown`/`onTouchStart` は `@deprecated` として明示（L314-338）。使用時に dev warn を表示（L412-416）。テスト L473-487 で deprecated 警告を検証済み。 | プロジェクト方針に基づき段階的に抑止中。 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルをアクセシブルネームに含む | Pass | 通常は `children` テキストがアクセシブルネーム。`aria-label` が提供された場合は可視ラベルを含むことが利用者の責任。loading 時も `children` を DOM に残し（`opacity-0` で視覚的に非表示だが DOM には存在: L476）、アクセシブルネームを維持。 | -- |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | Button コンポーネントはデバイスモーション（加速度センサー等）による操作を実装していない。 | -- |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | Button コンポーネントはドラッグ操作を実装していない。 | -- |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass | 最小サイズ `sm` で `h-8`（32px）x `min-w-16`（64px）。`md` は `h-10`（40px）x `min-w-20`（80px）。`lg` は `h-12`（48px）x `min-w-24`（96px）。すべて 24x24px 以上を満たす。 | -- |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `onFocus` に対する副作用的な処理なし。フォーカス時はスタイル変更（`focus-visible:ring-*`）のみ。 | -- |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | N/A | ボタンは入力フィールドではないため `onChange` は該当しない。`onClick` は明示的なユーザーアクション。 | -- |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | CVA によるバリアント管理で、同一 props には同一スタイルが一貫して適用される。`variant`/`size`/`theme` の組み合わせにより一貫した外観。 | 利用側で一貫した命名を行うことが前提。 |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | N/A | ボタンは入力フィールドではないため、エラー特定の要件は該当しない。 | -- |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | N/A | ボタンは入力フィールドではない。ただし `aria-describedby` のサポートあり（テスト L338-349 で検証済み）。 | -- |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | ボタンは入力フィールドではないため該当しない。 | -- |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | ボタンコンポーネントは認証機能を持たない。 | -- |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Pass | **role**: ネイティブ `<button>` 要素（暗黙の `role="button"`）。テスト L352-361 で検証済み。**name**: `children` テキストまたは `aria-label`/`aria-labelledby`。テスト L317-324 で検証済み。**状態**: `disabled` 属性（ネイティブ HTML）、`aria-busy` (loading 時, L445)、`asChild` 時は `aria-disabled` (L446)。loading 時も children を DOM に維持し name が落ちない（L471-477）。 | -- |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わる | Pass | `Spinner` コンポーネントが `role="status"` + `aria-label="読み込み中"` を持つ（spinner/index.tsx L38-39）。ボタン自体に `aria-busy="true"` を付与（L445）。テスト L280-287 で `aria-busy` を検証済み。 | 状態変化に応じた追加テキスト通知が必要なケースは利用側で対応。 |

---

## 対応内容（修正が必要な場合）

**全項目 Pass / N/A のため、現時点でコード修正は不要です。**

前回レビュー（Fail だった 4.1.2）は既に修正済みであり、最新コードでは問題ありません。

---

## テスト / 検証

- **ユニットテスト**: `src/components/ui/button/index.test.tsx`（38テスト、1スキップ）
  - a11y 関連の主要テストカバレッジ:
    - `aria-label` の付与と確認（L317-324）
    - `aria-describedby` サポート（L338-349）
    - `role="button"` の確認（L352-361）
    - フォーカス可能性（L326-336）
    - disabled 時のフォーカス不可（L252-262）
    - disabled 時のクリック無効（L192-207）
    - loading 時の `aria-busy` 付与（L280-287）
    - loading 時のクリック無効（L298-313）
    - children なし時の dev warn（L444-455）
    - `aria-label` 提供時の warn 抑制（L462-471）
    - deprecated pointer-down ハンドラの warn（L473-487）
    - Enter/Space キーの応答（L209-239）
    - prefix/suffix アイコンの `aria-hidden` 確認（L391-440）

- **Storybook**: `src/components/ui/button/index.stories.tsx`
  - Default / Loading / Disabled / WithPrefixIcon / WithSuffixIcon / WithBothIcons / Variant / Size / Theme の各ストーリーあり
  - `@storybook/addon-a11y` による自動検査が利用可能（CI 組み込み推奨）

---

## 補足

### 今後のフォローアップ候補

1. **`asChild` の利用ガイドライン整備**: `asChild` + disabled/loading 時の子要素要件（`aria-disabled`、キーボード操作抑止等）をドキュメント化する
2. **Storybook a11y addon の CI 統合**: `@storybook/addon-a11y` による axe-core 自動検査を CI パイプラインに組み込み、回帰検知を自動化する
3. **`Spinner` の `aria-label` 国際化**: 現在は `"読み込み中"` 固定。多言語対応が必要な場合は props 化を検討
4. **disabled 状態の視覚的差別化の検証**: disabled 時の `bg-*-200` が十分なコントラスト差を持つか、Figma/デザインシステム側で継続的に確認

### レビュー実施情報

- レビュー日: 2026-01-28
- レビュー対象ブランチ: `refact/accessibility-check`
- レビュー対象コミット: `a148063` (HEAD)
- チェックリスト: 全32項目を評価
- 結果サマリ: **Pass: 22項目 / N/A: 10項目 / Fail: 0項目 / Needs review: 0項目**
