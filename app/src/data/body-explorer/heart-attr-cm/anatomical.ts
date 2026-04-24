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
      position: [-0.3, 3.5, 0.8],
      targetZoomLevel: ZoomLevel.Organ,
      targetRegion: 'heart',
    },
  ],
  narration: [
    {
      id: 'anatomical-untreated',
      title: 'The Heart in Context',
      body: 'The heart sits in the mediastinum, enclosed in the pericardium. In ATTR-CM, amyloid deposits infiltrate the myocardium — the thick muscular layer that does the pumping. The computational model captures not just the heart in isolation, but how it interacts with surrounding structures: the lungs receiving deoxygenated blood, the aorta distributing oxygenated blood, and the coronary arteries feeding the heart muscle itself.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Anatomical,
      timeRange: [0, 12],
      highlights: [
        { term: 'myocardium', definition: 'The muscular middle layer of the heart wall — the part that contracts to pump blood' },
        { term: 'pericardium', definition: 'A double-walled sac containing the heart and the roots of the great vessels' },
      ],
    },
  ],
  metrics: [
    { label: 'Heart Size', value: 'Enlarged', trend: 'up', contextNote: 'Amyloid infiltration causing hypertrophy' },
    { label: 'Pericardial Effusion', value: 'Mild', contextNote: 'Small fluid collection — common in ATTR-CM' },
  ],
};
