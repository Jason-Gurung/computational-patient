import type { PatientOutcome } from '@/shared/types';
import { colors } from '@/shared/design-tokens';

export const OUTCOME_LABELS: Record<PatientOutcome, string> = {
  responding: 'Responding',
  stable: 'Stable',
  'adverse-event': 'Adverse Event',
  'non-responding': 'Non-Responding',
  milestone: 'Milestone',
  withdrawn: 'Withdrawn',
};

export const OUTCOME_COLORS: Record<PatientOutcome, string> = {
  responding: colors.outcome.responding,
  stable: colors.outcome.stable,
  'adverse-event': colors.outcome.adverseEvent,
  'non-responding': colors.outcome.nonResponding,
  milestone: colors.outcome.milestone,
  withdrawn: colors.outcome.withdrawn,
};
