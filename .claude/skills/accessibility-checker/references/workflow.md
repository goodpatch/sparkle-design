# Workflow (accessibility-checker)

This document outlines the operational procedures (review → fix → verify → status update) for the `accessibility-checker` skill in a progressively disclosed format.

Related:

- Main skill: `../SKILL.md`
- Project policy: `./project-policy.md`
- Checklist: `../assets/checklist.csv`

---

## 1. Scope Definition

First, establish "what constitutes completion."

- **Target**: Individual component / Story / Page / PR
- **Target states**: default / hover / active / disabled / loading / error, etc.
- **Evidence sources**:
  - Storybook (recommended)
  - Unit tests
  - Implementation code
  - PR diff

---

## 2. Checklist Interpretation (Reflecting Project Policy)

Evaluate each row in `checklist.csv` as **Pass / Fail / N/A / Needs review**.

### Handling Design System (Figma) Guarantees

In this project, color/contrast criteria (e.g., **1.4.1 / 1.4.3 / 1.4.11**) are **primarily guaranteed by Figma**.

- Report these as **Pass** by default
- Evidence should state:
  - "Design-system guaranteed (Figma). No code-level action required unless token deviation exists."
- However, mark as **Needs review** (or **Fail**) if:
  - Design tokens are deviated from (custom colors, strong overrides, external library styles)
  - States (disabled/hover/active/loading, etc.) are custom-built and appear outside guarantee scope

---

## 3. Review (Recording Evidence)

For each checklist item, record how it was verified:

- **Implementation code**: Which file/condition/attribute ensures compliance
- **Storybook**: Story name + reproduction steps
- **Tests**: Which test ensures what aspect

### Minimum Evidence Requirements (Recommended)

- File path (e.g., `src/components/ui/button/index.tsx`)
- State (e.g., loading/disabled)
- What is guaranteed (e.g., aria-busy, accessible name maintained)

---

## 4. Fixes (Minimal Changes + Non-Breaking Improvements)

- Prioritize fixes that don't break compatibility
- For "accident-prone APIs," prefer **gradual deprecation** over removal (see `PROJECT_POLICY.md` for details)

Example: WCAG 2.5.2 Pointer Cancellation

- Avoid routine use of `onMouseDown` / `onPointerDown` / `onTouchStart`
- Guide with `@deprecated` + dev warning + docs (progressive disclosure)

---

## 5. Verification

- Added/updated tests pass
- Expected states can be confirmed in Storybook (if possible)
- Items that cannot be verified remain as **Needs review**

---

## 6. Status Updates (README, etc.)

### Target

Update the "Component Status" table (`A11y Check` column) in `sparkle-design/README.md`.

### ✅ Conditions for Marking Complete (Recommended)

- Among checklist items applicable to the component, there are **no Fails**
- If **Needs review** items remain, either:
  - They can be explained as **project policy design guarantees** (e.g., Figma guarantee)
  - Or they cannot be verified at the component level and should be tracked in a different scope

### ❌ Conditions for Leaving Incomplete (Examples)

- Major operations (keyboard operation/accessible name/disabled/loading, etc.) have **Fails**
- Evidence is insufficient and verification is incomplete (i.e., **Needs review** is effectively unfinished)

### Status Update Evidence (Minimum)

When changing README status in a PR, attach (or link) one of the following:

- Review summary Markdown for PR (e.g., `docs/pr/*.md`)
- Test run results (e.g., `vitest run --project unit ...`)
- List of referenced Stories

---

## 7. Change Summary (Brief Summary)

- What was fixed (accessible name, state notification, deprecated guidance, etc.)
- What was verified (tests/stories)
- What remains unverified (Needs review)
