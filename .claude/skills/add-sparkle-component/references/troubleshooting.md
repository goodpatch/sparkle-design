# Troubleshooting Guide

This document provides detailed solutions for common issues when installing and using Sparkle Design components.

## Table of Contents

- [Type Errors](#type-errors)
- [Styling Issues](#styling-issues)
- [Component Not Found](#component-not-found)
- [Package Manager Issues](#package-manager-issues)
- [Import Path Issues](#import-path-issues)

---

## Type Errors

### Issue: Type assignment errors in Story files

**Symptoms:**

```text
Type '{ children: string; variant: "solid"; theme: string; }' is not assignable to type ...
```

**Cause:** Story files are importing old component structure

**Solution:** Fix the import path

```tsx
// ❌ Wrong
import { Button } from "./button";

// ✅ Correct
import { Button } from "./button/";
```

**Why this happens:**

Sparkle Design components use a directory-based structure where each component lives in its own folder with an `index.tsx` file. Story files must import from the directory (with trailing slash) rather than directly from the component file.

---

## Styling Issues

### Issue: Components don't display correctly or styles are not applied

**Cause A:** CSS import structure is incorrect

**Solution A:** Verify CSS structure

The correct CSS import structure is:

```text
sparkle-design.css  ← Source of Truth
      ↑
globals.css         ← Imports sparkle-design.css
      ↑
layout.tsx          ← Imports globals.css only
```

**Check your files:**

1. Verify `src/app/globals.css` (or `styles/globals.css`):

```css
@import "tailwindcss"; /* ← Import first */
@import "./sparkle-design.css"; /* ← Import second */
/* ...other base styles */
```

2. Verify `src/app/layout.tsx` (or `pages/_app.tsx`):

```tsx
import "./globals.css"; // ← Only import globals.css
```

3. For Storybook, verify `.storybook/preview.js`:

```js
import "../src/app/globals.css"; // ← Only import globals.css
```

---

**Cause B:** Modified `sparkle.config.json` but didn't regenerate CSS

**Solution B:** Regenerate CSS

```bash
# Use the appropriate package manager
pnpm dlx sparkle-design-cli generate
# or
npm exec sparkle-design-cli generate
# or
yarn dlx sparkle-design-cli generate
# or
bunx sparkle-design-cli generate
```

**When to regenerate CSS:**

✅ **Required when:**

- Changed `primary` color in sparkle.config.json
- Changed `font-mono` or `font-pro`
- Changed `extend` セクション（fonts, source-packages, custom-css）
- Changed legacy トップレベルキー（`source-packages`, `custom-css`）※ v1.4.x 以前の設定
- Changed `radius` value

❌ **NOT required when:**

- Added a new component
- Deleted a component
- Modified component props
- Edited the `custom-css` file itself

**Common pitfalls:**

- `sparkle-design.css` にカスタムトークンを直接追加すると再生成で消える → `extend.custom-css`（または legacy の `custom-css`）で別ファイルに分離する
- 再生成でフォントウェイト（500, 600 等）が消える → `extend.fonts` でフォントごとにウェイトを明示する（legacy: `font-pro-weights` は v1.5.0 で削除済み）

---

## Component Not Found

### Issue: Registry not found error

**Symptoms:**

```text
Registry not found: @sparkle-design/<component-name>
```

**Cause A:** Registry URL is incorrect

**Solution A:** Verify `components.json`

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.vercel.app/r/{name}.json"
  }
}
```

Make sure:

- The URL ends with `/{name}.json`
- There are no typos in the URL
- The registry key is exactly `@sparkle-design`

---

**Cause B:** Using an outdated version of shadcn CLI

**Solution B:** Use the latest version

```bash
# Check version
npx shadcn@latest --version

# If outdated, always use @latest
pnpm dlx shadcn@latest add @sparkle-design/<component-name>
```

---

**Cause C:** Component doesn't exist in the registry

**Solution C:** Verify component name

Check available components at: https://sparkle-design.vercel.app/

Common component names:

- `button`
- `card`
- `input`
- `select`
- `dialog`
- `dropdown-menu`
- `tooltip`

---

## Package Manager Issues

### Issue: Package manager command not found

**Symptoms:**

```text
command not found: pnpm
```

**Solution:** Use an alternative package manager or install the missing one

**Option 1:** Install the package manager

```bash
# Install pnpm
npm install -g pnpm

# Install yarn
npm install -g yarn

# Install bun
curl -fsSL https://bun.sh/install | bash
```

**Option 2:** Use npx (always available with npm)

```bash
npx shadcn@latest add @sparkle-design/<component-name>
```

---

### Issue: Installation hangs or fails

**Possible causes and solutions:**

1. **Network issues**

   - Check internet connection
   - Try using a different network
   - Use a VPN if registry is blocked

2. **Permission issues**

   ```bash
   # Try with sudo (not recommended, but sometimes necessary)
   sudo pnpm dlx shadcn@latest add @sparkle-design/<component-name>

   # Better: Fix npm permissions
   # See: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
```

3. **Corrupted cache**
   ```bash
   # Clear package manager cache
   pnpm store prune  # for pnpm
   npm cache clean --force  # for npm
   yarn cache clean  # for yarn
```

---

## Import Path Issues

### Issue: Cannot find module '@/components/ui/...'

**Cause:** Path aliases not configured correctly

**Solution:** Verify path aliases in configuration files

**1. Check `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**2. Check `vite.config.ts` (for Vite projects):**

```ts
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**3. Check `next.config.js` (for Next.js projects):**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...other config
};

module.exports = nextConfig;
```

Path aliases should work automatically in Next.js if tsconfig.json is configured correctly.

---

## Storybook Issues

### Issue: Stories don't show up in Storybook

**Cause A:** Story file is not in the correct location

**Solution A:** Use co-location pattern (path depends on your `components.json` configuration)

```text
<ui-alias-path>/<component-name>/
├── index.tsx                      # Component
└── <component-name>.stories.tsx   # Story (same directory)
```

Example with default configuration:
```text
src/components/ui/<component-name>/
├── index.tsx
└── <component-name>.stories.tsx
```

**Cause B:** Storybook configuration doesn't include the story path

**Solution B:** Check `.storybook/main.ts`:

```ts
const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
  ],
  // ...
};
```

---

### Issue: Material Icons don't show in Storybook

**Cause:** Using incorrect icon name format

**Solution:** Use underscore-separated names

```tsx
// ✅ Correct (underscore)
export const WithIcons: Story = {
  args: {
    prefixIcon: "check",
    suffixIcon: "arrow_forward", // ← underscore
  },
};

// ❌ Wrong (hyphen)
export const Wrong: Story = {
  args: {
    suffixIcon: "arrow-right", // ← hyphen doesn't work
  },
};
```

**Common icon names:**

- `arrow_forward`, `arrow_back`, `arrow_upward`, `arrow_downward`
- `check`, `close`, `add`, `remove`
- `download`, `upload`
- `search`, `settings`, `menu`

See full list: https://fonts.google.com/icons

---

## Still Having Issues?

If you're still experiencing problems after trying these solutions:

1. **Check the project documentation:**

   - [AGENTS.md](../../../AGENTS.md) - Project guidelines
   - [src/components/AGENTS.md](../../../src/components/AGENTS.md) - Component guidelines

2. **Verify your setup:**

   Run the validation script:

   ```bash
   python scripts/validate_config.py
```

3. **Check for updates:**

   Make sure you're using the latest version of Sparkle Design CLI:

   ```bash
   pnpm dlx sparkle-design-cli --version
```

4. **Look for similar issues:**

   Check if others have encountered the same problem:

   - Sparkle Design documentation: https://sparkle-design.vercel.app/
   - shadcn/ui documentation: https://ui.shadcn.com/docs

5. **Create a minimal reproduction:**

   If the issue persists, try installing the component in a fresh project to isolate the problem.
