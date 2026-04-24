import { ZoomLevel } from '@/shared/types';
import type { ZoomLevelMeta } from '@/shared/types';

export const heartFullBody: ZoomLevelMeta = {
  level: ZoomLevel.FullBody,
  label: 'Full Body Overview',
  description: 'Translucent human figure with cardiovascular system highlighted. The heart glows to indicate disease site.',
  modelPath: '/assets/models/custom/full-body.glb',
  cameraPosition: {
    position: [0, 5, 12],
    target: [0, 2, 0],
    fov: 50,
    transitionDuration: 0,
  },
  hotspots: [
    {
      id: 'chest-region',
      label: 'Chest / Heart',
      position: [0, 3.5, 0.5],
      targetZoomLevel: ZoomLevel.Anatomical,
      targetRegion: 'chest',
    },
  ],
  narration: [
    {
      id: 'full-body-untreated',
      title: 'The Computational Patient — Eleanor Voss',
      body: 'Eleanor is a 72-year-old woman with hereditary transthyretin amyloid cardiomyopathy (ATTR-CM). Her TTR Val122Ile mutation causes the transthyretin protein to misfold and deposit as amyloid in her heart tissue. The computational model captures her complete biology — genetics, organ function, comorbidities, medications — to predict how her disease will progress and how she will respond to treatment.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [0, 12],
      highlights: [
        { term: 'ATTR-CM', definition: 'A progressive disease where misfolded transthyretin protein accumulates in the heart, causing it to stiffen and fail' },
        { term: 'Val122Ile', definition: 'A TTR gene mutation carried by 3-4% of people of African ancestry, and found in other populations — causes hereditary ATTR' },
      ],
    },
    {
      id: 'full-body-drug',
      title: 'Vyndaqel (Tafamidis) — Treatment Initiated',
      body: 'Tafamidis is administered orally. The computational model tracks absorption from the gut, distribution through the bloodstream, metabolism in the liver, and accumulation at the target — the circulating TTR protein. Within hours, the drug begins stabilising TTR tetramers, preventing them from dissociating and misfolding.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [12, 36],
    },
    {
      id: 'full-body-post',
      title: 'Treatment Response — 6 Months',
      body: 'After six months of treatment, cardiac function has stabilised. NT-proBNP rise has been attenuated. The model predicts reduced hospitalisation risk and improved functional capacity. Importantly, it also flags a potential drug-drug interaction with her existing diuretic regimen that warrants monitoring.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [36, 52],
    },
  ],
  metrics: [
    { label: 'Age', value: '72', unit: 'years' },
    { label: 'Heart Function', value: '55%', trend: 'down', contextNote: 'Below normal (>60%)' },
    { label: 'Disease Stage', value: 'NYHA II' },
    { label: 'Comorbidities', value: '2', contextNote: 'Hypertension, T2 Diabetes' },
  ],
};
