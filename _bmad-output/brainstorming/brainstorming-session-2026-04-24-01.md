---
stepsCompleted: [1]
inputDocuments: [PROJECT-BRIEF.md]
session_topic: 'Demo app architecture, visual direction, and scope clarification for Computational Patient mockup'
session_goals: 'Clarify all ambiguities before mockup development begins'
selected_approach: 'Guided Q&A clarification'
techniques_used: [structured-questioning]
ideas_generated: []
context_file: 'PROJECT-BRIEF.md'
---

# Brainstorming Session — Demo Clarification

**Date:** 2026-04-24
**Facilitator:** Claude
**Participant:** Jason

## Session Overview

**Topic:** Clarifying all open questions about the Computational Patient demo before mockup development begins.
**Goals:** Resolve visual direction, scope, navigation model, technical approach, and architecture decisions.

## Key Decisions

### 1. Visual Direction — Kurzgesagt Style
- Vector-based art style inspired by the YouTube channel Kurzgesagt
- Bold, colourful, stylised — not hyper-realistic
- Applies to 2D UI elements AND 3D Blender models
- For 3D: emulate the Kurzgesagt feel with stylised/low-poly models, bright colours, smooth shapes
- Dark backgrounds with vivid, friendly-but-scientific aesthetic

### 2. Region Priority — Follow Pfizer's Drug Portfolio
Map real Pfizer brands → diseases → body regions → build those paths first.

| Brand | Disease | Body Region |
|-------|---------|-------------|
| Vyndaqel | ATTR cardiomyopathy | Heart |
| Ibrance | HR+/HER2- breast cancer | Breast |
| Xtandi | Prostate cancer | Prostate |
| Xeljanz | Rheumatoid arthritis / UC | Joints / GI |
| Lorbrena | ALK+ NSCLC | Lungs |
| Eliquis | Blood clots / stroke | Cardiovascular |
| Sutent | Renal cell carcinoma | Kidneys |
| Prevnar/Comirnaty | Vaccines | Immune / lungs |
| Bosulif | CML | Blood / bone marrow |

**Top 3 priority paths:** Heart (Vyndaqel), Lungs (Lorbrena), Joints (Xeljanz)

### 3. App Flow — Refined Structure

The demo is NOT "land on the body explorer immediately." There's a trial setup flow first:

1. **Landing Page** — Sets up the concept, draws the user in (needs wow factor)
2. **Trial Setup Page** — Configure the virtual trial before seeing anything:
   - Trial size (e.g., 10,000 patients)
   - Ratio of real to generated/synthetic humans
   - Drug selection (which treatment to test)
   - Disease type and placement options
   - For diseases that can appear in multiple locations: where they appear
   - Note: even same-location diseases won't be identical across patients (different body compositions, genetics)
3. **Population Trial View** — The trial running:
   - Time controls (play, scrub, speed up)
   - High-level metrics evolving over simulated time
   - Population grid — icons of people, colour-coded by outcome
   - Filters: cured, not cured, significant events, adverse effects
   - Click any individual to enter their body explorer
   - 10,000 shown in grid, but only ~3 are actually clickable/explorable
4. **Individual Body Explorer** — The 3D deep dive:
   - Top-down view of full body, click regions to zoom in
   - Progressive zoom through 6 layers (full body → micro)
   - Time milestones within the explorer: untreated disease progression → drug administration → post-drug response
   - Patient profile displayed at full-body level, metrics shift contextually as you zoom deeper
   - AI text narration panels at each level
5. **Supporting Pages** — How It Works, Impact, etc. (need wow factor, not throwaway)

### 4. What's Real vs. Mocked

- **One fully developed example path** — one disease, one drug, one patient journey through all zoom levels
- **Everything else is mock data** — the 10,000 population grid is visual only, ~3 patients are clickable
- **Comorbidities/pre-existing conditions** — show the UI option exists, don't build it out
- **Multiple disease placement** — show it as an option in trial setup, don't simulate it

### 5. Time Progression

- Happens WITHIN the individual body explorer, not just at population level
- Milestones: untreated disease period → drug administration → post-drug effects
- User controls time (play, pause, scrub)
- Metrics evolve with time

### 6. Patient Profiles

- Detailed at top-level body view (age, genetics, comorbidities, medications)
- Metrics displayed change contextually as you zoom deeper
- Real patients carry more stored data than generated ones
- Generated patients capture how they were constructed
- Vision: generated models aspire to parity with real patient accuracy

### 7. Architecture Requirement

- **Must support parallel AI agent development**
- Modular, independently buildable components
- Clear boundaries so multiple agents can work simultaneously
- Component-based structure where agents don't step on each other

### 8. Presentation

- Screen recording of Jason walking through the app
- Optimise for live demo feel, not standalone browsing

## Open Items for Next Session

- Finalise which single disease/drug/patient path to build out fully first
- Define the Kurzgesagt colour palette and design tokens
- Plan the component architecture for parallel development
- Landing page concept exploration
