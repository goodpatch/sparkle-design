# Contributing Guide

We welcome contributions to Sparkle Design for React!

## Setup

- Match the Node.js version to `.node-version` or `.tool-versions`.
- Install dependencies with `pnpm install`.

## Development Flow

1. Check existing issues and pick one to work on
2. Create a branch (`feature/component-name`, `fix/issue-description`, etc.)
3. Implement changes
4. Pass tests, lint, and type checks
5. Open a pull request

### Creating a New Component

```bash
./scripts/setup.sh <component-name>
```

The script generates:
- `index.tsx` — Component implementation
- `index.test.tsx` — Tests
- `index.stories.tsx` — Storybook stories
- `item.json` — shadcn registry metadata
- `README.md` — Component documentation

See `docs/ai-instructions/new-component.md` for details.

## Quality Checks

Run these before opening a PR:

```bash
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier formatting
pnpm type-check       # TypeScript type check
pnpm test             # Tests
pnpm build:package    # Package build
```

## Commit Messages

- Written in Japanese
- Emoji prefix + Conventional Commit format
- See `.github/copilot-commit-message-instructions.md` for details

## Branch Naming

- Use alphanumeric characters, dots, hyphens, and underscores
- `/` is only used as a separator between prefix and name (e.g., `feature/button-variant`)

## AI Tools

This repository is optimized for AI-assisted development.

- **Claude Code**: Skills bundled in `.claude/skills/`
- **GitHub Copilot**: Guidelines in `.github/instructions/`
- **Cursor**: Rules in `.cursor/rules/`
- **Codex**: Guidelines in `AGENTS.md`

Anti-pattern checking:

```bash
npx sparkle-design-cli check src --format json
```

## Comment Style

- Japanese first, followed by English with `en:` prefix
- See `docs/ai-instructions/comment-style.md` for details
