# Agent C — Population Trial View

> **FIRST:** Read `app/agent-prompts/_shared-preamble.md` and follow all instructions there before starting.

## Setup

```
cd app
npm run dev
```

Read these files for context (in addition to those listed in the shared preamble):
- `app/src/data/population/grid-patients.ts` — 10,000 patient grid data
- `app/src/data/population/outcome-timeseries.ts` — metrics over time
- `app/src/shared/types/population.ts` — PopulationPatient, PatientOutcome types
- `app/src/shared/constants/outcomes.ts` — outcome labels and colours
- `app/src/shared/hooks/useSimulationTime.ts` — time simulation hook
- `app/src/shared/components/index.ts` — TimeControls, FilterBar, MetricsCard

## What You're Building

The **population trial view** — a dashboard showing 10,000 virtual patients in a running clinical trial. Users see outcomes evolving over time and can click individual patients to explore their body in detail.

This is the bridge between "configure a trial" and "dive into one patient." It should feel like watching a massive simulation unfold.

**Visual style: Kurzgesagt** — bold colours on dark backgrounds, vivid outcome colour-coding.

## Your Territory

You ONLY write files inside `app/src/sections/population/`. Never touch files outside this folder.

Import only from:
- `@/shared/components` — TimeControls, FilterBar, MetricsCard, PageShell
- `@/shared/design-tokens` — colours
- `@/shared/constants` — outcomes (labels, colours), routes
- `@/shared/hooks` — useSimulationTime
- `@/shared/types` — PopulationPatient, PatientOutcome, TrialMetrics
- `@/data/population` — gridPatients, outcomeTimeseries, CLICKABLE_PATIENT_IDS
- `@/lib/*` — format utilities
- Third-party: `framer-motion`, `recharts`, `react-router-dom`, `lucide-react`

## Components to Build

Inside `app/src/sections/population/`:

1. **PatientGrid** — THE BIG ONE. 10,000 patient icons in a grid.
   - **MUST use HTML5 Canvas or similar** — 10K DOM elements will kill performance
   - Each patient is a small coloured dot/icon based on their outcome
   - Colour-coding from `OUTCOME_COLORS`: green (responding), blue (stable), pink (adverse), orange (non-responding), yellow (milestone), grey (withdrawn)
   - 3 patients are clickable (ids in `CLICKABLE_PATIENT_IDS`) — show them slightly larger or with a glow/ring
   - On click of a clickable patient, navigate to `/trial/patient/{linkedPatientId}`
   - Outcomes change as simulated time progresses (use `outcomeHistory`)

2. **OutcomeMetrics** — Key metrics panel
   - Response rate, adverse event rate, completion rate, milestone count
   - Values update as time progresses (data in `outcomeTimeseries`)
   - Use the shared `MetricsCard` or build custom metric displays
   - Animated number transitions

3. **OutcomeFilters** — Filter the grid by outcome type
   - Use the shared `FilterBar` component
   - When filtering, non-matching patients dim or hide on the grid
   - Show counts per filter

4. **TimelineBar** — Time controls for the simulation
   - Use the shared `TimeControls` component
   - Wire it to `useSimulationTime` hook
   - As time advances, grid colours update and metrics change

5. **PopulationSummaryChart** — Recharts visualisation
   - Area or stacked line chart showing outcome distribution over time
   - X-axis: weeks (0-52)
   - Y-axis: percentage or count
   - Colour-coded by outcome type

6. **PatientTooltip** — Hover/click info for clickable patients
   - Shows patient name, key stats
   - "Click to explore" prompt
   - Only appears on the 3 clickable patients

## Page Layout

Suggested layout:
- Top: TimelineBar (full width)
- Left: PatientGrid (the star — takes most space)
- Right sidebar: OutcomeMetrics + OutcomeFilters
- Bottom: PopulationSummaryChart

## Critical Performance Note

The grid MUST NOT create 10,000 DOM elements. Use:
- `<canvas>` with 2D context — draw coloured rectangles/circles
- Track mouse position for hit detection on the 3 clickable patients
- Redraw on time change (outcome colours update)

A 100x100 grid of small squares on canvas is very performant. Each square is maybe 6-8px with 1px gaps.
