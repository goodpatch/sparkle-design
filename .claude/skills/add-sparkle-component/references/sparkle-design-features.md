# Sparkle Design Features

This document provides detailed information about Sparkle Design components, including their API conventions, styling approach, and accessibility features.

## Table of Contents

- [Component API Conventions](#component-api-conventions)
- [Styling System](#styling-system)
- [Accessibility](#accessibility)
- [Material Icons](#material-icons)
- [Anti-patterns（やってはいけないパターン）](#anti-patternsやってはいけないパターン)
- [Storybook Integration](#storybook-integration)

---

## Component API Conventions

Sparkle Design components follow consistent naming conventions for props to ensure a predictable and intuitive API across all components.

### Standard Props

| Prop         | Type      | Description                    | Example Values                          |
| ------------ | --------- | ------------------------------ | --------------------------------------- |
| `variant`    | `string`  | Visual style variant           | `"solid"`, `"outline"`, `"ghost"`       |
| `size`       | `string`  | Size variant                   | `"sm"`, `"md"`, `"lg"`                  |
| `theme`      | `string`  | Color theme                    | `"primary"`, `"neutral"`, `"negative"`  |
| `isLoading`  | `boolean` | Loading state                  | `true`, `false`                         |
| `isDisabled` | `boolean` | Disabled state                 | `true`, `false`                         |
| `prefixIcon` | `string`  | Icon before content            | `"check"`, `"arrow_forward"`            |
| `suffixIcon` | `string`  | Icon after content             | `"download"`, `"arrow_downward"`        |

### Variant System

Components use Class Variance Authority (CVA) for variant management. Variants are composable and type-safe.

**Example: Button component**

```tsx
<Button variant="solid" size="md" theme="primary">
  Click me
</Button>

<Button variant="outline" size="lg" theme="neutral">
  Cancel
</Button>

<Button variant="ghost" size="sm" theme="negative">
  Delete
</Button>
```

### State Props

State-related props follow the `is*` prefix convention:

- `isLoading` - Shows loading spinner
- `isDisabled` - Disables interaction
- `isOpen` - Controls open/closed state (modals, dropdowns)
- `isSelected` - Indicates selected state
- `isActive` - Indicates active state

**Example:**

```tsx
<Button isLoading>Submitting...</Button>
<Button isDisabled>Can't click</Button>
```

---

## Styling System

Sparkle Design uses a layered styling approach combining Tailwind CSS, CSS Custom Properties, and CVA.

### Tailwind CSS

All components are built with Tailwind utility classes for maximum flexibility and performance.

**Benefits:**

- JIT compilation for optimal bundle size
- Easy customization through Tailwind config
- Responsive design utilities
- Dark mode support

### CSS Custom Properties

Color tokens are managed through CSS Custom Properties for consistent theming.

**Example: Button colors**

```css
.button-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.button-neutral {
  background-color: hsl(var(--neutral));
  color: hsl(var(--neutral-foreground));
}
```

**Customization:** Colors are defined in `sparkle.config.json` and generated into `sparkle-design.css`.

### Class Variance Authority (CVA)

Components use CVA for type-safe variant composition.

**Example:**

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);
```

### Responsive Design

All components are responsive by default. Use Tailwind breakpoint prefixes for responsive variants:

```tsx
<Button className="w-full md:w-auto">
  Responsive Button
</Button>
```

---

## Accessibility

Sparkle Design components follow WAI-ARIA guidelines and best practices for accessibility.

### Keyboard Navigation

All interactive components support keyboard navigation:

- **Tab** - Move between interactive elements
- **Enter/Space** - Activate buttons and toggles
- **Escape** - Close modals and dropdowns
- **Arrow keys** - Navigate menus and lists

### Screen Reader Support

Components include appropriate ARIA attributes:

- `aria-label` - Accessible name for controls
- `aria-labelledby` - Associates labels with controls
- `aria-describedby` - Additional descriptions
- `aria-expanded` - Expansion state for collapsible elements
- `aria-disabled` - Disabled state
- `aria-live` - Live region announcements

**Example:**

```tsx
<Button aria-label="Submit form" isLoading aria-live="polite">
  {isLoading ? "Submitting..." : "Submit"}
</Button>
```

### Focus Management

- Visible focus indicators on all interactive elements
- Focus trapping in modals and dialogs
- Logical tab order
- Skip links for navigation

### Color Contrast

All color combinations meet WCAG 2.1 Level AA standards:

- Text contrast ratio ≥ 4.5:1
- Large text contrast ratio ≥ 3:1
- UI component contrast ratio ≥ 3:1

### Testing Considerations

When testing components:

- Test with keyboard only (no mouse)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test focus management
- Verify ARIA attributes
- Check color contrast

---

## Material Icons

Sparkle Design uses Material Symbols for icons.

### Icon Name Format

**Important:** Use underscore-separated names (not hyphen-separated)

```tsx
// ✅ Correct - underscore
<Button prefixIcon="arrow_forward">Next</Button>
<Button suffixIcon="arrow_back">Previous</Button>

// ❌ Wrong - hyphen
<Button prefixIcon="arrow-forward">Next</Button>
```

### Common Icons

| Icon Name         | Description     | Usage                  |
| ----------------- | --------------- | ---------------------- |
| `arrow_forward`   | Right arrow     | Next, forward actions  |
| `arrow_back`      | Left arrow      | Back, previous actions |
| `arrow_upward`    | Up arrow        | Upload, scroll up      |
| `arrow_downward`  | Down arrow      | Download, scroll down  |
| `check`           | Checkmark       | Success, confirmation  |
| `close`           | Close/X         | Close, cancel          |
| `add`             | Plus sign       | Add, create            |
| `remove`          | Minus sign      | Remove, delete         |
| `search`          | Magnifying glass| Search                 |
| `settings`        | Gear icon       | Settings, preferences  |
| `menu`            | Hamburger menu  | Menu, navigation       |
| `more_vert`       | Vertical dots   | More options           |
| `more_horiz`      | Horizontal dots | More options           |
| `edit`            | Pencil          | Edit                   |
| `delete`          | Trash can       | Delete                 |
| `download`        | Download icon   | Download               |
| `upload`          | Upload icon     | Upload                 |

**Full icon library:** https://fonts.google.com/icons

### Icon Size Scale

Icon / Spinner の `size` prop はスケール値（1-12）を受け取る。ピクセル値は渡さないこと。

| scale | px  | 用途例 |
|-------|-----|--------|
| 1     | 12  | 極小 |
| 2     | 14  | |
| 3     | 16  | インラインアイコン |
| 4     | 18  | ボタン sm |
| 5     | 20  | ボタン md（デフォルト） |
| 6     | 24  | ボタン lg |
| 7     | 28  | サイドバーロゴ |
| 8     | 32  | |
| 9     | 36  | |
| 10    | 42  | |
| 11    | 48  | 大型アイコン |
| 12    | 54  | |

```tsx
// Wrong - ピクセル値
<Icon icon="settings" size={24} />

// Correct - スケール値
<Icon icon="settings" size={6} />

// Button の prefixIcon/suffixIcon はサイズ自動設定（sm→4, md→5, lg→6）
<Button prefixIcon="check">確定</Button>
```

### Icon Customization

Icons can be styled through component props or CSS:

```tsx
// Size variant affects icon size
<Button size="sm" prefixIcon="check">Small</Button>
<Button size="lg" prefixIcon="check">Large</Button>

// Custom icon styling
<Button className="[&>svg]:w-5 [&>svg]:h-5" prefixIcon="check">
  Custom size
</Button>
```

---

## Storybook Integration

Sparkle Design components come with comprehensive Storybook stories.

### Story Structure

Each component follows a consistent story structure:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./";

const meta = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    theme: {
      control: "select",
      options: ["primary", "neutral", "negative"],
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Example",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <ComponentName variant="solid">Solid</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
      <ComponentName variant="ghost">Ghost</ComponentName>
    </div>
  ),
};
```

### Co-location Pattern

Stories are co-located with component files. The exact path depends on your `components.json` configuration:

```text
<ui-alias-path>/<component-name>/
├── index.tsx                      # Component
└── <component-name>.stories.tsx   # Story
```

Example with default configuration (`src/components/ui`):
```text
src/components/ui/<component-name>/
├── index.tsx
└── <component-name>.stories.tsx
```

### Interactive Controls

Storybook provides interactive controls for all component props:

- Select dropdowns for variants and sizes
- Boolean toggles for state props
- Text inputs for content and labels
- Color pickers for theme customization

### Documentation

Stories are automatically documented with:

- Component description
- Prop types and defaults
- Usage examples
- Accessibility notes

---

## Theme Customization

### Configuration File

Theme settings are managed in `sparkle.config.json`:

```json
{
  "primary": "blue",
  "font-mono": "Geist Mono",
  "font-pro": "Geist",
  "radius": "md"
}
```

> npm パッケージとして利用する場合は `extend.source-packages` の指定が必須。詳細は `extend` セクションを参照。

### Generating CSS

After modifying `sparkle.config.json`, regenerate CSS:

```bash
pnpm dlx sparkle-design-cli generate
```

### Custom Colors

Available color options:

- `blue`, `red`, `green`, `yellow`, `purple`, `pink`, `gray`

### Custom Radius

Available radius options:

- `none`, `sm`, `md`, `lg`, `xl`, `full`

### Custom Fonts

Specify any installed font family:

```json
{
  "font-pro": "Inter",
  "font-mono": "Fira Code"
}
```

### extend セクション（拡張設定）

プロジェクト固有の拡張（フォント詳細、パッケージスキャン、カスタム CSS）は `extend` セクションにまとめる。`extend` はオブジェクト直書き（推奨）またはファイルパス（例: `"./sparkle.extend.json"`）を指定可能。

```json
{
  "primary": "blue",
  "font-pro": "Montserrat",
  "font-mono": "Roboto Mono",
  "radius": "md",
  "extend": {
    "fonts": {
      "pro": [
        { "family": "Montserrat", "weights": [500, 600, 700] },
        { "family": "Noto Sans JP", "weights": [400, 500, 600, 700] }
      ]
    },
    "source-packages": ["@goodpatch/sparkle-design-internal"],
    "custom-css": "./src/app/custom-tokens.css"
  }
}
```

- `extend.fonts` がない場合は `font-pro` / `font-mono` + デフォルトウェイト `[400, 700]` が使われる
- 同じフォントファミリーが pro と mono で重複する場合、ウェイトはマージされ import は 1 行に統合
- `extend.custom-css` で指定した CSS ファイルは `globals.css` に `@import` が自動挿入される。CLI はファイルの中身を一切触らない

---

## Anti-patterns（やってはいけないパターン）

以下は頻繁に発生する誤用パターンです。コンポーネントが提供する専用 props・サブコンポーネントを使ってください。

### CardTitle の補足テキストには CardDescription を使う

```tsx
// ✅ Correct
<CardHeader>
  <CardTitle>
    プロジェクト一覧
    <CardDescription className="character-3-regular-pro text-text-neutral-low">
      全 12 件
    </CardDescription>
  </CardTitle>
</CardHeader>

// ❌ Wrong — CardTitle 内に span で補足を入れない
<CardHeader>
  <CardTitle>
    プロジェクト一覧
    <span className="text-sm text-neutral-500">(12件)</span>
  </CardTitle>
</CardHeader>
```

CardTitle 内の補足情報や件数は CardDescription を使い、必要な typography / color token は className で明示する。長い説明文は CardContent に配置する。

### Input / Select と横並びの Button はサイズを揃える

```tsx
// ✅ Correct — 同じサイズで統一
<div className="flex gap-2">
  <Input placeholder="検索..." />
  <Button size="md">検索</Button>
</div>

// ❌ Wrong — サイズ不一致で高さが揃わない
<div className="flex gap-2">
  <Input placeholder="検索..." />
  <Button size="sm">検索</Button>
</div>
```

Input / Select / Textarea のデフォルトサイズは md。横並びの Button も原則 md に合わせる。省スペース UI では Input と Button を揃えて sm にしてよい。テーブル内アクションなど独立した Button は sm でよい。

### Badge と Tag を用途で使い分ける

| コンポーネント | 用途 | 例 |
| --- | --- | --- |
| **Badge** | 特定の要素に**数値情報**を付与 | `<Badge>3</Badge>` |
| **Tag** | 情報の**ラベリング / ステータス付与** | `<Tag status="success">完了</Tag>` |

```tsx
// ✅ Correct — ステータス表示には Tag を使う
<Tag variant="outline" status="warning">未紐付け</Tag>

// ❌ Wrong — Badge をステータスラベルに使わない
<Badge>未紐付け</Badge>
```

### shadcn/ui 由来の class / token をそのまま使わない

```tsx
// ✅ Correct — Sparkle Design の typography / color token を使う
<CardDescription className="character-3-regular-pro text-text-neutral-low">
  全 12 件
</CardDescription>

// ❌ Wrong — shadcn/ui の既定 token や素の font utility を持ち込まない
<CardDescription className="text-sm text-muted-foreground">
  全 12 件
</CardDescription>
<CardDescription className="font-medium text-slate-500">
  全 12 件
</CardDescription>
```

shadcn/ui と混在するプロジェクトでも、Sparkle Design のコンポーネント内では `character-*` / `text-text-*` / Sparkle の color token を優先する。

### Button: prefixIcon / suffixIcon を使う

```tsx
// ✅ Correct
<Button prefixIcon="check">確定</Button>
<Button suffixIcon="arrow_forward">次へ</Button>

// ❌ Wrong - Icon を children に入れない（レイアウト崩れ・ローディング時に非表示にならない）
<Button><Icon icon="check" /> 確定</Button>

// ❌ Wrong - children なしの Button + prefixIcon は IconButton に置き換える
<Button prefixIcon="close" aria-label="閉じる" />

// ❌ Wrong - asChild では prefixIcon / suffixIcon / isLoading は反映されない
<Button asChild prefixIcon="add">
  <Link href="/items/new">新規作成</Link>
</Button>

// ✅ Correct
<IconButton icon="edit" aria-label="編集" />
<Button asChild>
  <Link href="/items/new">新規作成</Link>
</Button>
```

> Button は size に応じてアイコンサイズを自動設定する（sm→4, md→5, lg→6）。isLoading 時にアイコンを自動で非表示にする。`asChild` 使用時はアイコンやローディング表現をスロット先で組み立てる。

### CardHeader: CardControl を使う

```tsx
// ✅ Correct
<CardHeader>
  <CardTitle>タイトル</CardTitle>
  <CardControl>
    <Button theme="neutral" variant="outline">キャンセル</Button>
    <Button>保存</Button>
  </CardControl>
</CardHeader>

// ❌ Wrong - 手動 flex を使わない（CardHeader は内部で flex justify-between を適用済み）
<CardHeader>
  <div className="flex justify-between">
    <CardTitle>タイトル</CardTitle>
    <Button>アクション</Button>
  </div>
</CardHeader>
```

`CardControl` は既定で `flex items-center gap-2` を持つ。複数アクションでも追加の layout class は不要。

### クリック可能な Card: ClickableCard を使う

```tsx
// ✅ Correct
<ClickableCard onClick={handle}>
  <CardHeader><CardTitle>タイトル</CardTitle></CardHeader>
</ClickableCard>

// ❌ Wrong - <button> / <a> で Card を包まない
<button type="button" onClick={handle}>
  <Card>
    <CardHeader><CardTitle>タイトル</CardTitle></CardHeader>
  </Card>
</button>
```

`ClickableCard` はクリック可能な Card のパターンとして必要な `role` / キーボード操作 / focus ring を提供する。`<button>` / `<a>` / `role="button"` でラップすると、ボタンの内側に対話型要素（リンクやフォーム要素）を置いたときにネストされた interactive 要素になりアクセシビリティ違反になる。

### Icon / Spinner: スケール値（1-12）を使う

```tsx
// ✅ Correct - スケール値
<Icon icon="settings" size={6} />   // 24px 相当

// ❌ Wrong - ピクセル値は受け付けない
<Icon icon="settings" size={24} />
```

> スケール対応表は上記「Icon Size Scale」セクション参照。

### children なしの Button + prefixIcon / suffixIcon を使わない

```tsx
// ✅ Correct
<IconButton icon="close" aria-label="閉じる" />

// ❌ Wrong - children なしの Button + prefixIcon
<Button prefixIcon="close" aria-label="閉じる" />
```

### Material Symbols を直書きしない

```tsx
// ✅ Correct
<Icon icon="content_copy" size={4} />
<IconButton icon="content_copy" size="xs" aria-label="コピー" />

// ❌ Wrong - material-symbols-rounded を直書きしない
<span className="material-symbols-rounded text-sm">content_copy</span>
```

Material Symbols は `Icon` / `IconButton` 経由で使用する。直書きするとフォント読み込みタイミングでアイコン名テキストが見えることがある。

### DialogCancel / DialogAction: Button で二重ラップしない

```tsx
// ✅ Correct - 文字列を渡すだけ（内部で Button を描画）
<DialogCancel>キャンセル</DialogCancel>
<DialogAction>確定</DialogAction>

// ❌ Wrong - 二重ラップ
<DialogCancel><Button>キャンセル</Button></DialogCancel>
```

### Dialog / Modal: 用途を混ぜない

| コンポーネント | ベース | 用途 | 例 |
| --- | --- | --- | --- |
| **Dialog** | `AlertDialog` | アクション確認 | 削除確認、再試行確認、保存前の警告 |
| **Modal** | `Dialog` | フォーム入力・情報表示 | 作成/編集フォーム、詳細表示 |

```tsx
// ✅ Correct - フォーム入力には Modal を使う
<Modal>
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>ユーザー作成</ModalTitle>
      <ModalClose />
    </ModalHeader>
    <ModalBody isSpace>
      <Input />
      <Select />
    </ModalBody>
    <ModalFooter>
      <Button variant="ghost">キャンセル</Button>
      <Button>作成</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

// ❌ Wrong - フォーム入力に Dialog を使わない
<Dialog>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>ユーザー作成</DialogTitle>
    </DialogHeader>
    <Input />
    <Select />
    <DialogFooter>
      <DialogCancel>キャンセル</DialogCancel>
      <DialogAction>作成</DialogAction>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Input: 組み込みトリガーを使う

```tsx
// ✅ Correct
<Input isTrigger triggerIcon="search" triggerAriaLabel="検索" onIconButtonClick={handleSearch} />

// ❌ Wrong - 手動で IconButton を配置しない
<div className="flex">
  <Input />
  <IconButton icon="search" aria-label="検索" />
</div>
```

### Link: isOpenInNew を使う

```tsx
// ✅ Correct - 自動で open_in_new アイコンが表示される
<Link href="https://example.com" isOpenInNew>外部リンク</Link>

// ❌ Wrong - 手動でアイコンを追加しない
<Link href="https://example.com">外部リンク <Icon icon="open_in_new" /></Link>
```

### Tailwind デフォルト typography を使わない

```tsx
// ✅ Correct — character-* utility を使う
<span className="character-3-regular-pro">テキスト</span>

// ❌ Wrong — Tailwind デフォルトの typography を使わない
<span className="text-sm font-medium">テキスト</span>

// 例外 — character-* に対応するサイズが無い場合は arbitrary value を使うか
// suppress コメントを付けて残す
<span className="text-[10px] text-text-neutral-low">12px 未満の極小メタ情報</span>
{/* sparkle-disable-next-line tailwind-typography */}
<span className="text-xs">どうしても text-xs で残したいケース</span>
```

Sparkle Design コンポーネント内では `character-*-pro` / `character-*-mono` を使用する。character-1（12px）より小さい指定や、対応 token が無いサイズは Tailwind の arbitrary value (`text-[10px]` 等) で表現するか、`// sparkle-disable-line tailwind-typography` で個別に例外指定する。

`font-medium` / `font-semibold`（500 / 600）は character-* に対応する token が存在しない。`character-N-regular-pro font-semibold` のように Tailwind の font-weight ユーティリティを併用しても、character-* が意図的に Tailwind の後に読み込まれる cascade 設計のため上書きされず効かない。これらのウェイトが必要な場合は `extend.custom-css` で `character-N-semibold-pro` のような独自クラスを定義し、font-family / font-size / letter-spacing / line-height は character-* と同じプリミティブトークンを流用する（詳細は README の「character-* に無いウェイトを使いたい場合」）。

### CardTitle に typography を上書きしない

```tsx
// ✅ Correct — CardTitle はデフォルトで character-4-bold-pro が適用される
<CardTitle>タイトル</CardTitle>

// ❌ Wrong — typography を上書きしない
<CardTitle className="character-2-bold-pro">タイトル</CardTitle>
```

### CardControl にはアクションボタンのみを入れる

```tsx
// ✅ Correct — Button / IconButton を CardControl に入れる
<CardControl>
  <Button>保存</Button>
</CardControl>

// ❌ Wrong — ステータス表示を CardControl に入れない（CardDescription を使う）
<CardControl>
  <Tag status="negative">警告</Tag>
</CardControl>
```

### Card 系コンポーネントの padding を上書きしない

```tsx
// ✅ Correct — デフォルトの padding をそのまま使う
<CardHeader>
  <CardTitle>タイトル</CardTitle>
</CardHeader>

// ❌ Wrong — padding を安易に上書きしない
<CardHeader className="p-4 pb-2">
  <CardTitle>タイトル</CardTitle>
</CardHeader>
```

### asChild と prefixIcon / suffixIcon / isLoading を併用しない

```tsx
// ✅ Correct
<Button asChild>
  <Link href="/items/new">新規作成</Link>
</Button>

// ❌ Wrong — asChild では prefixIcon は反映されない
<Button asChild prefixIcon="add">
  <Link href="/items/new">新規作成</Link>
</Button>
```

### disabled ではなく isDisabled を使う

```tsx
// ✅ Correct
<Button isDisabled>確定</Button>
<Input isDisabled placeholder="無効状態" />

// ❌ Wrong — disabled 属性を直接使わない
<Button disabled>確定</Button>
```

HTML 標準の `disabled` も互換のため受け付けますが、Sparkle Design のコードでは `isDisabled` に統一します。

### Button の prefixIcon / suffixIcon に JSX を渡さない

```tsx
// ✅ Correct — 文字列でアイコン名を渡す
<Button prefixIcon="bolt">アクション</Button>

// ❌ Wrong — JSX を渡さない
<Button prefixIcon={<Icon icon="bolt" size={4} />}>アクション</Button>
```

### Icon の children にテキストを渡さない

```tsx
// ✅ Correct — icon prop を使う
<Icon icon="chevron_left" size={4} />

// ❌ Wrong — children にテキストを渡さない
<Icon size={4}>chevron_left</Icon>
```

### 旧セマンティックカラーではなく用途別トークンを使う

新体系は「用途 × 意味 × 強度 × **状態**」で、状態がトークン名に内包される。
そのため**同じ旧クラスでも文脈によって移行先が変わる**。

| if（状況） | then（移行先） |
|---|---|
| 通常状態の背景に `bg-primary-600` | `bg-surface-primary-high-enabled` |
| hover の背景に `hover:bg-primary-700` | `hover:bg-surface-primary-high-hover` |
| variant 接頭辞なしで `bg-primary-200` | **自動変換しない**（`surface-primary-high-disabled` と `surface-primary-middle-active` のどちらか判断が要る） |
| 文字色に `text-primary-600` | `text-text-primary-enabled` |
| 枠線に `border-primary-300` | `border-border-primary-high` |
| アイコン色に `fill-primary-600` | `fill-object-primary-enabled` |

`secondary` は `neutral` に統合された。ユーティリティ接頭辞がそのまま用途に対応する
（`bg-` → surface / `text-` → text / `border-`・`divide-`・`outline-`・`ring-` → border / `fill-`・`stroke-` → object）。

判断が付かないときは推測で置換せず、Figma の該当箇所を確認する。

### Tailwind 既定パレットの色をそのまま使わない

```tsx
// ✅ Correct — 用途別セマンティックトークンを使う
<main className="bg-surface-base-100">
  <h1 className="character-6-bold-pro text-text-negative-enabled">認証エラー</h1>
</main>

// ❌ Wrong — Tailwind 既定パレットの色を直接指定する
<main className="bg-gray-50">
  <h1 className="character-6-bold-pro text-red-600">認証エラー</h1>
</main>
```

Sparkle のプリミティブは Tailwind の同名変数をそのまま参照しているため
（`--color-negative-600: var(--color-red-600)`）、`gray` / `red` / `green` / `yellow` / `blue`
の 5 系統は**置き換えても値が変わらない**。それ以外（`slate` / `zinc` / `emerald` …）は
色味が変わるので、移行先は候補として提示するだけで自動変換はしない。

| if（状況） | then（移行先） |
|---|---|
| 背景に `bg-gray-100` | `bg-surface-base-100`（ページ地の専用トークン） |
| 文字色に `text-red-600` | `text-text-negative-enabled` |
| 枠線に `border-gray-200` | `border-border-neutral-*` |
| アイコン色に `fill-red-600` | `fill-object-negative-enabled` |
| `bg-blue-600` | ブランド色なら `surface-primary-*`、状態表示なら `surface-info-*`。**Figma を見て決める** |
| `text-purple-500` など対応する意味が無い色 | 用途から選び直す。装飾用の面なら `bg-surface-accent-1` 〜 `3` |

`surface-base-*` は `0` / `100` / `200` の 3 段しか無い。`bg-gray-50` のように対応する
段が無いレベルは `surface-neutral-*` 側に案内される。**移行先は check の出力に従うこと**
（この表は用途の考え方を示すもので、レベルごとの対応はコマンドが出す）。

`text-neutral-*` は Sparkle の旧セマンティック層と同名なので、このルールではなく
`legacy-color-token` が扱う（同じ箇所を二重に報告しないため）。

このルールは **Sparkle を使っているファイルにだけ**適用される（Sparkle からの import か
`character-*` の使用がある場合）。素の React コードや、Sparkle と無関係なユーティリティは対象外。

検査対象は `.js` / `.jsx` / `.ts` / `.tsx` のみで、**`.css` の `@apply` は見ていない**
（`legacy-color-token` は `.css` も見るので、そちらとは対象範囲が違う）。CSS 側に
Tailwind 既定パレットの色が残っていないかは手で確認すること。

### 旧セマンティックカラーの CSS 変数を直接参照しない

```tsx
// ✅ Correct
<div className="ring-2 ring-[var(--color-border-ring)] ring-offset-2" />

// ❌ Wrong — beta 終了時に削除される旧トークン
<div className="ring-2 ring-[var(--color-ring-normal)] ring-offset-2" />
```

フォーカスリングの `--color-ring-normal` は `--color-border-ring`（blue/700 固定）に移行する。
`--color-primary-600` のようなスケール付きの旧変数は、変数名だけでは用途
（surface / text / border / object）が決まらないため**自動変換しない**。

### 削除予定の後方互換エイリアスを直接参照しない

```tsx
// ✅ Correct
<div className="rounded-[var(--radius-container)]" />

// ❌ Wrong — beta 終了時に削除され、角丸がサイレントに消える
<div className="rounded-[var(--radius-halfModal)]" />
```

Figma の `Borders: Semantics` で `halfModal` は `container` にリネームされた。
`--radius-halfModal` は beta 期間だけのエイリアスで、消えても CSS としては
有効なまま（値が空になるだけ）なので**ビルドエラーにならずに角丸だけが失われる**。

### 余白は Figma の Spacing: Primitives のステップだけ使う

Figma の余白は 17 段（0 / 2 / 4 / 6 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 72 / 88 / 104 / 120 px）。
Tailwind の 1 ステップは 4px なので、`p-4` = 16px、`p-6` = 24px が対応する。

```tsx
// ✅ Correct — 6=24px / 4=16px / 8=32px はいずれもスケール上にある
<div className="p-6 gap-4 mt-8" />

// ❌ Wrong — 7 は 28px。24px と 32px の間にステップは無い
<div className="p-7" />
```

**Tailwind の数字と Figma の数字は一致しない。** Figma の `padding/16` は 16px、
Tailwind の `p-16` は 64px で 4 倍違う。Figma の値を見て同じ数字を書かないこと。

| Figma | px | Tailwind |
|---|---|---|
| `padding/8` | 8px | `p-2` |
| `padding/16` | 16px | `p-4` |
| `padding/24` | 24px | `p-6` |
| `padding/120` | 120px | `p-30` |

このスケールは **CSS 変数として出力されていない**。`--spacing-16` のような
名前付きキーを定義すると Tailwind の `p-16` がその値に差し替わり、
既存コードの余白がビルドも警告も通ったまま変わってしまうため。
だから「変数を使う」ではなく「使ってよい値を守る」という形の制約になっている。

デザイン上どうしてもスケール外の値が要る場合は、Figma 側にステップを追加するのが本筋。
個別に外すなら `sparkle-disable-next-line use-figma-spacing-scale` を使う。

---

## Best Practices

### Component Usage

1. **Use semantic HTML** - Components render appropriate HTML elements
2. **Provide labels** - Always label interactive elements
3. **Handle loading states** - Use `isLoading` prop for async actions
4. **Handle errors** - Provide error feedback to users
5. **Test accessibility** - Verify keyboard and screen reader support

### Styling

1. **Use Tailwind utilities** - Leverage Tailwind for custom styling
2. **Don't override base styles** - Extend with `className` prop
3. **Maintain contrast** - Ensure readable text and visible focus
4. **Test responsiveness** - Verify layouts on different screen sizes

### Performance

1. **Import components selectively** - Only import what you need
2. **Use lazy loading** - Load heavy components on demand
3. **Optimize images** - Use appropriate formats and sizes
4. **Monitor bundle size** - Keep an eye on component overhead

---

## Resources

- **Official Documentation:** https://sparkle-design.goodpatch.com/
- **shadcn/ui Documentation:** https://ui.shadcn.com/docs
- **Tailwind CSS Documentation:** https://tailwindcss.com/docs
- **Radix UI Documentation:** https://www.radix-ui.com/
- **Material Symbols:** https://fonts.google.com/icons
- **WAI-ARIA Practices:** https://www.w3.org/WAI/ARIA/apg/
