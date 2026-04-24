# Agent D — Body Explorer

> **FIRST:** Read `app/agent-prompts/_shared-preamble.md` and follow all instructions there before starting.

## Setup

```
cd app
npm run dev
```

Read these files for context (in addition to those listed in the shared preamble):
- `app/src/data/body-explorer/heart-attr-cm/` — ALL files in this folder (6 zoom levels of narration + metrics)
- `app/src/data/patients/patient-001.ts` — Eleanor Voss (the hero patient)
- `app/src/shared/types/body-explorer.ts` — ZoomLevel, ZoomLevelMeta, CameraConfig, Hotspot
- `app/src/shared/constants/zoom-levels.ts` — zoom level labels and ordering
- `app/src/lib/model-loader.ts` — model path resolution

**CHECK `app/AGENT-LOG.md` Model Availability table** — if Agent F (Blender) has marked any models as "ready", load the .glb instead of using placeholder geometry.

## What You're Building

The **3D body explorer** — the centrepiece of the entire demo. Users zoom from a full human body down to molecular drug-binding sites, with narration and metrics at every level. This is the thing that makes people say "wow."

The hero path is **Heart / Vyndaqel / ATTR-CM** through patient Eleanor Voss. All 6 zoom levels have complete narration data already written.

**Visual style: Kurzgesagt** — stylised, bold colours on dark backgrounds, NOT photorealistic.

## Your Territory

You ONLY write files inside `app/src/sections/body-explorer/`. Never touch files outside this folder.

Import only from:
- `@/shared/components` — NarrationPanel, MetricsCard, TimeControls, PageShell
- `@/shared/design-tokens` — colours, animations
- `@/shared/constants` — zoom levels, routes
- `@/shared/hooks` — useSimulationTime
- `@/shared/types` — ZoomLevel, ZoomLevelMeta, PatientProfile, etc.
- `@/data/body-explorer/heart-attr-cm` — zoom level data
- `@/data/patients` — patient profiles (getPatientById)
- `@/lib/*` — model-loader, format
- Third-party: `@react-three/fiber`, `@react-three/drei`, `three`, `framer-motion`, `react-router-dom`, `lucide-react`

## Components to Build

Inside `app/src/sections/body-explorer/`:

1. **Scene** — The R3F `<Canvas>` wrapper
   - Dark background matching Kurzgesagt palette
   - Appropriate lighting (ambient + directional)
   - Environment setup (subtle gradient or star field)

2. **ModelViewer** — Loads and displays the 3D model for the current zoom level
   - Uses `useGLTF` from drei to load .glb files
   - Path comes from the ZoomLevelMeta.modelPath
   - **IMPORTANT**: Models don't exist yet. Create colourful placeholder geometry (spheres, boxes, abstract shapes) that represents each zoom level. Use Kurzgesagt-style colours.
     - Full body: translucent humanoid shape with glowing heart region
     - Anatomical: chest cavity with simplified ribcage
     - Organ: stylised heart shape with visible chambers
     - Tissue: cross-section with fibre-like structures
     - Cellular: large cell with organelles
     - Micro: molecular structure (spheres and bonds)
   - When real .glb models are added later, just swap the placeholder for `useGLTF`

3. **CameraController** — Animated camera transitions
   - Each zoom level has a camera config (position, target, fov) in the data
   - Smoothly animate between positions when changing zoom levels
   - Use drei's `CameraControls` or manual spring animations
   - Transition duration ~1.2 seconds with easing

4. **HotspotOverlay** — Clickable regions to zoom deeper
   - HTML overlay positioned in 3D space (use drei's `Html` component)
   - Each hotspot is a glowing circle/button with a label
   - Clicking navigates to the next zoom level
   - Only show hotspots for the current zoom level

5. **ZoomBreadcrumb** — Navigation trail
   - "Full Body > Chest > Heart > Tissue > Cell > Molecular"
   - Click any level to jump back
   - Shows current depth (1-6)
   - Positioned as a UI overlay (not in 3D space)

6. **PatientProfileSidebar** — Patient info panel
   - Shows at full-body level: name, age, sex, ancestry, genetics, comorbidities, medications
   - Collapses or simplifies at deeper zoom levels
   - Data comes from `getPatientById(patientId)` using the URL param

7. **NarrationOverlay** — AI text narration panel
   - Uses shared `NarrationPanel` component
   - Content changes based on current zoom level AND current treatment phase
   - Treatment phase determined by simulation time (untreated → drug-administered → post-treatment)
   - Positioned as a side panel or floating overlay

8. **MetricsPanel** — Contextual metrics
   - Uses shared `MetricsCard` component
   - Metrics change per zoom level (data in each zoom level's `metrics` array)
   - Show trend arrows (up/down/stable)

9. **TimelineMilestones** — Treatment phase indicator
   - Show the three phases: Untreated → Drug Administered → Post-Treatment
   - Use shared `TimeControls` for time scrubbing
   - Current phase highlighted based on simulation time
   - Time ranges defined in narration data

10. **ZoomLevelIndicator** — Visual depth indicator
    - Small UI showing "Level 4 of 6" or a vertical scale
    - Helps user understand how deep they are

## Page Layout

- **Full viewport** — the 3D scene takes most of the screen
- **Left sidebar**: PatientProfileSidebar (collapsible)
- **Right panel**: NarrationOverlay + MetricsPanel
- **Top**: ZoomBreadcrumb
- **Bottom**: TimelineMilestones / TimeControls
- **In 3D space**: HotspotOverlay markers

## URL Pattern

The page is at `/trial/patient/:patientId`. Use `useParams` to get the patientId and load the correct patient data. For now, patient-001 is the only one with full explorer data.

## Placeholder Strategy for 3D Models

Since no .glb models exist yet, create **procedural Three.js geometry** as placeholders:

```tsx
// Example: a stylised heart placeholder
function HeartPlaceholder() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#FF4081" transparent opacity={0.8} />
      </mesh>
      {/* Add more shapes to suggest the organ */}
    </group>
  );
}
```

Make the placeholders look intentional — use Kurzgesagt palette colours, glowing materials, abstract but recognisable shapes. They should look like a stylised artistic representation, not a missing texture.
