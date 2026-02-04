# Accessibility Testing Guidelines

This document provides guidelines for testing accessibility in React components.

## Testing Approaches

### 1. Automated Testing (60% coverage)
- Static analysis (ESLint plugins)
- Unit/integration tests with Testing Library
- Automated tools (axe-core, jest-axe)

### 2. Manual Testing (30% coverage)
- Keyboard navigation
- Screen reader testing
- Visual inspection

### 3. AI-Assisted Review (10% coverage)
- Code review with AI tools
- Pattern detection
- Checklist validation

---

## Automated Testing

### ESLint Configuration

```js
// .eslintrc.js
{
  extends: [
    'plugin:jsx-a11y/recommended'
  ],
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/no-autofocus': 'warn',
  }
}
```

### Jest + Testing Library

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  // Test accessible name
  it('has accessible name', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  // Test keyboard support
  it('responds to Enter key', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    const button = screen.getByRole('button');
    button.focus();
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalled();
  });

  // Test loading state
  it('announces loading state', () => {
    render(<Button isLoading>Submit</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  // Test no axe violations
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
```

---

## Manual Testing

### Keyboard Navigation Checklist

Test with keyboard only (no mouse):

- [ ] **Tab** - Move forward through interactive elements
- [ ] **Shift+Tab** - Move backward
- [ ] **Enter** - Activate buttons/links
- [ ] **Space** - Activate buttons, toggle checkboxes
- [ ] **Escape** - Close modals/dropdowns
- [ ] **Arrow keys** - Navigate within components (select, radio, tabs)

**Test procedure**:
1. Disconnect mouse
2. Start at top of page
3. Tab through all interactive elements
4. Verify focus visible on each
5. Activate each with Enter/Space
6. Verify expected behavior

### Screen Reader Testing

#### macOS - VoiceOver

**Start**: Cmd + F5

**Basic controls**:
- **VO** = Control + Option
- **VO + A** = Start reading
- **VO + Right/Left Arrow** = Navigate
- **VO + Space** = Activate

**Test procedure**:
1. Enable VoiceOver
2. Navigate to component with VO + Right Arrow
3. Listen to announcement
4. Verify:
   - Role announced correctly
   - Name announced correctly
   - State announced (disabled, busy, etc.)
   - Value announced (for inputs)

#### Windows - NVDA

**Download**: https://www.nvaccess.org/

**Basic controls**:
- **NVDA + Down Arrow** = Next item
- **NVDA + Up Arrow** = Previous item
- **Enter** = Activate

---

## Component Testing Patterns

### Button Component

```tsx
describe('Button accessibility', () => {
  it('has accessible name from children', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('has accessible name from aria-label for icon-only', () => {
    render(<Button aria-label="Close"><CloseIcon /></Button>);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('supports keyboard activation', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalled();
  });

  it('announces loading state', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  it('announces disabled state', () => {
    render(<Button isDisabled>Submit</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toBeDisabled();
  });
});
```

### Input Component

```tsx
describe('Input accessibility', () => {
  it('has associated label', () => {
    render(
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" />
      </div>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('announces errors', () => {
    const error = 'Email is required';
    render(<Input error={error} aria-label="Email" />);

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent(error);
  });

  it('has autocomplete attribute', () => {
    render(<Input type="email" autoComplete="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email');
  });
});
```

### Dialog Component

```tsx
describe('Dialog accessibility', () => {
  it('has role and aria-modal', () => {
    render(<Dialog open><div>Content</div></Dialog>);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has accessible name', () => {
    render(
      <Dialog open title="Confirm Action">
        <div>Content</div>
      </Dialog>
    );

    expect(screen.getByRole('dialog', { name: 'Confirm Action' })).toBeInTheDocument();
  });

  it('traps focus within dialog', async () => {
    render(
      <Dialog open>
        <button>First</button>
        <button>Last</button>
      </Dialog>
    );

    const first = screen.getByText('First');
    const last = screen.getByText('Last');

    first.focus();
    await userEvent.keyboard('{Tab}');
    expect(last).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    expect(first).toHaveFocus(); // Wrapped around
  });

  it('closes on Escape key', async () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose}><div>Content</div></Dialog>);

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
```

---

## Storybook Testing

### Interaction Tests

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test keyboard focus
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Test activation
    await userEvent.keyboard('{Enter}');
    await expect(button).toHaveTextContent('Clicked');
  },
};
```

### a11y Addon

```tsx
// .storybook/main.ts
export default {
  addons: ['@storybook/addon-a11y'],
};

// Story with violations will show in a11y panel
export const Default: Story = {
  args: {
    children: 'Button'
  },
  // Will automatically check for violations
};
```

---

## Testing Checklist

### Every Component Should Have

- [ ] Accessible name test
- [ ] Keyboard support test
- [ ] Focus indicator test
- [ ] ARIA attributes test
- [ ] axe violations test

### Forms Should Have

- [ ] Label association test
- [ ] Error announcement test
- [ ] Validation test
- [ ] Autocomplete test

### Interactive Components Should Have

- [ ] Click/Enter/Space test
- [ ] Focus management test
- [ ] Loading state test
- [ ] Disabled state test

### Modals/Dialogs Should Have

- [ ] Focus trap test
- [ ] Escape key test
- [ ] Focus return test
- [ ] aria-modal test

---

## Tools and Resources

### Testing Tools
- [Testing Library](https://testing-library.com/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)

### Manual Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Screen Readers
- **macOS**: VoiceOver (built-in)
- **Windows**: [NVDA](https://www.nvaccess.org/) (free)
- **Windows**: JAWS (commercial)

### Browser Extensions
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Accessibility Insights](https://accessibilityinsights.io/)
