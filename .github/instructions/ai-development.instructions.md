---
applyTo: "**"
---

# AI Development Guidelines for Sparkle Design

## 📋 Primary Reference
**ALWAYS refer to `.github/instructions/testing.instructions.md` before making test-related changes.**

## 🧪 Testing Philosophy
This project strictly follows **t_wada's testing best practices**:
- Intention-revealing test names and structure
- Granular test splitting
- Property-based component testing
- Accessibility verification
- Comprehensive error/edge case coverage
- Maintainable and refactoring-resistant tests
- Reliable, non-flaky tests

## 🏗️ Project Architecture
- **Framework**: Next.js + TypeScript + Vitest + CVA (Class Variance Authority)
- **Testing**: jsdom environment with custom TestContainer helpers
- **Styling**: TailwindCSS with CVA for component variants
- **Components**: Located in `src/components/ui/[component]/`

## 🔧 AI Workflow Requirements

### 1. Test Analysis Process
```bash
# ALWAYS use intermediate log files
npm test > test-output.log 2>&1
grep -A 5 -B 5 "FAIL\|✗\|Error" test-output.log > test-failures.log
tail -20 test-output.log | grep -E "failed|passed|total"
```

### 2. Common Fixes Applied
- **Button default type**: Added `type="button"` default
- **Icon testing**: Use `span[aria-hidden="true"]` and `textContent`, not `data-icon`
- **CVA class testing**: Test actual TailwindCSS classes (`h-8`, `px-2.5`) not variant names
- **Keyboard navigation**: Test `onKeyDown` events, not `onClick` from keyboard in jsdom
- **Spinner testid**: Added `data-testid="loading-spinner"`
- **Empty test files**: Created complete test suites following standard structure

### 3. Testing Patterns by Component Type

#### Regular Components (Button, Input, Badge, Tag, etc.)
```tsx
describe('ComponentName', () => {
  describe('Basic Rendering', () => {})
  describe('Variant Styling', () => {})
  describe('User Interaction', () => {})
  describe('Accessibility', () => {})
  describe('Edge Cases', () => {})
})
```

#### Portal Components (Dialog, Modal, Select)
```tsx
describe('PortalComponent', () => {
  // Portal-based components are challenging to test with jsdom
  it.todo('should render portal content')
  it.todo('should handle open/close states')
})
```

## 🚫 Critical Don'ts
- ❌ Don't test non-existent `data-icon` attributes
- ❌ Don't expect keyboard events to trigger clicks in jsdom
- ❌ Don't test variant names instead of actual CSS classes
- ❌ Don't create empty test files
- ❌ Don't assume browser keyboard behavior works in jsdom

## ✅ Best Practices
- ✅ Use actual CVA-generated TailwindCSS classes in assertions
- ✅ Test keyboard events directly (`onKeyDown`) not their side effects
- ✅ Use `StyleHelpers.hasClass()` for CSS class verification
- ✅ Include proper setup/cleanup in all test files
- ✅ Follow the exact test file structure from `.github/instructions/testing.instructions.md`

## 📁 Key Files
- `.github/instructions/testing.instructions.md` - Complete testing guidelines (PRIMARY)
- `src/test/helpers.ts` - Shared test utilities
- `.github/instructions/ai-context.instructions.md` - Project context
- `.vscode/copilot-instructions.md` - VS Code Copilot context

## 🎯 Quality Goals
- **Coverage**: 90%+ of major functionality
- **Reliability**: Tests resistant to implementation changes
- **Maintainability**: Clear, understandable, easy to modify
- **Practicality**: Actually catches real bugs

---

**Remember**: When in doubt, consult `.github/instructions/testing.instructions.md` for detailed examples and patterns.
