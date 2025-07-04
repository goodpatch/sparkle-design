# Sparkle Design Testing Context

This project follows strict testing guidelines documented in `.github/instructions/testing.instructions.md`. When working with tests:

## Key References
- Always refer to `.github/instructions/testing.instructions.md` for complete testing guidelines
- Use `src/test/helpers.ts` for shared testing utilities
- Follow t_wada's testing best practices

## Testing Patterns
- Use CVA-compliant class name testing (actual TailwindCSS classes)
- Handle jsdom limitations for keyboard navigation and portal components
- Test actual DOM structure, not assumed attributes
- Maintain proper setup/cleanup lifecycle

## AI Workflow
1. Use intermediate log files: `npm run test:ai-analyze`
2. Analyze failures with grep patterns
3. Fix based on actual DOM/CSS structure
4. Clean up intermediate files

## Common Issues
- Keyboard events don't trigger clicks in jsdom → test keydown events directly
- Icon components use `aria-hidden="true"` spans, not `data-icon` attributes
- CVA generates specific TailwindCSS classes → test actual class names
- Empty test files cause Vitest failures → include minimum test structure

Refer to `.github/instructions/testing.instructions.md` for complete details and examples.
