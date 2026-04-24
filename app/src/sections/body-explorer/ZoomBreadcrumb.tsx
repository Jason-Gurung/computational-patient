import { ChevronRight } from 'lucide-react';
import { HEART_ZOOM_LEVELS } from '@/data/body-explorer/heart-attr-cm';

interface ZoomBreadcrumbProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ZoomBreadcrumb({ currentIndex, onNavigate }: ZoomBreadcrumbProps) {
  return (
    <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 px-4 py-2 backdrop-blur-md">
      {HEART_ZOOM_LEVELS.slice(0, currentIndex + 1).map((level, i) => {
        const isLast = i === currentIndex;
        const shortLabel = level.label.split(' — ')[0].split(' / ')[0];
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} className="text-kz-text-tertiary" />}
            <button
              onClick={() => onNavigate(i)}
              disabled={isLast}
              className={`text-xs font-semibold transition-colors ${
                isLast
                  ? 'cursor-default text-kz-blue'
                  : 'text-kz-text-secondary hover:text-kz-text-primary'
              }`}
            >
              {shortLabel}
            </button>
          </span>
        );
      })}
    </div>
  );
}
