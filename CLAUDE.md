# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

**This is a vision pitch, not a product.** It is not meant to be built, scoped, or evaluated for feasibility. The entire point is to explore what *could be* if we rebuilt pharmaceutical development from first principles with unlimited AI capability — and to present that vision compellingly through writing and mocked-up demos.

The core idea: what if you could build complete computational models of human biology detailed enough to simulate how any drug interacts with any patient — running before and alongside human trials to make them safer, smaller, and faster?

**Key framing:**
- The Computational Patient does NOT replace human trials. It is a pre-trial safety and intelligence layer. Human trials still happen — they're just smaller, safer, and higher-confidence.
- The vision embraces organisational efficiency — doing more with fewer people. Don't shy away from headcount reduction as a benefit.

The deliverables are:
1. **Vision documents** — the written exploration of the concept (the `docs/` folder)
2. **A pitch deck / presentation** — to communicate the idea to stakeholders
3. **Mocked-up demo screens** — hardcoded frontend visuals that make the concept feel tangible and real, not functional backends

**Do not** treat this as a real product requiring PRDs, architecture specs, implementation readiness checks, or sprint planning. There is no "will this work?" — only "imagine if it did."

## Repository Structure

- `PROJECT-BRIEF.md` — **Read this first.** Full context for the project, key messages, demo concept, and scope. Hand this to any BMAD agent.
- `README.md` — The elevator pitch and repo overview
- `docs/OVERVIEW.md` — The full concept: what a Computational Patient is, what it enables, the compounding model advantage
- `docs/BIOLOGY-MODEL.md` — Multi-scale human simulation: molecular, cellular, tissue, organ, organism
- `docs/POPULATION-DIVERSITY.md` — Virtual cohort generation representing real human genetic/demographic variation
- `docs/DISEASE-MODELS.md` — Disease-specific modelling: oncology, rare disease, autoimmune, neurodegeneration, infectious
- `docs/TRIAL-TRANSFORMATION.md` — How each clinical trial phase changes (preclinical through post-approval)
- `docs/DATA-FLYWHEEL.md` — The compounding data advantage: every trial makes the model better
- `docs/REGULATORY-PATH.md` — Graduated path to regulatory acceptance of computational evidence
- `docs/ETHICS.md` — Bias, consent, rare populations, overconfidence, privacy
- `archive/` — Earlier broader vision docs (Pfizer Brain, demo ideas) preserved but not the current focus

## Writing Style

All docs use an ambitious, specific, non-hedging tone. The premise is "what if there were no limits" — present capabilities as achievable future states, not speculative maybes. Use concrete examples, numbers, and scenarios to make abstract concepts tangible.

## BMAD Usage

This project has the BMAD framework installed (`_bmad/`). Because this is a vision pitch — not a real product build — only certain BMAD skills apply:

**Use these:**
- Storytelling (Sophia) — narrative arc for the pitch
- Presentation Master (Caravaggio) — pitch deck creation
- Innovation Strategist (Victor) — stress-test and strengthen the vision
- Brainstorming Coach (Carson) — expand ideas, find new angles
- UX Designer (Sally) — design mock screens for the demo
- Developer (Amelia) — build hardcoded frontend mockups

**Do not use:**
- PRD creation/validation/editing — there is no product to spec
- Architecture — there is no system to design
- Epics, stories, sprint planning — there is nothing to implement for real
- Implementation readiness — not applicable
- Code review for production quality — mocks just need to look good

## Web Lookups

WebFetch and WebSearch are blocked by the corporate VPN. When any web lookup is needed — researching packages, checking docs, looking up APIs, or when the user asks to "look something up" — use the `agent-browser` skill instead. It runs a local headless browser that bypasses the network restrictions. For npm package metadata specifically, the registry API (`curl https://registry.npmjs.org/<pkg>`) also works from the terminal.
