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
      position: [0.15, 0.05, 0.2],
      targetZoomLevel: ZoomLevel.Micro,
      targetRegion: 'cardiomyocyte',
    },
  ],
  narration: [
    // === UNTREATED ===
    {
      id: 'tissue-untreated',
      title: 'The Cellular Neighbourhood Under Siege',
      body: 'At the tissue level, the damage becomes visible. Amyloid fibrils — long, insoluble protein threads — weave between cardiomyocytes, physically separating them and disrupting their coordinated contraction. Capillaries are compressed, reducing oxygen delivery. The extracellular matrix becomes rigid with amyloid deposits.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [0, 12],
      highlights: [
        { term: 'cardiomyocytes', definition: 'Heart muscle cells — they contract in unison to pump blood. Each is about 100 micrometres long.' },
        { term: 'amyloid fibrils', definition: 'Misfolded protein chains that stack into long, insoluble fibres resistant to the body\'s normal clearance mechanisms' },
        { term: 'extracellular matrix', definition: 'The structural scaffold between cells — provides support, elasticity, and signalling cues' },
      ],
    },

    // === DRUG — responding ===
    {
      id: 'tissue-drug-responding',
      title: 'Treatment Effect — Fibrils No Longer Growing',
      body: 'With tafamidis stabilising circulating TTR, the rate of new fibril deposition has dropped sharply. Existing fibrils persist — the body clears them very slowly — but critically, no new ones are forming. The computational model shows amyloid volume fraction holding steady at 18% rather than the projected 24% without treatment. Capillary compression has stabilised. Cardiomyocytes maintain their contractile function.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [12, 36],
      responseType: 'responding',
    },
    // === DRUG — progressing ===
    {
      id: 'tissue-drug-progressing',
      title: 'Treatment Effect — Fibrils Still Accumulating',
      body: 'Despite tafamidis therapy, amyloid fibrils continue to grow between cardiomyocytes. The drug has slowed — but not stopped — new fibril deposition. The computational model shows amyloid volume fraction rising from 18% toward 22%. Capillaries are increasingly compressed. The muscle fibres are being physically pushed apart, weakening their coordinated contraction. The tissue architecture is progressively deteriorating.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [12, 36],
      responseType: 'progressing',
    },

    // === POST — responding ===
    {
      id: 'tissue-post-responding',
      title: 'Tissue Stabilised — Architecture Preserved',
      body: 'At 12 months, amyloid volume fraction remains at 18% — no increase since treatment began. Cardiomyocytes have adapted to the existing fibril burden. Capillary density has stabilised at 72%. The computational model suggests that over years of continued treatment, natural macrophage-mediated clearance may gradually reduce amyloid burden, though this process is very slow.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [36, 52],
      responseType: 'responding',
    },
    // === POST — progressing ===
    {
      id: 'tissue-post-progressing',
      title: 'Tissue Deterioration — Structural Damage Advancing',
      body: 'At 12 months, amyloid volume fraction has risen to 26% — well above the critical threshold. Cardiomyocytes are severely compromised: many show signs of atrophy and apoptosis. Capillary density has dropped to 58%. The computational model predicts that without a change in therapy, the remaining muscle fibres will be unable to sustain adequate cardiac output. Alternative therapeutic strategies are being simulated.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [36, 52],
      responseType: 'progressing',
      highlights: [
        { term: 'apoptosis', definition: 'Programmed cell death — cardiomyocytes under prolonged stress activate self-destruction pathways' },
      ],
    },
  ],
  metrics: [
    { label: 'Amyloid Volume', value: '18%', trend: 'up', contextNote: 'Above 15% threshold for functional impairment' },
    { label: 'Capillary Density', value: '72%', trend: 'down', contextNote: 'Reduced by fibril compression' },
    { label: 'Fibre Alignment', value: 'Disrupted', contextNote: 'Amyloid displacing normal muscle architecture' },
  ],
  respondingMetrics: [
    { label: 'Amyloid Volume', value: '18%', trend: 'stable', contextNote: 'Held steady — no new deposits' },
    { label: 'Capillary Density', value: '72%', trend: 'stable', contextNote: 'Compression halted' },
    { label: 'Fibre Alignment', value: 'Stabilised', contextNote: 'No further disruption' },
    { label: 'New Fibril Rate', value: 'Near zero', trend: 'down', contextNote: 'Treatment blocking formation' },
  ],
  progressingMetrics: [
    { label: 'Amyloid Volume', value: '26%', trend: 'up', contextNote: 'Rising past critical threshold' },
    { label: 'Capillary Density', value: '58%', trend: 'down', contextNote: 'Severe compression' },
    { label: 'Fibre Alignment', value: 'Severely disrupted', trend: 'down', contextNote: 'Architecture breaking down' },
    { label: 'Cell Viability', value: 'Declining', trend: 'down', contextNote: 'Cardiomyocyte atrophy observed' },
  ],
};
