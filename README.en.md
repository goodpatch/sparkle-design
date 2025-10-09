<p align="center">
  <a href="https://sparkle-design.goodpatch.com/">
    <img src="./docs/images/thumbnail.png" alt="Sparkle Design" width="1200">
  </a>
</p>

# Sparkle Design for React

[![Sparkle Design](https://img.shields.io/badge/made%20with-Sparkle%20Design-0969DA)](https://sparkle-design.goodpatch.com/)
![npm](https://img.shields.io/npm/v/@goodpatch/sparkle-design)
[![ci](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml/badge.svg)](https://github.com/goodpatch/sparkle-design/actions/workflows/ci.yml)


This is a component library built with React.js and TypeScript.<br />
It implements Goodpatch's "Sparkle Design" system on top of shadcn/ui.

## Features

- 🔧 **Flexibility** ... Because it is based on shadcn/ui and compatible with the shadcn/ui registry, you can introduce components one by one. It is also published as an npm package, so you can integrate it in the way that best fits each project.
- ♿️ **Accessibility** ... Sparkle Design is engineered with accessibility as a primary consideration.
- 🎨 **Customizability** ... A dedicated CLI tool lets you apply the same customizations found in the Figma files. This makes it easy to spin up code for design systems built on Sparkle Design.

## Usage

### Install the package

```bash
npm install sparkle-design
# or
pnpm add sparkle-design
# or
yarn add sparkle-design
```

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
import { Button, Badge, Card } from "sparkle-design";

// Import required styles
import "sparkle-design/globals.css";
import "sparkle-design/sparkle-design.css";

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

#### Generating Sparkle Design CSS

Run the following command to generate CSS that complies with your design system based on the settings in `sparkle.config.json`.<br />
Internally, this command runs `sparkle-design-cli` to build `src/app/sparkle-design.css` from design tokens such as the primary color, font settings, and border radii.

```bash
pnpm build:css
```

Configuration options for `sparkle.config.json`:

- `primary`: Primary color (blue, red, orange, etc.)
- `font-pro`: Proportional font (Google Fonts name)
- `font-mono`: Monospace font (Google Fonts name)
- `radius`: Border radius preset (sm, md, lg, etc.)

You can export this configuration from [Sparkle Design Theme Settings](https://www.figma.com/community/plugin/1443500367756891364/sparkle-design-theme-settings).

You can also run `sparkle-design-cli` directly in your own project.

```bash
npx sparkle-design-cli
```

Or install it globally and use it:

```bash
npm install -g sparkle-design-cli
sparkle-design-cli
```

Check `sparkle-design-cli --help` for detailed usage.

## Development Guide

### Development environment

- Node.js 22.14.0 or later
- pnpm 10.12.4 or later

### Directory structure

```
├─ src/
│  ├─ app/            # Sparkle Design pages and style files
│  ├─ components/     # React components
│  └─ lib/            # Shared utilities
├─ scripts/           # Various scripts
├─ public/r/          # Public registry JSON
└─ .github/           # GitHub configuration
   └─ instructions/   # Development, testing, and AI guidelines
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

Refer to `.github/instructions/testing.instructions.md` for testing guidelines.

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

- Follow `.github/instructions/comment-style.instructions.md` for comment conventions.
- Follow `.github/copilot-commit-message-instructions.md` for commit message format.
- Refer to `CHANGELOG.md` for release notes.
- See the `.github/instructions/` directory for additional development, testing, and AI guidelines.

## Component status

The table below shows the current implementation status of each component.

| Component         | Implementation | Storybook | Registry | Figma Code Connect | A11y Check |
| ----------------- | -------------- | --------- | -------- | ------------------ | ---------- |
| Avatar            | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Badge             | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Breadcrumb        | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Button            | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Calendar          | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Card              | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Checkbox          | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Dialog            | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Divider           | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Filter Chip       | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Form Control      | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Icon              | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Icon Button       | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Image             | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Inline Message    | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Input             | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Input Chip        | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Input Date        | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Input File        | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Input Number      | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Input Password    | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Input Search      | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Input Time        | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Link              | ✅             | ✅        | ✅       | ❌                 | ❌         |
| List              | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Menu              | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Modal             | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Package           | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Pagination        | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Popover           | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Radio             | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Segmented Control | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Select            | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Side Navigation   | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Skeleton          | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Slider            | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Slot              | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Spinner           | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Stack             | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Stepper           | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Switch            | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Table             | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Tabs              | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Tag               | ✅             | ✅        | ✅       | ❌                 | ❌         |
| Textarea          | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Toast             | ❌             | ❌        | ❌       | ❌                 | ❌         |
| Tooltip           | ✅             | ✅        | ✅       | ✅                 | ❌         |
| Vertical Tabs     | ❌             | ❌        | ❌       | ❌                 | ❌         |
