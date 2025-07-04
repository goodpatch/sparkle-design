# Repo guidelines

This project is a Next.js + TypeScript component library using TailwindCSS, Storybook, and shadcn/ui patterns.

## Project Structure

- `src/` – app, components and library utilities
- `scripts/` – tooling such as `setup.sh` and registry generation
- `public/r/` – component registry JSON files
- `.github/instructions/` – AI development guidance documents

## Development Commands

- `pnpm dev` – start development server
- `pnpm storybook` – open Storybook documentation
- `pnpm test` – run component tests
- `./scripts/setup.sh <ComponentName>` – scaffold new component
- `pnpm lint && pnpm format` – code quality checks

## Development Standards

### Commit Messages
- Follow `.github/copilot-commit-message-instructions.md`
- Write in Japanese with emoji prefix
- Use Conventional Commit format

### Code Comments
- Japanese first, then English with `en:` prefix
- Follow `.github/instructions/comment-style.instructions.md`

### Branch Naming
- Use only English letters, digits, dots, hyphens and underscores

## AI Development Guidelines

**Primary References** (follow in order):
1. `.github/instructions/ai-context.instructions.md` – Project context and overview
2. `.github/instructions/ai-development.instructions.md` – Development patterns and practices
3. `.github/instructions/testing.instructions.md` – Comprehensive testing guidelines
4. `.github/instructions/comment-style.instructions.md` – Code comment standards
5. `.github/instructions/new-component.instructions.md` – Component creation process

### Testing Standards
- Follow **t_wada's testing best practices**
- Use intermediate log files for test analysis: `pnpm test > test-output.log 2>&1`
- Test actual CVA-generated TailwindCSS classes, not variant names
- Handle jsdom limitations properly (keyboard navigation, portal components)

---

**For AI assistants**: Always refer to the specific instruction files above for detailed guidance.

## Directory layout

- `src/` – app, components and library utilities
- `style-dictionary/` – tokens and build output
- `scripts/` – tooling such as `setup.sh` and Swift registry tool
- `public/r/` – registry JSON files

## Common commands

- `pnpm dev` – start development server
- `pnpm storybook` – open Storybook
- `pnpm build:sd` – build design tokens
- `make registry` – generate registry and copy files to `public/r/`
- `make new-component` or `./scripts/setup.sh <name>` – scaffold a component
- `make help` – list Makefile targets

## Commit messages

- Follow `.github/copilot-commit-message-instructions.md`.
- Messages must be written in Japanese and start with one emoji from the list.
- Use Conventional Commit format, then add a blank line and bullet list of
  changes.

## Component comments

- Follow `.github/comment-rule.md` for React component comments.
- Write all code comments in Japanese first, then add an `en:` line with the
  English translation.

## Programmatic checks

Run the following before committing:

```bash
pnpm lint
pnpm format
```

There is no test script yet.

## Branch naming

- Use only English letters, digits, dots, hyphens and underscores in branch
  names.
- A sample `pre-push` hook can reject non-English names:

```bash
#!/bin/sh
branch_name=$(git symbolic-ref --short HEAD)
if echo "$branch_name" | grep -q '[^A-Za-z0-9._-]'; then
  echo "ブランチ名には英数字・ドット・ハイフン・アンダースコアのみ使用してください。" >&2
  exit 1
fi
```

## Testing Guidelines

- **ALWAYS** refer to `.github/instructions/testing.instructions.md` for comprehensive testing guidelines
- Follow t_wada's testing best practices for all component tests
- Use intermediate log files for test analysis: `npm run test:ai-analyze`
- Test actual CVA-generated TailwindCSS classes, not variant names
- Handle jsdom limitations properly (keyboard navigation, portal components)

## AI Development

- Refer to `.github/instructions/ai-development.instructions.md` for AI-specific development patterns
- Use `.github/instructions/ai-context.instructions.md` for project context
- Follow `.github/instructions/comment-style.instructions.md` for code comment guidelines

## Component Creation

- Use `.github/instructions/new-component.instructions.md` for new component scaffolding

## Codex

- Codex must follow all instructions in this file when preparing commits or PRs.
