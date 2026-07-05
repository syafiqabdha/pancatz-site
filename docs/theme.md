# Pancatz Brand Theme (Astryx)

This project uses the Astryx Design System with a custom theme named `pancatz`.

## Colors
- **Primary / Accent**: Teal `#0a7f5a`
- **Secondary Accent**: Coral `#f97360` (can be used manually where needed)
- **Backgrounds**: 
  - Body: Paper `#f8f6f1` (light), `#1b1b1b` (dark)
  - Surface/Card: `#fffdf8` (light), `#262626` (dark)

## Typography
- **Body & Headings**: `DM Sans` (falls back to Inter)
- **Code**: `Roboto Mono`

## Usage
The theme is applied globally in `src/layouts/Layout.astro` via the `data-astryx-theme="pancatz"` attribute on the `<html>` tag.
Components from `@astryxdesign/core` will automatically pick up the theme tokens.

To rebuild the theme after modifying `src/styles/theme/pancatzTheme.ts`, run:
```bash
npm run astryx -- theme build src/styles/theme/pancatzTheme.ts
```
