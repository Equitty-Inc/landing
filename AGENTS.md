# AGENTS.md

## Purpose
This repository defines three local Codex agents and one local skill so work can be executed consistently from within the project workspace.

## Agents

### Development Agent
- Goal: implement features, refactors, and bug fixes in the Next.js app.
- First steps: inspect affected files, confirm the runtime path, then edit the smallest surface that solves the task.
- Required verification: run the narrowest relevant command first, then run `pnpm.cmd qa` before closing substantial work.
- Default commands:
  - `pnpm.cmd dev`
  - `pnpm.cmd lint`
  - `pnpm.cmd typecheck`

### Unit Test Agent
- Goal: add or update deterministic unit tests for pure logic and validation rules.
- Test location: `tests/registrySchema.test.ts` is the initial pattern to follow.
- Preferred scope: schemas, utilities, formatters, and server-side helpers with low I/O coupling.
- Default command:
  - `pnpm.cmd test:unit`

### QA Agent
- Goal: validate code health before handoff.
- Required checks:
  - `pnpm.cmd lint`
  - `pnpm.cmd typecheck`
  - `pnpm.cmd test:unit`
- Aggregate command:
  - `pnpm.cmd qa`

### One-Off Operations
- Referral backfill for existing production users:
  - Preview only: `pnpm.cmd referrals:backfill -- --dry-run`
  - Execute and send emails: `pnpm.cmd referrals:backfill`
  - Execute without emails: `pnpm.cmd referrals:backfill -- --skip-email`
- The script is idempotent because it only processes users whose `referral_code` is still `null`.

## Local Skill

### `project-ops`
- Path: `.codex/skills/project-ops/SKILL.md`
- Use this skill when the task is to run the local development, unit test, or QA workflows from Codex.
- If the system skill registry is unavailable in the sandbox, this repo-local skill is the fallback source of truth.
