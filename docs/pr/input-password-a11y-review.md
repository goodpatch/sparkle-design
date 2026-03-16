# InputPassword a11y レビュー

## 対象

- Component: `InputPassword`
- 関連ファイル:
  - `src/components/ui/input-password/index.tsx` (メインコンポーネント)
  - `src/components/ui/input-password/index.test.tsx` (テスト)
  - `src/components/ui/input-password/index.stories.tsx` (Storybook)
  - `src/components/ui/input/index.tsx` (親Inputコンポーネント)
  - `src/components/ui/icon-button/index.tsx` (トグルボタンコンポーネント)

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則Figma側で保証**
- **WCAG 2.5.2**: Down系ハンドラは `@deprecated` 方針で段階的に排除

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキスト（アクセシブルネーム/説明）がある | Pass | `input-password/index.tsx:51-53` -- `triggerAriaLabel` に「パスワードを隠す」/「パスワードを表示する」が設定。`input/index.tsx:341` -- IconButton に `aria-label={triggerAriaLabel}` を渡している。 | visibility アイコン（非テキスト）に対し状態に応じた aria-label が提供されており、適切。 |
| 1.3.4 | 表示の向き | AA | コンテンツやコンポーネントの表示を縦横いずれかに限定していない | Pass | `input/index.tsx:14` -- flexbox ベースのレイアウト。CSSで orientation を強制する記述なし。 | 横/縦いずれでも機能する汎用レイアウト。 |
| 1.3.5 | 入力目的の特定 | AA | autocomplete 属性が適切に設定されている | Needs review | `input-password/index.tsx:9-17` -- InputPasswordProps は InputProps を継承しており autocomplete を受け付ける。しかしデフォルト値としての `autoComplete="current-password"` 等は設定されていない。 | パスワード入力欄として `autoComplete="current-password"` または `"new-password"` をデフォルトで設定するか、Storybook/ドキュメントでの使用例に明示すべき。利用者側での設定に委ねる設計であれば許容可能だが、ガイドの追記を推奨。 |
| 1.4.1 | 色の使用 | A | 情報や状態を色だけで伝えていない | Pass | Figma保証。`input/index.tsx:23-24` -- `isInvalid: true` は `border-negative-500` でボーダー色変更だが、`disabled` 属性や `cursor-not-allowed` 等の追加表現もある。 | Figma/デザインシステム側で保証。コード上でトークン逸脱なし。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストのコントラストが基準を満たす | Pass | Figma保証。デザイントークン (`text-text-high`, `text-text-placeholder`, `text-text-disabled`) を使用。 | Figma/デザインシステム側で保証。独自色指定なし。 |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大されても機能が損なわれない | Pass | `input/index.tsx:14` -- `w-full` で幅は親に追従。高さは `h-8/h-10/h-12` 固定だがテキストサイズ拡大時にオーバーフローしない設計。 | ブラウザテストでの確認を推奨。 |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等が必要なコントラストを満たす | Pass | Figma保証。`input/index.tsx:31` -- `ring-2 ring-[var(--color-ring-normal)] ring-offset-2` でフォーカスリング表示。`icon-button/index.tsx:17` -- `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)]`。 | Figma/デザインシステム側で保証。 |
| 1.4.10 | リフロー | AA | 400%拡大でも横スクロールが発生しない | Needs review | `input/index.tsx:14` -- `w-full` で親に追従するが、`h-8/h-10/h-12` の固定高さが400%拡大時に問題になる可能性。 | ブラウザの実環境でズーム400%テストを推奨。 |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ホバー/フォーカスで出現するコンテンツの要件 | N/A | InputPassword にはツールチップやポップオーバー等の出現コンテンツなし。 | 該当なし。 |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | Pass | `input/index.tsx:312` -- input は `<input>` ネイティブ要素でキーボード入力可能。`icon-button/index.tsx:379` -- `<button>` ネイティブ要素で Enter/Space キーで操作可能。`input-password/index.test.tsx:263-301` -- キーボードナビゲーションのテストあり。 | ネイティブ HTML 要素を使用しており、キーボード操作が保証されている。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | Pass | `input/index.tsx:310` -- コンテナの `tabIndex={-1}` により、Tab でフォーカスが input -> button と自然に移動し、コンポーネント外へ抜けられる。 | フォーカストラップの実装なし。自然なフォーカス移動が保証。 |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットは無効化/変更可能 | N/A | InputPassword に独自のキーボードショートカットは実装されていない。 | 該当なし。 |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | Pass | `input/index.tsx:292-346` -- DOM 順序が input -> button の順で論理的。`tabIndex` の特殊な操作なし（コンテナのみ `tabIndex={-1}`）。`input-password/index.test.tsx:263-275` -- Tab ナビゲーションのテストで button.tabIndex >= 0 を確認。 | DOM 順序に従った自然なフォーカス順序。 |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | Pass | `input/index.tsx:31` -- 入力フォーカス時に `ring-2 ring-[var(--color-ring-normal)] ring-offset-2` を適用。`icon-button/index.tsx:17` -- `focus-visible:ring-2 focus-visible:ring-[var(--color-ring-normal)] focus-visible:ring-offset-2`。 | 両要素に可視フォーカスリングが実装されている。 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | Pass | `input/index.tsx:14` -- `overflow` 系の制限なし。コンポーネント単体ではフォーカス要素が隠れる状況は発生しない。 | ページレイアウト次第ではあるが、コンポーネント単体では問題なし。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータは十分な太さ・コントラスト | Pass | `input/index.tsx:31` -- `ring-2` (2px) + `ring-offset-2` (2px offset)。`icon-button/index.tsx:17` -- 同様の `ring-2` + `ring-offset-2`。 | 2px のリング幅と offset で十分な視認性。色のコントラストは Figma 保証。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | Pass | `input-password/index.tsx:55` -- `onIconButtonClick` はシンプルなクリック（単一ポインタ操作）。複雑なジェスチャは不要。 | 単一クリック操作のみ。 |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | Needs review | `input/index.tsx:272` -- `document.addEventListener("mousedown", handleOutsideClick)` で mousedown を使用。ただしこれはフォーカス解除（視覚的副作用のみ）であり、データ変更や遷移を伴うアクションではない。`input/index.tsx:308` -- コンテナの `onClick` でフォーカス付与。`icon-button/index.tsx:337` -- IconButton は `onClick` を使用。 | mousedown の使用はフォーカス管理目的のみで、WCAG 2.5.2 の「アクション確定」には該当しないと判断。ただし PROJECT_POLICY に基づき、mousedown の使用は `@deprecated` 候補として記録。将来的に `focusout` イベント等への置き換えを検討。 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルとアクセシブルネームの一致 | N/A | トグルボタンはアイコンのみ（可視テキストラベルなし）。`aria-label` で代替テキストを提供（1.1.1 で担保）。 | アイコンのみのボタンのため N/A。1.1.1 / 4.1.2 で担保。 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | N/A | DeviceMotion API 等の使用なし。 | 該当なし。 |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作がある | N/A | ドラッグ操作は実装されていない。 | 該当なし。 |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24x24px以上 | Pass | `icon-button/index.tsx:28-31` -- size xs: `w-6 h-6` (24x24px), sm: `w-8 h-8` (32x32px), md: `w-10 h-10` (40x40px), lg: `w-12 h-12` (48x48px)。InputPassword のトグルボタンは input size に応じて xs/sm/md が割り当てられる（`input/index.tsx:281-290`）。最小でも xs = 24x24px で基準を満たす。 | 全サイズで 24x24px 以上を確保。 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | Pass | `input/index.tsx:196-203` -- `handleInputFocus` は `setIsInputFocused(true)` と `onFocus` コールバックのみ。ページ遷移やコンテキスト変更等の予期しない動作なし。 | フォーカス時の動作は視覚的フィードバックとコールバック通知のみ。 |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | Pass | `input/index.tsx:187-193` -- `handleChange` は `onChange` コールバックを呼ぶのみ。自動サブミットや遷移なし。`input-password/index.tsx:42-44` -- トグルは明示的なボタンクリックのみで動作。 | 入力値変更時にコンテキスト変更は発生しない。 |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | Pass | `input-password/index.tsx:51-53` -- `triggerAriaLabel` は状態に応じて「パスワードを隠す」/「パスワードを表示する」で一貫。コンポーネントの props インターフェイスが統一されている。 | 一貫したラベリング。 |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | Needs review | `input/index.tsx:23-24` -- `isInvalid: true` でボーダー色変更。しかし `input` 要素に `aria-invalid` が設定されていない（`input/index.tsx:306-307` でコメントアウトされている）。 | `aria-invalid` がコメントアウトされているため、スクリーンリーダーがエラー状態を検知できない。input 要素に `aria-invalid={isInvalid}` を追加すべき。コメントには「not support エラーが Lint で出る」とあるが、`<input>` ネイティブ要素では `aria-invalid` は有効な属性であり、Lint 設定の見直しを推奨。 |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | Needs review | `input-password/index.tsx:36-59` -- `InputPassword` 自体には `<label>` 要素が含まれていない。利用者側で `aria-label` や外部の `<label>` を設定する設計。テストでは `aria-label="Password field"` を使用（`index.test.tsx:48`）。 | コンポーネント単体では label を持たない設計。利用者側での設定に委ねているが、Storybook の Default ストーリーにラベルがなく、ベストプラクティスの例示が不足。ドキュメントまたは Storybook で label 付きの使用例を追加推奨。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | N/A | InputPassword はフィールドコンポーネントであり、エラーメッセージの表示は上位のフォームコンポーネントの責務。 | コンポーネント単体の責務外。フォーム統合レベルで担保。 |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていない | N/A | InputPassword はフィールドコンポーネントであり、認証フロー全体の設計はシステムレベルの責務。パスワードマネージャーの利用は `autoComplete` 属性で対応可能（1.3.5 参照）。 | システムレベルの設計に依存。1.3.5 の autoComplete 対応とあわせて確認。 |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | Pass | `input/index.tsx:312-327` -- input は `<input>` ネイティブ要素で暗黙の role="textbox"、`disabled` 属性、`aria-disabled` 属性あり。`input/index.tsx:331-344` -- IconButton は `<button>` ネイティブ要素で暗黙の role="button"、`aria-label`、`disabled` 属性あり。`input-password/index.tsx:49` -- `type` 属性が状態に応じて "password"/"text" に切り替わる。 | ネイティブ HTML 要素を使用し、適切な属性が設定されている。 |
| 4.1.3 | 状態メッセージ | AA | 重要な状態変化が支援技術に伝わる | Needs review | `input-password/index.tsx:42-44` -- パスワード表示/非表示のトグル時、`type` 属性と `triggerAriaLabel` は変更されるが、スクリーンリーダーへの明示的な状態通知（`aria-live` 等）はない。 | パスワード表示状態の切り替えがスクリーンリーダーユーザーに即座に伝わらない可能性がある。`aria-live="polite"` リージョンによる通知、または `aria-pressed` をトグルボタンに追加して状態を明示することを検討。ただし `aria-label` が動的に変更されるため、ボタンにフォーカスがある場合は支援技術が変更を読み上げる可能性もあり、実機テストで判断。 |

---

## 対応内容（修正が必要な場合）

### Fail 項目

なし（Fail 判定の項目はありません）。

### Needs review 項目（5件）

#### 1. 1.3.5 入力目的の特定

- **問題**: `autoComplete` 属性のデフォルト値が未設定
- **推奨対応**:
  - `autoComplete="current-password"` をデフォルト props に追加するか
  - Storybook / ドキュメントで `autoComplete` の使用例を明示
- **優先度**: 中

#### 2. 1.4.10 リフロー

- **問題**: 固定高さ (`h-8/h-10/h-12`) が400%ズーム時に問題になる可能性
- **推奨対応**: ブラウザ実環境での400%ズームテスト実施
- **優先度**: 低（実機テストで判断）

#### 3. 2.5.2 ポインタ取消

- **問題**: `mousedown` イベントリスナーの使用（フォーカス管理目的）
- **推奨対応**: PROJECT_POLICY に基づき `@deprecated` 候補として記録。将来的に `focusout` イベント等への置き換えを検討
- **優先度**: 低（現状はフォーカス管理目的のみで WCAG 違反ではない）

#### 4. 3.3.1 エラーの特定

- **問題**: `aria-invalid` が `<input>` 要素に設定されていない（コメントアウトされている）
- **該当箇所**: `src/components/ui/input/index.tsx:306-307`
- **推奨対応**:
  - `<input>` 要素に `aria-invalid={isInvalid || undefined}` を追加
  - Lint 設定の見直し（`<input>` は `aria-invalid` をサポートするネイティブ要素）
- **優先度**: **高** -- スクリーンリーダーがエラー状態を検知できない

#### 5. 4.1.3 状態メッセージ

- **問題**: パスワード表示/非表示トグル時のスクリーンリーダー通知が不十分な可能性
- **推奨対応**:
  - トグルボタンに `aria-pressed` を追加（`isVisibility` の状態を反映）
  - または `aria-live="polite"` リージョンで状態変化を通知
  - 実機（VoiceOver / NVDA）テストで `aria-label` 動的変更の読み上げ挙動を確認
- **優先度**: 中

---

## テスト / 検証

### 既存テストのカバレッジ

テストファイル (`index.test.tsx`) は以下のアクセシビリティ観点をカバー:

- **aria-label の設定** (`index.test.tsx:46-57`): input と button の aria-label を確認
- **キーボードナビゲーション** (`index.test.tsx:262-301`): Tab キーでの移動、Enter/Space での操作
- **disabled 状態** (`index.test.tsx:178-215`): input と button の両方が disabled になることを確認
- **aria-label の動的更新** (`index.test.tsx:90-102`): トグル時に aria-label が変化することを確認
- **フォーカス維持** (`index.test.tsx:104-118`): トグル後もフォーカスが維持されることを確認

### 追加テスト推奨事項

1. `aria-invalid` が設定された場合のテスト（3.3.1 対応後）
2. `autoComplete` 属性のテスト（1.3.5 対応後）
3. VoiceOver / NVDA 等の実機スクリーンリーダーテスト（4.1.3 の確認）
4. ブラウザ400%ズームテスト（1.4.10 の確認）

---

## 補足

- InputPassword は Input コンポーネントのラッパーであるため、多くのアクセシビリティ特性は Input コンポーネントに依存しています。特に **3.3.1 (aria-invalid)** の修正は Input コンポーネント側で行う必要があります。
- 最も優先度の高い対応は **3.3.1 エラーの特定** です。`aria-invalid` のコメントアウトを解除し、スクリーンリーダーがエラー状態を検知できるようにすべきです。
- プロジェクト方針に従い、色/コントラスト関連の項目（1.4.1, 1.4.3, 1.4.11）は Figma 保証として Pass 判定としています。
- `mousedown` の使用（2.5.2）は現時点では WCAG 違反ではありませんが、PROJECT_POLICY に基づき将来的な改善候補として記録しています。
