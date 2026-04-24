import { Users } from 'lucide-react';
import { KzSlider } from './KzSlider';

interface CohortSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const STEPS = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

const LABELS: { stepIdx: number; label: string }[] = [
  { stepIdx: 0, label: '100' },
  { stepIdx: 2, label: '1K' },
  { stepIdx: 5, label: '10K' },
  { stepIdx: 8, label: '100K' },
];

function valueToStep(value: number): number {
  const idx = STEPS.indexOf(value);
  return idx >= 0 ? idx : STEPS.findIndex((s) => s >= value);
}

function stepToValue(step: number): number {
  return STEPS[Math.round(step)] ?? STEPS[0];
}

export function CohortSizeSelector({ value, onChange }: CohortSizeSelectorProps) {
  const step = valueToStep(value);

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
      <div className="mb-4 flex items-center gap-3">
        <Users size={20} className="text-kz-blue" />
        <h3 className="text-lg font-semibold text-kz-text-primary">Cohort Size</h3>
      </div>

      <div className="mb-6 flex items-baseline gap-3">
        <span className="text-4xl font-bold text-kz-text-primary">
          {value.toLocaleString()}
        </span>
        <span className="text-sm text-kz-text-secondary">virtual patients</span>
      </div>

      <KzSlider
        min={0}
        max={STEPS.length - 1}
        step={1}
        value={step}
        onChange={(v) => onChange(stepToValue(v))}
      />

      {/* Labels positioned at their actual step percentages */}
      <div className="relative mt-2 h-5">
        {LABELS.map(({ stepIdx, label }) => {
          const pos = (stepIdx / (STEPS.length - 1)) * 100;
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 text-xs text-kz-text-tertiary"
              style={{ left: `${pos}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>

      {/* Mini grid visualization */}
      <div className="mt-5 flex flex-wrap gap-[2px]">
        {Array.from({ length: Math.min(Math.ceil(value / 200), 100) }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-kz-blue/60"
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-kz-text-tertiary">
        Each dot represents ~{value <= 200 ? '1' : Math.round(value / 100).toLocaleString()} patients
      </p>
    </div>
  );
}
