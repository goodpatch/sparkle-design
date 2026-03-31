<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="https://sparkle-design.vercel.app/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

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

## Usage

### Install the package

The package is already published on npm. Install it with the steps below.

```bash
npm install @goodpatch/sparkle-design
# or
pnpm add @goodpatch/sparkle-design
# or
yarn add @goodpatch/sparkle-design
```

> This package does not bundle CSS. Run `sparkle-design-cli` in the consuming app and use the generated `sparkle-design.css` / `globals.css` files there.

> **Using with Server Components**: For components that contain `"use client"`, use subpath imports. Each component's [README](src/components/ui/) includes Server Component / Client Component information.
>
> ```tsx
> import { Button } from "@goodpatch/sparkle-design/button";
> ```

### Install individual components

Sparkle Design works with the shadcn/ui registry. You can copy the registry URL from Storybook.<br />
Refer to the [official documentation](https://ui.shadcn.com/docs/registry/getting-started) for details on the shadcn/ui registry.

```bash
pnpm dlx shadcn@latest add [registry URL]
```

You can also specify [namespaces](https://ui.shadcn.com/docs/registry/namespace) in `components.json` to install components by name.

```json
{
  "registries": {
    "@sparkle-design": "https://sparkle-design.vercel.app/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @sparkle-design/button
```

### Basic example

```tsx
import React from "react";
import { Button, Badge, Card } from "@goodpatch/sparkle-design";

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

### About the style files

- **`globals.css`**: Base Tailwind CSS and reset styles
- **`sparkle-design.css`**: Sparkle Design design tokens (color, typography, border radius, shadows, and more)

Import both files to take advantage of everything Sparkle Design offers.

#### Using as an npm package

When using `@goodpatch/sparkle-design` as an npm package, TailwindCSS v4 needs `@source` directives to detect utility classes inside the package.

`sparkle-design-cli` automatically inserts `@source` directives into `globals.css` based on your `sparkle.config.json` settings.

To configure manually, add the following to your project's `globals.css`:

```css
@import "tailwindcss";
/* Scan @goodpatch/sparkle-design classes */
/* Adjust the path relative to globals.css (example for src/app/globals.css) */
@source "../../node_modules/@goodpatch/sparkle-design/dist";
/* Sparkle Design custom definitions (import after Tailwind) */
@import "./sparkle-design.css";
```

> **Note**: The relative path for `@source` depends on where `globals.css` is located. The example above assumes `src/app/globals.css`.

#### Generating Sparkle Design CSS

Generate CSS that complies with your design system based on the settings in `sparkle.config.json`.

```bash
npx sparkle-design-cli generate
```

Core configuration options for `sparkle.config.json`:

- `primary`: Primary color (blue, red, orange, green, purple, pink, yellow)
- `font-pro`: Proportional font ([Google Fonts](https://fonts.google.com/) name)
- `font-mono`: Monospace font ([Google Fonts](https://fonts.google.com/) name)
- `radius`: Border radius preset (none, sm, md, lg, xl, full)

You can export this configuration from the [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364/sparkle-design-theme-settings) Figma plugin.

Extended options (per-font weight customization, fallback chains, custom token CSS) can be configured in the `extend` section of `sparkle.config.json`. See `sparkle-design-cli generate --help` for details.

```bash
# Generate CSS
npx sparkle-design-cli generate

# Check for anti-patterns
npx sparkle-design-cli check src --strict

# Set up AI assistant guard in your project
npx sparkle-design-cli setup --assistant claude
```

`setup` adds `lint:sparkle` scripts to the consuming project's `package.json` and injects a Sparkle Design quality check guide into AI assistant instruction files (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules/`, etc.). See `sparkle-design-cli setup --help` for details.

## Development Guide

### Development environment

- Node.js 22.14.0 or later
- pnpm 10 or later

### Directory structure

```
├─ src/
│  ├─ app/            # Sparkle Design pages and style files
│  ├─ components/     # React components
│  └─ lib/            # Shared utilities
├─ scripts/           # Various scripts
├─ docs/
│  └─ ai-instructions/ # Development, testing, and AI guidelines (source)
└─ .github/           # GitHub configuration
```

### Build the package

```bash
pnpm build:package
```

### Start Storybook

```bash
pnpm storybook
```

### Run tests

```bash
pnpm test
```

Refer to `docs/ai-instructions/testing.md` for testing guidelines.

### Code formatting

```bash
# Check formatting
pnpm format:check

# Format automatically
pnpm format

# ESLint check (via Next.js)
pnpm lint:check
# or
pnpm lint

# ESLint auto-fix (via Next.js)
pnpm lint:fix

# Type check
pnpm type-check
```

**Note**: ESLint uses the `next lint` command, applying rules optimized for Next.js projects.

### About the Makefile

The Makefile defines the following targets:

- `registry` ... Generate the registry and copy files to the public directory
- `new-component` ... Interactive flow for creating a new component

Run `make help` for details.

### Sparkle Design badge

The Sparkle Design badge indicates that a component uses Sparkle Design. Add the following snippet to your README:

```markdown
[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
```

### Miscellaneous

- Follow `docs/ai-instructions/comment-style.md` for comment conventions.
- Follow `.github/copilot-commit-message-instructions.md` for commit message format.
- Refer to `CHANGELOG.md` for release notes.
- If the public registry domain changes, run `pnpm update:public-domain -- --to https://new-domain.example.com --dry-run` to preview the impact, then rerun without `--dry-run` to apply the replacement.
- See the `docs/ai-instructions/` directory for additional development, testing, and AI guidelines.

## Component status

Please refer to the table on [README.md](./README.md#コンポーネント公開状況) for the current implementation status of components.

## License

[Apache License 2.0](LICENSE)

Copyright 2026 [Goodpatch Inc.](https://goodpatch.com/)
