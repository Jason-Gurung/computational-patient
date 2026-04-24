import type { ZoomLevel } from './body-explorer';

export type DiseaseId =
  | 'attr-cm'
  | 'nsclc-alk'
  | 'rheumatoid-arthritis'
  | 'breast-hr-her2'
  | 'prostate'
  | 'blood-clots'
  | 'renal-cell'
  | 'cml';

export type BodyRegion =
  | 'heart'
  | 'lungs'
  | 'joints'
  | 'breast'
  | 'prostate'
  | 'cardiovascular'
  | 'kidneys'
  | 'immune'
  | 'blood';

export interface DiseaseDefinition {
  id: DiseaseId;
  name: string;
  shortName: string;
  bodyRegion: BodyRegion;
  brand: string;
  description: string;
  canVaryPlacement: boolean;
  zoomLevelsAvailable: ZoomLevel[];
  progressionStages: DiseaseStage[];
}

export interface DiseaseStage {
  id: string;
  label: string;
  weekRange: [number, number];
  description: string;
}
