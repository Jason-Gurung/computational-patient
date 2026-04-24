import type { DrugDefinition } from '@/shared/types';

export const DRUGS: DrugDefinition[] = [
  {
    id: 'vyndaqel',
    brandName: 'Vyndaqel',
    genericName: 'Tafamidis',
    mechanism: 'TTR stabiliser — binds to transthyretin, preventing misfolding and amyloid formation',
    administrationRoute: 'oral',
    targetDisease: 'attr-cm',
    description: 'Stabilises the transthyretin protein to prevent further amyloid deposits in the heart.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Pre-treatment assessment. Disease progression ongoing.' },
      { weekNumber: 2, label: 'Week 2', plasmaConcentration: 0.6, efficacyScore: 0.1, toxicityScore: 0.05, narration: 'Tafamidis reaches steady-state plasma levels. TTR stabilisation begins.' },
      { weekNumber: 12, label: 'Month 3', plasmaConcentration: 0.85, efficacyScore: 0.35, toxicityScore: 0.08, narration: 'Significant TTR stabilisation. New amyloid deposition slowing.' },
      { weekNumber: 26, label: 'Month 6', plasmaConcentration: 0.9, efficacyScore: 0.55, toxicityScore: 0.06, narration: 'Cardiac function stabilising. NT-proBNP rise attenuated.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.9, efficacyScore: 0.7, toxicityScore: 0.05, narration: 'Sustained stabilisation. Reduced hospitalisation rate vs untreated.' },
    ],
  },
  {
    id: 'lorbrena',
    brandName: 'Lorbrena',
    genericName: 'Lorlatinib',
    mechanism: 'ALK inhibitor — blocks the ALK fusion protein driving tumour growth',
    administrationRoute: 'oral',
    targetDisease: 'nsclc-alk',
    description: 'Third-generation ALK inhibitor with CNS penetration for ALK-positive lung cancer.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Pre-treatment tumour assessment.' },
      { weekNumber: 4, label: 'Month 1', plasmaConcentration: 0.8, efficacyScore: 0.3, toxicityScore: 0.15, narration: 'Tumour response beginning. ALK pathway inhibited.' },
      { weekNumber: 12, label: 'Month 3', plasmaConcentration: 0.85, efficacyScore: 0.6, toxicityScore: 0.12, narration: 'Partial response in most patients. Brain metastases controlled.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.85, efficacyScore: 0.75, toxicityScore: 0.1, narration: 'Sustained response. Progression-free survival significantly extended.' },
    ],
  },
  {
    id: 'xeljanz',
    brandName: 'Xeljanz',
    genericName: 'Tofacitinib',
    mechanism: 'JAK inhibitor — blocks Janus kinase enzymes that drive inflammatory signalling',
    administrationRoute: 'oral',
    targetDisease: 'rheumatoid-arthritis',
    description: 'Oral JAK inhibitor that reduces immune-mediated joint inflammation and damage.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Active RA with elevated inflammatory markers.' },
      { weekNumber: 2, label: 'Week 2', plasmaConcentration: 0.75, efficacyScore: 0.2, toxicityScore: 0.1, narration: 'JAK pathway suppression initiated. Early symptom relief.' },
      { weekNumber: 12, label: 'Month 3', plasmaConcentration: 0.8, efficacyScore: 0.5, toxicityScore: 0.08, narration: 'Significant reduction in joint swelling and CRP levels.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.8, efficacyScore: 0.65, toxicityScore: 0.07, narration: 'Low disease activity achieved. Radiographic progression slowed.' },
    ],
  },
  {
    id: 'ibrance',
    brandName: 'Ibrance',
    genericName: 'Palbociclib',
    mechanism: 'CDK4/6 inhibitor — blocks cell cycle progression in hormone-driven cancer cells',
    administrationRoute: 'oral',
    targetDisease: 'breast-hr-her2',
    description: 'Oral CDK4/6 inhibitor used with endocrine therapy for HR+ metastatic breast cancer.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Metastatic HR+ breast cancer assessment.' },
      { weekNumber: 12, label: 'Month 3', plasmaConcentration: 0.8, efficacyScore: 0.4, toxicityScore: 0.2, narration: 'Cell cycle arrest in tumour cells. Neutropenia monitoring.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.8, efficacyScore: 0.6, toxicityScore: 0.15, narration: 'Progression-free survival doubled vs endocrine therapy alone.' },
    ],
  },
  {
    id: 'xtandi',
    brandName: 'Xtandi',
    genericName: 'Enzalutamide',
    mechanism: 'Androgen receptor inhibitor — blocks testosterone from driving prostate cancer growth',
    administrationRoute: 'oral',
    targetDisease: 'prostate',
    description: 'Potent androgen receptor inhibitor for castration-resistant prostate cancer.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Castration-resistant prostate cancer assessment.' },
      { weekNumber: 12, label: 'Month 3', plasmaConcentration: 0.85, efficacyScore: 0.45, toxicityScore: 0.12, narration: 'PSA declining. Androgen receptor signalling suppressed.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.85, efficacyScore: 0.65, toxicityScore: 0.1, narration: 'Radiographic progression-free survival extended.' },
    ],
  },
  {
    id: 'eliquis',
    brandName: 'Eliquis',
    genericName: 'Apixaban',
    mechanism: 'Factor Xa inhibitor — prevents blood clot formation by blocking a key clotting enzyme',
    administrationRoute: 'oral',
    targetDisease: 'blood-clots',
    description: 'Oral anticoagulant for prevention of stroke and systemic embolism.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Atrial fibrillation with stroke risk.' },
      { weekNumber: 1, label: 'Week 1', plasmaConcentration: 0.9, efficacyScore: 0.8, toxicityScore: 0.05, narration: 'Rapid anticoagulation achieved. Stroke risk reduced.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.9, efficacyScore: 0.85, toxicityScore: 0.04, narration: 'Sustained stroke prevention with low bleeding risk.' },
    ],
  },
  {
    id: 'sutent',
    brandName: 'Sutent',
    genericName: 'Sunitinib',
    mechanism: 'Multi-kinase inhibitor — blocks VEGFR and PDGFR to starve tumours of blood supply',
    administrationRoute: 'oral',
    targetDisease: 'renal-cell',
    description: 'Anti-angiogenic therapy that cuts off tumour blood supply in kidney cancer.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'Advanced renal cell carcinoma assessment.' },
      { weekNumber: 6, label: 'Cycle 1', plasmaConcentration: 0.8, efficacyScore: 0.35, toxicityScore: 0.2, narration: 'Anti-angiogenic effects visible. Tumour vasculature disrupted.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.8, efficacyScore: 0.55, toxicityScore: 0.18, narration: 'Progression-free survival extended. Managing side effects.' },
    ],
  },
  {
    id: 'bosulif',
    brandName: 'Bosulif',
    genericName: 'Bosutinib',
    mechanism: 'BCR-ABL tyrosine kinase inhibitor — targets the fusion protein driving CML',
    administrationRoute: 'oral',
    targetDisease: 'cml',
    description: 'Tyrosine kinase inhibitor for chronic myeloid leukemia.',
    responseTimeline: [
      { weekNumber: 0, label: 'Baseline', plasmaConcentration: 0, efficacyScore: 0, toxicityScore: 0, narration: 'CML chronic phase diagnosis.' },
      { weekNumber: 12, label: 'Month 3', plasmaConcentration: 0.8, efficacyScore: 0.5, toxicityScore: 0.15, narration: 'Haematologic response. BCR-ABL transcript levels declining.' },
      { weekNumber: 52, label: 'Month 12', plasmaConcentration: 0.8, efficacyScore: 0.7, toxicityScore: 0.1, narration: 'Major molecular response in majority of patients.' },
    ],
  },
];

export const DRUG_MAP = Object.fromEntries(
  DRUGS.map((d) => [d.id, d])
) as Record<string, DrugDefinition>;
