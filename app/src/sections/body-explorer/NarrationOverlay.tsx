import { NarrationPanel } from '@/shared/components';
import type { NarrationContent, TreatmentPhase } from '@/shared/types';

interface NarrationOverlayProps {
  narrations: NarrationContent[];
  currentWeek: number;
  responseType?: 'responding' | 'progressing';
}

function getPhaseFromWeek(week: number): TreatmentPhase {
  if (week < 12) return 'untreated';
  if (week < 36) return 'drug-administered';
  return 'post-treatment';
}

function selectNarration(
  narrations: NarrationContent[],
  week: number,
  responseType?: 'responding' | 'progressing',
): NarrationContent | null {
  const phase = getPhaseFromWeek(week);

  // For treated phases, prefer response-specific narration
  if (phase !== 'untreated' && responseType) {
    const responseMatch = narrations.find(
      (n) => n.phase === phase && n.responseType === responseType,
    );
    if (responseMatch) return responseMatch;
  }

  // Fall back to generic (no responseType) narration for this phase
  const genericMatch = narrations.find(
    (n) => n.phase === phase && !n.responseType,
  );
  if (genericMatch) return genericMatch;

  // Fallback: time range match
  const timeMatch = narrations.find(
    (n) => week >= n.timeRange[0] && week < n.timeRange[1] && (!n.responseType || n.responseType === responseType),
  );
  if (timeMatch) return timeMatch;

  return narrations[narrations.length - 1] ?? null;
}

export function NarrationOverlay({ narrations, currentWeek, responseType }: NarrationOverlayProps) {
  const narration = selectNarration(narrations, currentWeek, responseType);
  if (!narration) return null;

  return (
    <div className="w-full">
      <NarrationPanel narration={narration} className="rounded-xl border-kz-border-default bg-kz-bg-secondary/80 backdrop-blur-md" />
    </div>
  );
}
