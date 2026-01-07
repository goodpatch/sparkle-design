# A11y Status Update: [Component Name]

**Component**: [Component Name]
**Previous Status**: ❌ / ⚠️ / ✅
**New Status**: ❌ / ⚠️ / ✅
**Date**: YYYY-MM-DD

---

## Changes Made

### Fixed Issues

1. **[WCAG Criterion]**: [Issue title]
   - **Before**: [Description of problem]
   - **After**: [Description of fix]
   - **Evidence**: [How to verify]
   - **Commit**: [Commit hash or PR number]

2. **[WCAG Criterion]**: [Issue title]
   [Same format as above]

### Tests Added

1. **[Test name]**
   - File: `path/to/test.tsx`
   - Coverage: [What it tests]
   - Passing: ✅ / ❌

### Documentation Updated

1. **[Doc title]**
   - File: `path/to/docs.md`
   - Changes: [What was updated]

---

## Verification

### Automated Tests
```bash
pnpm test path/to/component
```
**Result**: ✅ Pass / ❌ Fail

### Manual Verification

- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] All states tested (default, hover, focus, disabled, loading)

### Storybook Stories

- Story: [Story name]
- URL: [Storybook URL]
- a11y panel: ✅ No violations / ⚠️ [X] warnings

---

## Current Status

### Pass Criteria (✅)

| Criterion | Status | Evidence |
|-----------|--------|----------|
| 1.1.1 Non-text Content | ✅ | Has aria-label for icons |
| 2.1.1 Keyboard | ✅ | Tab/Enter/Space tested |
| 2.4.7 Focus Visible | ✅ | Has :focus-visible styles |
| 4.1.2 Name, Role, Value | ✅ | All controls labeled |

### Remaining Issues

[If status is not ✅, list remaining issues]

#### Critical
1. [Issue description]
   - WCAG: [Criterion]
   - Plan: [How will this be fixed]

#### Minor
1. [Issue description]
   - WCAG: [Criterion]
   - Plan: [How will this be fixed]

---

## Justification for Status Change

**From** ❌ **to** ✅:
- All applicable WCAG AA criteria now pass
- All critical issues resolved
- Tests added for regression prevention
- Verified in Storybook and with screen reader

**Reasoning**:
[Detailed explanation of why the status change is justified]

---

## README Update

Update the component status table:

```markdown
| Component | ... | A11y Check |
|-----------|-----|------------|
| [Component Name] | ... | ✅ |
```

---

## Related Links

- PR: [Link to PR]
- Issue: [Link to issue]
- Review: [Link to review document]
- Checklist: [Link to completed checklist]

---

## Reviewer Sign-off

**Reviewed by**: [Name]
**Date**: YYYY-MM-DD
**Approved**: ✅ / ❌

**Comments**:
[Any reviewer feedback or concerns]
