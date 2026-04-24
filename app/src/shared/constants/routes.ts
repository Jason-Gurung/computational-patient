export const ROUTES = {
  LANDING: '/',
  TRIAL_SETUP: '/setup',
  POPULATION: '/trial',
  BODY_EXPLORER: (patientId: string) => `/trial/patient/${patientId}`,
  HOW_IT_WORKS: '/how-it-works',
  IMPACT: '/impact',
} as const;
