import { ZoomLevel } from '@/shared/types';
import type { ZoomLevelMeta } from '@/shared/types';

export const heartTissue: ZoomLevelMeta = {
  level: ZoomLevel.Tissue,
  label: 'Cardiac Tissue — Left Ventricle Wall',
  description: 'Cross-section of the left ventricle wall showing cardiac muscle fibres with amyloid deposits between them, capillaries, and connective tissue.',
  modelPath: '/assets/models/custom/heart-tissue.glb',
  cameraPosition: {
    position: [0, 0, 3],
    target: [0, 0, 0],
    fov: 35,
    transitionDuration: 1.2,
  },
  hotspots: [
    {
      id: 'cardiomyocyte',
      label: 'Cardiomyocyte',
      position: [0.2, 0.1, 0.5],
      targetZoomLevel: ZoomLevel.Micro,
      targetRegion: 'cardiomyocyte',
    },
  ],
  narration: [
    {
      id: 'tissue-untreated',
      title: 'The Cellular Neighbourhood Under Siege',
      body: 'At the tissue level, the damage becomes visible. Amyloid fibrils — long, insoluble protein threads — weave between cardiomyocytes (heart muscle cells), physically separating them and disrupting their coordinated contraction. Capillaries are compressed, reducing oxygen delivery. The extracellular matrix, normally a flexible scaffold, becomes rigid with amyloid deposits. The computational model quantifies amyloid burden as a percentage of tissue volume — Eleanor\'s is at 18%, above the 15% threshold where functional impairment accelerates.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [0, 12],
      highlights: [
        { term: 'cardiomyocytes', definition: 'Heart muscle cells — they contract in unison to pump blood. Each is about 100 micrometres long.' },
        { term: 'amyloid fibrils', definition: 'Misfolded protein chains that stack into long, insoluble fibres resistant to the body\'s normal clearance mechanisms' },
        { term: 'extracellular matrix', definition: 'The structural scaffold between cells — provides support, elasticity, and signalling cues' },
      ],
    },
    {
      id: 'tissue-drug',
      title: 'Treatment Effect at the Tissue Level',
      body: 'With tafamidis stabilising circulating TTR, the rate of new fibril deposition drops sharply. Existing fibrils persist — the body clears them very slowly, if at all — but no new ones are forming. The computational model shows amyloid volume fraction holding steady at 18% rather than the projected 24% without treatment. Capillary compression stabilises. Cardiomyocytes maintain their contractile function.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [12, 36],
    },
  ],
  metrics: [
    { label: 'Amyloid Volume', value: '18%', trend: 'up', contextNote: 'Above 15% threshold for functional impairment' },
    { label: 'Capillary Density', value: '72%', trend: 'down', contextNote: 'Reduced by fibril compression' },
    { label: 'Fibre Alignment', value: 'Disrupted', contextNote: 'Amyloid displacing normal muscle architecture' },
  ],
};
