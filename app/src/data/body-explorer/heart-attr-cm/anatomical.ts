import { ZoomLevel } from '@/shared/types';
import type { ZoomLevelMeta } from '@/shared/types';

export const heartAnatomical: ZoomLevelMeta = {
  level: ZoomLevel.Anatomical,
  label: 'Chest — Anatomical View',
  description: 'Ribcage and sternum partially transparent, revealing the heart in its pericardial sac surrounded by the lungs.',
  modelPath: '/assets/models/custom/heart-anatomical.glb',
  cameraPosition: {
    position: [0, 3.5, 6],
    target: [0, 3.5, 0],
    fov: 40,
    transitionDuration: 1.2,
  },
  hotspots: [
    {
      id: 'heart-organ',
      label: 'Heart',
      position: [-0.1, 0, 0.2],
      targetZoomLevel: ZoomLevel.Organ,
      targetRegion: 'heart',
    },
  ],
  narration: [
    {
      id: 'anatomical-untreated',
      title: 'The Heart in Context',
      body: 'The heart sits in the mediastinum, enclosed in the pericardium. In ATTR-CM, amyloid deposits infiltrate the myocardium — the thick muscular layer that does the pumping. The computational model captures how the heart interacts with surrounding structures: the lungs, the aorta, and the coronary arteries feeding the heart muscle itself.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Anatomical,
      timeRange: [0, 12],
      highlights: [
        { term: 'myocardium', definition: 'The muscular middle layer of the heart wall — the part that contracts to pump blood' },
        { term: 'pericardium', definition: 'A double-walled sac containing the heart and the roots of the great vessels' },
      ],
    },
    {
      id: 'anatomical-drug-responding',
      title: 'Treatment Active — Heart Stabilising',
      body: 'The computational model shows the heart responding to tafamidis therapy. Amyloid infiltration of the myocardium has slowed. The pericardial effusion is stable. Importantly, the surrounding organs remain unaffected — lung function, aortic compliance, and coronary perfusion are all within expected parameters. The model predicts the heart will maintain its current function.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Anatomical,
      timeRange: [12, 36],
      responseType: 'responding',
    },
    {
      id: 'anatomical-drug-progressing',
      title: 'Treatment Active — Heart Still Declining',
      body: 'Despite treatment, the computational model shows ongoing amyloid infiltration of the myocardium. The heart continues to enlarge. Pericardial effusion is increasing — fluid accumulating around the heart as it struggles. The model also flags secondary effects: pulmonary congestion is developing as the weakened left ventricle backs up blood into the lungs.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Anatomical,
      timeRange: [12, 36],
      responseType: 'progressing',
      highlights: [
        { term: 'pericardial effusion', definition: 'Fluid buildup around the heart — worsening effusion indicates increasing cardiac dysfunction' },
        { term: 'pulmonary congestion', definition: 'Blood backing up into the lungs due to poor left ventricle function — causes breathlessness' },
      ],
    },
  ],
  metrics: [
    { label: 'Heart Size', value: 'Enlarged', trend: 'up', contextNote: 'Amyloid infiltration causing hypertrophy' },
    { label: 'Pericardial Effusion', value: 'Mild', contextNote: 'Small fluid collection — common in ATTR-CM' },
  ],
  respondingMetrics: [
    { label: 'Heart Size', value: 'Stable', trend: 'stable', contextNote: 'No further enlargement' },
    { label: 'Pericardial Effusion', value: 'Stable', trend: 'stable', contextNote: 'Not worsening' },
    { label: 'Lung Function', value: 'Normal', contextNote: 'No secondary congestion' },
  ],
  progressingMetrics: [
    { label: 'Heart Size', value: 'Increasing', trend: 'up', contextNote: 'Progressive hypertrophy' },
    { label: 'Pericardial Effusion', value: 'Moderate', trend: 'up', contextNote: 'Worsening fluid collection' },
    { label: 'Lung Status', value: 'Congestion', trend: 'down', contextNote: 'Early pulmonary backup' },
  ],
};
