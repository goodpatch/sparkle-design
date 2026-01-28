# Tabs a11y レビュー

## 対象

- Component: `Tabs` (`TabsList`, `TabsTrigger`, `TabsContent`)
- `src/components/ui/tabs/index.tsx`
- `src/components/ui/tabs/index.test.tsx`
- `src/components/ui/tabs/index.stories.tsx`

## 参照したチェックリスト / 方針

- Checklist: `.claude/skills/accessibility-checker/assets/checklist.csv`
- Project policy: `.claude/skills/accessibility-checker/docs/PROJECT_POLICY.md`

### プロジェクト方針（重要）

- **色/コントラスト（1.4.1/1.4.3/1.4.11）は原則 Figma 側で保証**
- **WCAG 2.5.2**: Down 系ハンドラ（`onMouseDown` / `onPointerDown` / `onTouchStart`）は `@deprecated` 方針

### Radix UI Tabs が自動提供する ARIA

本コンポーネントは `radix-ui` の `Tabs` プリミティブを使用しており、以下が自動的に付与される:

- `role="tablist"` on `TabsList`
- `role="tab"` on `TabsTrigger`（`<button>` 要素としてレンダリング）
- `role="tabpanel"` on `TabsContent`
- `aria-selected="true/false"` on triggers
- `aria-controls` / `aria-labelledby` によるタブ-パネル間のリンク
- キーボードナビゲーション（矢印キー、Home、End）
- `tabindex` 管理（アクティブタブ: `0`、非アクティブ: `-1`）

---

## チェック結果

| ID | 項目 | Level | 確認ポイント（要約） | Result | Evidence | Fix / Notes |
|---:|---|:---:|---|---|---|---|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに代替テキストがあるか | N/A | `index.tsx` 全体 | Tabs コンポーネント自体はテキストラベルを子要素として受け取る設計。アイコンのみのタブは利用側の責務。Storybook のサンプルはすべてテキストラベルを使用（`index.stories.tsx:33-37`）。 |
| 1.3.4 | 表示の向き | AA | 縦向き・横向きに限定していないか | Pass | `index.tsx:96` `tabsListVariants` | `inline-flex` ベースのレイアウト。CSS で向きの固定はなく、orientation は Radix の `orientation` prop で制御可能。 |
| 1.3.5 | 入力目的の特定 | AA | `autocomplete` 属性が適切か | N/A | — | Tabs コンポーネントは入力フィールドを含まないため該当なし。 |
| 1.4.1 | 色の使用 | A | 色だけで情報を伝えていないか | Pass | `index.tsx:35-46, 52-66, 70-83` | **Figma 保証**。コード上も `data-[state=active]` / `data-[state=inactive]` 属性でプログラム的に状態が区別される。solid バリアントはアクティブ時に背景色変更、line バリアントは下線（`after` 擬似要素）、ghost バリアントは border で視覚的にも色以外の手がかりがある。disabled は `disabled` HTML 属性 + `cursor-not-allowed` で区別。 |
| 1.4.3 | コントラスト（最低限） | AA | テキストコントラストが 4.5:1 以上か | Pass | `index.tsx:23-90` | **Figma 保証**。デザイントークン（`primary-500`, `neutral-700` 等）を使用しており、独自色指定やトークン逸脱は見られない。 |
| 1.4.4 | テキストのサイズ変更 | AA | 200% 拡大でコンテンツが損なわれないか | Pass | `index.tsx:96` `inline-flex w-fit` | フレックスレイアウト + `w-fit` で固定幅を使用していないため、テキスト拡大に追従する。`whitespace-nowrap`（`index.tsx:25`）があるが、タブラベルは短いテキスト前提で問題ない。 |
| 1.4.10 | リフロー | AA | 400% 拡大で横スクロールが発生しないか | Needs review | `index.tsx:96` `inline-flex w-fit`, `index.tsx:25` `whitespace-nowrap` | `inline-flex` + `whitespace-nowrap` の組み合わせにより、タブ数が多い場合や狭い画面では横方向にはみ出す可能性がある。`overflow-visible`（`index.tsx:96`）が指定されており、スクロール機構は未実装。利用側での対応が必要となる場合がある。 |
| 1.4.11 | 非テキストのコントラスト | AA | フォーカスインジケータ等のコントラスト | Needs review | `index.tsx:27, 38, 43, 60, 74, 78` | **Figma 保証**（基本方針）。ただし、フォーカスインジケータが `outline-none` + 背景色変更のみで表現されている点は後述の 2.4.7 / 2.4.13 と合わせて確認が必要。背景色変更によるコントラスト比がデザインシステムで保証されているか要確認。 |
| 1.4.13 | ホバー/フォーカスで表示されるコンテンツ | AA | ツールチップ等の要件を満たすか | N/A | `index.tsx` 全体 | ホバーやフォーカスで新たに出現するコンテンツ（ツールチップ、ポップオーバー）は含まれない。hover/focus で変わるのはスタイル（背景色・テキスト色）のみ。 |
| 2.1.1 | キーボード | A | キーボードだけで操作可能か | Pass | `index.tsx:9` Radix UI 使用, `index.test.tsx:174-188` | Radix UI Tabs が矢印キーナビゲーション（左右でタブ切り替え）、Enter/Space でタブ選択、Tab キーでフォーカス移動を自動提供。テストでも `<button>` 要素であることを確認済み（`index.test.tsx:188`）。 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められないか | Pass | `index.tsx:9` Radix UI 使用 | Radix UI Tabs は標準的なフォーカス管理を実装。Tab キーでタブリストから離脱してタブパネルへ移動可能。フォーカストラップは発生しない。 |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットの無効化/変更 | N/A | `index.tsx` 全体 | 単一キーショートカットは実装されていない。Radix の矢印キーナビゲーションは修飾キー不要だが、タブリスト内でのみ有効であり WCAG 2.1.4 の対象外。 |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的か | Pass | `index.tsx:121-128, 163-173` | DOM 順にタブリスト -> タブトリガー群 -> タブコンテンツとなっている。`tabIndex` の明示的な変更はなく、Radix のデフォルト管理（roving tabindex）に従う。 |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能か | Needs review | `index.tsx:27, 38, 43-44, 60-62, 74, 78-79, 188` | **TabsTrigger**: 全バリアントで `focus-visible:outline-none` が指定されており、ブラウザデフォルトのフォーカスリングが除去されている。代わりに背景色変更（例: `focus-visible:data-[state=active]:bg-primary-700`）とテキスト色変更（例: `focus-visible:data-[state=inactive]:text-primary-700`）で表現。outline/ring/border によるフォーカスインジケータは存在しない。背景色変更のみでは十分な視認性を確保できない場合がある。**TabsContent**: `outline-none`（`index.tsx:188`）が指定されているが、Radix は tabpanel に `tabindex="0"` を付与するためフォーカス可能。フォーカス時の視覚的変化が一切ない。 |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れないか | Pass | `index.tsx:96` `overflow-visible` | `TabsList` に `overflow-visible` が指定されており、フォーカスされたタブが隠れることはない。 |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータの太さ/コントラストが十分か | Needs review | `index.tsx:27, 38, 43, 60, 74, 78` | 2.4.7 と同様、`focus-visible:outline-none` により outline が除去され、背景色変更のみで表現。AAA レベルの要件（2px 以上の太さ、3:1 以上のコントラスト）を満たすフォーカスインジケータが存在しない。背景色変更のコントラスト比の検証が必要。 |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能か | Pass | `index.tsx` 全体 | タブの操作はクリック（タップ）のみで完結。複雑なジェスチャやマルチポイント操作は不要。 |
| 2.5.2 | ポインタ取消 | A | Down イベントでアクション確定していないか | Pass | `index.tsx` 全体 | `onMouseDown` / `onPointerDown` / `onTouchStart` のハンドラは一切定義されていない。Radix UI Tabs の標準実装は `onClick`（ポインタリリース）でタブ切り替えを行う。プロジェクトポリシーの Down 系ハンドラ `@deprecated` 方針にも適合。 |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルがアクセシブルネームに含まれるか | Pass | `index.tsx:164-171` | `TabsTrigger` は `<button>` 要素としてレンダリングされ、子要素のテキストがそのままアクセシブルネームとなる。Storybook でも `"tab 1"`, `"tab 2"` 等のテキストラベルが使用されている（`index.stories.tsx:33-35`）。 |
| 2.5.4 | モーション起動 | A | デバイスモーション以外でも操作可能か | N/A | — | デバイスモーション（加速度センサー等）による操作は実装されていない。 |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作があるか | N/A | — | ドラッグ操作は実装されていない。 |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は 24x24px 以上か | Needs review | `index.tsx:26` `px-3 py-2` | `TabsTrigger` のパディングは `px-3 py-2`（12px/8px）。テキストコンテンツ + パディングで 24px 以上になる見込みだが、最小サイズの明示的な保証（`min-h-6 min-w-6` 等）はない。短い 1 文字ラベルの場合にターゲットサイズが不足する可能性がある。 |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きないか | Pass | `index.tsx` 全体 | フォーカス時にコンテキスト変更（ページ遷移、フォーム送信等）は発生しない。Radix Tabs のデフォルト `activationMode` は `"automatic"`（フォーカスでタブ切り替え）だが、これはタブコンポーネントの標準的な挙動であり、WAI-ARIA Tabs パターンに準拠。 |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きないか | N/A | — | Tabs コンポーネントは入力フィールドを含まないため該当なし。 |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベルか | Pass | `index.tsx` 全体, `index.stories.tsx` | コンポーネントの props 設計は一貫しており、`value` と子要素テキストでタブを識別。Storybook の全バリアント（Solid/Line/Ghost）で統一的な命名パターンを使用。 |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わるか | N/A | — | Tabs コンポーネントにフォーム入力・バリデーション機能はないため該当なし。 |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明があるか | N/A | — | Tabs コンポーネントは入力フィールドではないため該当なし。タブ自体のラベルは子要素テキストで提供。 |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されているか | N/A | — | Tabs コンポーネントにエラー状態はないため該当なし。 |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存になっていないか | N/A | — | 認証機能は含まれないため該当なし。 |
| 4.1.2 | 名前・役割・値 | A | 操作要素が適切な role/name/state を持つか | Pass | `index.tsx:9` Radix UI, `index.tsx:164-171`, `index.test.tsx:174-206` | Radix UI Tabs が自動的に `role="tablist"` / `role="tab"` / `role="tabpanel"` を付与。`aria-selected`、`aria-controls`、`aria-labelledby` も自動管理。`disabled` 属性はネイティブ HTML 属性として適用（`index.test.tsx:190-206` で検証済み）。`data-state` 属性で状態も公開。 |
| 4.1.3 | 状態メッセージ | AA | 状態変化が支援技術に伝わるか | Pass | `index.tsx:9` Radix UI | タブ切り替え時は `aria-selected` の変更 + タブパネルの表示/非表示切り替えにより、支援技術に状態変化が自動通知される。非同期処理（loading）は含まれないため、`aria-live` 等は不要。 |

---

## 対応内容（修正が必要な場合）

### 1. [Needs review] フォーカスインジケータの視認性（2.4.7 / 2.4.13 / 1.4.11 関連）

**概要**: 全バリアントの `TabsTrigger` で `focus-visible:outline-none` が指定されており、ブラウザデフォルトのフォーカスリングが除去されている。代替として背景色変更（`bg-primary-700`, `bg-neutral-100` 等）とテキスト色変更のみで表現。

**懸念点**:
- 背景色変更のみのフォーカスインジケータは、周囲との色差が小さい場合に視認しにくい
- `outline` / `ring` / `border` 等の明確な境界線型インジケータが存在しない
- 特に `TabsContent`（`index.tsx:188`）は `outline-none` のみで、フォーカス時の視覚変化が一切ない（Radix が `tabindex="0"` を付与するためフォーカス可能）

**推奨対応**:
- `TabsTrigger` に `focus-visible:ring-2 focus-visible:ring-primary-500` 等のリングスタイルの追加を検討
- `TabsContent` に `focus-visible:outline-2 focus-visible:outline-primary-500` 等の追加を検討
- デザインチーム確認: 背景色変更のみで十分な視認性が確保されているか Figma 上で検証

### 2. [Needs review] リフロー対応（1.4.10）

**概要**: `TabsList` は `inline-flex` + `whitespace-nowrap` の組み合わせで、タブ数が多い場合や画面幅が狭い場合に横方向にはみ出す可能性がある。

**推奨対応**:
- タブ数が多い場合のスクロール機構（横スクロール + aria 対応）の検討
- もしくは `flex-wrap` による折り返し対応の検討
- これは利用側での対応が主となるが、コンポーネント側でオプションとして提供することも検討

### 3. [Needs review] ターゲットサイズ（2.5.8）

**概要**: `TabsTrigger` のパディングは `px-3 py-2`（約 12px 水平 / 8px 垂直）。通常のテキストラベルであれば 24x24px を超えるが、最小サイズの明示的な保証はない。

**推奨対応**:
- `min-h-6`（24px）の追加を検討
- 短いラベルに対して `min-w-6`（24px）の追加を検討

---

## テスト / 検証

### 既存テストのカバレッジ

| カテゴリ | テスト内容 | ファイル:行 |
|---|---|---|
| 基本レンダリング | Tabs 構造が正しくレンダリングされる | `index.test.tsx:23-49` |
| バリアント | solid / line / ghost のクラス付与 | `index.test.tsx:52-108` |
| ユーザーインタラクション | value 切り替え / disabled タブ | `index.test.tsx:111-171` |
| アクセシビリティ | button 要素確認 / disabled 属性確認 | `index.test.tsx:173-207` |
| エッジケース | デフォルト variant / inactive content | `index.test.tsx:210-246` |

### 不足しているテスト

- キーボードナビゲーション（矢印キーでのタブ切り替え）-- `index.test.tsx:112` に todo あり。jsdom の制約があるため E2E テストでの担保が適切
- `aria-selected` 属性の検証
- `role="tablist"` / `role="tab"` / `role="tabpanel"` の検証
- `aria-controls` / `aria-labelledby` のリンク検証
- フォーカスインジケータの視覚的検証（Storybook / E2E で確認推奨）

---

## 補足

### Radix UI Tabs の ARIA 準拠について

Radix UI の Tabs コンポーネントは [WAI-ARIA Tabs パターン](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) に準拠しており、以下を自動的に管理する:

- タブリスト / タブ / タブパネルの role 属性
- `aria-selected` によるアクティブ状態の通知
- `aria-controls` / `aria-labelledby` によるタブ-パネル間の関連付け
- Roving tabindex によるキーボードナビゲーション
- `activationMode` による自動/手動アクティベーション

そのため、本コンポーネントのアクセシビリティ上の主要な懸念は **フォーカスインジケータの視認性** に集中している。

### `activationMode` について

Radix Tabs のデフォルトは `activationMode="automatic"` であり、矢印キーでフォーカスを移動すると同時にタブが切り替わる。これは WCAG 3.2.1（フォーカス時）の文脈で問題となりうるが、WAI-ARIA Tabs パターンで認められた標準的な挙動であり、Pass と判定した。利用側で `activationMode="manual"` に変更することも可能。
