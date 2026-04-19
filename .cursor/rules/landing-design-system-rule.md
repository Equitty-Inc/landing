# Cursor Rule: Landing Design System

This markdown mirrors the intended Cursor rule content for landing-page work.

## Recommended rule frontmatter (for `.mdc`)

```yaml
---
description: Apply EQUITTY landing design and compliance standards for landing-page work.
globs: app/[locale]/**/*.{ts,tsx}
alwaysApply: false
---
```

## Rule content

### Scope

- Landing and pre-launch pages must follow `.cursor/LANDING_DESIGN_SYSTEM.md`.
- Keep styling aligned with current waitlist visual language (dark base, turquoise accent, glass/neon motifs).
- Reuse existing shared shell and tokens before introducing new UI primitives.

### Required implementation standards

- Use `app/globals.css` tokens and semantic classes before adding literal hex colors.
- Keep one H1 per page and preserve semantic heading hierarchy.
- Prefer reusable sections/components in `components/landing` over page-local duplication.
- Keep copy in message dictionaries; avoid hardcoded long-form copy in component markup.
- Ensure all CTA labels and marketing copy remain compliance-safe and future-tense.

### Compliance copy guardrails

- Do not use "Join waitlist", "Invest now", "Start investing", "Get early access", or return projections.
- Use newsletter-oriented language: "Follow Our Progress", "Subscribe for Updates".
- Keep DASP status phrasing explicit: application pending.
- Keep investment access phrasing explicit: qualified investors first at launch.

### Data-flow and form guardrails

- Newsletter capture must not reuse waitlist wording in UI labels.
- Newsletter form fields should match the approved content model (name, email, segmented interest).
- Avoid adding nationality to newsletter unless explicitly required by legal/product.

### Done criteria for landing changes

- Visual consistency with waitlist shell and token system.
- Copy passes phrase-guide constraints from the proposal.
- Mobile and desktop layouts remain readable and balanced.
- Lint and type checks pass before handoff.

