import type { ZoomMetric } from '@/shared/types';

interface MetricsCardProps {
  metrics: ZoomMetric[];
  className?: string;
}

const trendIcons: Record<string, string> = {
  up: '\u2191',
  down: '\u2193',
  stable: '\u2192',
};

const trendColors: Record<string, string> = {
  up: 'text-kz-orange',
  down: 'text-kz-pink',
  stable: 'text-kz-green',
};

export function MetricsCard({ metrics, className = '' }: MetricsCardProps) {
  return (
    <div className={`rounded-lg border border-kz-border-default bg-kz-bg-secondary/90 p-4 backdrop-blur-sm ${className}`}>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
        Metrics
      </h4>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-baseline justify-between">
            <span className="text-sm text-kz-text-secondary">{m.label}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-semibold text-kz-text-primary">
                {m.value}
                {m.unit && <span className="ml-0.5 text-xs text-kz-text-tertiary">{m.unit}</span>}
              </span>
              {m.trend && (
                <span className={`text-xs ${trendColors[m.trend]}`}>
                  {trendIcons[m.trend]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
