---
name: add-sparkle-component
description: This skill should be used when adding, installing, or setting up Sparkle Design UI components from the registry. It applies when the user asks to "add a sparkle button component", "install sparkle-design card", "add @sparkle-design/input", "set up a new UI component from the sparkle registry", "Sparkle コンポーネントを追加", "sparkle-design のコンポーネントをインストール", or asks how to install Sparkle Design components. Automates package manager detection, configuration validation, component installation, and provides guidance for Storybook integration, CSS setup, and troubleshooting.
---

# Sparkle Design Component Installation

Install Sparkle Design components from the registry with automated setup and validation.

## Quick Start

### Automated Installation (Recommended)

Run the automated script for hassle-free installation:

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

For manual control:

```bash
# Auto-detect package manager and use appropriate command
pnpm dlx shadcn@latest add @sparkle-design/<component-name>
# or
npx shadcn@latest add @sparkle-design/<component-name>
```

---

## Prerequisites

Before installing components, ensure the project has:

1. **Registry Configuration** - `components.json` with Sparkle Design registry
2. **Sparkle Config** - `sparkle.config.json` (optional but recommended)
3. **Package Manager** - npm, pnpm, yarn, or bun installed
4. **Node.js** - Version 18.0.0 or higher

### Validate Configuration

Check if the project is ready:

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

The skill automatically detects the package manager by checking lockfiles:

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
- Component files installed to the path specified in `components.json` (typically `src/components/ui/<component-name>/index.tsx` or similar)
- Dependencies automatically installed
- TypeScript types generated
- Related components installed if needed (Icon, Spinner, etc.)

**Note:** The exact installation path is determined by the `aliases.ui` field in `components.json`.

**Important:** CSS regeneration is **NOT needed** after installing components.

### 4. Verify CSS Imports (First Time Only)

For first-time setup, verify CSS import structure. The key principle: `sparkle-design.css` (SSoT) is imported by `globals.css`, which is imported by the root layout.

```text
sparkle-design.css  ← SSoT (Single Source of Truth)
      ↑ @import
globals.css         ← Imports sparkle-design.css (Tailwind first, then Sparkle)
      ↑ import
layout.tsx          ← Application entry point
```

Run the validation script to check the structure automatically:

```bash
python scripts/validate_config.py
```

**For detailed CSS setup instructions** (Next.js App/Pages Router, Vite, Storybook), see [references/css-structure.md](references/css-structure.md)

### 5. Create/Update Storybook Story

Components use co-location pattern — stories live next to components. The exact path depends on `components.json` configuration:

```text
<ui-alias-path>/<component-name>/
├── index.tsx                      # Component
└── <component-name>.stories.tsx   # Story
```

**Example with default configuration (`src/components/ui`):**
```text
src/components/ui/<component-name>/
├── index.tsx
└── <component-name>.stories.tsx
```

**Create new story** with the standard pattern: `Meta` + `StoryObj`, `tags: ["autodocs"]`, `argTypes` for `variant`/`size`/`theme`.

**Material Icons Note:** Use underscore-separated names (`arrow_forward`, not `arrow-forward`).

**For full story template and details**, see [references/sparkle-design-features.md](references/sparkle-design-features.md)

---

## Checklist

After installation, verify:

- [ ] Component installed at the correct path (check console output after installation)
- [ ] CSS imports configured correctly (first time only)
- [ ] Old duplicate files removed (if any)
- [ ] Storybook story created/updated at the component location
- [ ] shadcn/ui 既定の `text-muted-foreground` / `bg-background` / `font-medium` などを残していない
- [ ] Typography / color は `character-*` / `text-text-*` など Sparkle Design token に置き換えた
- [ ] No type errors: `<pm> lint`
- [ ] Component displays correctly: `<pm> storybook`

**Note:**
- `<pm>` refers to the project's package manager (npm/pnpm/yarn/bun)
- Component path is determined by the `aliases.ui` field in `components.json`

---

## Theme Customization (Optional)

### When CSS Regeneration is Needed

**Only** regenerate CSS when modifying `sparkle.config.json`:

```json
{
  "primary": "blue",
  "font-mono": "Geist Mono",
  "font-pro": "Geist",
  "radius": "md",
  "source-packages": []
}
```

> `source-packages` は npm パッケージとして利用する場合に必須。`@goodpatch/sparkle-design` の `@source` ディレクティブが `globals.css` に自動挿入される。

**Regenerate CSS:**

```bash
pnpm dlx sparkle-design-cli generate
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
- Fix import path: `import { Button } from "./"` (import from the component directory)

**Styles not applying:**
- Check CSS import order: Tailwind before Sparkle Design CSS
- Verify `globals.css` imports `sparkle-design.css`

**Looks slightly off when mixed with shadcn/ui:**
- Replace shadcn/ui default classes like `text-muted-foreground`, `bg-background`, `border-border`, `font-medium` with Sparkle Design tokens
- Prefer Sparkle typography classes (`character-*`) over ad-hoc `text-sm` / `leading-*` combinations inside Sparkle components
- Run `pnpm dlx sparkle-design-cli generate` if config was changed

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

Consult the project's documentation for:
- Project-specific guidelines (e.g., AGENTS.md, CONTRIBUTING.md)
- Component development conventions
- Code style and patterns

---

## AI Assistant Notes

### Execution Guidelines

1. **Always run scripts** - Use automated scripts for reliability
2. **Validate first** - Run `validate_config.py` before installation
3. **Check lockfiles** - Detect package manager before running commands
4. **Verify CSS setup** - On first installation, check CSS import structure
5. **Run type checking** - Execute `<pm> lint` after installation
6. **Run project guard if available** - If the target project has `lint:sparkle`, run it before finishing
7. **Test in Storybook** - Verify component works: `<pm> storybook`

### Anti-pattern ガイドの浸透

初回セットアップ時は、対象プロジェクトで `npx --yes sparkle-design-cli setup --assistant <claude|codex|cursor|generic>` または `pnpm dlx sparkle-design-cli setup --assistant <claude|codex|cursor|generic>` を実行して guard を差し込む。`--target` を省略した場合は `src` 系を自動検出し、既存の Sparkle 用 script は再実行で更新される。独自 script を上書きしたい場合だけ `--force-script-update` を使う。

`lint:sparkle` があるプロジェクトでは、個別のアンチパターンを毎回列挙するより先にコマンドを回す。AI は可能なら `lint:sparkle:json` を実行し、script がまだ無い場合だけ `sparkle-design-cli check <detected-target> --format json` を使う。`findings` と `manualReviewReminders` の両方を確認し、詳細なルール説明が必要な場合だけ `references/sparkle-design-features.md` を読む。

### Progressive Disclosure

Load references as needed:

- **Always available**: This SKILL.md (core workflow)
- **Load on error**: `references/troubleshooting.md`
- **Load for details**: `references/sparkle-design-features.md` (includes Anti-patterns section)
- **Load for CSS setup**: `references/css-structure.md`

---

**Version**: 2.2.0
**Last Updated**: 2026-03-06
