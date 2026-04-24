import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';

interface ZoomLevelIndicatorProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ZoomLevelIndicator({ currentIndex, onNavigate }: ZoomLevelIndicatorProps) {
  const total = HEART_ZOOM_LEVELS.length;

  return (
    <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3">
      {HEART_ZOOM_LEVELS.map((_, i) => {
        const isActive = i === currentIndex;
        const isPast = i < currentIndex;
        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className="group relative flex items-center"
            title={HEART_ZOOM_LEVELS[i].label}
          >
            <div
              className={`h-2.5 w-2.5 rounded-full border transition-all ${
                isActive
                  ? 'border-kz-blue bg-kz-blue shadow-[0_0_10px_rgba(79,195,247,0.6)]'
                  : isPast
                    ? 'border-kz-blue/50 bg-kz-blue/30'
                    : 'border-kz-border-strong bg-kz-bg-tertiary hover:border-kz-blue/30'
              }`}
            />
            {/* Connector line */}
            {i < total - 1 && (
              <div className={`absolute left-1/2 top-full h-3 w-px -translate-x-1/2 ${
                i < currentIndex ? 'bg-kz-blue/40' : 'bg-kz-border-default'
              }`} />
            )}
          </button>
        );
      })}
      <span className="mt-1 text-[10px] font-semibold text-kz-text-tertiary">
        {currentIndex + 1}/{total}
      </span>
    </div>
  );
}
