import type { TrialTimepoint } from '@/shared/types';

export const outcomeTimeseries: TrialTimepoint[] = [
  {
    weekNumber: 0,
    label: 'Baseline',
    metrics: { responseRate: 0, adverseEventRate: 0, mortalityRate: 0, completionRate: 1, significantMilestones: 0 },
  },
  {
    weekNumber: 4,
    label: 'Week 4',
    metrics: { responseRate: 0.08, adverseEventRate: 0.03, mortalityRate: 0.002, completionRate: 0.98, significantMilestones: 12 },
  },
  {
    weekNumber: 12,
    label: 'Month 3',
    metrics: { responseRate: 0.18, adverseEventRate: 0.06, mortalityRate: 0.005, completionRate: 0.96, significantMilestones: 45 },
  },
  {
    weekNumber: 24,
    label: 'Month 6',
    metrics: { responseRate: 0.28, adverseEventRate: 0.09, mortalityRate: 0.01, completionRate: 0.94, significantMilestones: 120 },
  },
  {
    weekNumber: 36,
    label: 'Month 9',
    metrics: { responseRate: 0.32, adverseEventRate: 0.11, mortalityRate: 0.015, completionRate: 0.93, significantMilestones: 210 },
  },
  {
    weekNumber: 52,
    label: 'Month 12',
    metrics: { responseRate: 0.35, adverseEventRate: 0.12, mortalityRate: 0.02, completionRate: 0.92, significantMilestones: 340 },
  },
];
