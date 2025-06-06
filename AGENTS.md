# Repo guidelines

This project is a Next.js + TypeScript component library. Tailwind CSS, Storybook, style-dictionary and shadcn/ui are used.

## Directory layout
- `src/` – app, components and library utilities
- `style-dictionary/` – tokens and build output
- `scripts/` – tooling such as `setup.sh` and Swift registry tool
- `public/r/` – registry JSON files

## Common commands
- `npm run dev` – start development server
- `npm run storybook` – open Storybook
- `npm run build:sd` – build design tokens
- `make registry` – generate registry and copy files to `public/r/`
- `make new-component` or `./scripts/setup.sh <name>` – scaffold a component
- `make help` – list Makefile targets

## Commit messages
- Follow `.github/copilot-commit-message-instructions.md`.
- Messages must be written in Japanese and start with one emoji from the list.
- Use Conventional Commit format, then add a blank line and bullet list of changes.

## Component comments
- Follow `.github/comment-rule.md` for React component comments using `[Copilot Comment]` syntax.

## Programmatic checks
Run the following before committing:

```bash
npm run lint
```

There is no test script yet.

## Branch naming
- Use only English letters, digits, dots, hyphens and underscores in branch names.
- A sample `pre-push` hook can reject non-English names:

```bash
#!/bin/sh
branch_name=$(git symbolic-ref --short HEAD)
if echo "$branch_name" | grep -q '[^A-Za-z0-9._-]'; then
  echo "ブランチ名には英数字・ドット・ハイフン・アンダースコアのみ使用してください。" >&2
  exit 1
fi
```

## Codex
- Codex must follow all instructions in this file when preparing commits or PRs.

