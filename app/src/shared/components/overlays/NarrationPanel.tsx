import type { NarrationContent } from '@/shared/types';

interface NarrationPanelProps {
  narration: NarrationContent;
  className?: string;
}

export function NarrationPanel({ narration, className = '' }: NarrationPanelProps) {
  return (
    <div
      className={`rounded-lg border border-kz-border-default bg-kz-bg-secondary/90 p-6 backdrop-blur-sm ${className}`}
    >
      <h3 className="mb-3 text-lg font-semibold text-kz-blue">{narration.title}</h3>
      <p className="text-sm leading-relaxed text-kz-text-secondary">{narration.body}</p>
      {narration.highlights && narration.highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {narration.highlights.map((h) => (
            <span
              key={h.term}
              className="rounded-full border border-kz-border-subtle bg-kz-bg-tertiary px-3 py-1 text-xs text-kz-text-secondary"
              title={h.definition}
            >
              {h.term}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
