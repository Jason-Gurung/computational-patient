# Agent B — Trial Setup Page

> **FIRST:** Read `app/agent-prompts/_shared-preamble.md` and follow all instructions there before starting.

## Setup

```
cd app
npm run dev
```

Read these files for context (in addition to those listed in the shared preamble):
- `app/src/shared/constants/diseases.ts` — all 8 disease definitions
- `app/src/shared/constants/drugs.ts` — all 8 drug definitions
- `app/src/data/trial/default-config.ts` — default trial config values
- `app/src/shared/types/trial.ts` — TrialConfig type
- `app/src/shared/design-tokens/colors.ts` — the Kurzgesagt colour palette

## What You're Building

The **trial setup page** where users configure a virtual clinical trial before it runs. This is the screen between the landing page and the population view. It should feel like configuring a sophisticated simulation — impressive but approachable.

**Visual style: Kurzgesagt** — bold colours on dark backgrounds, stylised, friendly but scientific.

## Your Territory

You ONLY write files inside `app/src/sections/trial-setup/`. Never touch files outside this folder.

Import only from:
- `@/shared/components` — PageShell, SectionHeading, etc.
- `@/shared/design-tokens` — colours, animations
- `@/shared/constants` — diseases, drugs, routes
- `@/shared/types` — TrialConfig, DiseaseDefinition, DrugDefinition
- `@/data/trial` — default config
- `@/lib/*` — utilities
- Third-party: `framer-motion`, `lucide-react`, `react-router-dom`
- shadcn components from `@/components/ui/*` (Button, Slider, etc.) — add new ones with `npx shadcn@latest add <component>` if needed

## Components to Build

Inside `app/src/sections/trial-setup/`:

1. **CohortSizeSelector** — Slider from 100 to 100,000 patients
   - Visual display of the number, formatted with commas
   - Maybe a subtle icon grid that scales with the number

2. **RealSyntheticRatio** — Slider showing % real patient models vs generated/synthetic
   - Visual split indicator (e.g., a bar showing the ratio)
   - Labels: "Real Patient Models" vs "Generated Models"

3. **DiseaseSelector** — Pick from available diseases
   - Cards or a visual picker showing all 8 diseases from `DISEASES` constant
   - Each card shows: disease short name, body region, Pfizer brand
   - Highlight the selected one (default: ATTR-CM)

4. **DrugSelector** — Automatically linked to disease selection
   - Shows the matched drug for the selected disease
   - Brand name, generic name, mechanism of action

5. **PlacementOptions** — Disease placement on the body
   - Only relevant for diseases where `canVaryPlacement` is true
   - Show "Uniform" vs "Varied" toggle
   - Brief explanation of what this means

6. **ComorbidityPanel** — Mocked toggles
   - Show a few comorbidity options (hypertension, diabetes, etc.)
   - Toggles exist in the UI but are non-functional
   - Label: "Coming soon" or similar subtle indicator

7. **TrialSummaryCard** — Live summary sidebar or bottom card
   - Shows all selected parameters at a glance
   - Updates as user changes settings

8. **LaunchButton** — "Run Virtual Trial" CTA
   - Navigates to `/trial`
   - Should feel satisfying — maybe a pulsing glow or animation

## Page Layout

Two-column layout works well: controls on the left, summary on the right. Or a stepped wizard. Your call — make it look good.

## Important Notes

- This is all hardcoded — the selections don't actually affect anything downstream (yet). The population view will show the same data regardless. But the UI should feel interactive and real.
- Default to ATTR-CM / Vyndaqel / 10,000 patients as pre-selected values
- The disease and drug data is already in `@/shared/constants`
