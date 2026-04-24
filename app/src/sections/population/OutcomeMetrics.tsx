import { useEffect, useRef, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { outcomeTimeseries } from '@/data/population';
import type { TrialMetrics } from '@/shared/types';
import { formatPercent } from '@/lib/format';

function interpolateMetrics(week: number): TrialMetrics {
  const data = outcomeTimeseries;
  if (week <= data[0].weekNumber) return data[0].metrics;
  if (week >= data[data.length - 1].weekNumber) return data[data.length - 1].metrics;

  let lower = data[0];
  let upper = data[1];
  for (let i = 1; i < data.length; i++) {
    if (data[i].weekNumber >= week) {
      upper = data[i];
      lower = data[i - 1];
      break;
    }
  }

  const t = (week - lower.weekNumber) / (upper.weekNumber - lower.weekNumber);
  const lerp = (a: number, b: number) => a + (b - a) * t;

  return {
    responseRate: lerp(lower.metrics.responseRate, upper.metrics.responseRate),
    adverseEventRate: lerp(lower.metrics.adverseEventRate, upper.metrics.adverseEventRate),
    mortalityRate: lerp(lower.metrics.mortalityRate, upper.metrics.mortalityRate),
    completionRate: lerp(lower.metrics.completionRate, upper.metrics.completionRate),
    significantMilestones: Math.round(lerp(lower.metrics.significantMilestones, upper.metrics.significantMilestones)),
  };
}

function AnimatedValue({ value, format }: { value: number; format: (n: number) => string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const frameRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;
    if (from === to) return;

    const start = performance.now();
    const duration = 300;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value]);

  return <>{format(display)}</>;
}

interface MetricRowProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  format: (n: number) => string;
  color: string;
}

function MetricRow({ icon, label, value, format, color }: MetricRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-kz-border-default bg-kz-bg-secondary p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: color + '20' }}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
          {label}
        </div>
        <div className="text-2xl font-bold text-kz-text-primary">
          <AnimatedValue value={value} format={format} />
        </div>
      </div>
    </div>
  );
}

interface OutcomeMetricsProps {
  currentWeek: number;
}

export function OutcomeMetrics({ currentWeek }: OutcomeMetricsProps) {
  const metrics = interpolateMetrics(currentWeek);

  return (
    <div className="grid gap-3">
      <MetricRow
        icon={<Activity size={20} className="text-kz-green" />}
        label="Response Rate"
        value={metrics.responseRate}
        format={(n) => formatPercent(n, 1)}
        color="#69F0AE"
      />
      <MetricRow
        icon={<AlertTriangle size={20} className="text-kz-pink" />}
        label="Adverse Events"
        value={metrics.adverseEventRate}
        format={(n) => formatPercent(n, 1)}
        color="#FF4081"
      />
      <MetricRow
        icon={<CheckCircle size={20} className="text-kz-blue" />}
        label="Completion Rate"
        value={metrics.completionRate}
        format={(n) => formatPercent(n, 1)}
        color="#4FC3F7"
      />
      <MetricRow
        icon={<Star size={20} className="text-kz-yellow" />}
        label="Milestones"
        value={metrics.significantMilestones}
        format={(n) => Math.round(n).toLocaleString()}
        color="#FFD740"
      />
    </div>
  );
}
