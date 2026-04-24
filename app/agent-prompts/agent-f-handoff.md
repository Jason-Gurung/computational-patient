# Agent F — Blender 3D Models (Handoff / Continuation)

> You are continuing work that a previous Agent F session completed. Read this entire handoff before doing anything.

## Project Context

This is a **vision pitch demo for Pfizer** called "The Computational Patient" — a hardcoded React frontend mockup (not a real product). The centrepiece is a **Body Explorer** that zooms through 6 levels of human biology for the heart/ATTR-CM disease case. You are creating the 3D models for that explorer.

**Visual style: Kurzgesagt** (the YouTube channel) — stylised, low-poly, bold vivid colours on dark backgrounds. NOT photorealistic. Smooth shapes, flat shading or gentle gradients, bright saturated colours. Friendly but scientific.

## What Was Already Done

All 6 models were created in two iterations:

### v1 (superseded) — Blender primitives only
- Too crude/basic — looked like raw geometric shapes, not Kurzgesagt quality

### v2 (current, in production) — Sketchfab open-source bases + Kurzgesagt restyle
All 6 .glb files are exported and live at `app/public/assets/models/custom/`:

| Model | File | Size | Source & Notes |
|-------|------|------|----------------|
| Full Body | `full-body.glb` | 1.7M | Sketchfab low-poly male (3.7K faces), cyan translucent. Organs inside: pink heart, cyan lungs, brown liver, green stomach, red kidneys, purple brain, teal spine |
| Chest Anatomy | `heart-anatomical.glb` | 2.3M | Sketchfab anatomy torso, open chest with ribs/heart/lungs. Original texture kept, saturation boosted 2.5×, emission added |
| Heart Organ | `heart-organ.glb` | 1.1M | Sketchfab detailed heart (29K faces) by sv1nks. Bold saturated red + emission. 7 purple amyloid deposits shrinkwrapped to surface |
| Cardiac Tissue | `heart-tissue.glb` | 1.8M | Built from scratch. 15 muscle fibres with sarcomere bands, 25 glowing purple amyloid fibrils, 4 capillaries (red/blue), teal ECM wireframe |
| Cardiomyocyte | `heart-cellular.glb` | 2.8M | Sketchfab animal cell by LauriPurhonen (99K faces). 11 materials restyled: cyan membrane, pink nucleus, gold Golgi, green mitochondria, blue ER |
| TTR Protein | `heart-micro.glb` | 2.8M | Sketchfab GABA-A receptor by axonology (252K→135K faces decimated). Subunits: alpha→cyan, beta→teal, gamma→purple. Ligand→bright green (tafamidis drug) |

**Total: ~11MB.** All materials use bold colours with emission for glow. All models centred at origin. Sketchfab models are CC Attribution licensed.

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
2. **Chest Anatomy** — Ribcage, heart, lungs, major blood vessels. Clean, stylised, not gory.
3. **Heart Organ** — 4-chambered heart with valves, coronary arteries, amyloid deposits (the disease).
4. **Cardiac Tissue** — Cross-section of muscle fibres with amyloid fibrils between them, capillaries, extracellular matrix.
5. **Single Cardiomyocyte** — One heart muscle cell showing nucleus, mitochondria, sarcomeres, intercalated disc, amyloid fibrils pressing from outside.
6. **TTR Protein & Drug** — TTR tetramer (4 subunits), binding pockets, tafamidis drug molecule, misfolded monomers, amyloid protofibril chain.

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

Ask the user what they'd like to change before starting work.
