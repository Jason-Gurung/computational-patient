# Project Brief — The Computational Patient

This brief captures the full context for anyone (human or AI agent) working on this project. Read this before doing anything.

## What This Is

A **vision pitch** — not a product, not a feasibility study. We're exploring what pharmaceutical development could look like if we rebuilt it from scratch with unlimited AI capability. The goal is to inspire, not to spec.

The central idea: **The Computational Patient** — complete computational models of human biology detailed enough to simulate how any drug interacts with any patient. This runs before and alongside human trials as a safety and intelligence layer. It does NOT replace human trials — it makes them smaller, safer, faster, and more likely to succeed.

## The Key Messages

1. **Biology is computable.** The trajectory is clear. The question is when, not whether.
2. **This is a pre-trial safety layer.** No human is exposed to a drug the model flags as dangerous. Trials still happen — they're just better.
3. **The model is a compounding asset.** Every drug developed makes it better. Drug 1 starts from first principles. Drug 50 predicts outcomes from molecular structure alone. This is an unreplicable moat.
4. **The organisation does more with less.** Smaller trials, shorter timelines, model-driven decisions — fewer people, greater output. Don't shy away from this.
5. **Pfizer's data is the moat.** Decades of proprietary trial results, including failures, are training data no competitor can replicate.

## The Pitch Framing

- This is a "what if" — not "here's what we're building." No feasibility gatekeeping.
- Ambitious, specific, non-hedging tone. Present future capabilities as achievable states, not speculative maybes.
- Use concrete examples, numbers, and scenarios to make abstract concepts tangible.
- The audience is senior leadership / stakeholders who need to be inspired, not engineers who need to be convinced.

## The Deeper Idea

What we're really pitching is **a simulation engine that can model all real physical and biological reactions from an elemental/molecular level up**. That's the foundational technology — a physics-and-chemistry-accurate simulation of matter and biology. Everything else (disease modelling, drug testing, clinical trials) is an *application* built on top of that core capability.

The Computational Patient is the killer app of this engine: generate virtual humans with realistic genomic profiles (trained on real population data like UK Biobank), give them diseases, and test treatments — at any scale from single patient to 1,000-patient virtual trials.

### Virtual Patient Generation

- **Custom creation**: define a patient's age, sex, genomic profile, comorbidities, medications — build exactly who you want to test
- **Population generation**: "give me 1,000 varied virtual humans" — the system samples from learned patterns of real human genetic diversity to produce realistic, varied cohorts. Not random — realistic combinations of genetic variants, body compositions, organ function levels
- **Genomic profiles, not literal DNA**: the system is trained on real population genomic data to generate synthetic but biologically plausible profiles. It captures patterns of variation (which variants tend to co-occur, how they differ across ancestries) without copying any real individual

### Virtual Trial Setup

- Pick or generate your patient cohort (1 patient or 10,000)
- Select or place a disease — choose where it starts, how advanced, whether varied across patients or uniform
- For diseases that can originate in different locations (e.g., cancer), choose whether each virtual patient gets it in the same place or varied locations
- Introduce the drug — the simulation runs it through each virtual patient's unique biology
- Observe results at any zoom level, for any individual, or aggregated across the cohort

## Scientific Accuracy Note

**Important for all agents working on this project:** The project owner is not a domain expert in biology or pharmacology. If any idea, concept, or phrasing doesn't hold up scientifically — even in the "no limits" framing — flag it and suggest the correct framing. The vision should be ambitious but not nonsensical. Getting the science directionally right makes the pitch credible; getting it wrong undermines it.

## The Demo Concept: Body Explorer

The centrepiece of the pitch is an interactive visual demo — a **3D human body that you can explore at multiple scales** to see how disease and drug treatment work inside a computational patient.

### The Experience

A **whole-body explorer** — not locked to one disease or organ. You start at the full human figure and can zoom into any region of the body, peeling through layers as you go deeper. Disease and drug treatment are things you *apply* to the body — the explorer itself is a general-purpose navigable model of human biology at every scale.

Navigation is **open-ended exploration with on-screen AI text panels**. You can zoom into any available region, go deeper through layers, and at every stop there's a text overlay explaining what you're looking at and what's happening biologically — not audio narration, just contextual written info that updates as you navigate. Think of it as a self-guided tour with an intelligent caption system.

The views at each zoom level are pre-authored to look great (not a physics engine rendering in real time), but the experience of moving between them should feel fluid and explorative.

### The Zoom Layers

The body can be explored through these depth levels, applicable to any region:

1. **Full Body**
   - Translucent human figure, major organs visible
   - Patient profile sidebar: age, genetics, comorbidities, current medications
   - Clickable regions — zoom into any area (chest, head, abdomen, limbs...)

2. **Skin / Surface Layer**
   - Exterior detail of the selected region
   - The boundary between outside and inside the body

3. **Anatomical Layer**
   - Skin peeled away — muscle, bone, vasculature, nerves visible
   - Organs in their physical context
   - Blood vessels, lymph system, connective tissue

4. **Organ Level**
   - Individual organ in detail
   - Internal structure (e.g., lung lobes and bronchial tree, liver lobules, kidney nephrons, brain regions)
   - Functional annotations — what this organ does, how it processes drugs

5. **Tissue Level**
   - The cellular neighbourhood
   - Different cell types visible in their spatial arrangement
   - Blood vessels supplying the tissue, immune cells patrolling
   - Extracellular matrix, structural context

6. **Micro Level**
   - Individual cells, receptors on surfaces, signalling molecules
   - Inside the cell: nucleus, organelles, pathways
   - Molecular interactions — this is where drug binding happens

### Applying Disease

Disease is something you place onto the body model. Examples:

- **Lung cancer**: tumour mass appears in the lung at organ level. Zoom deeper to see cancer cells invading tissue, the tumour microenvironment, immune suppression. At micro level, see the mutated receptors driving growth.
- **Rheumatoid arthritis**: inflammation highlighted in joints. Zoom into the joint to see immune cells attacking cartilage, cytokine signalling gone wrong.
- **Alzheimer's**: brain regions highlighted. Zoom in to see amyloid plaques, tau tangles, dying neurons.

The disease visuals show up at whatever zoom level is relevant — a tumour is visible at organ level, but the molecular driver is only visible at micro level.

### Applying Drug Treatment

Once a disease is placed, you can introduce a drug and watch what happens:

- **Drug entry**: if oral, watch it enter the stomach, absorb into the bloodstream. If injected, enter directly into circulation.
- **Distribution**: drug molecules flow through the vascular system. See concentration building in different organs — liver metabolising, kidneys clearing, drug reaching the disease site.
- **Action at target**: zoom into the disease site. Watch drug molecules bind to their targets. Cancer cells responding, immune pathways activating, inflammation subsiding.
- **Response over time**: time-lapse showing treatment effect — tumour shrinking, resistant cells emerging, side effects manifesting in other organs.
- **Outcome overlay**: pull back to full body with results overlaid — response metrics, toxicity profile, predicted timeline. Bridge to "now run this across 100,000 virtual patients."

## Visual Direction — Kurzgesagt Style

All visuals — UI design, illustrations, and 3D Blender models — emulate the **Kurzgesagt** YouTube channel aesthetic:
- Bold, vector-based art style with bright colours on dark backgrounds
- Stylised and smooth, not hyper-realistic
- Friendly but scientific — makes complex biology feel approachable
- For 3D models: low-poly/stylised with vivid colours, not photorealistic renders
- This applies consistently across the landing page, explorer, population views, and supporting pages

## The Full Demo App

The Body Explorer is the centrepiece, but it sits inside a broader app with a clear user flow.

### App Flow

The user does NOT land on the 3D body immediately. There's a setup flow:

1. **Landing Page** — Sets up the concept, draws the user in. Needs its own wow factor.
2. **Trial Setup** — Configure the virtual trial before anything runs:
   - Trial size (e.g., 10,000 virtual patients)
   - Ratio of real patient models to generated/synthetic ones
   - Drug selection (which treatment to test)
   - Disease type and placement options
   - For diseases that can appear in multiple body locations: options for where they manifest
   - Even same-location diseases vary across patients (different body compositions, genetics — no two patients are identical)
   - Show UI options for comorbidities/pre-existing conditions (mocked, not functional)
3. **Population Trial View** — The virtual trial running:
   - Time controls (play, pause, scrub, speed up)
   - High-level metrics evolving over simulated time
   - Population grid — icons representing patients, colour-coded by outcome (cured, not cured, adverse events, significant milestones)
   - Filterable by outcome type
   - Click any individual to enter their personal body explorer
   - Visually shows 10,000 patients; only ~3 are actually clickable/explorable (the rest are decorative)
4. **Individual Body Explorer** — The 3D deep dive (see sections above for zoom layers, disease, drug treatment):
   - Top-down view of full body, click regions to zoom in progressively
   - Time milestones within the explorer: untreated disease progression → drug administration → post-drug response
   - Patient profile at full-body level, metrics shift contextually as you zoom deeper
   - AI text narration panels at each zoom level
5. **Supporting Pages** — How It Works, Impact, etc. Need wow factor, not throwaway text pages.

### Region Priority — Follow Pfizer's Drug Portfolio

Body regions to build are prioritised by mapping real Pfizer brands to diseases to body locations:

| Brand | Disease | Body Region |
|-------|---------|-------------|
| **Vyndaqel** | ATTR cardiomyopathy | Heart |
| **Lorbrena** | ALK+ non-small cell lung cancer | Lungs |
| **Xeljanz** | Rheumatoid arthritis / ulcerative colitis | Joints / GI |
| **Ibrance** | HR+/HER2- breast cancer | Breast |
| **Xtandi** | Prostate cancer | Prostate |
| **Eliquis** | Blood clots / stroke prevention | Cardiovascular / blood |
| **Sutent** | Renal cell carcinoma | Kidneys |
| **Prevnar / Comirnaty** | Pneumococcal / COVID (vaccines) | Immune system / lungs |
| **Bosulif** | Chronic myeloid leukemia | Blood / bone marrow |

**Top 3 priority paths:** Heart (Vyndaqel/ATTR-CM), Lungs (Lorbrena/NSCLC), Joints (Xeljanz/RA)

Build as many as possible to make it feel robust. One fully developed path (all zoom levels, drug response, time progression). Others at varying depths.

### What's Real vs. Mocked

- **One fully developed example path** — one disease, one drug, one patient journey through all zoom levels with time progression
- **Everything else is mock data** — population grid is visual, ~3 patients clickable, rest decorative
- **Comorbidities/pre-existing conditions** — show the UI option, don't build it out
- **Multiple disease placements** — show as option in trial setup, don't simulate

### Priority Approach
- Not a rigid "only these pages" — more of a **bucket list ordered by priority**
- Body Explorer + Population View are the must-haves. Everything else is "as many as we can do, best ones first."

### Architecture for Parallel Development

The codebase must be structured so multiple AI agents can work on different parts simultaneously:
- Each major section (landing, trial setup, population view, body explorer, supporting pages) is an independent module
- Shared types and interfaces defined upfront in a common location
- No tight coupling between sections — each can be built and tested in isolation
- Clear file/folder boundaries so agents don't conflict

### Presentation

The demo will be presented as a **screen recording** of Jason walking through the app. Optimise for live demo feel — smooth transitions, readable text at screen-capture resolution, clear visual hierarchy.

### Technical Approach

- **Hardcoded frontend mockup** — no real simulation engine
- Each zoom level and region is a pre-authored view with custom visuals
- Smooth transitions between zoom levels (zoom in / pull back)
- The 3D elements should look impressive but don't need to be medically accurate — this is a pitch, not a textbook
- Disease scenarios and drug responses are hardcoded story paths
- AI narration text is hardcoded (not actually calling an AI)
- Multiple regions should be explorable (not just one organ) to sell the "whole body" concept

### Tech Stack

- **Scaffolding:** Vite + React + TypeScript
- **UI:** shadcn/ui (via CLI) + Tailwind CSS v4
- **3D rendering:** React Three Fiber + drei — loads GLTF/GLB models, camera animations for zoom transitions
- **3D authoring:** Blender (via BlenderMCP) — custom scenes at each zoom level, exported as GLTF/GLB
- **Charts/data overlays:** Recharts (simple) + Nivo (heatmaps, sankey)
- **Scientific plots:** Plotly.js (3D scatter for population diversity)
- **Animation:** Framer Motion (UI transitions)
- **Diagrams/flows:** @xyflow/react (trial pipelines, data flywheel)
- **Molecular viz:** Mol* or NGL Viewer if needed for protein/drug structures

### 3D Model Workflow — Mixed Approach

Blender scene generation takes time. To avoid blocking mockup development:

1. **Placeholder models first** — use free anatomy assets (Sketchfab, BodyParts3D, Protein Data Bank) loaded in React Three Fiber so the demo shell is buildable immediately
2. **Blender scenes in parallel** — create custom scenes at each zoom level (full body, organ, tissue, cellular, molecular) in Blender, export as GLTF/GLB
3. **Swap in as ready** — replace placeholder models with custom Blender scenes as they're completed. The R3F code stays the same, only the model files change

The demo is **curated views, not free navigation** — roughly 5-6 pre-composed scenes at different zoom scales. Users click/scroll to transition between them with smooth camera animations, not fly around freely.

## The Vision Documents

Detailed written exploration lives in `docs/`:

- **OVERVIEW.md** — What a Computational Patient is, what it enables, the compounding model
- **BIOLOGY-MODEL.md** — Multi-scale simulation: molecular → cellular → tissue → organ → organism
- **POPULATION-DIVERSITY.md** — Virtual cohorts representing real human variation
- **DISEASE-MODELS.md** — How modelling differs across therapeutic areas
- **TRIAL-TRANSFORMATION.md** — How every trial phase changes
- **DATA-FLYWHEEL.md** — The compounding data advantage
- **REGULATORY-PATH.md** — Path to regulatory acceptance
- **ETHICS.md** — Bias, consent, rare populations, workforce transformation

## What's NOT in Scope

- Actual simulation engines or computational biology
- Production-quality code or architecture
- PRDs, technical specs, or implementation plans
- Feasibility analysis — this is a vision, not a proposal
