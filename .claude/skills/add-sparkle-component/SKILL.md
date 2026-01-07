---
name: add-sparkle-component
description: Install Sparkle Design components from the registry. Use this skill when you need to add UI components (button, card, input, etc.) to a project that uses Sparkle Design. This skill automates package manager detection, configuration validation, component installation, and provides guidance for Storybook integration and troubleshooting.
metadata:
  version: "2.0.0"
  parameters:
    - name: component-name
      description: Component name to install (e.g., button, card, input)
      required: true
      type: string
  aliases:
    - install-sparkle-component
    - sparkle-add
    - add-component
  tags:
    - sparkle-design
    - component
    - ui
    - shadcn
---

# Sparkle Design Component Installation

Install Sparkle Design components from the registry with automated setup and validation.

## Quick Start

### Automated Installation (Recommended)

Use the automated script for hassle-free installation:

```bash
python scripts/install_component.py <component-name>
```

The script automatically:
- Detects package manager (pnpm/yarn/bun/npm)
- Validates configuration
- Installs the component
- Reports results and next steps

**Example:**

```bash
python scripts/install_component.py button
```

### Manual Installation

If you prefer manual control:

```bash
# Auto-detect package manager and use appropriate command
pnpm dlx shadcn@latest add @sparkle-design/<component-name>
# or
npx shadcn@latest add @sparkle-design/<component-name>
```

---

## Prerequisites

Before installing components, ensure your project has:

1. **Registry Configuration** - `components.json` with Sparkle Design registry
2. **Sparkle Config** - `sparkle.config.json` (optional but recommended)
3. **Package Manager** - npm, pnpm, yarn, or bun installed
4. **Node.js** - Version 18.0.0 or higher

### Validate Configuration

Check if your project is ready:

```bash
python scripts/validate_config.py
```

This verifies:
- `components.json` exists and has correct registry URL
- `sparkle.config.json` exists (optional)
- CSS import structure is correct

---

## Installation Workflow

### 1. Detect Package Manager

The skill automatically detects your package manager by checking lockfiles:

- `pnpm-lock.yaml` → **pnpm**
- `yarn.lock` → **yarn**
- `bun.lockb` → **bun**
- `package-lock.json` → **npm**
- No lockfile → **npm** (default)

**Manual detection:**

```bash
python scripts/detect_package_manager.py
```

### 2. Verify Registry Configuration

Ensure `components.json` contains the Sparkle Design registry:

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.vercel.app/r/{name}.json"
  }
}
```

**If missing**, add this configuration to `components.json`.

### 3. Install Component

Run the automated installation script:

```bash
python scripts/install_component.py <component-name>
```

**What happens:**
- Component files installed to `src/components/ui/<component-name>/index.tsx`
- Dependencies automatically installed
- TypeScript types generated
- Related components installed if needed (Icon, Spinner, etc.)

**Important:** CSS regeneration is **NOT needed** after installing components.

### 4. Verify CSS Imports (First Time Only)

For first-time setup, verify CSS import structure:

**Next.js App Router:**

```tsx
// src/app/globals.css
@import "tailwindcss";
@import "./sparkle-design.css";

// src/app/layout.tsx
import "./globals.css";
```

**Next.js Pages Router:**

```tsx
// styles/globals.css
@import "tailwindcss";
@import "./sparkle-design.css";

// pages/_app.tsx
import "../styles/globals.css";
```

**Storybook:**

```js
// .storybook/preview.js
import "../src/app/globals.css";
```

**For detailed CSS setup instructions**, see [references/css-structure.md](references/css-structure.md)

### 5. Create/Update Storybook Story

Components use co-location pattern - stories live next to components:

```
src/components/ui/<component-name>/
├── index.tsx                      # Component
└── <component-name>.stories.tsx   # Story
```

**Create new story:**

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
```

**Material Icons Note:** Use underscore-separated names:

```tsx
// ✅ Correct
export const WithIcons: Story = {
  args: {
    prefixIcon: "check",
    suffixIcon: "arrow_forward", // ← underscore
  },
};

// ❌ Wrong
export const Wrong: Story = {
  args: {
    suffixIcon: "arrow-right", // ← hyphen doesn't work
  },
};
```

---

## Checklist

After installation, verify:

- [ ] Component installed at `src/components/ui/<component-name>/index.tsx`
- [ ] CSS imports configured correctly (first time only)
- [ ] Old duplicate files removed (if any)
- [ ] Storybook story created/updated
- [ ] No type errors: `<pm> lint`
- [ ] Component displays correctly: `<pm> storybook`

**Note:** `<pm>` means your package manager (npm/pnpm/yarn/bun)

---

## Theme Customization (Optional)

### When CSS Regeneration is Needed

**Only** regenerate CSS when modifying `sparkle.config.json`:

```json
{
  "primary": "blue",      // ← Color change
  "font-mono": "Geist Mono",  // ← Font change
  "font-pro": "Geist",        // ← Font change
  "radius": "md"              // ← Radius change
}
```

**Regenerate CSS:**

```bash
pnpm dlx sparkle-design-cli
```

### When Regeneration is NOT Needed

- ❌ Adding components
- ❌ Deleting components
- ❌ Modifying component props
- ❌ Updating stories

---

## Troubleshooting

### Quick Solutions

**Type errors in stories:**
- Fix import path: `import { Button } from "./button/"` (with trailing slash)

**Styles not applying:**
- Check CSS import order: Tailwind before Sparkle Design CSS
- Verify `globals.css` imports `sparkle-design.css`
- Run `pnpm dlx sparkle-design-cli` if config was changed

**Component not found:**
- Verify registry URL in `components.json`
- Use `shadcn@latest` for latest CLI version
- Check component name spelling

**Package manager not found:**
- Install the package manager or use `npx` (always available)

**For detailed troubleshooting**, see [references/troubleshooting.md](references/troubleshooting.md)

---

## Available Scripts

### Installation Script

```bash
python scripts/install_component.py <component-name> [--path /path/to/project]
```

**Options:**
- `--path` - Project directory (default: current directory)
- `--pm` - Force specific package manager (pnpm/yarn/bun/npm)

### Validation Script

```bash
python scripts/validate_config.py [--path /path/to/project]
```

Checks:
- components.json configuration
- sparkle.config.json existence
- CSS import structure

### Package Manager Detection

```bash
python scripts/detect_package_manager.py [--path /path/to/project]
```

Outputs: `pnpm`, `yarn`, `bun`, or `npm`

---

## Reference Documentation

For detailed information, consult these references:

- **[troubleshooting.md](references/troubleshooting.md)** - Detailed solutions for common issues
- **[sparkle-design-features.md](references/sparkle-design-features.md)** - Component API, styling, accessibility
- **[css-structure.md](references/css-structure.md)** - CSS setup for different frameworks

---

## Component Features

Sparkle Design components provide:

- **Consistent API** - Standardized props: `variant`, `size`, `theme`, `isLoading`, `isDisabled`
- **Tailwind-based** - Utility-first CSS with full customization
- **Accessible** - WAI-ARIA compliant with keyboard navigation and screen reader support
- **Type-safe** - Full TypeScript support with CVA variants
- **Responsive** - Mobile-first design with Tailwind breakpoints

**For complete feature documentation**, see [references/sparkle-design-features.md](references/sparkle-design-features.md)

---

## Related Resources

### Official Documentation

- [Sparkle Design](https://sparkle-design.vercel.app/)
- [shadcn/ui CLI](https://ui.shadcn.com/docs/cli)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

### Project Documentation

- [AGENTS.md](../../AGENTS.md) - Project guidelines
- [src/components/AGENTS.md](../../src/components/AGENTS.md) - Component development guide
- [README.md](../../README.md) - Project overview

---

## AI Assistant Notes

### Execution Guidelines

1. **Always run scripts** - Use automated scripts for reliability
2. **Validate first** - Run `validate_config.py` before installation
3. **Check lockfiles** - Detect package manager before running commands
4. **Verify CSS setup** - On first installation, check CSS import structure
5. **Run type checking** - Execute `<pm> lint` after installation
6. **Test in Storybook** - Verify component works: `<pm> storybook`

### Common Patterns

**Full installation workflow:**

```bash
# 1. Validate configuration
python scripts/validate_config.py

# 2. Install component
python scripts/install_component.py button

# 3. Verify types
pnpm lint

# 4. Test in Storybook
pnpm storybook
```

**Troubleshooting workflow:**

```bash
# 1. Detect package manager
python scripts/detect_package_manager.py

# 2. Validate configuration
python scripts/validate_config.py

# 3. Check detailed issues
# Read references/troubleshooting.md for specific error
```

### Progressive Disclosure

Load references as needed:

- **Always available**: This SKILL.md (core workflow)
- **Load on error**: `references/troubleshooting.md`
- **Load for details**: `references/sparkle-design-features.md`
- **Load for CSS setup**: `references/css-structure.md`

---

**Version**: 2.0.0
**Last Updated**: 2026-01-07
**Lines**: ~280 (reduced from 519)
