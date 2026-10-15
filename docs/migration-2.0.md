# 1.x から 2.0 への移行ガイド

`sparkle-design` 1.x を使っているプロジェクトを 2.0 に移行する手順です。

2.0 は現在 **beta**（`2.0.0-beta.*`、npm の `beta` タグ）です。`latest` は 1.x のままなので、`npm install sparkle-design` では 2.0 は入りません。beta の間はトークンやコンポーネントの見た目が変わることがあります。

2.0 の主な変更は次の 2 つです。

- **React 19 が必須**になりました。全コンポーネントが `React.forwardRef` をやめ、`ref` を通常の props として受け取ります
- **新しいセマンティックトークン**（`surface` / `border` / `object` / `text`）に移行し、配色・影・一部の角丸が Figma に合わせて変わりました

変更の一覧は [CHANGELOG.md](../CHANGELOG.md) の `2.0.0-beta.*` を参照してください。

## 1.x を使い続ける場合

急いで移行する必要はありません。1.x は React 18 向けの**非推奨（deprecated）メンテナンスライン**として `v1` ブランチで続きます。

- 入るのは不具合・セキュリティの修正と、最新の CLI と噛み合わせるためのトークン・スタイルの追従だけです。新機能と React 19 前提の変更は 2.x にだけ入ります
- 2.x が npm の `latest` になった後、1.x は `latest-1` タグで公開されます。1.x に固定したい場合は `npm install sparkle-design@1` で入れてください
- CLI はどちらのバージョンでも固定せず、1.x では `latest` を使います。**1.x のまま `sparkle-design-cli@beta` の `migrate --write` を実行しないでください**。beta の CLI は 2.0 の新トークンに書き換えますが、1.x で `latest` の CLI が生成する CSS にはそのトークンがまだ無いため、スタイルが当たらなくなります。新トークンが 1.x と CLI の `latest` の両方に入った時点で、改めて案内します

## 前提条件

| 項目 | 2.0 の条件 |
|---|---|
| React / React DOM | `^19`（`peerDependencies`）。1.x では `dependencies` に入っていましたが、2.0 から `peerDependencies` に移りました |
| sparkle-design-cli | beta（`npx --yes sparkle-design-cli@beta`）。新トークンの生成と `migrate` は beta にしか入っていません |

`peerDependencies` にあるのは `react` / `react-dom` だけです。Next.js / Vite などのフレームワークの版は指定していません。

React 18 のプロジェクトに 2.0 を入れると、npm では peer 依存の衝突で止まります。**先にプロジェクトを React 19 に上げてから**移行してください。

## 移行手順

### 1. React 19 に上げる

プロジェクトの React を 19 に上げ、ビルドとテストが通ることを確認してから先に進みます。React 19 自体の移行は React 公式の移行ガイドに従ってください。

### 2. 2.0 の beta を入れる

```bash
npm install sparkle-design@beta
```

pnpm / yarn / bun でも `sparkle-design@beta` を指定します。

### 3. CSS を CLI の beta で再生成する

```bash
npx --yes sparkle-design-cli@beta generate
```

新しいセマンティックトークン（`--color-surface-*` など）と `--radius-container` は、CLI の beta が生成する `sparkle-design.css` にしか含まれません。CLI の `latest` で生成した CSS のままだと、2.0 のコンポーネントが参照するトークンが存在せず、色や角丸が当たりません。

`package.json` の scripts で CLI を呼んでいる場合（`generate` 用と `check` 用など）は、**すべて `@beta` に揃えてください**。一部だけ `@beta` にすると、生成した CSS と検査ルールでトークン体系がずれます。

```json
{
  "scripts": {
    "build:css": "npx --yes sparkle-design-cli@beta generate",
    "lint:sparkle": "npx --yes sparkle-design-cli@beta check src"
  }
}
```

再生成すると、**アプリ側のコードを変えていなくても見た目が変わります**。プリミティブの配色（8 色相 × 10 段）とシャドウ（`2xs`〜`lg`）が Figma に合わせて再定義されたため、旧トークンのクラスを使っている箇所も色・影が変わります。

### 4. 旧トークンを新トークンに置き換える

旧トークンは beta の間は新トークンと併存しているので、置き換える前でも表示は壊れません。ただし **beta 終了時に削除される予定**なので、beta の間に置き換えてください。

まず dry-run で変更内容を確認します。ファイルは変更されません。

```bash
npx --yes sparkle-design-cli@beta migrate
```

内容を確認したら `--write` を付けて実行します。書き換えるのは `[自動変換可]` の箇所だけです。

```bash
npx --yes sparkle-design-cli@beta migrate --write
```

- 探索範囲は `check` と同じで、既定は `src` です。`npx --yes sparkle-design-cli@beta migrate src/app src/features` のようにパスを並べるか、`--include 'src/components/**/*.tsx'` で絞れます
- `hover:` / `group-hover:` / `dark:` などの variant 接頭辞、`/50` などの opacity modifier、`!`（important）は置換後もそのまま残ります
- `sparkle-disable-line` などの抑制コメントを付けた箇所と、`sparkle.config.json` の `check.ignore` で除外したパスは書き換えません
- 書き換えた後にもう一度実行すると、`[自動変換可]` は 0 件になります

最後に残りを確認します。

```bash
npx --yes sparkle-design-cli@beta check src
```

#### 3 つの分類と対応

`migrate` は検出した箇所を次の 3 つに分けて報告します。

| 分類 | 意味 | `migrate` の挙動 | 対応 |
|---|---|---|---|
| 自動変換可 | 移行先が一意に決まり、値も変わらない | `--write` のときだけ書き換える | 不要（書き換え後の見た目は変わりません） |
| 要判断 | 移行先の候補が複数ある / 対応する新トークンが無い | 候補と理由を表示するだけ | 候補と Figma の該当箇所を見て、手で置き換える |
| 構造変更あり | トークンの差し替えでは済まない（マークアップの変更を伴う） | 該当箇所を指摘するだけ | 手でマークアップを直す |

`[自動変換可]` の置き換えは、旧トークンと同じプリミティブを指す新トークンへの置き換えなので、**`migrate` で見た目は変わりません**。見た目が変わるのは手順 3 の CSS 再生成によるものです。

**要判断**になるのは主に次のケースです。表示される候補と理由を見て選んでください。

- **状態を表すトークンに variant 接頭辞が無い**: 新トークンは状態（`enabled` / `hover` / `active` / `disabled`）を名前に含みます。`bg-primary-700` の移行先は `surface-primary-high-hover` ですが、`hover:` が付いていないとどの状態で使っているか判断できないため、要判断になります。`hover:bg-primary-700` なら自動変換されます
- **variant と旧トークンの段が合わない**: `hover:bg-primary-600` のように、hover なのに `enabled` 相当の段を使っている場合です。機械的に置き換えると hover 時の色が変わるため、意図した状態のトークンを選んでください
- **同じ段に候補が複数ある**: たとえば `bg-primary-50` は `surface-primary-middle-enabled` と `surface-primary-middle-disabled` の両方に当たります
- **対応する新トークンが無い**: 新体系は用途ごとに使う段を絞っているため、旧トークンの段をそのまま引き継げないことがあります（例: `text-` の `primary-500`）。表示される「利用可能」なトークンから選んでください
- **段付きの CSS 変数を直接参照している**: `var(--color-primary-600)` のような参照は、変数名だけでは用途（surface / text / border / object）が決まらないため、すべて要判断になります（`--color-text-high` のような段の無い旧変数は自動変換されます）
- **`text-placeholder`**: 新体系に placeholder 専用のトークンは無く、`text-neutral-low` に統合されました（値は同じ）。統合してよいか確認してから置き換えてください
- **`skeleton-fill`**: 対応する新トークンがありません。値が同じ `surface-neutral-middle-active` に寄せるか、デザイナーと決めてください
- **クラス名以外に見える箇所**: パス、import の specifier、`url()` の中で見つかったものは、資産パスや import を壊さないよう書き換えません。クラス名として使っている箇所なら手で置き換えてください

**構造変更あり**は分類として用意されていますが、現在の CLI にはこの分類で報告する対応表がまだありません。下の「コンポーネント API の変更」は `migrate` では検出されないので、別途手で直してください。

`check` は Tailwind 既定パレットのクラス（`bg-gray-50` / `text-red-600` など）も `tailwind-palette-color` として報告しますが、`migrate` はこれを書き換えません。`check` の案内を見て手で置き換えてください。

## 主なトークンの対応

`sparkle-design-cli` の移行表（`lib/token-migration.js`）から抜粋しています。CLI の表がこの表の正です。ここに無い組み合わせは対応表に無いため、`migrate` で要判断として報告されます。

### 名前の付け方

旧トークンは「意味 + 段」（`bg-primary-600`）、新トークンは「用途 + 意味 + 強さ + 状態」（`bg-surface-primary-high-enabled`）です。用途は Tailwind の接頭辞で決まります。

| 接頭辞 | 用途 |
|---|---|
| `bg-` | `surface`（背景） |
| `text-` / `placeholder-` | `text`（文字） |
| `border-` / `divide-` / `outline-` / `ring-` | `border`（枠線） |
| `fill-` / `stroke-` | `object`（図形） |

旧 `secondary` は `neutral` に統合されました。`secondary-*` は `neutral-*` と同じ移行先になります。

### 背景（`bg-`）

| 旧 | 新 |
|---|---|
| `bg-primary-600` | `bg-surface-primary-high-enabled` |
| `hover:bg-primary-700` | `hover:bg-surface-primary-high-hover` |
| `active:bg-primary-800` | `active:bg-surface-primary-high-active` |
| `hover:bg-primary-100` | `hover:bg-surface-primary-middle-hover` |
| `bg-primary-50` | 要判断（`surface-primary-middle-enabled` / `surface-primary-middle-disabled`） |
| `bg-primary-200` | 要判断（`surface-primary-high-disabled` / `surface-primary-middle-active`） |
| `bg-info-500` / `bg-info-100` / `bg-info-50` | `bg-surface-info-high` / `bg-surface-info-middle` / `bg-surface-info-low` |
| `bg-success-500` / `bg-success-100` / `bg-success-50` | `bg-surface-success-high` / `bg-surface-success-middle` / `bg-surface-success-low` |
| `bg-warning-600` / `bg-warning-100` / `bg-warning-50` | `bg-surface-warning-high` / `bg-surface-warning-middle` / `bg-surface-warning-low` |
| `bg-base-100` / `bg-base-200` | `bg-surface-base-100` / `bg-surface-base-200` |

`negative` と `neutral`（`secondary`）は `primary` と同じ段の対応です（例: `bg-negative-600` → `bg-surface-negative-high-enabled`）。`bg-base-*` のうち `100` / `200` 以外は `neutral` と同じ対応になります。

### 文字（`text-`）

| 旧 | 新 |
|---|---|
| `text-neutral-900` / `700` / `500` / `300` | `text-text-neutral-high` / `middle` / `low` / `disabled` |
| `text-primary-600` / `700` / `800` / `200` | `text-text-primary-enabled` / `hover` / `active` / `disabled` |
| `text-negative-600` / `700` / `800` / `200` | `text-text-negative-enabled` / `hover` / `active` / `disabled` |
| `text-info-600` | `text-text-info` |
| `text-success-700` | `text-text-success` |
| `text-warning-700` | `text-text-warning` |
| `text-text-high` / `middle` / `low` / `disabled` | `text-text-neutral-high` / `middle` / `low` / `disabled` |
| `text-text-placeholder` | 要判断（`text-text-neutral-low`。値は同じ） |

状態を表すトークン（`hover` / `active` / `disabled`）は、対応する variant 接頭辞が付いているときだけ自動変換されます。

### 枠線（`border-` / `divide-` / `ring-` など）

| 旧 | 新 |
|---|---|
| `border-neutral-500` | `border-border-neutral-extra-high-enabled` |
| `hover:border-neutral-600` | `hover:border-border-neutral-extra-high-hover` |
| `border-neutral-300` / `border-neutral-100` | `border-border-neutral-high` / `border-border-neutral-low` |
| `border-neutral-200` | 要判断（`border-neutral-extra-high-disabled` / `border-neutral-middle`） |
| `border-primary-500` / `300` / `100` | `border-border-primary-extra-high` / `high` / `low` |
| `border-negative-500` | `border-border-negative-extra-high-enabled` |
| `hover:border-negative-600` | `hover:border-border-negative-extra-high-hover` |
| `disabled:border-negative-200` | `disabled:border-border-negative-extra-high-disabled` |
| `border-negative-300` / `border-negative-100` | `border-border-negative-high` / `border-border-negative-low` |
| `border-info-300` / `border-success-300` | `border-border-info` / `border-border-success` |
| `border-warning-400` | `border-border-warning` |
| `border-divider-low` / `middle` / `high`（`divide-` も同じ） | `border-border-neutral-low` / `middle` / `high` |
| `ring-ring-normal` / `border-ring-normal` | `ring-border-ring` / `border-border-ring` |

### 図形（`fill-` / `stroke-`）

文字（`text-`）と同じ段の対応で、用途が `object` になります（例: `fill-neutral-700` → `fill-object-neutral-middle`、`fill-primary-600` → `fill-object-primary-enabled`）。

### 角丸

| 旧 | 新 |
|---|---|
| `--radius-halfModal` | `--radius-container`（`radius` が `md` のとき 8px、`lg` のとき 12px） |

Figma で `halfModal` が `container` にリネームされました。`--radius-halfModal` は beta の間だけ残している後方互換のエイリアスです。**削除されると角丸がエラーも出ずに消える**ため、`rounded-[var(--radius-halfModal)]` のような直接参照は `migrate` で置き換えてください（自動変換可）。

## 見た目の変化

CHANGELOG の `2.0.0-beta.*` に記載している主な見た目の変化です。

- 状態ごとの色が 1 段濃くなりました（Figma で enabled = 600 / hover = 700 / active = 800 に整理されたため）
- プリミティブの配色 80 値と黒白アルファの一部、シャドウ（`2xs`〜`lg`）を Figma に合わせて再定義しました。未移行のクラスを使っている箇所も色・影が変わります
- Card の角丸が `rounded-container`（md プロファイルで 2px → 8px）、Dialog の角丸が `rounded-modal`（8px → 12px）になりました
- Button / Icon Button の solid から 1px の枠線を削除し、solid・outline の影を `shadow-base`（影なし）にしました
- Tabs の solid のリスト下線が primary からグレー（`border/neutral/low`）になりました
- Slider の塗りと Tag の `status="info"` が `object/info`（青固定）になり、primary に追従しなくなりました
- Badge の normal が info から primary 追従（`surface/primary/high/enabled`）になりました
- Button・入力・Checkbox・Radio・Tabs・Link の文字サイズ、余白、フォーカス表示を Figma の注釈に合わせました
- Dialog / Modal は共通の Overlay を使い、背景を `surface/overlay`（black 30%）に統一しました
- Tag のステータスドットとカプセル形状、Badge のサイズ、Slider・Toast のスタイルを更新しました

## コンポーネント API の変更

`migrate` では検出されません。該当する使い方をしていれば手で直してください。

| コンポーネント | 変更 | 対応 |
|---|---|---|
| Icon / Spinner | 22px の `size={6}` を追加し、従来の `6`〜`12` は 1 つずつ後ろにずれました | 実寸を保つには `size={6}`〜`size={12}` を `size={7}`〜`size={13}` に変える（CSS は手順 3 の再生成が必要） |
| Badge | 従来の 8px の `xs` は `2xs` に変わり、新しい `xs` は 14px です | 従来の `xs` の見た目を保つには `2xs` に変える |
| Textarea | サイズは `md` / `lg` になりました | `sm` は `md` に変える |
| Slider | ロールを持たないルート要素から `aria-disabled` を外しました | ルートの `[aria-disabled]` をスタイルやテストで参照している場合は `[data-disabled]` に変える |
| Breadcrumb | 現在地（`BreadcrumbPage`）から `aria-disabled="true"` を外しました | 現在地は `aria-current="page"` で判定する |

## React 19 の ref-as-prop

2.0 では全コンポーネントが `React.forwardRef` をやめ、`ref` を通常の props として受け取ります。

- React 19 であれば、コンポーネントに `ref` を渡すコードはそのまま使えます
- React 18 では `ref` が渡らなくなり、Radix の `asChild` 経由の組み合わせ（Tooltip / Dialog のトリガーなど）も正しく動きません。React 18 のまま使う場合は 1.x を使ってください

## 移行後の確認

- `npx --yes sparkle-design-cli@beta check src` で、旧トークン・要判断の残りを確認する
- 手順 3 の CSS 再生成と手順 4 の置き換え後の見た目を、主要な画面で確認する（配色・影・角丸が変わるため）
- 抑制コメント（`sparkle-disable-line` など）で残した旧トークンは beta 終了時に削除される予定なので、移行先を決めておく
