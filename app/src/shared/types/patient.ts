export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  bmi: number;
  ancestry: string;
  isGenerated: boolean;

  genomicHighlights: GenomicHighlight[];
  organFunction: OrganFunction;
  comorbidities: Comorbidity[];
  currentMedications: Medication[];
  microbiomeCluster: string;
  lifestyle: LifestyleFactors;
}

export interface GenomicHighlight {
  gene: string;
  variant: string;
  impact: string;
  clinicalRelevance: string;
}

export interface OrganFunction {
  liver: OrganStatus;
  kidney: OrganStatus;
  heart: OrganStatus;
  lung: OrganStatus;
  immune: OrganStatus;
}

export interface OrganStatus {
  label: string;
  functionPercent: number;
  metrics: Record<string, string>;
}

export interface Comorbidity {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  controlled: boolean;
  yearsDuration: number;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  category: string;
}

export interface LifestyleFactors {
  smoking: 'never' | 'former' | 'current';
  alcohol: 'none' | 'light' | 'moderate' | 'heavy';
  activity: 'sedentary' | 'light' | 'moderate' | 'active';
}
