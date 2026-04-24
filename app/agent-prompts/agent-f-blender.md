# Agent F — Blender 3D Models

> **FIRST:** Read `app/AGENT-LOG.md` — this is the shared communication log. After exporting each model, update the **Model Availability** table in that file to mark it as "ready" so Agent D (Body Explorer) knows to use it.

## Prerequisites

- Blender must be open with the BlenderMCP addon connected
- This agent uses the Blender MCP tools, not code editing

## What You're Creating

Kurzgesagt-style 3D models for the Body Explorer's 6 zoom levels. These get exported as .glb files and placed in `public/assets/models/custom/` in the project at `/Users/GURUNJ01/Documents/GitHub/personal/pfizer-ai-future-vision/app/public/assets/models/custom/`.

**Visual style: Kurzgesagt** — stylised, low-poly, bold vivid colours on dark backgrounds. NOT photorealistic. Think smooth shapes, flat shading or gentle gradients, bright saturated colours. Friendly but scientific.

## Colour Palette

Use these Kurzgesagt-inspired colours:
- Background/space: `#0B0E17`
- Primary blue: `#4FC3F7`
- Cyan glow: `#00E5FF`
- Pink/danger: `#FF4081`
- Green/health: `#69F0AE`
- Orange/warning: `#FF9100`
- Purple/synthetic: `#B388FF`
- Yellow/milestone: `#FFD740`
- Teal: `#64FFDA`

## Models to Create

Create each as a separate Blender scene, export as .glb:

### 1. `full-body.glb` — Full Human Figure
- Stylised translucent human figure (not anatomically detailed)
- Major organs faintly visible inside (especially heart glowing pink/red)
- Standing pose, slightly above centre
- Low-poly aesthetic with smooth shading
- The heart region should glow or pulse subtly to indicate disease site

### 2. `heart-anatomical.glb` — Chest Anatomy
- Ribcage partially transparent/wireframe
- Heart visible in centre of chest cavity
- Lungs flanking (translucent blue)
- Major blood vessels (aorta, vena cava) as tubes
- Kurzgesagt style: clean, stylised, not gory

### 3. `heart-organ.glb` — Heart Detail
- Stylised heart showing 4 chambers
- Visible valves between chambers
- Subtle amyloid deposits shown as slightly different coloured patches on walls
- Heart wall visibly thickened (the disease)
- Coronary arteries as thin tubes on surface
- Warm reds/pinks for healthy tissue, slightly purple/grey for amyloid areas

### 4. `heart-tissue.glb` — Cardiac Tissue Cross-Section
- Cross-section showing cardiac muscle fibres (elongated cylinders, aligned)
- Amyloid fibrils between fibres (thinner, lighter coloured threads)
- Capillaries (thin red/blue tubes winding through)
- Extracellular matrix as a subtle mesh/grid
- Scale: this is microscopic — make the fibres prominent

### 5. `heart-cellular.glb` — Single Cardiomyocyte
- One large elongated cell (the cardiomyocyte)
- Visible internal structures: nucleus (sphere), mitochondria (small bean shapes), sarcomeres (striped pattern)
- Intercalated disc at one end (connection to next cell)
- Amyloid fibrils pressing against the cell surface from outside
- Translucent cell membrane showing internal organelles

### 6. `heart-micro.glb` — TTR Protein & Drug Binding
- Central structure: TTR tetramer (4 subunits arranged in a ring/square)
- Two binding pockets visible in the centre
- Drug molecule (tafamidis) — small molecule sitting in one or both pockets
- Misfolded monomers nearby (partially unravelled shapes)
- Amyloid protofibril forming from misfolded pieces
- Very molecular/abstract — spheres and connections style

## Export Settings

- Format: glTF Binary (.glb)
- Apply modifiers
- Include materials and textures (keep them simple — mainly solid colours with slight emission/glow)
- Centre each model at origin
- Reasonable file size (under 5MB each ideally)
- Export each to: `app/public/assets/models/custom/<filename>.glb`

## Priority

Start with `heart-organ.glb` (most visually important) and `full-body.glb`, then work through the rest. The code already handles missing models gracefully — any model you finish improves the demo immediately.
