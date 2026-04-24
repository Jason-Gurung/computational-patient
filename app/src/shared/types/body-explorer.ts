import type { NarrationContent } from './narration';

export enum ZoomLevel {
  FullBody = 1,
  Surface = 2,
  Anatomical = 3,
  Organ = 4,
  Tissue = 5,
  Micro = 6,
}

export interface ZoomLevelMeta {
  level: ZoomLevel;
  label: string;
  description: string;
  modelPath: string;
  cameraPosition: CameraConfig;
  hotspots: Hotspot[];
  narration: NarrationContent[];
  metrics: ZoomMetric[];
  respondingMetrics?: ZoomMetric[];
  progressingMetrics?: ZoomMetric[];
}

export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  transitionDuration: number;
}

export interface Hotspot {
  id: string;
  label: string;
  position: [number, number, number];
  targetZoomLevel: ZoomLevel;
  targetRegion?: string;
}

export interface ZoomMetric {
  label: string;
  value: string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  contextNote?: string;
}
