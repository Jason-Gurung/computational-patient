import { ZoomLevel } from '@/shared/types';
import type { DiseaseDefinition } from '@/shared/types';

export const DISEASES: DiseaseDefinition[] = [
  {
    id: 'attr-cm',
    name: 'Transthyretin Amyloid Cardiomyopathy',
    shortName: 'ATTR-CM',
    bodyRegion: 'heart',
    brand: 'Vyndaqel',
    description: 'Misfolded transthyretin protein deposits in the heart muscle, causing progressive stiffening and heart failure.',
    canVaryPlacement: false,
    zoomLevelsAvailable: [ZoomLevel.FullBody, ZoomLevel.Surface, ZoomLevel.Anatomical, ZoomLevel.Organ, ZoomLevel.Tissue, ZoomLevel.Micro],
    progressionStages: [
      { id: 'early', label: 'Early', weekRange: [0, 12], description: 'Initial amyloid deposits, mild symptoms' },
      { id: 'established', label: 'Established', weekRange: [12, 36], description: 'Significant wall thickening, reduced ejection fraction' },
      { id: 'advanced', label: 'Advanced', weekRange: [36, 52], description: 'Severe heart failure, fluid retention' },
    ],
  },
  {
    id: 'nsclc-alk',
    name: 'ALK-Positive Non-Small Cell Lung Cancer',
    shortName: 'ALK+ NSCLC',
    bodyRegion: 'lungs',
    brand: 'Lorbrena',
    description: 'Lung cancer driven by ALK gene rearrangements, causing uncontrolled cell growth in lung tissue.',
    canVaryPlacement: true,
    zoomLevelsAvailable: [ZoomLevel.FullBody, ZoomLevel.Organ, ZoomLevel.Tissue, ZoomLevel.Micro],
    progressionStages: [
      { id: 'localised', label: 'Localised', weekRange: [0, 16], description: 'Tumour confined to lung' },
      { id: 'locally-advanced', label: 'Locally Advanced', weekRange: [16, 32], description: 'Spread to nearby lymph nodes' },
      { id: 'metastatic', label: 'Metastatic', weekRange: [32, 52], description: 'Spread to distant organs' },
    ],
  },
  {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    shortName: 'RA',
    bodyRegion: 'joints',
    brand: 'Xeljanz',
    description: 'Autoimmune condition where the immune system attacks joint lining, causing chronic inflammation and joint destruction.',
    canVaryPlacement: false,
    zoomLevelsAvailable: [ZoomLevel.FullBody, ZoomLevel.Organ, ZoomLevel.Tissue, ZoomLevel.Micro],
    progressionStages: [
      { id: 'early-inflammation', label: 'Early Inflammation', weekRange: [0, 12], description: 'Joint swelling and morning stiffness' },
      { id: 'active', label: 'Active Disease', weekRange: [12, 24], description: 'Persistent inflammation, early erosions' },
      { id: 'structural-damage', label: 'Structural Damage', weekRange: [24, 52], description: 'Joint erosion and deformity' },
    ],
  },
  {
    id: 'breast-hr-her2',
    name: 'HR+/HER2- Breast Cancer',
    shortName: 'HR+ Breast Cancer',
    bodyRegion: 'breast',
    brand: 'Ibrance',
    description: 'Hormone receptor positive breast cancer that grows in response to oestrogen, the most common subtype.',
    canVaryPlacement: true,
    zoomLevelsAvailable: [ZoomLevel.FullBody, ZoomLevel.Organ],
    progressionStages: [
      { id: 'localised', label: 'Localised', weekRange: [0, 16], description: 'Tumour confined to breast' },
      { id: 'advanced', label: 'Advanced', weekRange: [16, 52], description: 'Metastatic spread' },
    ],
  },
  {
    id: 'prostate',
    name: 'Prostate Cancer',
    shortName: 'Prostate Cancer',
    bodyRegion: 'prostate',
    brand: 'Xtandi',
    description: 'Cancer originating in the prostate gland, often driven by androgen receptor signalling.',
    canVaryPlacement: false,
    zoomLevelsAvailable: [ZoomLevel.FullBody, ZoomLevel.Organ],
    progressionStages: [
      { id: 'localised', label: 'Localised', weekRange: [0, 24], description: 'Confined to prostate' },
      { id: 'castration-resistant', label: 'Castration-Resistant', weekRange: [24, 52], description: 'Progressing despite hormone therapy' },
    ],
  },
  {
    id: 'blood-clots',
    name: 'Venous Thromboembolism / Stroke Prevention',
    shortName: 'VTE / Stroke',
    bodyRegion: 'cardiovascular',
    brand: 'Eliquis',
    description: 'Blood clot formation in veins or prevention of stroke in atrial fibrillation patients.',
    canVaryPlacement: true,
    zoomLevelsAvailable: [ZoomLevel.FullBody],
    progressionStages: [
      { id: 'risk', label: 'At Risk', weekRange: [0, 52], description: 'Ongoing thromboembolic risk' },
    ],
  },
  {
    id: 'renal-cell',
    name: 'Renal Cell Carcinoma',
    shortName: 'Kidney Cancer',
    bodyRegion: 'kidneys',
    brand: 'Sutent',
    description: 'Cancer arising from the renal tubular epithelium, driven by angiogenesis.',
    canVaryPlacement: false,
    zoomLevelsAvailable: [ZoomLevel.FullBody, ZoomLevel.Organ],
    progressionStages: [
      { id: 'localised', label: 'Localised', weekRange: [0, 16], description: 'Confined to kidney' },
      { id: 'advanced', label: 'Advanced', weekRange: [16, 52], description: 'Metastatic spread' },
    ],
  },
  {
    id: 'cml',
    name: 'Chronic Myeloid Leukemia',
    shortName: 'CML',
    bodyRegion: 'blood',
    brand: 'Bosulif',
    description: 'Blood cancer caused by the BCR-ABL fusion gene, leading to overproduction of white blood cells.',
    canVaryPlacement: false,
    zoomLevelsAvailable: [ZoomLevel.FullBody],
    progressionStages: [
      { id: 'chronic', label: 'Chronic Phase', weekRange: [0, 26], description: 'Manageable with treatment' },
      { id: 'accelerated', label: 'Accelerated', weekRange: [26, 52], description: 'Increasing blast cells' },
    ],
  },
];

export const DISEASE_MAP = Object.fromEntries(
  DISEASES.map((d) => [d.id, d])
) as Record<string, DiseaseDefinition>;
