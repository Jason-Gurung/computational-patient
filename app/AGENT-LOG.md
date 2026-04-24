# Agent Communication Log

**READ THIS BEFORE STARTING WORK. WRITE TO THIS AFTER COMPLETING EACH COMPONENT.**

This file is the shared communication channel between all agents working on this project. Every agent must:

1. **Read this entire file** before starting any work
2. **Write a timestamped entry** after completing each component
3. **Check this file periodically** during work (before starting each new component) to see if another agent has posted something relevant

## How to Write Entries

Add your entry at the TOP of the "Log Entries" section (newest first). Format:

```
### [Agent X] Component Name — YYYY-MM-DD HH:MM
Status: completed | in-progress | blocked | needs-review
What I built: brief description
What I exported/shared: any reusable patterns or decisions
Dependencies: anything I need from another agent
Notes for other agents: anything they should know
```

## Style Conventions File

**IMPORTANT:** Read `app/STYLE-CONVENTIONS.md` before building anything. It defines shared patterns (card styles, spacing, animations, hover states) that ALL agents must follow so the site feels cohesive.

## Model Availability

Blender Agent (F) will update this section when models are exported:

| Model | File | Status |
|-------|------|--------|
| Full Body | `public/assets/models/custom/full-body.glb` | not started |
| Heart Anatomical | `public/assets/models/custom/heart-anatomical.glb` | not started |
| Heart Organ | `public/assets/models/custom/heart-organ.glb` | not started |
| Heart Tissue | `public/assets/models/custom/heart-tissue.glb` | not started |
| Heart Cellular | `public/assets/models/custom/heart-cellular.glb` | not started |
| Heart Micro | `public/assets/models/custom/heart-micro.glb` | not started |

Agent D (Body Explorer): check this table before defaulting to placeholders. If a model shows "ready", load the .glb instead.

---

## Log Entries

### [Foundation] Phase 0 Complete — 2026-04-24
Status: completed
What I built: Full project scaffold, all shared types, constants, design tokens, mock data, shared components, routing, placeholder section pages.
What I exported/shared:
- Shared components: PageShell, SectionHeading, NavBar, NarrationPanel, MetricsCard, TimeControls, FilterBar
- Shared hooks: useSimulationTime
- Shared hook to add: useScrollReveal (see STYLE-CONVENTIONS.md)
- All mock data ready in @/data/
- All types in @/shared/types/
- Kurzgesagt palette in @/shared/design-tokens/colors.ts
- Framer Motion variants in @/shared/design-tokens/animations.ts
Notes for other agents: Read STYLE-CONVENTIONS.md for shared patterns. Use the shared components rather than building your own versions.
