---
name: accessibility-checker
description: Run an accessibility (a11y) review using a project checklist CSV and produce a structured report with pass/fail/NA, evidence, and actionable fixes. Use when reviewing UI components, Storybook stories, docs pages, or PRs for accessibility issues.
---

# Accessibility Checker

## Overview

Run a consistent accessibility review driven by a CSV checklist, and output a *verifiable* report:

- Result per checklist item: **Pass / Fail / N/A / Needs review**
- Evidence: file paths, code snippets, story names, URLs, reproduction steps
- Fixes: concrete, actionable changes (and where to apply them)

This skill is designed to work even when you only have a PR diff or partial context.

## Inputs this skill expects

1. **What to check** (scope)
	- Component(s), page(s), Storybook story(ies), PR/branch, or file list
2. **Checklist CSV**
	- Default location: `assets/checklist.csv` (you can replace this file with your real checklist)
	- If the CSV is missing or the columns are unclear: ask the user where it is and what the columns mean.

## Workflow

### 1) Confirm scope and evidence sources

Ask (or infer) what artifacts are in scope and what “done” means.

- If a **PR** is provided: prioritize changed UI surfaces and their related stories/tests.
- If **Storybook** exists: use it as primary evidence (stories represent user-facing states).
- If only **code** is available: provide best-effort review and mark anything unverifiable as **Needs review**.

### 2) Load the checklist CSV and normalize it

Checklist CSV can vary. Use a tolerant approach:

- Identify header columns for: `id`, `category`, `title`/`check`, `how_to_test`, `severity`/`priority`, `applies_to`/`component`, `notes`.
- If you cannot map columns unambiguously, ask the user for a mapping.

Treat each row as a single “check item” with:

- **What to verify**
- **How to verify**
- **Expected outcome**
- **Severity/Priority** (if present)

### 3) Execute checks and record outcomes

For each checklist item:

- Decide applicability: if the item doesn’t apply to the scope, mark **N/A** with a short reason.
- When failing:
  - Capture evidence (where it occurs, what is wrong, and how it manifests).
  - Propose a fix with minimal, safe changes.
- When passing:
  - Record the evidence briefly (what you checked).

Do **not** claim you ran tools/tests unless you actually did. If you can’t verify, use **Needs review** and state what is required to verify.

### 4) Produce a report (single source of truth)

Output in this structure:

1. **Summary**
	- Totals: Pass / Fail / N/A / Needs review
	- Top risks (highest severity failures)
2. **Findings table** (one row per checklist item)
	- ID, Category, Check, Result, Severity, Evidence, Recommended fix
3. **Action list**
	- Concrete tasks grouped by area (components, docs, tests, tooling)
4. **Follow-ups**
	- Open questions / missing context / verification steps

## Output table template

| ID | Category | Check | Result | Severity | Evidence | Recommended fix |
|---:|---|---|---|---|---|---|

## Guardrails

- Prefer correctness over completeness; “Needs review” is an acceptable outcome.
- Don’t invent user research, audits, or tool outputs.
- Avoid long WCAG explanations unless requested; keep it checklist-driven.

## Bundled resources

- `assets/checklist.csv`: Replace with your real checklist CSV.
- `scripts/validate_checklist_csv.py`: Optional helper to sanity-check the CSV header and basic stats.
