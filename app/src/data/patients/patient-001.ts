import type { PatientProfile } from '@/shared/types';

export const patient001: PatientProfile = {
  id: 'patient-001',
  name: 'Eleanor Voss',
  age: 72,
  sex: 'female',
  weightKg: 68,
  heightCm: 165,
  bmi: 25.0,
  ancestry: 'European',
  isGenerated: false,

  genomicHighlights: [
    {
      gene: 'TTR',
      variant: 'Val122Ile',
      impact: 'Hereditary ATTR mutation carrier',
      clinicalRelevance: 'Predisposition to transthyretin amyloid cardiomyopathy',
    },
    {
      gene: 'CYP3A4',
      variant: '*1/*1',
      impact: 'Normal metaboliser',
      clinicalRelevance: 'Standard tafamidis metabolism expected',
    },
    {
      gene: 'APOE',
      variant: 'e3/e3',
      impact: 'Common genotype',
      clinicalRelevance: 'No additional cardiovascular genetic risk',
    },
  ],

  organFunction: {
    liver: { label: 'Normal function', functionPercent: 92, metrics: { ALT: '28 U/L', AST: '31 U/L', 'Albumin': '3.8 g/dL' } },
    kidney: { label: 'Mild reduction', functionPercent: 72, metrics: { eGFR: '64 mL/min', Creatinine: '1.1 mg/dL' } },
    heart: { label: 'ATTR-CM — NYHA Class II', functionPercent: 55, metrics: { EF: '48%', 'NT-proBNP': '1,847 pg/mL', 'Wall Thickness': '14mm' } },
    lung: { label: 'Normal', functionPercent: 95, metrics: { FEV1: '92% predicted' } },
    immune: { label: 'Age-appropriate', functionPercent: 78, metrics: { WBC: '6.2 x10^9/L', Lymphocytes: '1.8 x10^9/L' } },
  },

  comorbidities: [
    { name: 'Hypertension', severity: 'mild', controlled: true, yearsDuration: 12 },
    { name: 'Type 2 Diabetes', severity: 'mild', controlled: true, yearsDuration: 8 },
  ],

  currentMedications: [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'once daily', category: 'ACE inhibitor' },
    { name: 'Metformin', dosage: '500mg', frequency: 'twice daily', category: 'Antidiabetic' },
    { name: 'Furosemide', dosage: '40mg', frequency: 'once daily', category: 'Diuretic' },
  ],

  microbiomeCluster: 'B3',
  lifestyle: { smoking: 'never', alcohol: 'light', activity: 'light' },
};
