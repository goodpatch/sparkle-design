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

```
<ui-alias-path>/<component-name>/
├── index.tsx                      # Component
└── <component-name>.stories.tsx   # Story
```

Example with default configuration (`src/components/ui`):
```
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
  "radius": "md",
  "source-packages": []
}
```

> `source-packages` は npm パッケージとして利用する場合に必須。追加パッケージのスキャンが必要な場合は配列にパッケージ名を追加する。

### Generating CSS

After modifying `sparkle.config.json`, regenerate CSS:

```bash
pnpm dlx sparkle-design-cli
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

---

## Anti-patterns（やってはいけないパターン）

以下は頻繁に発生する誤用パターンです。コンポーネントが提供する専用 props・サブコンポーネントを使ってください。

### CardTitle の補足テキストには CardDescription を使う

```tsx
// ✅ Correct
<CardHeader>
  <CardTitle>
    プロジェクト一覧
    <CardDescription className="character-3-regular-pro text-text-low">
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

CardTitle 内の補足情報や件数は CardDescription を使い、必要な typography / color token は `className` で明示する。

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

Input / Select / Textarea のデフォルトサイズは `md`。横並びの Button も原則 `md` に合わせる。テーブル内アクションなど独立した Button は `sm` でよい。

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
<CardDescription className="character-3-regular-pro text-text-low">
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

// ❌ Wrong - アイコンのみのボタンは IconButton を使う
<Button><Icon icon="edit" /></Button>
// ✅ Correct
<IconButton icon="edit" aria-label="編集" />
```

> Button は size に応じてアイコンサイズを自動設定する（sm→4, md→5, lg→6）。isLoading 時にアイコンを自動で非表示にする。

### CardHeader: CardControl を使う

```tsx
// ✅ Correct
<CardHeader>
  <CardTitle>タイトル</CardTitle>
  <CardControl>
    <Button>アクション</Button>
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

### Icon / Spinner: スケール値（1-12）を使う

```tsx
// ✅ Correct - スケール値
<Icon icon="settings" size={6} />   // 24px 相当

// ❌ Wrong - ピクセル値は受け付けない
<Icon icon="settings" size={24} />
```

> スケール対応表は上記「Icon Size Scale」セクション参照。

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

- **Official Documentation:** https://sparkle-design.vercel.app/
- **shadcn/ui Documentation:** https://ui.shadcn.com/docs
- **Tailwind CSS Documentation:** https://tailwindcss.com/docs
- **Radix UI Documentation:** https://www.radix-ui.com/
- **Material Symbols:** https://fonts.google.com/icons
- **WAI-ARIA Practices:** https://www.w3.org/WAI/ARIA/apg/
