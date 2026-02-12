---
name: accessibility-checker
description: This skill should be used when the user asks to "check accessibility", "run a WCAG review", "perform an a11y audit", "generate an accessibility report", "validate the accessibility checklist", "アクセシビリティチェック", "WCAG準拠の確認", "a11yレビュー", or asks to review UI components, Storybook stories, pages, or PRs for WCAG compliance. Runs checklist-driven reviews producing structured pass/fail/NA/needs-review reports with evidence and actionable fixes.
---

# Accessibility Checker

## Overview

Run consistent accessibility reviews driven by a CSV checklist, producing verifiable reports with:

- **Results** per checklist item: Pass / Fail / N/A / Needs review
- **Evidence**: File paths, code snippets, story names, URLs, reproduction steps
- **Fixes**: Concrete, actionable changes with implementation details

This skill works with PR diffs, partial context, or full component reviews.

---

## Quick Start

### Automated Report Generation

```bash
# Generate report from checklist
python scripts/generate_report.py --component button

# Quick component check
python scripts/check_component.py src/components/ui/button/

# Validate checklist CSV
python scripts/validate_checklist_csv.py
```

### AI-Assisted Review

For comprehensive reviews requiring code understanding and context:

1. Run automated checks first
2. Review checklist items with AI analysis
3. Update report with findings
4. Generate action items

---

## Required Inputs

### 1. Scope (What to Check)

- Component(s): `src/components/ui/button/`
- Page(s): `src/app/dashboard/`
- Storybook story(ies): Specific stories or all stories
- PR/branch: GitHub PR number or branch name
- File list: Specific files to review

### 2. Checklist CSV

- **Default location**: `assets/checklist.csv`
- **Format**: Japanese headers (automatically mapped)
- **Columns**:
  - `達成基準` → Success criterion ID (e.g., `2.4.7`)
  - `項目` → Check name/category
  - `レベル` → WCAG level (`A` / `AA` / `AAA`)
  - `確認ポイント` → What to verify
  - `単体チェック可否` → Component-level feasibility
  - `Reactでの実装例` → Implementation hints
  - `デザインチェック可否` → Design review feasibility
  - `備考` → Additional notes

**If checklist is missing or unclear**: Ask user for location and column meanings.

---

## Intended Usage

### 1. Review

Run checklist against target (PR / story / page / component) and produce structured findings report.

### 2. Component-by-Component

Review each component/story, focusing on applicability and evidence collection.

### 3. Fix

Apply minimal, safe code changes per component, then re-check affected items.

---

## Workflow

For detailed workflow (including status updates), see:
- **[references/workflow.md](references/workflow.md)** - Step-by-step procedures
- **[references/project-policy.md](references/project-policy.md)** - Project-specific policies

### Quick Workflow Summary

#### Step 1: Confirm Scope

- **Ask or infer**: What artifacts are in scope?
- **PR**: Prioritize changed UI surfaces and related stories/tests
- **Storybook**: Use as primary evidence source
- **Code only**: Provide best-effort review, mark unverifiable as Needs review

#### Step 2: Load Checklist

```bash
# Validate checklist format
python scripts/validate_checklist_csv.py assets/checklist.csv
```

Checklist columns are automatically mapped from Japanese headers.

#### Step 3: Execute Checks

For each checklist item:

1. **Determine applicability**: If item doesn't apply, mark **N/A** with reason
2. **When failing**:
   - Capture evidence (location, problem, manifestation)
   - Propose fix with minimal, safe changes
3. **When passing**:
   - Record evidence briefly (what was checked)

**Design-system guarantees** (per project policy): Mark **Pass** with evidence like:
- "Design-system guaranteed (Figma). No code-level action required unless token deviation exists."

**Do not claim** tools or tests were executed unless they actually were. If unverifiable, use **Needs review**.

#### Step 4: Generate Report

Use templates from `examples/`:

```bash
# Component report
cp examples/component-report.md reports/button-report.md

# PR review summary
cp examples/pr-review-summary.md reports/pr-123-summary.md

# Status update
cp examples/status-update.md reports/button-status.md
```

**Report structure**:
1. **Summary**: Totals (Pass/Fail/N/A/Needs review), top risks
2. **Findings table**: ID, Category, Level, Check, Result, Evidence, Fix
3. **Action list**: Tasks grouped by area (components, docs, tests, tooling)
4. **Follow-ups**: Open questions, missing context, verification steps

---

## Project-Specific Policy (sparkle-design)

This repo has specific conventions about where guarantees live.

### Color/Contrast Guaranteed in Figma

Color/contrast criteria (e.g., **1.4.1 / 1.4.3 / 1.4.11**) are **primarily guaranteed by Figma**.

- In code reviews: **Do not require code changes** by default
- **Mark Needs review** if:
  - Token deviations exist (custom colors, style overrides)
  - States (disabled/hover/active/loading) are custom-built outside guarantee scope

### Deprecate Risky APIs Progressively

For accident-prone APIs that frequently lead to WCAG violations, prefer **non-breaking deprecation**.

**Example: WCAG 2.5.2 Pointer Cancellation**

- Avoid `onMouseDown` / `onPointerDown` / `onTouchStart` for actions
- Prefer `onClick` (activation on release)
- Implementation: Add `@deprecated` JSDoc + dev warnings; reduce Storybook exposure

See [references/project-policy.md](references/project-policy.md) for details.

---

## Automated Tools

### Generate Report

```bash
# Full report from checklist
python scripts/generate_report.py --checklist assets/checklist.csv

# Component-specific report
python scripts/generate_report.py --component button --output reports/button.md

# Use custom template
python scripts/generate_report.py --template examples/component-report.md
```

### Quick Component Check

```bash
# Check component directory
python scripts/check_component.py src/components/ui/button/

# Check specific file with verbose output
python scripts/check_component.py src/components/ui/button/index.tsx --verbose
```

**Note**: This performs basic static analysis. For comprehensive checking, use AI-assisted review.

### Export Summary

```bash
# Export from reports directory
python scripts/export_summary.py --reports reports/

# Export to file
python scripts/export_summary.py --reports reports/ --output summary.md
```

### Validate Checklist

```bash
# Validate CSV structure
python scripts/validate_checklist_csv.py assets/checklist.csv
```

---

## References

For detailed information, consult these references:

- **[references/wcag-quick-reference.md](references/wcag-quick-reference.md)** - WCAG 2.1/2.2 criteria with React examples
- **[references/common-violations.md](references/common-violations.md)** - Top 10 violations and fixes
- **[references/testing-guidelines.md](references/testing-guidelines.md)** - Automated and manual testing approaches

Load references as needed during review.

---

## Report Examples

Report templates available in `examples/`:

- **[component-report.md](examples/component-report.md)** - Detailed component review
- **[pr-review-summary.md](examples/pr-review-summary.md)** - PR accessibility review
- **[status-update.md](examples/status-update.md)** - README status updates

---

## Output Format

### Findings Table

| ID | Category | Level | Check | Result | Evidence | Recommended Fix |
|---:|----------|-------|-------|--------|----------|-----------------|
| 1.1.1 | Non-text Content | A | Icons have text alternatives | Pass | `button.tsx:42`, has aria-label | - |
| 2.1.1 | Keyboard | A | Keyboard accessible | Fail | No onKeyDown for custom div | Add keyboard handler |
| 2.4.7 | Focus Visible | AA | Focus indicator visible | Pass | `:focus-visible` styles present | - |
| 4.1.2 | Name, Role, Value | A | Accessible name provided | Needs Review | Cannot verify without running | Check with screen reader |

---

## Guardrails

- **Prefer correctness over completeness**: "Needs review" is acceptable
- **Don't invent evidence**: No fake audits or tool outputs
- **Avoid long WCAG explanations**: Keep it checklist-driven
- **Be specific**: Provide file paths, line numbers, concrete fixes
- **Verify assumptions**: Check actual code, don't assume

---

## AI Assistant Notes

### Execution Guidelines

1. **Always validate checklist first**: Run `validate_checklist_csv.py`
2. **Start with automated checks**: Run `check_component.py` for quick issues
3. **Use templates**: Copy appropriate template for report structure
4. **Load references as needed**: Don't load all references upfront
5. **Be evidence-driven**: Every Pass/Fail needs concrete evidence
6. **Mark Needs Review liberally**: Better to flag uncertainty than guess

### Common Patterns

**Full review workflow**:

```bash
# 1. Validate checklist
python scripts/validate_checklist_csv.py

# 2. Quick automated check
python scripts/check_component.py src/components/ui/button/

# 3. Generate structured report
python scripts/generate_report.py --component button --output reports/button.md

# 4. AI reviews each item, updates report with findings

# 5. Export summary for README
python scripts/export_summary.py --reports reports/ --output summary.md
```

### Progressive Disclosure

- **Always available**: This SKILL.md (overview and workflow)
- **Load when checking**: `references/wcag-quick-reference.md` (specific criteria)
- **Load on issues**: `references/common-violations.md` (known problems)
- **Load for testing**: `references/testing-guidelines.md` (how to verify)

---

## Bundled Resources

- **`assets/checklist.csv`**: Project checklist (Japanese headers, auto-mapped)
- **`scripts/validate_checklist_csv.py`**: CSV validation helper
- **`scripts/generate_report.py`**: Report generation automation
- **`scripts/check_component.py`**: Quick static analysis
- **`scripts/export_summary.py`**: Summary export for README updates
- **`references/workflow.md`**: Detailed operational procedures
- **`references/project-policy.md`**: Sparkle-design specific policies
- **`references/*.md`**: WCAG guides, violations, testing
- **`examples/*.md`**: Report templates

---

**Version**: 2.1.0
**Last Updated**: 2026-02-12
