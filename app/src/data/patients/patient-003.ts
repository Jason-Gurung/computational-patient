import type { PatientProfile } from '@/shared/types';

export const patient003: PatientProfile = {
  id: 'patient-003',
  name: 'Adaeze Okafor',
  age: 67,
  sex: 'female',
  weightKg: 75,
  heightCm: 160,
  bmi: 29.3,
  ancestry: 'West African',
  isGenerated: true,

  genomicHighlights: [
    {
      gene: 'TTR',
      variant: 'Val122Ile',
      impact: 'ATTR mutation carrier — high prevalence in African ancestry',
      clinicalRelevance: '3-4% carrier frequency in African Americans',
    },
    {
      gene: 'CYP3A4',
      variant: '*1/*1',
      impact: 'Normal metaboliser',
      clinicalRelevance: 'Standard drug metabolism',
    },
  ],

  organFunction: {
    liver: { label: 'Mild fatty liver', functionPercent: 80, metrics: { ALT: '42 U/L', AST: '38 U/L' } },
    kidney: { label: 'Moderate reduction', functionPercent: 60, metrics: { eGFR: '52 mL/min' } },
    heart: { label: 'ATTR-CM — NYHA Class III', functionPercent: 40, metrics: { EF: '38%', 'NT-proBNP': '4,120 pg/mL' } },
    lung: { label: 'Mild restriction', functionPercent: 82, metrics: {} },
    immune: { label: 'Age-appropriate', functionPercent: 75, metrics: { WBC: '7.1 x10^9/L' } },
  },

  comorbidities: [
    { name: 'Hypertension', severity: 'moderate', controlled: false, yearsDuration: 18 },
    { name: 'Type 2 Diabetes', severity: 'moderate', controlled: true, yearsDuration: 11 },
    { name: 'Chronic Kidney Disease Stage 3', severity: 'moderate', controlled: true, yearsDuration: 4 },
  ],

  currentMedications: [
    { name: 'Amlodipine', dosage: '10mg', frequency: 'once daily', category: 'Calcium channel blocker' },
    { name: 'Metformin', dosage: '1000mg', frequency: 'twice daily', category: 'Antidiabetic' },
    { name: 'Furosemide', dosage: '80mg', frequency: 'twice daily', category: 'Diuretic' },
    { name: 'Spironolactone', dosage: '25mg', frequency: 'once daily', category: 'Aldosterone antagonist' },
  ],

  microbiomeCluster: 'C1',
  lifestyle: { smoking: 'never', alcohol: 'none', activity: 'sedentary' },
};
