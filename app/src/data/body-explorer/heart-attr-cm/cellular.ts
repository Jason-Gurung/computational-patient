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
      position: [0.5, 0, 0.3],
      targetZoomLevel: ZoomLevel.Micro,
      targetRegion: 'ttr-binding',
    },
  ],
  narration: [
    {
      id: 'cellular-untreated',
      title: 'Inside the Heart Muscle Cell',
      body: 'Each cardiomyocyte is a molecular machine. Sarcomeres — the contractile units — slide back and forth powered by ATP from densely packed mitochondria. Intercalated discs connect adjacent cells, synchronising their contraction into a coordinated heartbeat. In ATTR-CM, the amyloid fibrils pressing against the cell surface trigger stress responses. Calcium handling becomes impaired — the cell can\'t relax properly between beats, contributing to the diastolic dysfunction that defines this disease.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Tissue,
      timeRange: [0, 12],
      highlights: [
        { term: 'sarcomeres', definition: 'The basic contractile unit of muscle — actin and myosin filaments that slide past each other to produce contraction' },
        { term: 'diastolic dysfunction', definition: 'The heart can\'t relax and fill properly between beats — the hallmark of ATTR-CM, distinct from systolic dysfunction where it can\'t pump' },
        { term: 'intercalated discs', definition: 'Specialised junctions between cardiomyocytes that transmit electrical and mechanical signals for coordinated contraction' },
      ],
    },
  ],
  metrics: [
    { label: 'Cell Stress', value: 'Elevated', trend: 'up', contextNote: 'Mechanical and oxidative stress from amyloid' },
    { label: 'Calcium Handling', value: 'Impaired', trend: 'down', contextNote: 'Contributing to diastolic dysfunction' },
    { label: 'Mitochondria', value: 'Functional', contextNote: 'ATP production maintained but under stress' },
  ],
};
