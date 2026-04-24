import { MetricsCard } from '@/shared/components';
import type { ZoomMetric } from '@/shared/types';

interface MetricsPanelProps {
  metrics: ZoomMetric[];
  respondingMetrics?: ZoomMetric[];
  progressingMetrics?: ZoomMetric[];
  responseType?: 'responding' | 'progressing';
  isTreated: boolean;
}

export function MetricsPanel({ metrics, respondingMetrics, progressingMetrics, responseType, isTreated }: MetricsPanelProps) {
  // Show response-specific metrics when in treated phase, else baseline
  let activeMetrics = metrics;
  if (isTreated && responseType === 'responding' && respondingMetrics) {
    activeMetrics = respondingMetrics;
  } else if (isTreated && responseType === 'progressing' && progressingMetrics) {
    activeMetrics = progressingMetrics;
  }

  if (activeMetrics.length === 0) return null;

  return (
    <div className="w-full">
      <MetricsCard metrics={activeMetrics} className="rounded-xl border-kz-border-default bg-kz-bg-secondary/80 backdrop-blur-md" />
    </div>
  );
}
