# project-ops

## Purpose
Run the repository workflows that matter for day-to-day Codex work: development, unit tests, and QA.

## When To Use
- The user asks to start development mode.
- The user asks to run unit tests.
- The user asks to perform QA or validate the repo.
- A code change needs a standard verification pass.

## Commands

### Development
- Command: `pnpm.cmd dev`
- Use when editing UI, routes, forms, or application behavior.

### Unit Tests
- Command: `pnpm.cmd test:unit`
- Use when validating schemas, helpers, and other deterministic logic.

### QA
- Command: `pnpm.cmd qa`
- This runs lint, typecheck, and unit tests as one gate.

## Notes
- On Windows PowerShell in this workspace, prefer `pnpm.cmd` over `pnpm` to avoid execution policy failures.
- If a task only touches one narrow unit, run the focused command first and `pnpm.cmd qa` before final handoff when practical.
