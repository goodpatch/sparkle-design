# Component Catalog

`sparkle-design` が提供する全 27 コンポーネントのリファレンス。

## 目次

badge | breadcrumb | button | card | checkbox | dialog | divider | form | icon | icon-button | inline-message | input | input-password | link | modal | overlay | radio | select | skeleton | slider | spinner | switch | tabs | tag | textarea | toast | tooltip

末尾に[コンポーネント選択ガイド](#コンポーネント選択ガイド)（やりたいこと → コンポーネント対応表）あり。

---

## import 例

```tsx
import { Button, Card, Input, cn } from "sparkle-design";
```

---

## ユーティリティ

### `cn()`

`clsx` + `tailwind-merge` を組み合わせたクラス名結合ユーティリティ。

```tsx
import { cn } from "sparkle-design";

cn("px-4 py-2", isActive && "bg-blue-500", className);
```

---

## コンポーネント一覧

### badge

通知数やタスク数などの数値情報を要素に付与するラベル。

- **variants**: `default` / `secondary` / `destructive` / `outline`
- **使いどころ**: 未読件数、ステータス表示、カテゴリタグ

```tsx
import { Badge } from "sparkle-design";

<Badge variant="destructive">3</Badge>;
```

---

### breadcrumb

現在のページ階層を表示し、親階層へのナビゲーションを提供。

- **サブコンポーネント**: `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`
- **使いどころ**: 多階層ページの現在地表示

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "sparkle-design";
```

---

### button

フォーム送信、ダイアログ展開、アクション実行のトリガー。最も汎用的なインタラクション要素。

- **variants**: `default` / `destructive` / `outline` / `secondary` / `ghost` / `link`
- **sizes**: `default` / `sm` / `lg` / `icon`
- **使いどころ**: 主要アクション（`default`）、削除・警告（`destructive`）、サブアクション（`outline` / `secondary`）、ナビゲーション（`link`）
- **注意**: アイコンだけのアクションは `Button` + `prefixIcon` ではなく `IconButton` を使う。`asChild` では `prefixIcon` / `suffixIcon` / `isLoading` は反映されない

```tsx
import { Button } from "sparkle-design";

<Button variant="default" size="lg">保存する</Button>
<Button variant="destructive">削除</Button>
<Button prefixIcon="check">確定</Button>
```

---

### card

コンテンツをグループ化して表示するコンテナ。

- **サブコンポーネント**: `CardHeader`, `CardTitle`, `CardDescription`, `CardControl`, `CardContent`, `CardFooter`, `ClickableCard`
- **使いどころ**: 情報のまとまりを視覚的に区切る。`ClickableCard` はカード全体をリンク/ボタンにする場合
- **注意**: `CardDescription` は `CardTitle` 内の短い補足テキスト用。長い説明文は `CardContent` に置く。右上アクションは `CardControl` を使い、複数ボタンでも追加の layout class は不要

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardControl,
  CardContent,
  CardFooter,
} from "sparkle-design";
```

---

### checkbox

複数の選択肢から複数を選択する入力。

- **状態**: `checked` / `unchecked` / `indeterminate`
- **使いどころ**: 複数選択フィルタ、同意確認

```tsx
import { Checkbox } from "sparkle-design";
```

---

### dialog

モーダルダイアログでアクションの実行・中断を確認。

- **サブコンポーネント**: `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`
- **使いどころ**: 削除確認、再試行確認、保存前の警告などアクション確認
- **modal との違い**: `dialog` は `AlertDialog` ベースの確認用途。フォーム入力や詳細表示には `modal` を使う

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "sparkle-design";
```

---

### divider

グループ内コンテンツを視覚的に区切る線。

- **emphasis**: `low` / `medium` / `high`
- **lineStyle**: `solid` / `dashed` / `dotted`
- **使いどころ**: セクション区切り、リストアイテム間の区切り

```tsx
import { Divider } from "sparkle-design";

<Divider emphasis="low" lineStyle="solid" />;
```

---

### form

フォーム要素のラベル・ヘルパーテキスト・エラーメッセージをカプセル化。`react-hook-form` との統合を前提とした設計。

- **サブコンポーネント**: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormHeader`, `FormControl`, `FormHelperMessage`, `FormErrorMessage`
- **使いどころ**: すべてのフォーム実装で使う基本ラッパー

```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "sparkle-design";
```

---

### icon

Material Symbols Rounded アイコンを表示。

- **props**: `size` / `fill` / `weight` / `grade` / `opticalSize`
- **使いどころ**: UI 全般のアイコン表示
- **注意**: `material-symbols-rounded` を `span` に直書きせず `Icon` を使う

```tsx
import { Icon } from "sparkle-design";

<Icon>home</Icon>
<Icon size={6} fill={1}>favorite</Icon>
```

---

### icon-button

アイコンのみのボタン。テキストラベルを持たないアクション。

- **variants**: `default` / `destructive` / `outline` / `secondary` / `ghost`
- **sizes**: `default` / `sm` / `lg`
- **使いどころ**: ツールバー、閉じるボタン、編集ボタン。アクセシビリティのため `aria-label` を必ず付与する

```tsx
import { IconButton } from "sparkle-design";

<IconButton icon="close" aria-label="閉じる" variant="ghost" />;
```

---

### inline-message

システム・サービス状態の通知メッセージ。ページ内に常駐する通知。

- **status**: `info` / `success` / `warning` / `negative`（`variant` ではなく `status` を使う）
- **サブコンポーネント**: `InlineMessageTitle`, `InlineMessageDescription`
- **使いどころ**: フォームのグローバルエラー、保存成功通知、警告情報
- **toast との違い**: `inline-message` はページに固定表示。`toast` は一時的なフィードバック

```tsx
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "sparkle-design";

<InlineMessage status="negative">
  <InlineMessageTitle>エラーが発生しました</InlineMessageTitle>
  <InlineMessageDescription>
    入力内容を確認してください。
  </InlineMessageDescription>
</InlineMessage>;
```

---

### input

テキスト入力フィールド。オプションでトリガーボタンを付与できる。

- **使いどころ**: 検索、テキスト入力全般
- **password 入力**: `input-password` を使う
- **複数行**: `textarea` を使う
- **注意**: disabled 系は `isDisabled` を優先する

```tsx
import { Input } from "sparkle-design";

<Input placeholder="検索..." />;
<Input isTrigger triggerIcon="search" triggerAriaLabel="検索" onIconButtonClick={handleSearch} />;
```

---

### input-password

パスワード入力フィールド。表示/非表示のトグルボタン付き。

```tsx
import { InputPassword } from "sparkle-design";

<InputPassword placeholder="パスワードを入力" />;
```

---

### link

ナビゲーション可能なコンテンツを表示するアンカー要素。

- **外部リンク**: `isOpenInNew` で自動アイコン付与
- **使いどころ**: テキスト中のリンク、ナビゲーションリンク
- **button との違い**: ページ遷移には `link`、アクション実行には `button`

```tsx
import { Link } from "sparkle-design";

<Link href="/about">詳細を見る</Link>;
<Link href="https://example.com" isOpenInNew>外部リンク</Link>;
```

---

### modal

オーバーレイウィンドウで情報にフォーカスさせる大型モーダル。

- **sizes**: `sm` / `md` / `lg` / `xl` / `full`
- **使いどころ**: 詳細情報の表示、作成/編集フォーム、複雑なフロー、画像プレビュー
- **dialog との違い**: `modal` は `Dialog` ベースの汎用オーバーレイ。フォーム入力や詳細表示はこちらを使う

```tsx
import { Modal } from "sparkle-design";
```

---

### overlay

システムモードの変更（ローディング中など）を示す半透明オーバーレイ。

```tsx
import { Overlay } from "sparkle-design";
```

---

### radio

複数の選択肢から 1 つを選択。

- **サブコンポーネント**: `Radio`, `RadioItem`
- **使いどころ**: 排他的な単一選択（配送方法、プラン選択など）

```tsx
import { Radio, RadioItem } from "sparkle-design";
```

---

### select

ドロップダウンから値を選択。

- **サブコンポーネント**: `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`
- **使いどころ**: 選択肢が多い場合の単一選択（都道府県、カテゴリなど）

```tsx
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "sparkle-design";
```

---

### skeleton

コンテンツ読み込み中のアニメーションプレースホルダ。

```tsx
import { Skeleton } from "sparkle-design";

<Skeleton className="h-4 w-48" />;
```

---

### slider

指定範囲内の値をスライダーで選択。

```tsx
import { Slider } from "sparkle-design";

<Slider min={0} max={100} step={1} />;
```

---

### spinner

処理の進行中を視覚的に示すインジケータ。

```tsx
import { Spinner } from "sparkle-design";

<Spinner />;
```

---

### switch

設定のオン/オフを切り替えるトグル。

- **sizes**: `sm` / `md` / `lg`

```tsx
import { Switch } from "sparkle-design";

<Switch size="md" />;
```

---

### tabs

情報をタブで切り替えて表示。

- **サブコンポーネント**: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "sparkle-design";
```

---

### tag

要素のカテゴリやステータスを示すラベル。

- **badge との違い**: `tag` はカテゴリ・属性の表現。`badge` は数値や通知数

```tsx
import { Tag } from "sparkle-design";

<Tag>デザイン</Tag>;
```

---

### textarea

複数行のテキスト入力フィールド。

```tsx
import { Textarea } from "sparkle-design";

<Textarea placeholder="詳細を入力してください" rows={4} />;
```

---

### toast

アクション実行後の一時的なフィードバック。自動消去される。

- **inline-message との違い**: `toast` は自動消去される一時表示。ページ固定通知は `inline-message`

```tsx
import { useToast } from "sparkle-design";

const { toast } = useToast();
toast({ title: "保存しました", variant: "success" });
```

---

### tooltip

ホバーまたはフォーカス時に追加情報を表示するポップアップ。

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  IconButton,
} from "sparkle-design";

<Tooltip>
  <TooltipTrigger asChild>
    <IconButton icon="settings" aria-label="設定" />
  </TooltipTrigger>
  <TooltipContent>設定を開く</TooltipContent>
</Tooltip>;
```

---

## コンポーネント選択ガイド

| やりたいこと         | 使うコンポーネント                                                             |
| -------------------- | ------------------------------------------------------------------------------ |
| ボタンを置きたい     | `button`（テキストあり）/ `icon-button`（アイコンのみ）                        |
| テキスト入力         | `input`（1 行）/ `textarea`（複数行）/ `input-password`（パスワード）          |
| 選択入力             | `select`（ドロップダウン）/ `radio`（排他選択）/ `checkbox`（複数選択）        |
| 通知・フィードバック | `toast`（一時）/ `inline-message`（常駐）/ `badge`（数値）                     |
| コンテンツ区切り     | `card`（グループ化）/ `divider`（区切り線）/ `tabs`（切り替え）                |
| モーダル             | `dialog`（確認・シンプル）/ `modal`（大型・複雑）                              |
| ローディング         | `skeleton`（レイアウト維持）/ `spinner`（処理進行）/ `overlay`（操作ブロック） |
| ナビゲーション       | `link`（遷移）/ `breadcrumb`（階層表示）/ `tabs`（コンテキスト内切替）         |
| 追加情報             | `tooltip`（ホバー表示）/ `inline-message`（常時表示）                          |

---

Last Updated: 2026-03-31
