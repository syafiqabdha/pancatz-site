# Contributing to Pancatz Site

Welcome! If you are a developer or an AI Agent assisting with the development of `pancatz-site`, please follow these guidelines.

## Astryx Design System

We use **Astryx** as our primary design system and component library, overriding the previous raw Tailwind CSS workflow. 

### Core Rules for AI Agents

1. **Use Astryx Components:** 
   Whenever you need to build UI, *do not* construct raw HTML elements with Tailwind classes (e.g. `<div class="bg-white rounded-xl shadow-md p-4">`). 
   Instead, use the Astryx layout primitives and components: `<Card padding={4}>`, `<Button variant="primary">`, `<Badge>`, etc.

2. **Component Discovery:**
   To explore available components or discover how to use them, utilize the Astryx CLI:
   ```bash
   npm run astryx -- component list
   npm run astryx -- component Button
   ```
   If a component is missing, you can add new components or explore external templates using the CLI.

3. **Avoid Hardcoded Colors:**
   The `pancatz` theme handles color tokens. Never hardcode colors like `bg-[#0a7f5a]`. Rely on variants (e.g., `variant="primary"` for teal, `variant="accent"` for coral) built into the theme components.

4. **Theming:**
   If you need to adjust design tokens, spacing, or typography, edit `src/styles/theme/pancatzTheme.ts` and then rebuild the theme:
   ```bash
   npm run astryx -- theme build src/styles/theme/pancatzTheme.ts
   ```

5. **Astro Integration:**
   Our Astryx components are standard React components. Since we use Astro, remember to append client directives like `client:load` or `client:idle` if the component requires browser interactivity (e.g., Modals, Menus). Pure presentation components like `Button` (as links) or `Card` can be rendered entirely statically on the server.

Thank you for contributing to Pancatz!
