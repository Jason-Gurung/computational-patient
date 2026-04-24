import type { TrialConfig } from '@/shared/types';

export const defaultTrialConfig: TrialConfig = {
  cohortSize: 10000,
  realToSyntheticRatio: 0.3,
  diseaseId: 'attr-cm',
  drugId: 'vyndaqel',
  diseasePlacement: 'varied',
  comorbidityEnabled: false,
};
