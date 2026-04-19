# EQUITTY Unified Design System

This is the single global design system for EQUITTY across both public landing surfaces and product/application surfaces. It preserves compliance-first communication while adding shared technical mechanics for scalable UI consistency.

## 1) Design Principles

- Compliance-first messaging over conversion-first messaging.
- Trust and institutional credibility over promotional tone.
- Clarity and hierarchy over visual noise.
- Reusable architecture over one-off page blocks.
- Token-driven styling over raw color literals whenever possible.
- Accent should guide context and interaction, never overwhelm the dark base.

## 2) Brand Voice and Copy System

### Core voice

- Professional, transparent, and future-tense.
- Informational, not transactional.
- Confidence without guaranteed outcomes.

### Mandatory phrasing constraints

- Use: "Follow Our Progress", "Subscribe for Updates", "in development", "application pending".
- Avoid: "Join the waitlist", "Invest now", "Get early access", return projections, or any language implying active investment enrollment.
- Use future-state framing for product claims: "is being built", "is designed to", "planned for".

## 3) Color and Token System

Use existing tokens defined in `app/globals.css` and avoid standalone hex values unless creating or extending a token.

### 3.1 Primary semantic tokens

- Background: `bg-background` (`--background`)
- Foreground text: `text-foreground` (`--foreground`)
- Accent: `text-accent`, `bg-accent`, `border-accent` (`--accent`)
- Border/input/ring: `border-border`, `bg-input`, `ring-ring`

### 3.2 Brand-support tokens

- Turquoise: `--turquoise`
- Primary blue: `--primary-blue`
- Dark blue: `--dark-blue`
- Warm white: `--warm-white`
- Secondary palette: `--secondary-*`

### 3.3 Accent token contract (global)

The route-aware accent engine is global and must work for landing and app surfaces.

- `--eq-page-accent` (hex value)
- `--eq-page-accent-rgb` (`r, g, b` string)

Rules:

- Resolve accent from current route group using a central route-to-accent registry.
- Update root CSS variables on route change.
- Keep dark base stable; use accent primarily via text, border, glow, and low-alpha overlays.
- No sidebar-specific behaviors are required in this system.

### 3.4 Top navigation accent behavior

Route accent must be visibly represented in top navigation through:

- active link color tint
- thin accent indicators (underline/bar/dot)
- low-intensity accent glow for active nav region
- restrained alpha overlays, not full background recolors

## 4) Typography System

### 4.1 Base typography

- Primary body font: Alexandria.
- Display/accent font: New Black for high-impact headings only.
- Heading hierarchy:
  - H1: page-defining statement, one per page.
  - H2: section-level narrative blocks.
  - H3: card/group headings.
- Body copy:
  - default line-height relaxed
  - constrained width for long paragraphs

### 4.2 Numeric and financial typography

Use explicit numeric presentation rules wherever metrics, funding values, percentages, or KPI-like readouts appear.

- Prefer tabular numerals for aligned scanning.
- Define and reuse utility classes for numeric readability (for example: `financial-figure`, `financial-tabular`).
- Use consistent visual semantics for positive, negative, and neutral deltas.
- Keep number formatting centralized (currency, percent, raw) in shared utilities/helpers when possible.

## 5) Layout and Spacing

- Use centered max-width containers aligned to current landing shell rhythm.
- Keep section rhythm consistent with clear vertical breathing space.
- Preserve recognizable EQUITTY chrome motifs (dark base + neon/accent separators) while avoiding over-decoration.
- Responsive behavior:
  - stack on mobile
  - switch to 2-column comparative layouts on desktop where needed

## 6) Component Patterns

### Shared shell

- Reuse shared header/footer patterns and keep language switcher placement consistent where present.
- Navigation must support multi-route architecture and active-state accents.

### Hero sections

- One H1, one supporting paragraph, one or two CTAs max.
- Keep atmosphere subtle and performance-aware.

### Status and trust elements

- Use compact strips/cards with concise, compliance-safe labels.
- Keep legal-critical statements visible near top-of-page where relevant.

### Cards and grids

- Team/board/advisor cards should follow one anatomy:
  - media/avatar
  - name/title
  - concise bio
  - credibility signal

### Process flows

- Use explicit step labels and directional sequence.
- Place caveats close to forward-looking feature claims.

### Forms (newsletter and related capture)

- Use shared form primitives and interaction states.
- Newsletter fields: first name, email, segmented interest checkboxes.
- Do not add nationality to newsletter unless explicitly approved by product/legal.
- Keep success/error states explicit and compliance-safe.

## 7) Interaction and Motion

- Use motion to support comprehension, not decoration.
- Standard transition range: 200ms to 350ms.
- Reuse existing keyframes/utilities from `app/globals.css` when possible.
- Preserve visible keyboard focus styles for all interactive controls.

## 8) Accessibility and UX Rules

- One H1 per page.
- Semantic landmarks and heading order must be valid.
- Interactive elements need clear labels and purpose text.
- Form controls require associated labels and error descriptions.
- Ensure sufficient color contrast on dark surfaces.
- Do not rely on color alone for critical state communication.

## 9) Content Architecture Rules

- Build pages as reusable sections rather than ad hoc layouts.
- Keep copy in message dictionaries, not large hardcoded JSX blocks.
- Separate legal/compliance copy from marketing narrative to improve auditability.

## 10) Technical System Conventions

- Continue using Next.js app router under `app/[locale]`.
- Keep presentational UI in shared component folders and avoid logic-heavy page markup.
- Keep schemas and server actions strongly typed.
- Reuse design tokens and established primitives before adding new abstractions.
- Prefer a route-accent registry + CSS variable update utility over component-level accent prop drilling.

## 11) QA and Review Gate

Every design-system-aligned change must pass:

- copy compliance review against forbidden/allowed phrase guide
- responsive review (mobile/tablet/desktop)
- accessibility sanity checks (forms, nav, focus, heading structure)
- technical checks: lint, typecheck, unit tests, QA aggregate command

