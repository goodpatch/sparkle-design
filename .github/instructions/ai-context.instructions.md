---
applyTo: "**"
---

# AI Assistant Configuration

## Project Overview
"Sparkle Design" is a React component library built with modern web technologies, providing consistent UI components for web applications.

## Technology Stack
- **Framework**: Next.js 15.5.18 + React 18 + TypeScript
- **Styling**: TailwindCSS 4 + CVA (Class Variance Authority)
- **Testing**: Vitest + Testing Library + jsdom
- **Documentation**: Storybook
- **Package Manager**: pnpm
- **Node.js**: 22.14.0 (see `.node-version`)

## Project Structure
```
src/
├── app/                    # Next.js app directory
├── components/ui/          # UI component library
│   └── [component]/
│       ├── index.tsx       # Component implementation
│       └── index.test.tsx  # Component tests
├── docs/                   # Documentation files
├── lib/                    # Utility functions
└── test/                   # Shared test helpers

docs/ai-instructions/       # AI guidance documents (source)
public/r/                   # Component registry JSON
scripts/                    # Build and setup tools
```

## Development Workflow
1. **Setup**: `pnpm install` for dependencies
2. **Development**: `pnpm dev` for local server
3. **Component Creation**: `./scripts/setup.sh <ComponentName>`
4. **Documentation**: `pnpm storybook` for component stories
5. **Quality Checks**: `pnpm lint && pnpm format`
6. **Testing**: `pnpm test` before commits

## Key Configuration Files
- **`package.json`**: Dependencies and scripts
- **`tsconfig.json`**: TypeScript configuration
- **`postcss.config.mjs`**: TailwindCSS setup
- **`vitest.config.ts`**: Testing configuration
- **`components.json`**: Component library config
- **`sparkle.config.json`**: Design token settings

## Coding Standards
- **Comments**: Japanese first, then English with `en:` prefix
- **Commits**: Japanese with emoji prefix (see `.github/copilot-commit-message-instructions.md`)
- **Components**: Follow shadcn/ui patterns with CVA variants
- **Testing**: Comprehensive coverage following t_wada's best practices
- **Accessibility**: ARIA labels and semantic HTML

## Commit and Branch Standards

### Commit Message Rules
- **Language**: Japanese required
- **Format**: Emoji prefix + Conventional Commit format
- **Structure**: Title, blank line, bullet list of changes
- **Reference**: `.github/copilot-commit-message-instructions.md`

### Branch Naming Convention
- **Allowed characters**: English letters, digits, dots, hyphens, underscores, plus a single `/` used only as a separator between a category prefix and name
- **Pattern**: `feature/component-name`, `fix/issue-description`, `chore/update-deps`, etc.
- **Example**: `feature/button-component`, `chore/update-deps`

### Quality Checks (Required before commit)
```bash
pnpm lint      # ESLint checks
pnpm format    # Prettier formatting
pnpm test      # Component tests
```

### Git Safety Rules
- **Never amend + force-push**: address review feedback and mistakes with new commits
- **No direct push to `main`**: always go through a PR (admin merge required)
- **PR merges use normal merge (`--merge`)**: never squash-merge (squashing loses commits)
- **Update the lockfile whenever `package.json` changes**: CI runs `pnpm install --frozen-lockfile` and will fail otherwise
- **Use the pinned toolchain**: Node.js 22.14.0 / pnpm 10.12.4 (see `.tool-versions`; newer pnpm majors can rewrite the lockfile)

### Irreversible Operations Are Blocked by a Hook
`scripts/hooks/irreversible-ops-guard.sh` (a PreToolUse hook wired in `.claude/settings.json`) blocks:

- `npm/pnpm/yarn/bun publish` (an enabled `--dry-run` passes), `unpublish`, `deprecate`
- `gh pr merge`, `gh release create/delete`, `gh repo create/delete/archive`, publish workflows
- Release tag pushes, `--tags`, force pushes (including a `+` refspec), and remote ref deletion (`--delete` / `:ref`)

It also looks inside command substitutions (`$(...)`) and `bash -c "..."`, so those are not a way around it.

- These run **only when the user names the operation**. A broad "release it" / "go ahead" is not approval.
- Once instructed, re-run with `SPARKLE_CONFIRM=1` **in front of that command**. Adding that prefix without an instruction defeats the guard.
- An inherited/exported `SPARKLE_CONFIRM=1` is deliberately ignored — approval is per command, not per session.
- Agents without hook support must follow the same rule — the hook is a backstop, not the rule itself.
- Tests: `pnpm test:hooks`

## AI Assistance Guidelines
- Refer to specific instruction files for detailed guidance:
  - `docs/ai-instructions/testing.md` for testing
  - `docs/ai-instructions/development.md` for development patterns
  - `docs/ai-instructions/comment-style.md` for code comments
  - `docs/ai-instructions/new-component.md` for component creation

### AI Instruction File Updates
- **Important**: After editing any file in `docs/ai-instructions/`, run `make ai-instructions` to sync changes to tool-specific locations
- This ensures GitHub Copilot, Cursor, Claude Code, and Codex all receive the updated instructions
