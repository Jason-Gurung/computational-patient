# The Computational Patient — Reimagining Drug Development from First Principles

> **This is a vision pitch.** Not a product spec. Not a feasibility study. The question isn't "can we build this?" — it's "what becomes possible if we could?" The goal is to imagine what pharmaceutical development looks like if we start from a blank sheet with unlimited AI capability, and to present that vision through writing, a pitch deck, and mocked-up demo screens.

## What If We Could Test Every Drug on Every Human — Without Touching a Single Person?

Clinical trials are the most expensive, slowest, and most failure-prone process in the modern economy. It takes years and enormous capital to bring a single drug to market. Most candidates fail. The worst failures come last — a late-stage collapse costs years of effort and vast sums of money.

The fundamental problem: **we can't know how a drug will behave in a human body until we put it in a human body.**

This project explores a radical premise: **what if we could?**

Not incremental improvements to trial design. Not better statistics. A fundamentally different approach — building complete computational models of human biology detailed enough to simulate how any drug interacts with any patient. A digital replica of human physiology where drugs can be tested millions of times, across every possible patient profile, before a single real person is enrolled.

This doesn't replace human trials — it runs **before and alongside** them. A safety and intelligence layer that ensures no human is ever exposed to a drug the model flags as dangerous, and that every trial that does run is smaller, faster, and far more likely to succeed.

This is the vision for the **Computational Patient** — a future where Pfizer's deepest competitive advantage isn't its pipeline of molecules, but its model of humanity itself.

## Demo App

There's a hardcoded frontend demo in `app/`. It's a React app with no backend — everything is mocked data and pre-built visuals. To run it:

```
cd app
npm install
npm run dev
```

### The flow

1. **Landing page** (`/`) — intro with animated particles, key messages, call-to-action
2. **Trial Setup** (`/setup`) — configure a virtual trial: pick cohort size, disease, drug, patient mix. Only Heart/ATTR-CM/Vyndaqel is fully built out, the rest are selectable but lead to the same data.
3. **Population View** (`/trial`) — 10K virtual patients on a canvas grid, colour-coded by outcome. Play/pause to watch outcomes evolve over 52 weeks. 3 patients glow and are clickable.
4. **Body Explorer** (`/trial/patient/patient-001`) — the centrepiece. 3D models at 6 zoom levels: full body → chest → heart → tissue → cell → protein. Navigate via hotspots or breadcrumbs. Side panels show patient profile, narration, and metrics.
5. **Supporting pages** — How It Works (`/how-it-works`) and Impact (`/impact`) with scroll-animated infographics.

### What's not wired up yet

- The trial config from Setup doesn't fully carry through to Population View (cohort size does, but outcomes are the same regardless of disease/drug choice)
- Body Explorer time-progression models (responding/progressing variants) exist as .glb files but aren't loaded by the viewer yet — it shows the base state only
- Only 3 patients are clickable in the population grid (patient-001, -002, -003). The rest are visual filler.
- No mobile layout — designed for desktop/presentation screen recording

## Vision Documents

```
docs/
├── OVERVIEW.md                 The full concept — what, why, and how it changes everything
├── BIOLOGY-MODEL.md            How you actually model a human from molecules to organism
├── POPULATION-DIVERSITY.md     Generating virtual cohorts that represent real human variation
├── DISEASE-MODELS.md           How modeling differs across therapeutic areas
├── TRIAL-TRANSFORMATION.md     How this reshapes every phase of clinical development
├── DATA-FLYWHEEL.md            The compounding data advantage — every trial makes it better
├── REGULATORY-PATH.md          How regulators evolve to accept computational evidence
└── ETHICS.md                   The hard questions — bias, consent, rare populations

archive/
├── VISION-ORIGINAL.md          Original broader vision doc (Pfizer Brain + more)
└── DEMO-IDEAS.md               Earlier demo/mockup brainstorming
```

## The Core Argument

1. **Biology is computable.** Not today, not fully — but the trajectory is clear. Molecular dynamics, protein folding, cell signaling, organ physiology — each layer is becoming simulatable. The question isn't whether, it's when.

2. **Pfizer has the data no one else has.** Decades of clinical trial results, millions of patient outcomes, proprietary molecular libraries. This data is the training ground for models no startup or tech company can replicate.

3. **The model is a compounding asset.** Every drug developed makes it better. Every failure teaches it. Every success validates it. Drug 1 starts from general knowledge. Drug 50 predicts clinical outcomes from molecular structure alone.

4. **This doesn't replace trials — it makes them safer.** The computational layer runs before and alongside human trials. No human is exposed to a drug the model flags as dangerous. Trials that do run are smaller, faster, and higher-confidence.

5. **The organisation does more with less.** Smaller trials, shorter timelines, model-driven decisions — every efficiency compounds across the org. Fewer people, greater output.

The result: drugs developed dramatically faster, at a fraction of the cost, with significantly higher success rates. A leaner, faster organisation. And a growing competitive moat that deepens with every program.
