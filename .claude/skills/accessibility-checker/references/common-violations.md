# Common Accessibility Violations and Fixes

This document lists the most common accessibility violations found in React components and how to fix them.

## Table of Contents

- [Top 10 Violations](#top-10-violations)
- [Component-Specific Issues](#component-specific-issues)
- [Quick Fixes](#quick-fixes)

---

## Top 10 Violations

### 1. Missing Accessible Names

**Issue**: Buttons, links, or form controls without text content or labels

**WCAG**: 4.1.2 Name, Role, Value (A)

**Examples**:
```tsx
// ❌ Bad
<button><CloseIcon /></button>
<a href="/home"><HomeIcon /></a>

// ✅ Good
<button aria-label="Close dialog"><CloseIcon aria-hidden="true" /></button>
<a href="/home" aria-label="Go to homepage"><HomeIcon aria-hidden="true" /></a>

// ✅ Better - visible text
<button><CloseIcon aria-hidden="true" /> Close</button>
```

**How to Test**:
- Remove CSS to see if content is understandable
- Use screen reader to hear what's announced
- Run axe-core: `expect(element).toHaveAccessibleName()`

---

### 2. Poor Color Contrast

**Issue**: Text or UI elements don't meet contrast requirements

**WCAG**: 1.4.3 Contrast (Minimum) (AA), 1.4.11 Non-text Contrast (AA)

**Note**: In sparkle-design, this is guaranteed by Figma. Only check for token deviations.

**Examples**:
```tsx
// ❌ Bad - custom colors may violate contrast
<button style={{ color: '#999', background: '#ccc' }}>
  Submit
</button>

// ✅ Good - use design tokens
<button className="text-foreground bg-primary">
  Submit
</button>
```

**How to Test**:
- Use browser DevTools Accessibility panel
- Use contrast checker tools
- In code review: Flag any custom color values

---

### 3. Missing Form Labels

**Issue**: Form inputs without associated labels

**WCAG**: 1.3.1 Info and Relationships (A), 3.3.2 Labels or Instructions (A)

**Examples**:
```tsx
// ❌ Bad
<input type="email" placeholder="Email" />

// ✅ Good - visible label
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Also good - aria-label
<input type="email" aria-label="Email address" />

// ✅ Best - visible label + description
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email</span>
```

**How to Test**:
```tsx
// Testing Library
const input = screen.getByLabelText('Email');
expect(input).toBeInTheDocument();
```

---

### 4. Missing Keyboard Support

**Issue**: Interactive elements not accessible via keyboard

**WCAG**: 2.1.1 Keyboard (A)

**Examples**:
```tsx
// ❌ Bad - div with only onClick
<div onClick={handleClick}>Click me</div>

// ✅ Good - proper keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>

// ✅ Better - use button element
<button onClick={handleClick}>Click me</button>
```

**How to Test**:
- Tab to element and verify focus
- Press Enter/Space and verify action
- Test: `await user.keyboard('{Enter}')`

---

### 5. Invisible Focus Indicators

**Issue**: No visible indication when element has keyboard focus

**WCAG**: 2.4.7 Focus Visible (AA)

**Examples**:
```css
/* ❌ Bad - removes all focus indicators */
*:focus {
  outline: none;
}

/* ✅ Good - custom but visible focus */
button:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}

/* ✅ Also good - ring utility */
button:focus-visible {
  @apply ring-2 ring-primary ring-offset-2;
}
```

**How to Test**:
- Tab through interactive elements
- Verify visible indicator on each
- Check contrast meets 3:1 against background

---

### 6. Using onMouseDown/onTouchStart

**Issue**: Actions triggered on pointer down instead of release

**WCAG**: 2.5.2 Pointer Cancellation (A)

**Examples**:
```tsx
// ❌ Bad - can't cancel action
<button onMouseDown={deleteItem}>Delete</button>
<button onTouchStart={submitForm}>Submit</button>

// ✅ Good - onClick allows cancellation
<button onClick={deleteItem}>Delete</button>

// ✅ If down-event needed, allow cancellation
<button
  onPointerDown={startDrag}
  onPointerUp={endDrag}
  onPointerCancel={cancelDrag}
>
  Drag me
</button>
```

**How to Test**:
- Press down on element
- Move pointer away before releasing
- Verify action doesn't trigger

---

### 7. Information Conveyed Only by Color

**Issue**: Using color alone to indicate state or meaning

**WCAG**: 1.4.1 Use of Color (A)

**Examples**:
```tsx
// ❌ Bad - color only
<span style={{ color: 'red' }}>Error</span>
<span style={{ color: 'green' }}>Success</span>

// ✅ Good - color + icon + text
<span className="text-destructive">
  <ErrorIcon aria-hidden="true" />
  Error: Invalid input
</span>

// ✅ Good - disabled with multiple cues
<button
  disabled
  aria-disabled="true"
  className="opacity-50 cursor-not-allowed"
>
  <LockIcon aria-hidden="true" />
  Locked
</button>
```

**How to Test**:
- View in grayscale mode
- Use screen reader
- Check for text/icons/attributes

---

### 8. Missing Loading/Busy States

**Issue**: No indication when async action is in progress

**WCAG**: 4.1.3 Status Messages (AA)

**Examples**:
```tsx
// ❌ Bad - no loading state
<button onClick={handleSubmit}>
  Submit
</button>

// ✅ Good - aria-busy + visual indicator
<button
  onClick={handleSubmit}
  aria-busy={isLoading}
  disabled={isLoading}
>
  {isLoading && <Spinner aria-hidden="true" />}
  {isLoading ? 'Submitting...' : 'Submit'}
</button>

// ✅ Better - loading state + live region
{isLoading && (
  <div role="status" aria-live="polite">
    Loading data...
  </div>
)}
```

**How to Test**:
```tsx
// Check aria-busy attribute
expect(button).toHaveAttribute('aria-busy', 'true');

// Check live region announcement
expect(screen.getByRole('status')).toHaveTextContent('Loading');
```

---

### 9. Inaccessible Modals/Dialogs

**Issue**: Focus not managed properly in modal dialogs

**WCAG**: 2.1.2 No Keyboard Trap (A), 2.4.3 Focus Order (A)

**Examples**:
```tsx
// ❌ Bad - no focus management
<div className="modal">
  <h2>Confirm</h2>
  <button onClick={confirm}>OK</button>
</div>

// ✅ Good - proper dialog
<Dialog
  open={open}
  onOpenChange={setOpen}
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <button onClick={confirm}>OK</button>
  <button onClick={() => setOpen(false)}>Cancel</button>
</Dialog>

// Implementation tips:
// - Focus first focusable element on open
// - Trap focus within dialog
// - Return focus to trigger on close
// - Close on Escape key
```

**How to Test**:
- Open modal, verify focus moves into it
- Tab through, verify focus stays trapped
- Press Escape, verify modal closes
- Verify focus returns to trigger

---

### 10. Missing Error Messages

**Issue**: Form validation errors not announced to screen readers

**WCAG**: 3.3.1 Error Identification (A), 3.3.3 Error Suggestion (AA)

**Examples**:
```tsx
// ❌ Bad - error not announced
<input type="email" className={error ? 'border-red' : ''} />
{error && <span className="text-red">{error}</span>}

// ✅ Good - proper error handling
<div>
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
  {error && (
    <span id="email-error" role="alert" className="text-destructive">
      {error}
    </span>
  )}
</div>

// ✅ Better - summary for multiple errors
{errors.length > 0 && (
  <div role="alert" aria-live="assertive">
    <h3>Please fix the following errors:</h3>
    <ul>
      {errors.map(error => (
        <li key={error.field}>
          <a href={`#${error.field}`}>{error.message}</a>
        </li>
      ))}
    </ul>
  </div>
)}
```

**How to Test**:
```tsx
// Check aria-invalid
expect(input).toHaveAttribute('aria-invalid', 'true');

// Check error message announced
expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
```

---

## Component-Specific Issues

### Button Components

**Common issues**:
- Icon-only buttons without labels
- No loading state indication
- Using div instead of button

**Checklist**:
- [ ] Has accessible name (text or aria-label)
- [ ] Uses `<button>` element
- [ ] Shows loading state with aria-busy
- [ ] Disabled state has aria-disabled

### Input Components

**Common issues**:
- No associated label
- Missing autocomplete attribute
- Errors not announced

**Checklist**:
- [ ] Has associated `<label>` or aria-label
- [ ] Has autocomplete attribute (when applicable)
- [ ] Errors use aria-invalid and aria-describedby
- [ ] Required fields marked with aria-required

### Modal/Dialog Components

**Common issues**:
- Focus not trapped
- No Escape key handler
- Missing aria-modal

**Checklist**:
- [ ] Has role="dialog"
- [ ] Has aria-modal="true"
- [ ] Has accessible name (aria-labelledby)
- [ ] Traps focus within dialog
- [ ] Closes on Escape key
- [ ] Returns focus on close

---

## Quick Fixes

### Add Accessible Name
```tsx
<button aria-label="Close">×</button>
```

### Add Loading State
```tsx
<button aria-busy={loading} disabled={loading}>
  {loading ? 'Loading...' : 'Submit'}
</button>
```

### Add Error Announcement
```tsx
<input aria-invalid={!!error} aria-describedby="error-id" />
{error && <span id="error-id" role="alert">{error}</span>}
```

### Add Focus Indicator
```css
:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}
```

### Add Keyboard Support
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
```

---

## Resources

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Testing Library Accessibility](https://testing-library.com/docs/queries/byrole)
- [jest-axe](https://github.com/nickcolley/jest-axe)
