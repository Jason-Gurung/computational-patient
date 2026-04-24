import { MetricsCard } from '@/shared/components';
import type { ZoomMetric } from '@/shared/types';

interface MetricsPanelProps {
  metrics: ZoomMetric[];
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  if (metrics.length === 0) return null;

  return (
    <div className="w-80">
      <MetricsCard metrics={metrics} className="rounded-xl border-kz-border-default bg-kz-bg-secondary/80 backdrop-blur-md" />
    </div>
  );
}
