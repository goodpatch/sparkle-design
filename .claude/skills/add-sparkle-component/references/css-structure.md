# CSS Structure Guide

This document explains the CSS import structure for Sparkle Design components and how to set it up correctly in different project types.

## Table of Contents

- [Overview](#overview)
- [CSS Import Hierarchy](#css-import-hierarchy)
- [Setup for Next.js App Router](#setup-for-nextjs-app-router)
- [Setup for Next.js Pages Router](#setup-for-nextjs-pages-router)
- [Setup for Vite/React](#setup-for-vitereact)
- [Setup for Storybook](#setup-for-storybook)
- [CSS Regeneration](#css-regeneration)

---

## Overview

Sparkle Design uses a layered CSS import structure where `sparkle-design.css` serves as the Single Source of Truth (SSoT) for all component styles.

### Key Principles

1. **Single Source of Truth**: `sparkle-design.css` contains all Sparkle Design styles
2. **One Import Point**: Import `sparkle-design.css` only in `globals.css`
3. **No Duplication**: Never import CSS files directly in components
4. **Import Order Matters**: Tailwind must be imported before Sparkle Design CSS

---

## CSS Import Hierarchy

```text
sparkle-design.css  ← SSoT (Single Source of Truth)
      ↑
      │  @import
      │
globals.css         ← Imports sparkle-design.css
      ↑
      │  import
      │
layout.tsx          ← Application entry point
(or _app.tsx)
```

**Why this structure?**

- **Single import location** prevents style duplication
- **Cascading order** ensures Tailwind utilities can override component styles
- **Easy maintenance** - Update styles in one place
- **Better performance** - CSS is bundled efficiently

---

## Setup for Next.js App Router

Next.js 13+ with the App Router uses the `app/` directory structure.

### 1. Create `sparkle-design.css`

Location: `src/app/sparkle-design.css`

Generate this file using:

```bash
pnpm dlx sparkle-design-cli generate
```

This file contains:

- CSS custom properties (color tokens)
- Component base styles
- Utility classes

### 2. Create/Update `globals.css`

Location: `src/app/globals.css`

```css
/* Import Tailwind directives FIRST */
@import "tailwindcss";

/* npm パッケージとして利用する場合は @source が必要（sparkle-design-cli が自動挿入） */
/* パスは globals.css の配置に応じて調整（例: src/app/ なら ../../node_modules/...） */
/* @source "../../node_modules/@goodpatch/sparkle-design/dist"; */

/* Import Sparkle Design CSS SECOND */
@import "./sparkle-design.css";

/* Optional: Your custom global styles */
@layer base {
  body {
    /* Custom styles */
  }
}
```

**Important:** Import order matters! Tailwind must come before Sparkle Design CSS.

> npm パッケージとして `@goodpatch/sparkle-design` を利用する場合、`sparkle.config.json` に `"source-packages": []` を追加すると、`sparkle-design-cli` が `@source` ディレクティブを自動挿入する。

### 3. Import in Root Layout

Location: `src/app/layout.tsx`

```tsx
import "./globals.css"; // ← Only import globals.css

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Do NOT import:**

- `sparkle-design.css` directly
- Component CSS files
- Multiple CSS files

---

## Setup for Next.js Pages Router

Next.js 12 and earlier use the `pages/` directory structure.

### 1. Create `sparkle-design.css`

Location: `src/styles/sparkle-design.css` or `styles/sparkle-design.css`

Generate using:

```bash
pnpm dlx sparkle-design-cli generate
```

### 2. Create/Update `globals.css`

Location: `src/styles/globals.css` or `styles/globals.css`

```css
/* Import Tailwind directives FIRST */
@import "tailwindcss";

/* Import Sparkle Design CSS SECOND */
@import "./sparkle-design.css";

/* Optional: Your custom global styles */
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### 3. Import in Custom App

Location: `pages/_app.tsx`

```tsx
import "../styles/globals.css"; // ← Only import globals.css
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

---

## Setup for Vite/React

Standard Vite + React projects.

### 1. Create `sparkle-design.css`

Location: `src/styles/sparkle-design.css`

Generate using:

```bash
pnpm dlx sparkle-design-cli generate
```

### 2. Create/Update `index.css`

Location: `src/index.css`

```css
/* Import Tailwind directives FIRST */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Sparkle Design CSS SECOND */
@import "./styles/sparkle-design.css";

/* Optional: Your custom global styles */
@layer base {
  :root {
    /* Custom CSS variables */
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto";
  }
}
```

### 3. Import in Main Entry

Location: `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // ← Only import index.css

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## Setup for Storybook

Storybook requires CSS to be imported in its preview configuration.

### Storybook Configuration

Location: `.storybook/preview.js` or `.storybook/preview.ts`

```js
// Import the globals.css that already includes sparkle-design.css
import "../src/app/globals.css"; // For Next.js App Router
// or
import "../src/styles/globals.css"; // For Next.js Pages Router
// or
import "../src/index.css"; // For Vite/React

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

**Important:** Import the same globals.css file that your application uses. This ensures consistency between your app and Storybook.

### Tailwind Configuration for Storybook

Location: `.storybook/main.ts`

Make sure Storybook is configured to process Tailwind:

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // Vite will handle Tailwind processing
};

export default config;
```

---

## CSS Regeneration

### When to Regenerate

Regenerate `sparkle-design.css` **only when** you modify `sparkle.config.json`:

✅ **Regenerate when you change:**

- `primary` color
- `font-mono` or `font-pro`
- `radius` value

❌ **Do NOT regenerate when you:**

- Add a new component
- Delete a component
- Modify component props
- Update Storybook stories

### How to Regenerate

Run the CLI tool with your package manager:

```bash
# pnpm
pnpm dlx sparkle-design-cli generate

# npm
npm exec sparkle-design-cli

# yarn
yarn dlx sparkle-design-cli

# bun
bunx sparkle-design-cli
```

The CLI will:

1. Read `sparkle.config.json`
2. Generate CSS custom properties (プリミティブ + セマンティック `:root` トークン)
3. Write to `sparkle-design.css`
4. Apply theme settings
5. `globals.css` にフォント import を移動
6. `source-packages` 指定時は `@source` ディレクティブを挿入

### After Regeneration

1. **Verify the changes**: Check that `sparkle-design.css` was updated
2. **Test components**: View components in Storybook or your app
3. **Commit the file**: Include the updated CSS in your commit

---

## Common Issues

### Issue: Styles not applying

**Cause:** CSS import order is incorrect

**Solution:** Ensure Tailwind is imported before Sparkle Design CSS:

```css
/* ✅ Correct order */
@import "tailwindcss";
@import "./sparkle-design.css";

/* ❌ Wrong order */
@import "./sparkle-design.css";
@import "tailwindcss";
```

---

### Issue: Duplicate styles

**Cause:** Importing CSS in multiple places

**Solution:** Import only in globals.css, not in:

- Component files
- Page files
- Layout files (except root layout)

---

### Issue: Storybook styles differ from app

**Cause:** Different CSS files imported in Storybook

**Solution:** Use the same globals.css in both:

```js
// .storybook/preview.js
import "../src/app/globals.css"; // Same file as app
```

---

### Issue: CSS changes not reflected

**Possible causes:**

1. **Browser cache**: Hard refresh (Cmd/Ctrl + Shift + R)
2. **Build cache**: Clear build cache and rebuild
3. **Dev server**: Restart dev server

**Solutions:**

```bash
# Clear Next.js cache
rm -rf .next

# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
pnpm dev
```

---

## Best Practices

### DO:

- ✅ Keep `sparkle-design.css` as the single source of truth
- ✅ Import CSS only in `globals.css`
- ✅ Import `globals.css` only in root layout/entry point
- ✅ Use Tailwind utilities for custom styling
- ✅ Commit `sparkle-design.css` to version control

### DON'T:

- ❌ Import `sparkle-design.css` directly in components
- ❌ Duplicate CSS imports in multiple files
- ❌ Modify `sparkle-design.css` manually (use CLI instead)
- ❌ Import Tailwind after Sparkle Design CSS
- ❌ Add `.css` files to `.gitignore`

---

## Tailwind Configuration

Ensure your `tailwind.config.js` includes the correct content paths:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

This ensures Tailwind processes all your component files correctly.

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)
- [Next.js CSS Documentation](https://nextjs.org/docs/app/building-your-application/styling/css)
- [Vite CSS Documentation](https://vitejs.dev/guide/features.html#css)
- [Storybook CSS Documentation](https://storybook.js.org/docs/react/configure/styling-and-css)
