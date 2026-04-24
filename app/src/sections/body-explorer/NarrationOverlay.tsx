import { NarrationPanel } from '@/shared/components';
import type { NarrationContent, TreatmentPhase } from '@/shared/types';

interface NarrationOverlayProps {
  narrations: NarrationContent[];
  currentWeek: number;
}

function getPhaseFromWeek(week: number): TreatmentPhase {
  if (week < 12) return 'untreated';
  if (week < 36) return 'drug-administered';
  return 'post-treatment';
}

function selectNarration(narrations: NarrationContent[], week: number): NarrationContent | null {
  const phase = getPhaseFromWeek(week);

  // Exact phase match
  const phaseMatch = narrations.find((n) => n.phase === phase);
  if (phaseMatch) return phaseMatch;

  // Fallback: find narration whose time range contains the current week
  const timeMatch = narrations.find((n) => week >= n.timeRange[0] && week < n.timeRange[1]);
  if (timeMatch) return timeMatch;

  // Last resort: return the last available narration
  return narrations[narrations.length - 1] ?? null;
}

export function NarrationOverlay({ narrations, currentWeek }: NarrationOverlayProps) {
  const narration = selectNarration(narrations, currentWeek);
  if (!narration) return null;

  return (
    <div className="w-80">
      <NarrationPanel narration={narration} className="rounded-xl border-kz-border-default bg-kz-bg-secondary/80 backdrop-blur-md" />
    </div>
  );
}
