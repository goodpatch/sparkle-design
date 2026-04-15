<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="https://raw.githubusercontent.com/goodpatch/sparkle-design/main/public/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

English | **[日本語](./README.md)**

[![npm version](https://img.shields.io/npm/v/sparkle-design)](https://www.npmjs.com/package/sparkle-design)
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
[![ci](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml/badge.svg)](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


This is a component library built with React.js and TypeScript.<br />
It implements [Goodpatch](https://goodpatch.com/)'s "Sparkle Design" system on top of shadcn/ui.

## Features

- 🔧 **Flexibility** ... Because it is based on shadcn/ui and compatible with the shadcn/ui registry, you can introduce components one by one. It is also published as an npm package, so you can integrate it in the way that best fits each project.
- ♿️ **Accessibility** ... Sparkle Design is engineered with accessibility as a primary consideration.
- 🎨 **Customizability** ... A dedicated CLI tool lets you apply the same customizations found in the Figma files. This makes it easy to spin up code for design systems built on Sparkle Design.
- 🤖 **AI Friendly** ... Ships with skills and guard configurations for Claude Code, Cursor, and Codex. Maintain design system quality even during AI-assisted coding.

## Quick Start

### 1. Set up

In an existing Next.js / Vite project, a single command completes the integration:

```bash
npx --yes sparkle-design-cli setup --assistant claude
```

This automatically:

1. Detects your package manager (pnpm / npm / yarn / bun)
2. Adds `sparkle-design` to dependencies and `tailwindcss` + `@tailwindcss/postcss` to devDependencies
3. Generates `sparkle.config.json` / `postcss.config.mjs` / `globals.css` if missing
4. Adds a Sparkle Design guard block and `lint:sparkle` script to `CLAUDE.md`
5. Generates `sparkle-design.css` and `SparkleHead.tsx`

`--assistant` accepts `claude` / `cursor` / `codex` / `generic`. Existing files are never overwritten.

#### Installing via Claude Code Skill

If you use Claude Code, you can also install the Sparkle Design skills to have the assistant walk you through setup.

```bash
# Add the Sparkle Design skills marketplace
npx --yes @anthropic-ai/claude-code marketplace add goodpatch/sparkle-design

# Install the setup-sparkle-design skill
npx --yes @anthropic-ai/claude-code plugin install sparkle-design-skills@sparkle-design
```

After installation, asking Claude Code to "install Sparkle Design" triggers the `setup-sparkle-design` skill, which inspects the project and guides you through only the missing steps. The same marketplace also ships `add-sparkle-component` (add components) and `accessibility-checker` (accessibility checks).

Place the generated `SparkleHead` in the `<head>` of your root layout.

```tsx
import { SparkleHead } from "./SparkleHead";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <SparkleHead />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> **`@next/next/no-head-element` in Next.js App Router**: If your project extends `next/core-web-vitals`, placing a `<head>` element directly in `layout.tsx` may trigger a lint error. Add `// eslint-disable-next-line @next/next/no-head-element` to suppress it, or consider using `next/font` as an alternative.

Customize primary color, fonts, border radius, and more via `sparkle.config.json`. To tweak settings inside Figma, the [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364/sparkle-design-theme-settings) plugin is available. See `sparkle-design-cli generate --help` for details.

### 2. Use components

```tsx
import React from "react";
import { Button, Badge, Card } from "sparkle-design";

function App() {
  return (
    <div>
      <Card>
        <h1>Example using Sparkle Design</h1>
        <Badge variant="primary">New feature</Badge>
        <Button variant="primary" size="md">
          Click the button
        </Button>
      </Card>
    </div>
  );
}

export default App;
```

> **Using with Server Components**: For components that contain `"use client"`, use subpath imports. Each component's [README](src/components/ui/) includes Server Component / Client Component information.
>
> ```tsx
> import { Button } from "sparkle-design/button";
> ```

### 3. Update settings and check for anti-patterns

After editing `sparkle.config.json`, regenerate the CSS:

```bash
npx sparkle-design-cli generate
```

After making Sparkle Design-related code changes, check for anti-patterns:

```bash
npx sparkle-design-cli check src
```

### Manual installation (advanced)

If you prefer a step-by-step installation without CLI setup, see the [CLI documentation](https://github.com/goodpatch/sparkle-design-cli#readme).

## Install individual components

Sparkle Design works with the shadcn/ui registry. You can copy the registry URL from Storybook.<br />
Refer to the [official documentation](https://ui.shadcn.com/docs/registry/getting-started) for details on the shadcn/ui registry.

```bash
pnpm dlx shadcn@latest add [registry URL]
```

You can also specify [namespaces](https://ui.shadcn.com/docs/registry/namespace) in `components.json` to install components by name.

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.goodpatch.com/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @sparkle-design/button
```

## Development Guide

For environment setup, component creation, testing, and contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Directory structure

```text
├─ src/
│  ├─ app/            # Sparkle Design pages and style files
│  ├─ components/     # React components
│  └─ lib/            # Shared utilities
├─ scripts/           # Various scripts
├─ docs/
│  └─ ai-instructions/ # Development, testing, and AI guidelines (source)
└─ .github/           # GitHub configuration
```

### Sparkle Design badge

The Sparkle Design badge indicates that a component uses Sparkle Design. Add the following snippet to your README:

```markdown
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
```

## Component status

Please refer to the table on [README.md](./README.md#コンポーネント公開状況) for the current implementation status of components.

## License

[Apache License 2.0](LICENSE)

Copyright 2026 [Goodpatch Inc.](https://goodpatch.com/)
