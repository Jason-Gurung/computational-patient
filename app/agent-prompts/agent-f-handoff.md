# Agent F — Blender 3D Models (Handoff / Continuation)

> You are continuing work that previous Agent F sessions completed. Read this entire handoff before doing anything.

## Project Context

This is a **vision pitch demo for Pfizer** called "The Computational Patient" — a hardcoded React frontend mockup (not a real product). The centrepiece is a **Body Explorer** that zooms through 6 levels of human biology for the heart/ATTR-CM disease case. You are creating the 3D models for that explorer.

**Visual style: Kurzgesagt** (the YouTube channel) — stylised, low-poly, bold vivid colours on dark backgrounds. NOT photorealistic. Smooth shapes, flat shading or gentle gradients, bright saturated colours. Friendly but scientific.

## What Exists Now — 16 Model Files

All files live at `app/public/assets/models/custom/`.

### Base models (untreated/sick state)

| Model | File | Size | Description |
|-------|------|------|-------------|
| Full Body | `full-body.glb` | 1.7M | Sketchfab low-poly male, cyan translucent. Organs inside: pink heart, cyan lungs, brown liver, green stomach, red kidneys, purple brain, teal spine |
| Chest Anatomy | `heart-anatomical.glb` | 452K | **v3 restyled** — ghostly teal ribcage (15% decimated, alpha=0.18), pink glowing heart, translucent cyan lungs, 10 purple amyloid deposits on heart surface |
| Heart Organ | `heart-organ.glb` | 1.1M | Sketchfab heart (29K faces), warm red with emission. 12 purple amyloid deposits (enlarged, emission=1.5) |
| Cardiac Tissue | `heart-tissue.glb` | 1.9M | Built from scratch. 15 muscle fibres with sarcomere bands, 25 thickened amyloid fibrils (emission=2.0), 4 capillaries, teal ECM wireframe |
| Cardiomyocyte | `heart-cellular.glb` | 2.8M | Sketchfab animal cell restyled. 10 amyloid fibril cylinders + 5 amyloid clumps pressing against cell exterior |
| TTR Protein | `heart-micro.glb` | 2.9M | Sketchfab receptor restyled as TTR. Bright green drug (tafamidis). 3 orange misfolded monomers. 8-sphere purple protofibril chain |

### Time-progression variants

Each zoom level (except full body) has two variants for disease progression over time:

| Model | Responding (drug works) | Progressing (drug fails) |
|-------|------------------------|-------------------------|
| Chest | `heart-anatomical-responding.glb` (426K) | `heart-anatomical-progressing.glb` (469K) |
| Heart Organ | `heart-organ-responding.glb` (1.0M) | `heart-organ-progressing.glb` (1.1M) |
| Tissue | `heart-tissue-responding.glb` (1.6M) | `heart-tissue-progressing.glb` (1.9M) |
| Cellular | `heart-cellular-responding.glb` (2.8M) | `heart-cellular-progressing.glb` (2.9M) |
| Micro | `heart-micro-responding.glb` (2.9M) | `heart-micro-progressing.glb` (2.9M) |

**What changes between variants:**

- **Base (`.glb`)** = untreated disease state. Moderate amyloid deposits, disease clearly visible.
- **Responding (`-responding.glb`)** = drug is working, disease improving. Fewer/smaller/fading amyloid (semi-transparent, dim emission). Healthier tissue colours (brighter reds). Green drug molecule indicators on organ model.
- **Progressing (`-progressing.glb`)** = drug failed, disease worsening. More/larger/angrier amyloid (darker purple, intense emission). Duller/darker tissue. Extra misfolded monomers and longer protofibril chain at micro level. Drug molecules dimmed/greyed out at micro level.

## Colour Palette

These are the exact Kurzgesagt-inspired colours used across the whole app:
- Background/space: `#0B0E17`
- Primary blue: `#4FC3F7`
- Cyan glow: `#00E5FF`
- Pink/danger: `#FF4081`
- Green/health: `#69F0AE`
- Orange/warning: `#FF9100`
- Purple/synthetic: `#B388FF`
- Yellow/milestone: `#FFD740`
- Teal: `#64FFDA`

## The 6 Zoom Levels (what each model represents)

1. **Full Body** — Translucent human figure with visible organs. Heart glows to indicate disease site.
2. **Chest Anatomy** — Ghostly ribcage, heart, lungs, major blood vessels. Clean, stylised, NOT gory.
3. **Heart Organ** — 4-chambered heart with valves, coronary arteries, amyloid deposits (the disease).
4. **Cardiac Tissue** — Cross-section of muscle fibres with amyloid fibrils between them, capillaries, extracellular matrix.
5. **Single Cardiomyocyte** — One heart muscle cell showing nucleus, mitochondria, sarcomeres, with amyloid fibrils pressing from outside.
6. **TTR Protein & Drug** — TTR tetramer (receptor base), binding pockets, tafamidis drug molecule (green), misfolded monomers (orange), amyloid protofibril chain (purple).

## Disease Context

- **Disease:** ATTR cardiomyopathy (transthyretin amyloidosis) — TTR protein misfolds, forms amyloid deposits in heart tissue, causes heart failure
- **Drug:** Tafamidis (brand: Vyndaqel) — stabilises the TTR tetramer to prevent misfolding
- **What to show visually:** healthy tissue vs amyloid-affected tissue, drug binding to protein

## Export Settings

- Format: glTF Binary (.glb)
- Apply modifiers
- Materials: mainly solid colours with emission/glow (NOT photorealistic PBR)
- Centre each model at origin
- Keep under 5MB each
- Export path: `app/public/assets/models/custom/<filename>.glb`

## Coordination

After making changes, update the **Model Availability** table in `app/AGENT-LOG.md` with new sizes and a note about what changed. The Body Explorer (Agent D's code) loads these files via React Three Fiber's `useGLTF`.

## What You Might Be Asked To Do

The user may want to:
- **Restyle models** based on Kurzgesagt reference images they provide
- **Improve specific models** that don't look right in the app
- **Adjust materials/colours** to better match the palette
- **Reduce file sizes** if models are too heavy
- **Add visual details** like more amyloid deposits, better drug visualisation, etc.
- **Create models for other body regions** (lungs/Lorbrena, joints/Xeljanz — see PROJECT-BRIEF.md for priority list)

## What Was Done in This Session

1. **Restyled `heart-anatomical.glb`** — was too realistic/gory. Now has ghostly low-poly ribcage, clean Kurzgesagt style. Shrunk from 2.3M to 452K.
2. **Enhanced disease visibility** across all 5 disease models — bigger/brighter amyloid deposits, better colour contrast, added missing disease elements (fibrils on cellular, monomers on micro).
3. **Created 10 time-progression variants** — responding (drug works) and progressing (drug fails) for each zoom level except full body.
