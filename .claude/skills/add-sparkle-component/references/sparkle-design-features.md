# Sparkle Design Features

This document provides detailed information about Sparkle Design components, including their API conventions, styling approach, and accessibility features.

## Table of Contents

- [Component API Conventions](#component-api-conventions)
- [Styling System](#styling-system)
- [Accessibility](#accessibility)
- [Material Icons](#material-icons)
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
