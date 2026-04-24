import type { ZoomLevel } from './body-explorer';

export type TreatmentPhase = 'untreated' | 'drug-administered' | 'post-treatment';

export interface NarrationContent {
  id: string;
  title: string;
  body: string;
  phase: TreatmentPhase;
  zoomLevel: ZoomLevel;
  timeRange: [number, number];
  highlights?: NarrationHighlight[];
  /** If set, this narration only shows for patients with this treatment response */
  responseType?: 'responding' | 'progressing';
}

export interface NarrationHighlight {
  term: string;
  definition: string;
}
