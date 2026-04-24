import { ZoomLevel } from '@/shared/types';
import type { ZoomLevelMeta } from '@/shared/types';

export const heartCellular: ZoomLevelMeta = {
  level: ZoomLevel.Tissue,
  label: 'Cardiomyocyte — Cellular Detail',
  description: 'A single cardiomyocyte surrounded by amyloid deposits, with visible sarcomeres, mitochondria, and intercalated discs.',
  modelPath: '/assets/models/custom/heart-cellular.glb',
  cameraPosition: {
    position: [0, 0, 2],
    target: [0, 0, 0],
    fov: 30,
    transitionDuration: 1.2,
  },
  hotspots: [
    {
      id: 'ttr-protein',
      label: 'TTR Protein & Drug Binding',
      position: [0.3, 0, 0.15],
      targetZoomLevel: ZoomLevel.Micro,
      targetRegion: 'ttr-binding',
    },
  ],
  narration: [
    // === UNTREATED ===
    {
      id: 'cellular-untreated',
      title: 'Inside the Heart Muscle Cell',
      body: 'Each cardiomyocyte is a molecular machine. Sarcomeres slide back and forth powered by ATP from densely packed mitochondria. Intercalated discs connect adjacent cells, synchronising contraction. In ATTR-CM, amyloid fibrils pressing against the cell surface trigger stress responses. Calcium handling becomes impaired — the cell can\'t relax properly between beats.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [0, 12],
      highlights: [
        { term: 'sarcomeres', definition: 'The basic contractile unit of muscle — actin and myosin filaments that slide past each other to produce contraction' },
        { term: 'diastolic dysfunction', definition: 'The heart can\'t relax and fill properly between beats — the hallmark of ATTR-CM' },
        { term: 'intercalated discs', definition: 'Specialised junctions between cardiomyocytes that transmit electrical and mechanical signals for coordinated contraction' },
      ],
    },

    // === DRUG — responding ===
    {
      id: 'cellular-drug-responding',
      title: 'Cell Recovery — Stress Signals Fading',
      body: 'With amyloid deposition halted, the cardiomyocyte is beginning to recover. Mechanical stress on the cell membrane has decreased. Calcium handling is improving — the sarcoplasmic reticulum is regaining its ability to sequester calcium between beats. Mitochondria are maintaining ATP production without the oxidative stress that was building under disease pressure. The computational model shows the cell returning toward normal contractile function.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [12, 36],
      responseType: 'responding',
    },
    // === DRUG — progressing ===
    {
      id: 'cellular-drug-progressing',
      title: 'Cell Under Siege — Damage Compounding',
      body: 'Amyloid fibrils continue to press against the cell membrane, and new deposits are accumulating. The cardiomyocyte is losing the battle. Calcium handling is further impaired — the cell spends more time in a contracted state, unable to relax. Mitochondria are showing signs of oxidative damage, reducing ATP output. The computational model detects early markers of apoptotic signalling — the cell may be approaching the point of no return.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [12, 36],
      responseType: 'progressing',
      highlights: [
        { term: 'apoptotic signalling', definition: 'Molecular pathways that trigger programmed cell death — once activated beyond a threshold, the process is irreversible' },
        { term: 'oxidative damage', definition: 'Damage to cellular components caused by reactive oxygen species — stressed mitochondria produce more ROS' },
      ],
    },
  ],
  metrics: [
    { label: 'Cell Stress', value: 'Elevated', trend: 'up', contextNote: 'Mechanical and oxidative stress from amyloid' },
    { label: 'Calcium Handling', value: 'Impaired', trend: 'down', contextNote: 'Contributing to diastolic dysfunction' },
    { label: 'Mitochondria', value: 'Functional', contextNote: 'ATP production maintained but under stress' },
  ],
  respondingMetrics: [
    { label: 'Cell Stress', value: 'Decreasing', trend: 'down', contextNote: 'Mechanical pressure easing' },
    { label: 'Calcium Handling', value: 'Improving', trend: 'up', contextNote: 'Relaxation normalising' },
    { label: 'Mitochondria', value: 'Recovering', trend: 'up', contextNote: 'Oxidative stress reducing' },
    { label: 'Contractile Force', value: 'Stabilised', trend: 'stable', contextNote: 'Sarcomere function maintained' },
  ],
  progressingMetrics: [
    { label: 'Cell Stress', value: 'Critical', trend: 'up', contextNote: 'Approaching damage threshold' },
    { label: 'Calcium Handling', value: 'Failing', trend: 'down', contextNote: 'Persistent contraction — can\'t relax' },
    { label: 'Mitochondria', value: 'Damaged', trend: 'down', contextNote: 'ATP output declining' },
    { label: 'Apoptosis Risk', value: 'Elevated', trend: 'up', contextNote: 'Early death signals detected' },
  ],
};
