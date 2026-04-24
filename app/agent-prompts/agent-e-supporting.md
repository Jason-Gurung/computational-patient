# Agent E — Supporting Pages (How It Works + Impact)

> **FIRST:** Read `app/agent-prompts/_shared-preamble.md` and follow all instructions there before starting.

## Setup

```
cd app
npm run dev
```

Read these files for context (in addition to those listed in the shared preamble):
- `app/src/data/content/how-it-works.ts` — How It Works page content
- `app/src/data/content/impact.ts` — Impact page content
- `app/src/shared/design-tokens/colors.ts` — the Kurzgesagt colour palette
- `app/src/shared/design-tokens/animations.ts` — Framer Motion variants
- `app/src/shared/hooks/useScrollReveal.ts` — scroll-triggered animation hook

## What You're Building

Two **supporting pages** that explain the concept and show its impact. These are NOT throwaway text pages — they need visual wow factor to match the rest of the demo. They'll be shown during a screen recording walkthrough.

**Visual style: Kurzgesagt** — bold colours on dark backgrounds, animated visualizations, stylised.

## Your Territory

You ONLY write files inside `app/src/sections/supporting/`. Never touch files outside this folder.

The folder has two sub-sections:
- `app/src/sections/supporting/how-it-works/`
- `app/src/sections/supporting/impact/`

Import only from:
- `@/shared/components` — PageShell, SectionHeading, MetricsCard
- `@/shared/design-tokens` — colours, animations
- `@/shared/constants` — routes
- `@/data/content` — howItWorksContent, impactContent
- `@/lib/*` — utilities
- Third-party: `framer-motion`, `lucide-react`, `recharts`

## How It Works Page

`app/src/sections/supporting/how-it-works/index.tsx`

Components to build inside `how-it-works/components/`:

1. **ScaleStack** — The multi-scale biology visualization
   - Show the 5 scales: Molecular → Cellular → Tissue → Organ → Organism
   - Each scale as a card or layer with description and example
   - Animated reveal on scroll — stack builds up from molecular to organism
   - Use icons or abstract illustrations for each scale
   - Colour-coded with Kurzgesagt palette (different accent per scale)

2. **ValidationLoop** — The predict-test-learn cycle
   - 4-step circular or linear flow diagram
   - Steps: Predict → Test → Learn → Improve
   - Animated connections between steps
   - Use Framer Motion for step-by-step reveal

3. **DataFlywheel** — The compounding advantage visualization
   - Show Drug 1 → Drug 10 → Drug 50 progression
   - Each subsequent drug requires less calibration, makes better predictions
   - Could be a curved arrow/spiral getting tighter, or a timeline getting shorter
   - The key message: every drug makes the model better

## Impact Page

`app/src/sections/supporting/impact/index.tsx`

Components to build inside `impact/components/`:

1. **MetricComparison** — Before/after comparison cards
   - 5 comparisons (data in `impactContent.comparisons`)
   - Traditional vs Computational side-by-side
   - Animated counters / transitions
   - Clear visual contrast (muted traditional, vivid computational)

2. **CostTimeline** — Animated savings visualization
   - Show the timeline compression visually
   - Could be two parallel timelines or an animated transformation
   - 10-15 years → 6-9 years with cost savings

3. **MoatDiagram** — The competitive advantage visualization
   - 5 bullet points from `impactContent.moat.points`
   - Visualize as concentric rings, a fortress diagram, or layered shields
   - Each ring/layer represents one aspect of the moat
   - Emphasize: "Competitors start from zero; Pfizer starts from Drug 50"

4. **EfficiencySection** — Organisational efficiency message
   - "Same pipeline throughput with fewer people, greater output"
   - Don't shy away from the headcount reduction message — it's a feature
   - Simple but impactful visual treatment

## Quality Bar

- Both pages should feel like high-quality infographic/presentation slides
- Scroll-triggered animations throughout
- Dark backgrounds (#0B0E17), vivid Kurzgesagt accent colours
- Each section should be visually distinct but cohesive
- Optimise for screen recording at 1920x1080
