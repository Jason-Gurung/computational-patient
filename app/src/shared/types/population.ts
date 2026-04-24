export type PatientOutcome =
  | 'responding'
  | 'stable'
  | 'adverse-event'
  | 'non-responding'
  | 'milestone'
  | 'withdrawn';

export interface PopulationPatient {
  id: string;
  gridPosition: { row: number; col: number };
  outcome: PatientOutcome;
  outcomeHistory: OutcomeAtTime[];
  isClickable: boolean;
  linkedPatientId?: string;
}

export interface OutcomeAtTime {
  weekNumber: number;
  outcome: PatientOutcome;
}

export interface PopulationFilterState {
  activeFilters: PatientOutcome[];
  searchQuery?: string;
}
