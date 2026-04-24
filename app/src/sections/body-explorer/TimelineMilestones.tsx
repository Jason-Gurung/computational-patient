import { TimeControls } from '@/shared/components';
import type { TreatmentPhase } from '@/shared/types';

interface TimelineMilestonesProps {
  currentWeek: number;
  maxWeek: number;
  isPlaying: boolean;
  speed: number;
  onToggle: () => void;
  onSetWeek: (week: number) => void;
  onSetSpeed: (speed: number) => void;
}

const phases: {
  phase: TreatmentPhase;
  label: string;
  weekStart: number;
  weekEnd: number;
  bgActive: string;
  textActive: string;
  barColor: string;
}[] = [
  {
    phase: 'untreated',
    label: 'Untreated',
    weekStart: 0,
    weekEnd: 12,
    bgActive: 'bg-kz-orange/20',
    textActive: 'text-kz-orange',
    barColor: 'bg-kz-orange',
  },
  {
    phase: 'drug-administered',
    label: 'Drug Administered',
    weekStart: 12,
    weekEnd: 36,
    bgActive: 'bg-kz-blue/20',
    textActive: 'text-kz-blue',
    barColor: 'bg-kz-blue',
  },
  {
    phase: 'post-treatment',
    label: 'Post-Treatment',
    weekStart: 36,
    weekEnd: 52,
    bgActive: 'bg-kz-green/20',
    textActive: 'text-kz-green',
    barColor: 'bg-kz-green',
  },
];

function getCurrentPhase(week: number): TreatmentPhase {
  if (week < 12) return 'untreated';
  if (week < 36) return 'drug-administered';
  return 'post-treatment';
}

export function TimelineMilestones({
  currentWeek,
  maxWeek,
  isPlaying,
  speed,
  onToggle,
  onSetWeek,
  onSetSpeed,
}: TimelineMilestonesProps) {
  const currentPhase = getCurrentPhase(currentWeek);

  return (
    <div className="absolute bottom-4 left-1/2 z-10 w-full max-w-2xl -translate-x-1/2 space-y-2 px-4">
      {/* Phase indicators */}
      <div className="flex gap-1 rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 p-1.5 backdrop-blur-md">
        {phases.map(({ phase, label, weekStart, weekEnd, bgActive, textActive, barColor }) => {
          const isActive = currentPhase === phase;
          const widthPercent = ((weekEnd - weekStart) / maxWeek) * 100;
          return (
            <button
              key={phase}
              onClick={() => onSetWeek(weekStart)}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? `${bgActive} ${textActive} shadow-[0_0_12px_rgba(79,195,247,0.15)]`
                  : 'text-kz-text-tertiary hover:text-kz-text-secondary'
              }`}
              style={{ width: `${widthPercent}%` }}
            >
              {label}
              {isActive && (
                <div className={`absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full ${barColor}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Time controls */}
      <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 backdrop-blur-md">
        <TimeControls
          currentWeek={currentWeek}
          maxWeek={maxWeek}
          isPlaying={isPlaying}
          speed={speed}
          onToggle={onToggle}
          onSetWeek={onSetWeek}
          onSetSpeed={onSetSpeed}
        />
      </div>
    </div>
  );
}
