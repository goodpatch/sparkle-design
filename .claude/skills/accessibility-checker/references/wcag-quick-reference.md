# WCAG Quick Reference

This document provides a quick reference for WCAG 2.1/2.2 success criteria commonly relevant to React component development.

## Table of Contents

- [Understanding WCAG Levels](#understanding-wcag-levels)
- [Perceivable](#perceivable)
- [Operable](#operable)
- [Understandable](#understandable)
- [Robust](#robust)
- [React Implementation Patterns](#react-implementation-patterns)

---

## Understanding WCAG Levels

| Level | Description | Coverage |
|-------|-------------|----------|
| **A** | Essential | Basic accessibility - must be met |
| **AA** | Ideal support | Industry standard - should be met |
| **AAA** | Specialized support | Enhanced - nice to have |

**Target for this project**: AA compliance (includes all A criteria)

---

## Perceivable

Information and UI components must be presentable to users in ways they can perceive.

### 1.1 Text Alternatives

#### 1.1.1 Non-text Content (A)

**What**: Provide text alternatives for non-text content

**React Implementation**:
```tsx
// Icons with meaning
<button aria-label="Close dialog">
  <CloseIcon aria-hidden="true" />
</button>

// Decorative icons
<Icon aria-hidden="true" />

// Images
<img src="chart.png" alt="Sales increased by 25% in Q4" />
```

---

### 1.3 Adaptable

#### 1.3.1 Info and Relationships (A)

**What**: Information, structure, and relationships can be programmatically determined

**React Implementation**:
```tsx
// Use semantic HTML
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

// Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Headings hierarchy
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

#### 1.3.4 Orientation (AA)

**What**: Content does not restrict display to single orientation

**React Implementation**:
```css
/* Avoid forcing orientation */
/* ❌ Bad */
@media (orientation: landscape) {
  body { transform: rotate(90deg); }
}

/* ✅ Good - responsive design */
@media (max-width: 768px) {
  .container { flex-direction: column; }
}
```

#### 1.3.5 Identify Input Purpose (AA)

**What**: Input fields have appropriate autocomplete attributes

**React Implementation**:
```tsx
<input
  type="email"
  autoComplete="email"
  name="email"
/>

<input
  type="tel"
  autoComplete="tel"
  name="phone"
/>
```

---

### 1.4 Distinguishable

#### 1.4.1 Use of Color (A)

**What**: Color is not the only visual means of conveying information

**React Implementation**:
```tsx
// ❌ Bad - color only
<span style={{ color: 'red' }}>Error</span>

// ✅ Good - color + icon + text
<span className="error">
  <ErrorIcon aria-hidden="true" />
  Error: Invalid input
</span>

// ✅ Good - disabled state with multiple cues
<button disabled aria-disabled="true">
  Submit
</button>
```

#### 1.4.3 Contrast (Minimum) (AA)

**What**: Text has contrast ratio of at least 4.5:1 (3:1 for large text)

**Note**: In sparkle-design, this is **guaranteed by Figma**. Code review should only check for token deviations.

#### 1.4.4 Resize Text (AA)

**What**: Text can be resized up to 200% without loss of content or functionality

**React Implementation**:
```css
/* Use relative units */
font-size: 1rem; /* ✅ */
font-size: 16px; /* ❌ */

/* Allow text reflow */
max-width: 100%;
overflow-wrap: break-word;
```

#### 1.4.10 Reflow (AA)

**What**: Content reflows to single column at 400% zoom

**React Implementation**:
```css
/* Responsive containers */
.container {
  max-width: 100%;
  overflow: auto;
}

/* Avoid fixed widths */
width: 100%; /* ✅ */
width: 1200px; /* ❌ */
```

#### 1.4.11 Non-text Contrast (AA)

**What**: UI components have contrast ratio of at least 3:1

**Note**: In sparkle-design, this is **guaranteed by Figma** for design tokens.

#### 1.4.13 Content on Hover or Focus (AA)

**What**: Hover/focus content is dismissible, hoverable, and persistent

**React Implementation**:
```tsx
// Tooltip component
<Tooltip
  content="Help text"
  // Dismissible: Escape key
  onEscapeKeyDown={close}
  // Hoverable: Can move pointer over tooltip
  // Persistent: Stays until dismissed
>
  <button>Help</button>
</Tooltip>
```

---

## Operable

UI components and navigation must be operable.

### 2.1 Keyboard Accessible

#### 2.1.1 Keyboard (A)

**What**: All functionality available via keyboard

**React Implementation**:
```tsx
// Native elements are keyboard accessible
<button onClick={handleClick}>Click me</button>

// Custom elements need keyboard support
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
  Custom button
</div>
```

#### 2.1.2 No Keyboard Trap (A)

**What**: Keyboard focus can be moved away from component

**React Implementation**:
```tsx
// Modal with focus trap (good - intentional)
<Dialog onEscapeKeyDown={close}>
  {/* Focus cycles within dialog */}
  {/* Escape key releases trap */}
</Dialog>

// ❌ Bad - unintentional trap
// (e.g., focus listener that prevents blur)
```

#### 2.1.4 Character Key Shortcuts (A)

**What**: Single character shortcuts can be turned off or remapped

**React Implementation**:
```tsx
// Provide way to disable shortcuts
const [shortcutsEnabled, setShortcutsEnabled] = useState(true);

useEffect(() => {
  if (!shortcutsEnabled) return;

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
      // Single key shortcut
    }
  };

  document.addEventListener('keypress', handleKeyPress);
  return () => document.removeEventListener('keypress', handleKeyPress);
}, [shortcutsEnabled]);
```

---

### 2.4 Navigable

#### 2.4.3 Focus Order (A)

**What**: Focus order is logical and intuitive

**React Implementation**:
```tsx
// ✅ Good - DOM order matches visual order
<form>
  <input name="firstName" />
  <input name="lastName" />
  <button type="submit">Submit</button>
</form>

// ❌ Bad - using tabIndex to force illogical order
<form>
  <input name="lastName" tabIndex={2} />
  <input name="firstName" tabIndex={1} />
  <button type="submit" tabIndex={3}>Submit</button>
</form>
```

#### 2.4.7 Focus Visible (AA)

**What**: Keyboard focus indicator is visible

**React Implementation**:
```css
/* Use focus-visible for keyboard-only focus */
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Avoid removing all focus indicators */
button:focus {
  outline: none; /* ❌ Bad */
}
```

#### 2.4.11 Focus Not Obscured (Minimum) (AA)

**What**: Focused element is not entirely hidden

**React Implementation**:
```tsx
// Scroll focused element into view
const ref = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (focused) {
    ref.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  }
}, [focused]);
```

---

### 2.5 Input Modalities

#### 2.5.1 Pointer Gestures (A)

**What**: Complex gestures have single-pointer alternative

**React Implementation**:
```tsx
// ✅ Good - click/tap instead of swipe
<button onClick={nextSlide}>Next</button>

// If implementing gestures, provide alternative
<div
  onTouchMove={handleSwipe}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') nextSlide();
  }}
>
  <button onClick={nextSlide}>Next</button>
</div>
```

#### 2.5.2 Pointer Cancellation (A)

**What**: Actions complete on pointer up, not down

**React Implementation**:
```tsx
// ✅ Good - onClick fires on release
<button onClick={handleAction}>Action</button>

// ❌ Bad - fires on press
<button onMouseDown={handleAction}>Action</button>
<button onPointerDown={handleAction}>Action</button>
<button onTouchStart={handleAction}>Action</button>

// If down-event is necessary, allow cancellation
<button
  onPointerDown={startAction}
  onPointerUp={completeAction}
  onPointerCancel={cancelAction}
  onPointerLeave={cancelAction}
>
  Drag action
</button>
```

#### 2.5.3 Label in Name (A)

**What**: Accessible name contains visible label text

**React Implementation**:
```tsx
// ✅ Good - aria-label contains visible text
<button aria-label="Search products">
  Search
</button>

// ❌ Bad - aria-label doesn't match visible text
<button aria-label="Find items">
  Search
</button>

// ✅ Better - let visible text be the name
<button>Search</button>
```

---

## Understandable

Information and UI operation must be understandable.

### 3.2 Predictable

#### 3.2.1 On Focus (A)

**What**: Receiving focus does not initiate change of context

**React Implementation**:
```tsx
// ❌ Bad - auto-submits on focus
<input onFocus={submitForm} />

// ✅ Good - explicit action required
<input />
<button onClick={submitForm}>Submit</button>
```

#### 3.2.2 On Input (A)

**What**: Changing input does not automatically cause change of context

**React Implementation**:
```tsx
// ❌ Bad - auto-navigates on selection
<select onChange={(e) => navigate(e.target.value)}>

// ✅ Good - explicit action required
<select onChange={(e) => setSelection(e.target.value)}>
<button onClick={() => navigate(selection)}>Go</button>
```

---

## Robust

Content must be robust enough to be interpreted by assistive technologies.

### 4.1 Compatible

#### 4.1.2 Name, Role, Value (A)

**What**: All UI components have accessible name, role, and state

**React Implementation**:
```tsx
// Native elements have implicit roles
<button>Click</button> // role="button"

// Custom elements need explicit roles
<div
  role="button"
  aria-label="Close"
  aria-pressed={pressed}
  tabIndex={0}
>
  ×
</div>

// Form inputs need labels
<label htmlFor="name">Name</label>
<input id="name" />

// States should be communicated
<button aria-busy={loading} aria-disabled={disabled}>
  {loading ? 'Loading...' : 'Submit'}
</button>
```

---

## React Implementation Patterns

### Pattern: Accessible Button

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isLoading = false,
  isDisabled = false,
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={isDisabled || isLoading}
      aria-label={ariaLabel}
    >
      {isLoading && <Spinner aria-hidden="true" />}
      {children}
    </button>
  );
};
```

### Pattern: Accessible Dialog

```tsx
const Dialog: React.FC<DialogProps> = ({ open, onClose, title, children }) => {
  const titleId = useId();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      hidden={!open}
    >
      <h2 id={titleId}>{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close dialog">
        ×
      </button>
    </div>
  );
};
```

### Pattern: Accessible Form

```tsx
const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <div id="email-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <button type="submit">Log in</button>
    </form>
  );
};
```

---

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility Docs](https://react.dev/learn/accessibility)
