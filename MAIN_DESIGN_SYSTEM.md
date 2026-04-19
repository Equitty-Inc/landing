# EQ Design System

This document codifies the current visual and interaction system in this project and turns it into a reusable blueprint you can apply in future applications.

It is based on the real implementation in:
- `src/styles/globals.css`
- `src/components/equity/DashboardShell.tsx`
- `src/components/equity/dashboard-shell.config.tsx`
- `src/components/header.tsx`
- `src/components/equity/PageAccentHeader.tsx`
- `src/components/ui/*`

---

## 1) Design Principles

### Core visual identity
- Dark-first interface with deep black foundation (`#08070e`).
- Accent-driven system where one active accent color controls glow, emphasis, and active states.
- Glassmorphism surfaces with subtle blur and low-opacity borders.
- Typography contrast: technical sans for body + display face for headings.
- Motion kept short and calm (`~200-350ms`) with soft easing.

### Product feeling
- "Trading terminal + institutional dashboard" mood.
- Saturation is controlled; bright accent is used primarily for semantic focus and interaction cues.
- Neon effects are present but restrained (low opacity, often radial/edge-based instead of full fills).

---

## 2) Technical Stack Conventions

- Framework: Next.js Pages Router.
- Styling: Tailwind CSS v4 + custom CSS layers in `globals.css`.
- Component primitives: custom + shadcn-inspired patterns.
- Icons: `lucide-react`.
- Variant system: `class-variance-authority` (`cva`) in `src/components/ui/button.tsx`.
- App shell wrapper: all pages render inside `DashboardShell` via `src/pages/_app.tsx`.

---

## 3) Foundations

## 3.1 Color Tokens (Current Source of Truth)

### Global palette
Defined in `:root` and mirrored in `.dark` inside `src/styles/globals.css`.

- Background: `--background: #08070e`
- Foreground: `--foreground: #F2EFEB`
- Primary / brand accent: `--primary: #00B4C4`
- Secondary: `--secondary: #4C8D99`
- Muted: `--muted: #306598`
- Muted foreground: `--muted-foreground: #D7CFC7`
- Card: `--card: #00346E`
- Border / input / ring aligned with dark-cyan family.

### Dynamic page accent tokens
- `--eq-page-accent` (HEX)
- `--eq-page-accent-rgb` (R, G, B string)

These two variables are runtime-updated by `DashboardShell` based on current route.

---

## 3.2 Typography

### Font families
- Body/UI: `Alexandria`
- Headings: `NewBlackTypeface`
- Numeric/financial readouts: tabular number setup via `.financial-figure` and `.financial-tabular`

### Typography roles
- Eyebrow labels: small uppercase with wide tracking (`tracking-[0.22em]`).
- Headings: display font, medium/high weight.
- Data-heavy lines (IDs, counters, compact metrics): monospaced or tabular numeric settings.

---

## 3.3 Shape, Radius, Spacing

- Primary card radius: `16px` (`.eq-card`, `.glass-surface`).
- Secondary panel radius: `12px` (`.glass-panel`).
- Micro cell radius: `8px` (`.glass-cell`).
- Core page rhythm:
  - Page wrapper: `.eq-page` => `space-y-6`
  - Standard card padding: `.eq-card` => `p-6`
  - Section separators: `.eq-section-line` pseudo-element

---

## 3.4 Elevation and Surface Hierarchy

### Surface levels
1. **Primary shell surfaces**
   - `.glass-surface`, `.glass-surface-elevated`, `.eq-card`
2. **Secondary embedded containers**
   - `.glass-panel`
3. **Tertiary utility cells**
   - `.glass-cell`

### Border + blur strategy
- Borders are mostly white with low alpha (`0.06 - 0.12`).
- Blur is used on larger containers, avoided in nested micro-cells for performance and clarity.

---

## 3.5 Motion

- Interaction transitions usually `duration-200` or `duration-300`.
- Page transitions: `.eq-page-transition` (`0.22s ease-out`).
- Hover effects should enhance contrast/glow, not move layout.
- Sidebar width/margin transitions are synchronized to avoid content jumps.

---

## 4) Component Patterns

## 4.1 Page Composition

### Required shell pattern
- Every page is wrapped by `DashboardShell` globally in `_app.tsx`.
- Inside each page:
  - top-level container: `.eq-page`
  - sections in `.eq-card`
  - use `PageAccentHeader` for route-aware hero/header blocks

### Header pattern
- `PageAccentHeader` resolves accent from route (`getPageAccentColor`) unless overridden.
- Uses `glass-hover` with `--glass-accent-rgb` for localized adaptive glow.

---

## 4.2 Inputs

Use `.eq-input` for all text/select/textarea controls:
- Background: `rgba(255,255,255,0.05)`
- Border: `rgba(255,255,255,0.10)`
- Focus border: turquoise-family accent
- Focus halo: low-opacity glow (`0 0 0 3px rgba(0,180,196,0.08)`)

Guideline: labels above field, no floating-label pattern.

---

## 4.3 Buttons

### Primary CTA (`.eq-cta`)
- Pill shape (`rounded-full`), solid accent, bold text.
- Usually includes trailing arrow (`->` / `→`) as directional affordance.
- Most saturated control in its local block.

### Secondary CTA (`.eq-btn-outline`)
- Quiet outline with low-contrast hover fill.
- Should never outshine primary CTA.

### Reusable wrappers
- `EquittyPrimary`: larger branded CTA wrapper over base `Button`.
- `EquittyGhost`: transparent/outline action with accent text and minimal lift.

---

## 4.4 Status and Data Components

### StatusBadge
- Variant-based semantic badges (`info`, `success`, `warning`, `error`, etc.).
- Accent badge variants use `eq-accent-shadow-soft` to stay within dynamic accent system.

### FinancialFigure
- Centralized formatting for currency/percent/raw.
- Delta semantics:
  - positive: green (`#00C896`)
  - negative: red (`#FF4D6A`)
  - neutral: muted white alpha
- Uses tabular numeric styling for stable metric scanning.

---

## 5) Adaptive Accent System (Global)

This is the most important reusable mechanism in the codebase.

## 5.1 Route -> Accent mapping

Defined in `src/components/equity/dashboard-shell.config.tsx`:
- `DASHBOARD_NAV` assigns each route family a `color`.
- `getPageAccentColor(pathname)` resolves current color.
- Nested routes normalize to parent groups (`/marketplace/[id]` -> `/marketplace`, etc.).

## 5.2 Runtime variable injection

In `DashboardShell`:
- resolved HEX from `getPageAccentColor(pathname)`
- converted to RGB string through `hexToRgbString(...)`
- written to root CSS variables:
  - `--eq-page-accent`
  - `--eq-page-accent-rgb`

That makes every component route-aware without prop drilling.

## 5.3 Consumption

Components use these tokens for:
- text: `.eq-accent-text`
- fills: `.eq-accent-fill`
- borders: `.eq-accent-border`
- shadows/glows: `.eq-accent-shadow-*`, `.eq-accent-drop-shadow`
- glass hover tint via `--glass-accent-rgb`

Fallback is turquoise when accent is missing/invalid.

---

## 6) Sidebar Adaptive Color System (Detailed)

The aside bar in `DashboardShell` is a full state + accent engine. This section explains exactly how it works so you can clone it across apps.

## 6.1 Sidebar modes and geometry

State model:
- `auto`: collapsed to icon rail; expands on hover
- `pinned`: fully expanded
- `hidden`: near-zero width with only indicator

Width constants:
- full: `210px`
- icon rail: `56px`
- hidden rail: `20px`

Persisted preference:
- localStorage key: `eq-sidebar-mode`

## 6.2 Expansion logic

- `isExpanded = sidebarMode === "pinned" || hovered`
- Hover controls expansion only in non-pinned modes.
- Main content margin is based on mode (not hover), preventing layout jumps while hovering.

## 6.3 Accent source for sidebar visuals

The sidebar color comes from two values:
- `activePageAccent` (hex)
- `activePageAccentRgb` (string: `"r, g, b"`)

These are derived from the current pathname and route mapping config.

## 6.4 Color-changing pieces inside the aside

### A) Panel frame (expanded state)
When expanded:
- border-right: `1px solid rgba(activeAccentRgb, 0.10)`
- shadow: `6px 0 48px -8px rgba(activeAccentRgb, 0.14)`

Result: subtle hue shift that matches active section.

### B) Always-visible neon edge strip
A 1px vertical gradient on the left edge:
- uses multiple alpha stops from transparent to strong accent center.
- communicates active context even in collapsed modes.

### C) Ambient glow strip (collapsed emphasis)
A narrow `w-4` gradient behind the edge strip:
- visible when collapsed
- fades out when expanded

This avoids over-bright expanded mode while still giving collapsed-mode discoverability.

### D) Hidden mode indicator
In `hidden` + not hovered:
- active route dot with `activeNavItem.color`
- matching icon tint + drop-shadow

This keeps wayfinding even when the full nav is concealed.

### E) Active nav row styling
For active link:
- row background with very low alpha tint (`${item.color}12`)
- icon text color = `item.color`
- icon drop-shadow with accent alpha
- expanded mode: left bar accent indicator
- collapsed mode: bottom dot indicator

This dual indicator design preserves legibility in both compact and expanded layouts.

### F) Brand block and separators
- logo container border/background/shadow use active accent RGB
- separators are gradient lines tinted with active accent

Together they make the whole aside feel route-aware, not just the selected menu item.

## 6.5 Why the color adaptation feels stable

Key decisions that prevent visual noise:
- Mostly alpha overlays, not full-color fills.
- Accent concentrated on thin edges, glows, and active markers.
- Background remains dark-neutral, so switching sections does not re-theme entire layout.
- Same accent variables reused globally (header, cards, badges, charts), creating coherence.

## 6.6 Portable implementation recipe (copy to any app)

1. Create route/color registry:
   - `NAV_ITEMS = [{ href, color, ... }]`
2. Implement `getPageAccentColor(pathname)` with parent-route fallback.
3. Convert hex -> rgb string helper.
4. On route change, update root CSS vars:
   - `--app-page-accent`
   - `--app-page-accent-rgb`
5. Sidebar styles should consume only these vars:
   - borders/shadows/gradients/markers
6. Keep dark base fixed; apply accent through alpha.
7. Add hidden/collapsed indicators to preserve navigation context.

---

## 7) Accessibility and UX Rules

- Preserve sufficient contrast against dark background; avoid low-opacity text for critical information.
- Icons should not be sole state indicators; pair with shape, position, or label where possible.
- Focus styles must remain visible on dark/glass surfaces.
- Respect reduced motion preferences in future refinements for animated effects (`ping`, transitions, glows).

---

## 8) Reuse Across Future Projects (Practical Blueprint)

## 8.1 What to keep as-is
- Dark base + restrained accent overlays.
- Runtime accent variable system (`HEX + RGB` pair).
- Three-layer surface hierarchy (`card` / `panel` / `cell`).
- Pill primary CTA + quiet secondary outline.
- Tabular numeric utility for financial or KPI screens.

## 8.2 What to parameterize per project
- Route registry labels and colors.
- Base accent fallback.
- Typography pair (if brand changes).
- Border alpha and glow intensity scale.
- Sidebar width constants and mode defaults.

## 8.3 Suggested token contract for new apps

At minimum, keep:
- `--background`
- `--foreground`
- `--primary`
- `--muted-foreground`
- `--eq-page-accent`
- `--eq-page-accent-rgb`
- `--border`
- `--ring`

If these exist, most of the component patterns in this system can be ported with little rewrite.

---

## 9) Implementation Checklist

Use this when bootstrapping another app:

- [ ] Add base tokens and dark defaults in global CSS.
- [ ] Implement route -> accent resolver.
- [ ] Set root accent variables on route change.
- [ ] Add core utility classes (`eq-page`, `eq-card`, `eq-input`, `eq-cta`, `eq-btn-outline`).
- [ ] Add accent utility classes (`eq-accent-*`, `glass-hover`).
- [ ] Build sidebar with `auto/pinned/hidden` modes.
- [ ] Add hidden-mode active indicator.
- [ ] Route all pages through a shared shell wrapper.
- [ ] Verify contrast and focus rings in dark mode.
- [ ] Tune alpha values before increasing saturation.

---

## 10) Current Known Inconsistencies (Optional Cleanup Targets)

- The Tailwind config uses `hsl(var(--token) / <alpha-value>)` while most tokens are set as hex values in CSS. It still works in this project due to direct utility/style usage, but harmonizing token formats would improve predictability.
- There is intentional overlap between custom button wrappers (`EquittyPrimary`, `EquittyGhost`) and utility classes (`eq-cta`, `eq-btn-outline`). Consider consolidating if you want a stricter design-system API.

---

This file is intended to be the canonical design-system reference for EQ and a direct template for future projects with adaptive accent navigation.
