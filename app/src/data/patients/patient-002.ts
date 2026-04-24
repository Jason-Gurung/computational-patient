import type { PatientProfile } from '@/shared/types';

export const patient002: PatientProfile = {
  id: 'patient-002',
  name: 'Marcus Chen',
  age: 58,
  sex: 'male',
  weightKg: 82,
  heightCm: 175,
  bmi: 26.8,
  ancestry: 'East Asian',
  isGenerated: true,
  treatmentResponse: 'progressing',

  genomicHighlights: [
    {
      gene: 'TTR',
      variant: 'Thr60Ala',
      impact: 'Hereditary ATTR variant',
      clinicalRelevance: 'Late-onset ATTR cardiomyopathy risk',
    },
    {
      gene: 'CYP3A4',
      variant: '*1/*18',
      impact: 'Intermediate metaboliser',
      clinicalRelevance: 'Slightly altered tafamidis clearance',
    },
  ],

  organFunction: {
    liver: { label: 'Normal', functionPercent: 88, metrics: { ALT: '35 U/L', AST: '33 U/L' } },
    kidney: { label: 'Normal', functionPercent: 85, metrics: { eGFR: '78 mL/min' } },
    heart: { label: 'ATTR-CM — NYHA Class II', functionPercent: 52, metrics: { EF: '45%', 'NT-proBNP': '2,340 pg/mL' } },
    lung: { label: 'Normal', functionPercent: 90, metrics: {} },
    immune: { label: 'Normal', functionPercent: 82, metrics: { WBC: '5.8 x10^9/L' } },
  },

  comorbidities: [
    { name: 'Hyperlipidaemia', severity: 'moderate', controlled: true, yearsDuration: 6 },
  ],

  currentMedications: [
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'once daily', category: 'Statin' },
    { name: 'Furosemide', dosage: '20mg', frequency: 'once daily', category: 'Diuretic' },
  ],

  microbiomeCluster: 'A2',
  lifestyle: { smoking: 'former', alcohol: 'light', activity: 'moderate' },
};
