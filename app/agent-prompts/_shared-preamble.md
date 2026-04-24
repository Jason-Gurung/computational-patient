# Shared Instructions for All Agents

**READ THESE FILES BEFORE DOING ANYTHING ELSE:**

1. `CLAUDE.md` — project-level rules and constraints
2. `PROJECT-BRIEF.md` — what this project is and why
3. `app/STYLE-CONVENTIONS.md` — **CRITICAL** — shared visual patterns (card styles, spacing, animations, hover states, typography, colours). Follow these exactly so the site feels cohesive.
4. `app/AGENT-LOG.md` — the shared communication log between agents

## Coordination Protocol

You are one of several agents working on this project in parallel. To keep things cohesive:

### Before starting each component:
1. Read `app/AGENT-LOG.md` to see what other agents have posted
2. Check if anyone has shared patterns or decisions that affect your work
3. Check the Model Availability table if you need 3D models

### After completing each component:
1. Add a timestamped entry to `app/AGENT-LOG.md` (at the TOP of the "Log Entries" section)
2. Note what you built, any shared patterns you established, and anything other agents should know
3. If you created a reusable pattern that isn't in STYLE-CONVENTIONS.md, mention it in your log entry

### Architecture Rules:
- You ONLY write files inside your designated `src/sections/` folder
- Import only from `@/shared/`, `@/data/`, `@/lib/`, and installed packages
- **NEVER import from another section's folder**
- Use shared components from `@/shared/components` rather than rebuilding them
- Use shared hooks (`useScrollReveal`, `useSimulationTime`) from `@/shared/hooks`
- Use shared animation variants from `@/shared/design-tokens` — do NOT create custom ones
- Follow `STYLE-CONVENTIONS.md` for all visual patterns

### If you need something from shared:
- If you need a shared component that doesn't exist, DON'T create it in your section. Note it in AGENT-LOG.md so it can be added to shared.
- If you need new mock data, note it in AGENT-LOG.md.
