---
name: accessibility-checker
license: Apache-2.0
description: >
  WCAG 準拠のアクセシビリティチェックをチェックリスト駆動で実行するスキル。
  コンポーネント・ページ・PR に対して Pass/Fail/N/A/Needs Review の構造化レポートを
  生成し、エビデンスと修正案を提示する。
  「アクセシビリティチェック」「a11y チェック」「WCAG をチェック」「a11y レビュー」
  「アクセシビリティ監査」「WCAG 準拠確認」「アクセシビリティレポート」への言及、
  または PR やコンポーネントのアクセシビリティレビュー依頼で発動する。
  English: "check accessibility", "a11y audit", "a11y check", "WCAG review",
  "accessibility report", "screen reader test", "review for a11y",
  "review this PR for accessibility", "axe audit"
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

**出力場所（必須）**: a11y レビューレポートは **対象リポジトリの `docs/pr/<component>-a11y-review.md`** に書き出します。

- ここで言う `docs/pr/` は **対象リポジトリ（リポジトリのルート）配下** の `docs/pr/` ディレクトリを指します
- スキル内部の `reports/` や `examples/` ではない（あくまで template 置き場であり成果物の保存先ではない）
- 同様に `docs/a11y-reports/` 等の独自パスも使わない
- ファイル名は kebab-case + `-a11y-review.md` サフィックス（例: `button-a11y-review.md`、`segmented-control-a11y-review.md`）
- 同名レポートが既にあれば上書き更新する（更新履歴は git log で追える）

```bash
# 正しい例（対象リポジトリのルートで実行することを想定）
cp .claude/skills/accessibility-checker/examples/component-report.md docs/pr/button-a11y-review.md
```

**Report structure**:
1. **対象 / Target**: コンポーネント名 + 関連ファイル + レビュー契機
2. **参照したチェックリスト / 方針**: checklist パス + project policy + 使っている primitive（Radix 等）が自動提供する ARIA
3. **チェック結果**: ID / 項目 / Level / 確認ポイント / Result / Evidence / Fix / Notes の 7 列テーブル（全 31 項目）。列名は既存レポート（`docs/pr/tabs-a11y-review.md` 等）に合わせて `Fix / Notes`
4. **Summary**: Pass / Fail / Needs review / N/A の件数
5. **対応内容**: Fail / Needs review への対処方針
6. **Regression 確認**（refactor 後のレビューの場合）: 変更前後の挙動差分
7. **テスト / 検証**: 関連テスト件数と内容
8. **フォローアップ候補**: 後続で確認したい事項

既存レポート（`docs/pr/tabs-a11y-review.md` 等）の構造に揃える。

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

# Component-specific report — 出力先は必ず docs/pr/<component>-a11y-review.md
python scripts/generate_report.py --component button --output docs/pr/button-a11y-review.md

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
# Export from docs/pr/ where reports live
python scripts/export_summary.py --reports docs/pr/

# Export to file
python scripts/export_summary.py --reports docs/pr/ --output summary.md
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

<!-- ========== AI アシスタント向け指示（ユーザーにそのまま見せない） ========== -->

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

# 3. Generate structured report — 出力先は必ず docs/pr/<component>-a11y-review.md
python scripts/generate_report.py --component button --output docs/pr/button-a11y-review.md

# 4. AI reviews each item, updates report with findings

# 5. Export summary for README
python scripts/export_summary.py --reports docs/pr/ --output summary.md
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
