# Project Policy (sparkle-design)

This skill follows general WCAG checklists, but **sparkle-design defines project policy for "where to guarantee what."**

## Color/Contrast (Guaranteed by Figma)

In this project, the following are **primarily guaranteed by Figma/design system**:

- 1.4.1 Use of Color
- 1.4.3 Contrast (Minimum)
- 1.4.11 Non-text Contrast (focus rings, etc.)

### Handling in Reviews

- In code reviews, **do not require code changes by default**
- However, mark as **Needs review** (or **Fail**) in these cases:
  - Design tokens are deviated from (e.g., custom color values, arbitrary CSS values, external library style overrides)
  - States (disabled/hover/active/loading, etc.) are custom-built and appear outside design guarantee scope

In reports, clearly state "Guaranteed by Figma, no code changes needed" with rationale, and escalate to design verification tasks if necessary.

## Gradually Deprecate Accessibility-Risky APIs

When directly impacting WCAG achievement or when accidents are common, **use `@deprecated` to gradually reduce usage while avoiding breaking changes.**

### Representative Example: WCAG 2.5.2 Pointer Cancellation and Down-Event Handlers

- Designs that finalize actions with `onMouseDown` / `onPointerDown` / `onTouchStart` make error recovery difficult
- Basically recommend **`onClick` (finalize on release)**

#### Implementation Guide (Recommended)

- Mark Props as `@deprecated` in type information (explicit to users)
- In development (non-production), guide with `console.warn` (progressive disclosure)
- Reduce exposure in Storybook Docs/Controls (optional)

### Handling in Reviews

- Introducing deprecated APIs can be included as Fix candidates in the checklist as **"project improvement for WCAG achievement"**
- However, consider compatibility and migration costs; start with warning + docs as a principle
