import type { DiseaseId } from './disease';
import type { DrugId } from './drug';

export interface TrialConfig {
  cohortSize: number;
  realToSyntheticRatio: number;
  diseaseId: DiseaseId;
  drugId: DrugId;
  diseasePlacement: 'uniform' | 'varied';
  comorbidityEnabled: boolean;
}

export interface TrialTimepoint {
  weekNumber: number;
  label: string;
  metrics: TrialMetrics;
}

export interface TrialMetrics {
  responseRate: number;
  adverseEventRate: number;
  mortalityRate: number;
  completionRate: number;
  significantMilestones: number;
}
