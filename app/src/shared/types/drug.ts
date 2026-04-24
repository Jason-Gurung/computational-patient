import type { DiseaseId } from './disease';

export type DrugId =
  | 'vyndaqel'
  | 'lorbrena'
  | 'xeljanz'
  | 'ibrance'
  | 'xtandi'
  | 'eliquis'
  | 'sutent'
  | 'bosulif';

export interface DrugDefinition {
  id: DrugId;
  brandName: string;
  genericName: string;
  mechanism: string;
  administrationRoute: 'oral' | 'iv' | 'injection' | 'topical';
  targetDisease: DiseaseId;
  description: string;
  responseTimeline: DrugTimepoint[];
}

export interface DrugTimepoint {
  weekNumber: number;
  label: string;
  plasmaConcentration: number;
  efficacyScore: number;
  toxicityScore: number;
  narration: string;
}
