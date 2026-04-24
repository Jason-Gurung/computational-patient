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
| Full Body | `public/assets/models/custom/full-body.glb` | **ready v2** (201K) — Sketchfab low-poly body + organs |
| Heart Anatomical | `public/assets/models/custom/heart-anatomical.glb` | **ready v2** (2.3M) — Sketchfab torso, saturation boosted |
| Heart Organ | `public/assets/models/custom/heart-organ.glb` | **ready v2** (1.1M) — Sketchfab heart + amyloid deposits |
| Heart Tissue | `public/assets/models/custom/heart-tissue.glb` | **ready v2** (1.8M) — Rebuilt with bold materials |
| Heart Cellular | `public/assets/models/custom/heart-cellular.glb` | **ready v2** (2.8M) — Sketchfab cell, Kurzgesagt restyled |
| Heart Micro | `public/assets/models/custom/heart-micro.glb` | **ready v2** (2.8M) — Sketchfab receptor, restyled as TTR |

Agent D (Body Explorer): check this table before defaulting to placeholders. If a model shows "ready", load the .glb instead.

---

## Log Entries

### [Cross-agent] Trial Config Flows to Population View — 2026-04-24 23:30
Status: completed
What I built: Connected trial setup config to the population view so user choices carry through.
- **TrialConfigContext** (`shared/context/TrialConfigContext.tsx`) — React context + provider + `useTrialConfig()` hook holding the `TrialConfig` state. Provider wraps the app in `App.tsx`.
- **Trial Setup** — now reads/writes config via context instead of local `useState`. All user selections (cohort size, disease, drug, ratio, placement) persist across navigation.
- **grid-patients.ts** — `getGridPatients(cohortSize)` now accepts dynamic cohort size. Grid dimensions computed from `Math.ceil(Math.sqrt(cohortSize))`. 3 clickable patients placed at proportional positions (~19%, ~42%, ~76%). Cache keyed by cohortSize. Exported `getGridCols()` helper.
- **PatientGrid** — dynamic dot sizing based on cohort (12px at ≤500 down to 2px at 100K+), dynamic canvas dimensions, accepts `cohortSize` prop. Bottom label shows dynamic patient count and grid dimensions.
- **OutcomeFilters** — accepts `cohortSize` prop, passes to `getGridPatients()`.
- **PopulationSummaryChart** — accepts `cohortSize` prop, passes to `getGridPatients()`.
- **Population View page** — reads config from context, shows dynamic subtitle: "{N} computational patients · {Drug} · {Disease}". Passes `cohortSize` to all children.
What I exported/shared: `TrialConfigProvider` and `useTrialConfig()` from `@/shared/context/TrialConfigContext`. `getGridCols()` from `@/data/population`.
Notes for other agents: `CLICKABLE_PATIENT_IDS` export renamed to `CLICKABLE_LINKED_IDS` since the population patient IDs are now dynamic. The 3 linked patient IDs (`patient-001`, `-002`, `-003`) remain stable.

### [Agent B] Trial Setup — Slider fixes + Cohort Characteristics rework — 2026-04-24 17:00
Status: completed
What I changed:
- **Slider fix:** Replaced broken shadcn/base-ui Slider with custom `KzSlider` component — renders track/fill/thumb as plain divs with an invisible native `<input type="range">` overlaid for drag interaction. Fixes all alignment and fill-percentage bugs. Removed `.kz-slider` CSS from `index.css`.
- **New `CohortCharacteristics` panel** — replaces the old separate `ComorbidityPanel` and `PlacementOptions`. Contains:
  - **Age Range** — min/max sliders (18–90)
  - **Sex Distribution** — slider with purple/blue F/M split bar
  - **Disease Placement** — uniform/varied toggle (conditional on disease.canVaryPlacement)
  - **Pre-existing Conditions** — three-state cycle per condition: Off → Include (some patients have it, green) → Required (all patients must have it, cyan) → Off
- **Page reorder:** Cohort Characteristics moved up to sit right after Cohort Size + Real/Synthetic Ratio, before Disease/Drug selection. Flow is now: how many → what kind of patients → what disease/drug.
What I exported/shared: `KzSlider` is in `src/sections/trial-setup/KzSlider.tsx` — reusable within this section. Old `ComorbidityPanel.tsx` and `PlacementOptions.tsx` are no longer imported (files still exist but unused).
Dependencies: None.
Notes for other agents: The shadcn `slider` component (`src/components/ui/slider.tsx`) was installed but is no longer used by trial-setup. Other agents can use it if they fix the base-ui `onValueChange` callback signature, or use `KzSlider` pattern instead.

### [Agent A] Remove ALL specific numbers from metrics — 2026-04-24 16:30
Status: completed
What I changed: **Removed ALL specific numbers from improvement metrics AND current-state industry stats.** The vision pitch should not cite any figures — not projected improvements, not current-state stats. Just describe what aspects improve and that the improvement is significant. This was a two-pass change (first pass kept current-state numbers, second pass removed those too).
Files updated:
- `src/data/content/landing.ts` — `impactNumbers` renamed to `impacts`, now just label + description + icon (no numbers at all)
- `src/sections/landing/components/ImpactNumbers.tsx` — redesigned as 4 icon+text cards (like ConceptCards) describing what improves
- `src/sections/landing/components/TimelineComparison.tsx` — all year labels removed from both timelines, bars show phase names only, taglines are qualitative ("Long, sequential phases" vs "Compressed, overlapping phases")
- `src/data/content/impact.ts` — comparisons: removed `value` fields entirely, only `detail` text remains
- `src/sections/supporting/impact/components/MetricComparison.tsx` — no longer renders `.value`, just shows traditional vs computational descriptions
- `src/sections/supporting/impact/components/EfficiencySection.tsx` — replaced number cards with label+description cards
- `src/sections/supporting/impact/components/CostTimeline.tsx` — summary cards show qualitative labels, timeline labels qualitative, no AnimatedNumber component
- `docs/OVERVIEW.md` — replaced impact table with bullet-point descriptions
- `docs/TRIAL-TRANSFORMATION.md` — removed all specific numbers from pipeline diagrams, per-phase stats, and summary table
- `README.md` — removed all specific numbers from intro and closing
- `agent-prompts/agent-a-landing.md` + `agent-e-supporting.md` — updated specs
**POLICY FOR ALL AGENTS: Do NOT use specific numbers (years, dollars, percentages, headcounts) when describing improvements or current-state metrics. Describe aspects qualitatively. The only exceptions are narrative illustrations within the vision docs (e.g. "simulate 100,000 patients") describing what the system can do, not how much it saves.**
Notes for other agents: Visual bar proportions in timelines still show relative compression — the visual contrast is preserved without pinning numbers. If you need to convey scale, use words like "dramatically", "substantially", "significantly" — not figures.

### [Agent F] v2 Models — Sketchfab bases + Kurzgesagt restyle — 2026-04-24 13:48
Status: completed
What I built: Rebuilt all 6 models using open-source Sketchfab models as bases (where available), restyled to unified Kurzgesagt palette. Major quality improvement over v1 primitive-only approach:
- **full-body.glb** (201K) — Sketchfab low-poly male figure (3.7K faces) made translucent cyan. Organs placed inside: glowing pink heart, cyan lungs, brown liver, green stomach, red kidneys, purple brain, teal spine.
- **heart-anatomical.glb** (2.3M) — Sketchfab anatomy torso with open chest cavity showing ribs, heart, lungs, organs. Original texture kept but saturation boosted 2.5x + emission added for vivid Kurzgesagt look.
- **heart-organ.glb** (1.1M) — Sketchfab detailed heart (29K faces) by sv1nks. Material replaced with bold saturated red + emission. 7 purple amyloid deposits shrinkwrapped to heart surface for ATTR-CM disease visualization.
- **heart-tissue.glb** (1.8M) — Rebuilt from scratch with bolder materials: 15 muscle fibres with sarcomere bands, 25 glowing purple amyloid fibrils, 4 capillaries (red arterial + blue venous), teal ECM wireframe grids. All materials have strong emission.
- **heart-cellular.glb** (2.8M) — Sketchfab animal cell by LauriPurhonen (99K faces). All 11 materials restyled: cyan translucent membrane, pink nucleus, gold Golgi, green mitochondria, blue ER, teal/purple/cyan for other organelles.
- **heart-micro.glb** (2.8M) — Sketchfab GABA-A receptor by axonology (252K faces, decimated to 135K). Subunits restyled: alpha→cyan, beta→teal, gamma→purple. Ligand parts→bright green (representing tafamidis drug).
What I exported/shared: All .glb files in `public/assets/models/custom/`. Total ~11MB. All models share the Kurzgesagt colour palette so they feel cohesive across zoom levels.
Dependencies: None — models are loaded by Agent D's Body Explorer via useGLTF.
Notes for other agents: v2 models are significantly larger than v1 due to higher-quality Sketchfab geometry. All under 5MB each. Materials use bold colours with emission for glow. The anatomical model includes an embedded JPEG texture (saturation-boosted). All other models use solid-colour PBR materials. Sketchfab models are CC Attribution licensed.

### [Agent F] v1 Models (superseded by v2) — 2026-04-24 12:59
Status: completed (superseded)
What I built: Initial 6 models built entirely from Blender primitives. Replaced by v2 above due to crude visual quality.

### [Agent D] Body Explorer Complete — 2026-04-24 22:00
Status: completed
What I built:
- **Scene** — R3F Canvas wrapper with dark background, fog, ambient + directional + point lights in Kurzgesagt palette
- **CameraController** — Smooth camera animation using useFrame + Vector3.lerp for position, lookAt, and FOV transitions between zoom levels
- **ModelViewer** — Loads all 6 Blender .glb models via drei useGLTF with preloading for smooth transitions. Suspense fallback shows spinning torus. Gentle auto-rotation on loaded models. (Previous placeholder geometry replaced.)
- **HotspotOverlay** — drei Html-positioned hotspot buttons with pulsing glow sphere + rotating ring, glassmorphism labels
- **ZoomBreadcrumb** — top-left breadcrumb trail, clickable to jump back to any level
- **ZoomLevelIndicator** — right-edge vertical dot indicator showing current depth (N/6)
- **PatientProfileSidebar** — collapsible left panel with patient vitals, genomics, comorbidities, medications. Auto-collapses at zoom depth >= 3
- **NarrationOverlay** — right panel using shared NarrationPanel, selects narration by treatment phase derived from simulation week
- **MetricsPanel** — right panel using shared MetricsCard, shows zoom-level-specific metrics
- **TimelineMilestones** — bottom bar with 3 treatment phase buttons (Untreated/Drug Administered/Post-Treatment) + shared TimeControls
- **index.tsx** — full-viewport orchestrator wiring all components, state for zoomIndex + simulationTime, patient loading from URL params
What I exported/shared: All components in `src/sections/body-explorer/`. No shared components created — used existing NarrationPanel, MetricsCard, TimeControls, useSimulationTime.
Dependencies: None — all 6 Blender models integrated via useGLTF.
Notes for other agents: All placeholders use auto-rotation + pulsing animations via useFrame. All UI overlays use glassmorphism (`bg-kz-bg-secondary/80 backdrop-blur-md`) and `rounded-xl` per STYLE-CONVENTIONS.md. Navigation is sequential by array index in HEART_ZOOM_LEVELS. The page is full-viewport (no PageShell) with `h-[calc(100vh-3.5rem)]` to account for NavBar. No custom animation variants.

### [Agent E] Supporting Pages (How It Works + Impact) Complete — 2026-04-24 18:30
Status: completed
What I built:
- **How It Works Page** — 3 visual sections with scroll-reveal animations:
  - **ScaleStack** — 5-tier vertical card stack (Molecular → Cellular → Tissue → Organ → Organism), each with unique accent colour, lucide icon, description, and italic example. Connected by vertical lines. Staggered slideUp reveal.
  - **ValidationLoop** — 4-step horizontal flow (Predict → Test → Learn → Improve) with arrow connectors and dashed return loop. Step-by-step stagger.
  - **DataFlywheel** — Drug 1/10/50 progression cards with animated bars (calibration effort vs prediction accuracy) and animated number counters. Bottom summary strip.
- **Impact Page** — 4 visual sections:
  - **MetricComparison** — 5 before/after comparison cards from impactContent.comparisons. Traditional (muted) vs Computational (vivid blue glow). Arrow separator between sides.
  - **CostTimeline** — Dual horizontal timeline bars showing phase-by-phase compression. Summary stat cards (time saved, cost reduction, throughput). Animated bar growth on scroll.
  - **MoatDiagram** — Concentric animated rings (5 layers) with center shield icon. Side list of moat points from impactContent.moat.points. Bottom callout: "Competitors start from zero; Pfizer starts from Drug 50."
  - **EfficiencySection** — 4 before→after metric cards with strikethrough old values and green badges. Bold callout: "Fewer people. Greater output. Dramatically reduced risk."
What I exported/shared: All components are in `src/sections/supporting/`. No shared components created — used existing useScrollReveal, shared animation variants (fadeIn, slideUp, staggerContainer), design tokens, and data from @/data/content.
Dependencies: None — all required data and shared components were already available.
Notes for other agents: Both pages follow STYLE-CONVENTIONS.md exactly — py-24 section spacing, rounded-xl cards, kz-border-default borders, shared animation variants only. AnimatedNumber pattern from STYLE-CONVENTIONS.md used for counters. No custom animation variants. Hero sections use py-32 and text-5xl per conventions.

### [Agent B] Trial Setup Page Complete — 2026-04-24 15:45
Status: completed
What I built:
- **CohortSizeSelector** — step-slider (100→100K) with formatted number display and dot grid that scales with cohort size
- **RealSyntheticRatio** — slider with visual split bar (blue=real, purple=generated), live patient counts per side
- **DiseaseSelector** — 2-column card grid of all 8 diseases with region-specific lucide icons, brand names, selected card glow
- **DrugSelector** — auto-linked to selected disease, shows brand/generic name, mechanism, route, and response timeline pills
- **PlacementOptions** — uniform/varied toggle, conditionally rendered only when `canVaryPlacement` is true on the selected disease
- **ComorbidityPanel** — 6 mocked toggles (hypertension, diabetes, obesity, CKD, COPD, depression) with "Preview" lock badge. Toggles work in UI but are non-functional downstream
- **TrialSummaryCard** — sticky sidebar showing all selected parameters at a glance, plus simulated duration card
- **LaunchButton** — "Run Virtual Trial" CTA with pulsing cyan glow, navigates to `/trial`
- **Page layout** — two-column (controls left, sticky summary right) with staggered scroll-reveal animations
What I exported/shared: All components are in `src/sections/trial-setup/`. No shared components created. Used existing PageShell, SectionHeading, useScrollReveal, shared animation variants, shared constants (DISEASES, DRUGS, DISEASE_MAP, DRUG_MAP, ROUTES).
Dependencies: Installed shadcn `slider` component (`src/components/ui/slider.tsx`)
Notes for other agents: Disease selection auto-links to the matching drug. Default state is ATTR-CM / Vyndaqel / 10,000 patients / 30% real. The config state is local — doesn't persist to other pages (population view will show its own hardcoded data regardless). All cards use `rounded-xl border-kz-border-default bg-kz-bg-secondary` per STYLE-CONVENTIONS.md. No custom animation variants — only shared ones.

### [Agent C] Population Trial View Complete — 2026-04-24 15:30
Status: completed
What I built:
- **PatientGrid** — HTML5 Canvas rendering 10,000 colour-coded patient dots (100x100 grid). 3 clickable patients rendered as glowing circles with white rings. Hit-detection via mouse position mapped to canvas coords. Outcomes update as simulation time advances. Filtering dims non-matching patients to 8% opacity.
- **PatientTooltip** — Fixed-position tooltip on hover over clickable patients. Shows patient name, age, sex, current outcome with colour dot, and "Click to explore" CTA. Positioned at cursor.
- **OutcomeMetrics** — 4 metric cards (Response Rate, Adverse Events, Completion Rate, Milestones) with animated number transitions (easeOutCubic, 300ms). Metrics interpolated between timepoints for smooth progression.
- **OutcomeFilters** — Uses shared FilterBar component. Shows counts per outcome at current week. Toggling filters dims non-matching dots on the canvas.
- **PopulationSummaryChart** — Recharts stacked AreaChart showing outcome distribution (%) across 14 week snapshots (0-52). Cyan dashed reference line tracks current simulation week. Dark-themed tooltip.
- **PopulationViewPage (index)** — Full layout: header with trial info + week badge, full-width TimeControls, grid+sidebar layout (grid left, metrics/filters/legend right), chart at bottom. Wired to useSimulationTime hook.
What I exported/shared: All components are in `src/sections/population/`. No shared components created — used existing TimeControls, FilterBar, useSimulationTime, design tokens, and constants.
Dependencies: None — all required data and shared components were already available.
Notes for other agents: Canvas uses `imageRendering: pixelated` for crisp dots. The 3 clickable patients are at grid indices 4247 (patient-001), 1893 (patient-002), 7621 (patient-003) — they navigate to `/trial/patient/{linkedPatientId}` on click. All cards use `rounded-xl` per STYLE-CONVENTIONS.md.

### [Agent A] Landing Page Complete — 2026-04-24 13:00
Status: completed
What I built:
- **HeroSection** — full-viewport hero with animated canvas particle background (80 particles with connection lines, pulsing glow), gradient headline, CTA button, scroll indicator
- **ConceptCards** — 2x2 grid of the 4 key messages with lucide icons, staggered scroll-reveal
- **ImpactNumbers** — 4-column grid with animated before→after counters (eased counting animation triggered on scroll), savings badges
- **TimelineComparison** — stacked horizontal bar charts comparing traditional (10-15yr) vs computational (6-9yr) timelines, animated bar growth on scroll
- **CTASection** — bottom call-to-action with "Configure a Virtual Trial" button linking to /setup
What I exported/shared: All components are in `src/sections/landing/components/`. No shared components created — used existing shared hooks (useScrollReveal), design tokens (fadeIn, slideUp, staggerContainer), and constants (ROUTES).
Dependencies: None — landing page is self-contained
Notes for other agents: The hero canvas uses ~80 particles with connection lines. If performance is a concern on lower-end machines, the count can be reduced. All cards use `rounded-xl border-kz-border-default bg-kz-bg-secondary` per STYLE-CONVENTIONS.md. No custom animation variants were created — used only shared ones.

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
