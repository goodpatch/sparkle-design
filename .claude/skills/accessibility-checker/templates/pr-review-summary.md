# Accessibility Review: PR #[NUMBER]

**PR Title**: [PR Title]
**Date**: YYYY-MM-DD
**Reviewer**: [Name/AI]

---

## Executive Summary

**Overall Status**: ✅ Approved / ⚠️ Needs Work / ❌ Blocked

### Key Findings

| Metric | Count |
|--------|-------|
| Components Reviewed | 0 |
| Critical Issues | 0 |
| Minor Issues | 0 |
| Improvements Suggested | 0 |

### Impact

- **User Impact**: [Who is affected and how]
- **WCAG Compliance**: [A / AA / AAA level achieved]
- **Breaking Changes**: [Yes / No]

---

## Components Reviewed

### ✅ [Component Name]
- **Status**: Pass
- **Findings**: No accessibility issues found
- **Evidence**: [Brief summary of checks performed]

### ⚠️ [Component Name]
- **Status**: Needs Work
- **Critical Issues**: 0
- **Minor Issues**: 2
- **Details**: See [Component Report](#component-details)

### ❌ [Component Name]
- **Status**: Blocked
- **Critical Issues**: 3
- **Must Fix**: [List critical issues]
- **Details**: See [Component Report](#component-details)

---

## Critical Issues

Issues that must be fixed before merging:

### 1. [Issue Title]
- **Component**: [Component name]
- **WCAG**: [Criterion] ([Level])
- **Issue**: [Brief description]
- **Impact**: [User impact]
- **Fix**: [Specific solution]
- **File**: `path/to/file.tsx:LINE`

### 2. [Issue Title]
[Same format as above]

---

## Minor Issues

Issues that should be fixed but don't block merge:

### 1. [Issue Title]
- **Component**: [Component name]
- **WCAG**: [Criterion] ([Level])
- **Issue**: [Brief description]
- **Fix**: [Specific solution]
- **File**: `path/to/file.tsx:LINE`

---

## Improvements

Suggestions for enhancement:

### 1. [Improvement Title]
- **Component**: [Component name]
- **Benefit**: [Why this would help]
- **Approach**: [How to implement]
- **Priority**: [High / Medium / Low]

---

## Component Details

### [Component Name 1]

**File**: `path/to/component.tsx`

#### Checklist Results

| Check | Result | Evidence |
|-------|--------|----------|
| Accessible name | ✅ Pass | Has aria-label |
| Keyboard support | ✅ Pass | Tested Tab/Enter |
| Focus visible | ❌ Fail | No :focus-visible style |
| Loading state | ⚠️ Needs Review | No aria-busy attribute |

#### Required Fixes

1. **Add focus indicator**:
   ```tsx
   // Add to styles
   &:focus-visible {
     outline: 2px solid hsl(var(--primary));
     outline-offset: 2px;
   }
   ```

2. **Add loading state**:
   ```tsx
   // Update component
   <button aria-busy={isLoading} disabled={isLoading}>
     {isLoading ? 'Loading...' : 'Submit'}
   </button>
   ```

---

### [Component Name 2]

[Same format as above]

---

## Action Plan

### Before Merge (Required)

- [ ] Fix critical issue #1: [Issue title]
  - Assigned to: [Developer]
  - Estimated effort: [Time estimate]

- [ ] Fix critical issue #2: [Issue title]
  - Assigned to: [Developer]
  - Estimated effort: [Time estimate]

- [ ] Re-run accessibility checks
  ```bash
  pnpm test:a11y
  ```

### After Merge (Follow-up)

- [ ] Fix minor issue #1: [Issue title]
  - Create issue: [Issue number]

- [ ] Implement improvement #1: [Improvement title]
  - Create issue: [Issue number]

---

## Testing Performed

### Automated Tests
- ✅ ESLint jsx-a11y rules: Pass
- ✅ jest-axe: Pass
- ✅ Storybook a11y addon: Pass

### Manual Tests
- ✅ Keyboard navigation: [Result]
- ✅ Screen reader (VoiceOver): [Result]
- ⚠️ Screen reader (NVDA): [Not tested]

### Evidence
- Test output: [Link to test results]
- Screenshots: [Link to screenshots]
- Video: [Link to demo video]

---

## Recommendation

**Status**: [Approve / Request Changes / Comment]

### Summary for Reviewers

[Brief paragraph summarizing the accessibility state of this PR and what action is needed]

### Next Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]

---

## References

- PR diff: [Link to GitHub]
- Checklist: [Link to checklist CSV]
- Related PRs: [Links]
- WCAG documentation: [Links]
