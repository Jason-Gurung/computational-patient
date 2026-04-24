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
      position: [-0.25, -0.1, 0.2],
      targetZoomLevel: ZoomLevel.Tissue,
      targetRegion: 'left-ventricle',
    },
  ],
  narration: [
    // === UNTREATED ===
    {
      id: 'organ-untreated',
      title: 'ATTR Cardiomyopathy — The Stiffening Heart',
      body: 'Misfolded transthyretin protein deposits between cardiac muscle fibres, progressively stiffening the heart wall. The left ventricle thickens but weakens — it can fill with blood but struggles to pump it out efficiently. Ejection fraction drops. NT-proBNP rises as the heart strains.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [0, 12],
      highlights: [
        { term: 'transthyretin', definition: 'A transport protein made by the liver that can misfold and form amyloid fibrils' },
        { term: 'ejection fraction', definition: 'The percentage of blood pumped out of the heart with each beat — normal is 55-70%' },
        { term: 'NT-proBNP', definition: 'A blood marker that rises when the heart is under strain — used to monitor heart failure severity' },
      ],
    },

    // === DRUG — responding ===
    {
      id: 'organ-drug-responding',
      title: 'Drug Response — Deposits Slowing',
      body: 'Tafamidis is stabilising circulating TTR tetramers effectively. The computational model shows new amyloid deposit formation has slowed dramatically. Existing deposits remain, but the heart is no longer getting worse. Wall thickness has plateaued. The model predicts ejection fraction will stabilise within weeks as the cardiac muscle adapts to the reduced amyloid burden growth rate.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [12, 36],
      responseType: 'responding',
      highlights: [
        { term: 'tafamidis', definition: 'A TTR stabiliser that binds to the thyroxine-binding sites of transthyretin, preventing dissociation and amyloid formation' },
      ],
    },
    // === DRUG — progressing ===
    {
      id: 'organ-drug-progressing',
      title: 'Drug Response — Deposits Continuing',
      body: 'Despite tafamidis therapy, the computational model shows amyloid deposits continue to accumulate. The patient\'s high baseline amyloid burden and advanced disease stage mean that even with partial TTR stabilisation, the rate of new fibril deposition still exceeds the heart\'s ability to compensate. Wall thickness is increasing. The model predicts further ejection fraction decline if the current regimen continues unchanged.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [12, 36],
      responseType: 'progressing',
      highlights: [
        { term: 'amyloid burden', definition: 'The total volume of amyloid protein deposited in the heart — higher burden at treatment start predicts poorer response' },
      ],
    },

    // === POST — responding ===
    {
      id: 'organ-post-responding',
      title: 'Stabilised Heart — Treatment Working',
      body: 'At 12 months, cardiac function has stabilised. Wall thickness has plateaued at 14mm. Ejection fraction holds at 48% — no further decline. NT-proBNP has begun to decrease, indicating reduced cardiac strain. The computational model predicts maintained function for the foreseeable future with continued therapy.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [36, 52],
      responseType: 'responding',
    },
    // === POST — progressing ===
    {
      id: 'organ-post-progressing',
      title: 'Heart Declining — Treatment Insufficient',
      body: 'At 12 months, the computational model confirms progressive cardiac deterioration. Wall thickness has increased to 17mm. Ejection fraction has fallen to 35%. NT-proBNP continues to climb. The model simulates alternative interventions: a TTR gene silencer (patisiran/vutrisiran) that reduces TTR production at the source shows a more favourable predicted trajectory for this patient.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Organ,
      timeRange: [36, 52],
      responseType: 'progressing',
      highlights: [
        { term: 'gene silencer', definition: 'RNA interference therapy that blocks TTR protein production in the liver, reducing the amount of misfolding-prone protein in circulation' },
      ],
    },
  ],
  metrics: [
    { label: 'Ejection Fraction', value: '48%', trend: 'down', contextNote: 'Declining without treatment' },
    { label: 'NT-proBNP', value: '1,847 pg/mL', trend: 'up', contextNote: 'Rising — cardiac strain increasing' },
    { label: 'Wall Thickness', value: '14mm', trend: 'up', contextNote: 'Amyloid infiltration progressing' },
    { label: 'NYHA Class', value: 'II', contextNote: 'Comfortable at rest, symptoms with ordinary activity' },
  ],
  respondingMetrics: [
    { label: 'Ejection Fraction', value: '48%', trend: 'stable', contextNote: 'Stabilised — no further decline' },
    { label: 'NT-proBNP', value: '1,420 pg/mL', trend: 'down', contextNote: 'Decreasing — cardiac strain easing' },
    { label: 'Wall Thickness', value: '14mm', trend: 'stable', contextNote: 'Plateaued — no new deposits' },
    { label: 'NYHA Class', value: 'II', contextNote: 'Maintained — functional capacity stable' },
  ],
  progressingMetrics: [
    { label: 'Ejection Fraction', value: '35%', trend: 'down', contextNote: 'Continuing to decline' },
    { label: 'NT-proBNP', value: '4,560 pg/mL', trend: 'up', contextNote: 'Rising sharply — severe strain' },
    { label: 'Wall Thickness', value: '17mm', trend: 'up', contextNote: 'Amyloid burden increasing' },
    { label: 'NYHA Class', value: 'III', trend: 'up', contextNote: 'Symptoms with minimal activity' },
  ],
};
