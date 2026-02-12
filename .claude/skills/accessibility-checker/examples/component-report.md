# Accessibility Review: [Component Name]

**Date**: YYYY-MM-DD
**Reviewer**: [Name/AI]
**Scope**: [Component path or PR number]

---

## Summary

| Metric | Count |
|--------|-------|
| **Pass** | 0 |
| **Fail** | 0 |
| **N/A** | 0 |
| **Needs Review** | 0 |
| **Total Checks** | 0 |

### Top Risks

1. [Severity] [Brief description]
2. [Severity] [Brief description]

---

## Findings

| ID | Category | Level | Check | Result | Evidence | Recommended Fix |
|---:|----------|-------|-------|--------|----------|-----------------|
| 1.1.1 | Non-text Content | A | Icons have text alternatives | Pass/Fail/NA | File: `path/to/file.tsx`, Line: XX | [If Fail] Add aria-label="..." |
| 2.1.1 | Keyboard | A | All functions available via keyboard | Pass/Fail/NA | Tested with Tab/Enter/Space | [If Fail] Add onKeyDown handler |
| 2.4.7 | Focus Visible | AA | Keyboard focus indicator visible | Pass/Fail/NA | Inspected :focus-visible styles | [If Fail] Add outline: 2px solid ... |
| 4.1.2 | Name, Role, Value | A | All controls have accessible name | Pass/Fail/NA | Checked with screen reader | [If Fail] Add aria-label or visible text |

---

## Details

### Pass Items

#### [ID] [Check Name]
- **Evidence**: [Describe what was checked and where]
- **How verified**: [Code inspection / Storybook / Tests]

### Fail Items

#### [ID] [Check Name]
- **Issue**: [Describe the problem]
- **Evidence**: [File path, line number, reproduction steps]
- **Impact**: [Who is affected and how]
- **Fix**: [Specific code change needed]
- **Priority**: [High / Medium / Low]

### N/A Items

#### [ID] [Check Name]
- **Reason**: [Why this check doesn't apply]

### Needs Review Items

#### [ID] [Check Name]
- **Issue**: [What couldn't be verified]
- **Verification needed**: [How to verify this]
- **Who should verify**: [Designer / QA / User testing]

---

## Action Items

### Code Changes

- [ ] **[Component]**: [Description of fix]
  - File: `path/to/file.tsx`
  - Lines: XX-YY
  - Change: [Specific code diff]

### Testing

- [ ] **[Test description]**: [What needs to be tested]
  - File: `path/to/test.tsx`
  - Approach: [Unit test / Integration test / Manual]

### Documentation

- [ ] **[Doc description]**: [What needs to be documented]
  - File: `path/to/docs.md`
  - Content: [What to add]

### Design Review

- [ ] **[Design item]**: [What needs design review]
  - Reason: [Why design input is needed]
  - Question: [Specific question for designer]

---

## Follow-up

### Open Questions

1. [Question about implementation approach]
2. [Question about design intent]

### Future Improvements

1. [Enhancement that could improve accessibility]
2. [Pattern that could be applied elsewhere]

---

## Verification Steps

To verify these fixes:

1. **Run automated tests**:
   ```bash
   pnpm test path/to/component
   ```

2. **Check Storybook**:
   - Open story: [Story name]
   - Test keyboard navigation
   - Check a11y panel for violations

3. **Manual verification**:
   - [ ] Tab through component
   - [ ] Test with screen reader
   - [ ] Verify focus indicators
   - [ ] Test all interactive states

---

## References

- Checklist: [Link to checklist row]
- WCAG criteria: [Link to W3C documentation]
- Related issues: [Links to related PRs/issues]
