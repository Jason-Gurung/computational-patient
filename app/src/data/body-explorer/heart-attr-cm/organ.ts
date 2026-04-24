import { ZoomLevel } from '@/shared/types';
import type { ZoomLevelMeta } from '@/shared/types';

export const heartOrgan: ZoomLevelMeta = {
  level: ZoomLevel.Organ,
  label: 'Heart — Organ Detail',
  description: 'The heart in detail, showing chambers, valves, and amyloid deposits visible as a subtle thickening and stiffness of the walls.',
  modelPath: '/assets/models/custom/heart-organ.glb',
  cameraPosition: {
    position: [0, 2, 5],
    target: [0, 0, 0],
    fov: 45,
    transitionDuration: 1.2,
  },
  hotspots: [
    {
      id: 'left-ventricle-wall',
      label: 'Left Ventricle Wall',
      position: [-0.5, 0.2, 0.3],
      targetZoomLevel: ZoomLevel.Tissue,
      targetRegion: 'left-ventricle',
    },
  ],
  narration: [
    {
      id: 'organ-untreated',
      title: 'ATTR Cardiomyopathy — The Stiffening Heart',
      body: 'Misfolded transthyretin protein deposits between cardiac muscle fibres, progressively stiffening the heart wall. The left ventricle thickens but weakens — it can fill with blood but struggles to pump it out efficiently. Ejection fraction drops. NT-proBNP rises as the heart strains. The computational model tracks amyloid burden at sub-millimetre resolution, predicting how wall thickness correlates with functional decline.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [0, 12],
      highlights: [
        { term: 'transthyretin', definition: 'A transport protein made by the liver that can misfold and form amyloid fibrils' },
        { term: 'ejection fraction', definition: 'The percentage of blood pumped out of the heart with each beat — normal is 55-70%' },
        { term: 'NT-proBNP', definition: 'A blood marker that rises when the heart is under strain — used to monitor heart failure severity' },
      ],
    },
    {
      id: 'organ-drug',
      title: 'Vyndaqel (Tafamidis) — Stabilising the Protein',
      body: 'Tafamidis binds to transthyretin in the blood, stabilising its tetrameric structure and preventing it from dissociating into monomers that misfold. New amyloid deposits slow dramatically. The existing deposits remain, but the heart stops getting worse. Over months, cardiac function stabilises — the model predicts a plateau in wall thickness and a gradual improvement in NT-proBNP.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [12, 36],
      highlights: [
        { term: 'tafamidis', definition: 'A TTR stabiliser that binds to the thyroxine-binding sites of transthyretin, preventing dissociation and amyloid formation' },
        { term: 'tetrameric', definition: 'TTR normally exists as a tetramer (four subunits). When it falls apart, the individual monomers can misfold into amyloid' },
      ],
    },
    {
      id: 'organ-post',
      title: 'Post-Treatment — Stabilised Heart',
      body: 'At 12 months, the computational model shows cardiac function has stabilised. Wall thickness has plateaued at 14mm rather than continuing to increase. Ejection fraction has held at 48%. The model also flags that Eleanor\'s renal function should be monitored — her baseline eGFR of 64 means drug clearance may be slightly slower, maintaining higher plasma levels.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [36, 52],
    },
  ],
  metrics: [
    { label: 'Ejection Fraction', value: '48%', trend: 'down', contextNote: 'Declining without treatment' },
    { label: 'NT-proBNP', value: '1,847 pg/mL', trend: 'up', contextNote: 'Rising — cardiac strain increasing' },
    { label: 'Wall Thickness', value: '14mm', trend: 'up', contextNote: 'Amyloid infiltration progressing' },
    { label: 'NYHA Class', value: 'II', contextNote: 'Comfortable at rest, symptoms with ordinary activity' },
  ],
};
