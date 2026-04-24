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
      position: [0.05, 0.25, 0.05],
      targetZoomLevel: ZoomLevel.Anatomical,
      targetRegion: 'chest',
    },
  ],
  narration: [
    // === UNTREATED — shared by all patients ===
    {
      id: 'full-body-untreated',
      title: 'The Computational Patient',
      body: 'This patient has hereditary transthyretin amyloid cardiomyopathy (ATTR-CM). The TTR Val122Ile mutation causes the transthyretin protein to misfold and deposit as amyloid in the heart tissue. The computational model captures the patient\'s complete biology — genetics, organ function, comorbidities, medications — to predict disease progression and treatment response.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [0, 12],
      highlights: [
        { term: 'ATTR-CM', definition: 'A progressive disease where misfolded transthyretin protein accumulates in the heart, causing it to stiffen and fail' },
        { term: 'Val122Ile', definition: 'A TTR gene mutation carried by 3-4% of people of African ancestry, and found in other populations — causes hereditary ATTR' },
      ],
    },

    // === DRUG PHASE — responding ===
    {
      id: 'full-body-drug-responding',
      title: 'Vyndaqel (Tafamidis) — Responding Well',
      body: 'Tafamidis is being absorbed effectively. The computational model shows strong binding to circulating TTR tetramers within hours, stabilising them before they can dissociate and misfold. This patient\'s CYP3A4 metabolism profile allows optimal drug levels to build up. The model predicts a high probability of cardiac stabilisation.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [12, 36],
      responseType: 'responding',
    },
    // === DRUG PHASE — progressing ===
    {
      id: 'full-body-drug-progressing',
      title: 'Vyndaqel (Tafamidis) — Suboptimal Response',
      body: 'Tafamidis has been administered, but the computational model detects a suboptimal response. Drug plasma levels are adequate, yet TTR stabilisation is below the therapeutic threshold. The model identifies contributing factors: the patient\'s advanced disease stage means existing amyloid burden is too high for stabilisation alone to arrest progression. New deposits continue to form faster than the drug can prevent.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [12, 36],
      responseType: 'progressing',
      highlights: [
        { term: 'suboptimal response', definition: 'The drug is reaching its target but is insufficient to halt disease progression — common in advanced-stage ATTR-CM' },
      ],
    },

    // === POST-TREATMENT — responding ===
    {
      id: 'full-body-post-responding',
      title: 'Treatment Success — Stabilised',
      body: 'After six months of treatment, cardiac function has stabilised. NT-proBNP has plateaued. The model predicts reduced hospitalisation risk, maintained exercise capacity, and a significantly improved long-term prognosis. The computational patient continues to be monitored for drug-drug interactions with existing medications.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [36, 52],
      responseType: 'responding',
    },
    // === POST-TREATMENT — progressing ===
    {
      id: 'full-body-post-progressing',
      title: 'Disease Progressing Despite Treatment',
      body: 'At six months, the computational model confirms continued cardiac decline. NT-proBNP continues to rise. Ejection fraction has dropped further. The model flags this patient for clinical review — alternative approaches may be needed: dose adjustment, combination therapy with a TTR gene silencer, or enrolment in a next-generation trial. The simulation explores each scenario to identify the most promising path.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.FullBody,
      timeRange: [36, 52],
      responseType: 'progressing',
      highlights: [
        { term: 'gene silencer', definition: 'RNA-based therapies (siRNA or ASO) that reduce TTR production at the source — the liver — rather than stabilising existing protein' },
      ],
    },
  ],
  metrics: [
    { label: 'Age', value: '72', unit: 'years' },
    { label: 'Heart Function', value: '55%', trend: 'down', contextNote: 'Below normal (>60%)' },
    { label: 'Disease Stage', value: 'NYHA II' },
    { label: 'Comorbidities', value: '2', contextNote: 'Hypertension, T2 Diabetes' },
  ],
  respondingMetrics: [
    { label: 'Heart Function', value: '55%', trend: 'stable', contextNote: 'Stabilised with treatment' },
    { label: 'NT-proBNP', value: '1,620 pg/mL', trend: 'down', contextNote: 'Declining — cardiac strain easing' },
    { label: 'Disease Stage', value: 'NYHA II', contextNote: 'Maintained — no progression' },
    { label: 'Hospitalisation Risk', value: 'Low', trend: 'down', contextNote: 'Model predicts reduced admissions' },
  ],
  progressingMetrics: [
    { label: 'Heart Function', value: '42%', trend: 'down', contextNote: 'Continuing to decline' },
    { label: 'NT-proBNP', value: '3,280 pg/mL', trend: 'up', contextNote: 'Rising — worsening cardiac strain' },
    { label: 'Disease Stage', value: 'NYHA III', trend: 'up', contextNote: 'Progressed from Class II' },
    { label: 'Hospitalisation Risk', value: 'High', trend: 'up', contextNote: 'Model flags elevated admission risk' },
  ],
};
