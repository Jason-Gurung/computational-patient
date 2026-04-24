import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { formatWeekLabel } from '@/lib/format';

interface TimeControlsProps {
  currentWeek: number;
  maxWeek: number;
  isPlaying: boolean;
  speed: number;
  onToggle: () => void;
  onSetWeek: (week: number) => void;
  onSetSpeed: (speed: number) => void;
}

export function TimeControls({
  currentWeek,
  maxWeek,
  isPlaying,
  speed,
  onToggle,
  onSetWeek,
  onSetSpeed,
}: TimeControlsProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-kz-border-default bg-kz-bg-secondary px-4 py-2">
      <button
        onClick={() => onSetWeek(0)}
        className="text-kz-text-secondary transition-colors hover:text-kz-text-primary"
      >
        <SkipBack size={16} />
      </button>
      <button
        onClick={onToggle}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-kz-blue text-kz-bg-primary transition-opacity hover:opacity-80"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <button
        onClick={() => onSetWeek(maxWeek)}
        className="text-kz-text-secondary transition-colors hover:text-kz-text-primary"
      >
        <SkipForward size={16} />
      </button>

      <input
        type="range"
        min={0}
        max={maxWeek}
        value={currentWeek}
        onChange={(e) => onSetWeek(Number(e.target.value))}
        className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-kz-border-default accent-kz-blue"
      />

      <span className="min-w-[80px] text-right text-sm text-kz-text-secondary">
        {formatWeekLabel(currentWeek)}
      </span>

      <div className="flex gap-1">
        {[1, 2, 4].map((s) => (
          <button
            key={s}
            onClick={() => onSetSpeed(s)}
            className={`rounded px-2 py-0.5 text-xs transition-colors ${
              speed === s
                ? 'bg-kz-blue text-kz-bg-primary'
                : 'text-kz-text-tertiary hover:text-kz-text-secondary'
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  );
}
