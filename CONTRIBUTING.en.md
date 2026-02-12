# Contributing Guide

We welcome contributions to this project. Please review the following before submitting a pull request.

## Setup

- Match the Node.js version to `.node-version` or `.tool-versions`.
- Install dependencies with `pnpm install`.

## Branch Naming

- Use alphanumeric characters, dots, hyphens, and underscores for branch names.
- `/` should only be used as a separator between a category prefix (feature, chore, etc.) and the name.

## Commit Messages

- Follow the rules in `.github/copilot-commit-message-instructions.md` and write messages in Japanese.

## Pull Requests

- Include a summary of changes and any related issue numbers.
- Run `pnpm lint` before submitting to ensure there are no errors.

## Useful Development Commands

- Development server: `pnpm dev`
- Design token generation: `pnpm build:css`
- Storybook: `pnpm storybook`

For more details, refer to `README.en.md`.
