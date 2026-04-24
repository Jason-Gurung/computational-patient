import { Database, Sparkles } from 'lucide-react';
import { KzSlider } from './KzSlider';

interface RealSyntheticRatioProps {
  value: number; // 0-1, fraction that is "real"
  cohortSize: number;
  onChange: (value: number) => void;
}

export function RealSyntheticRatio({ value, cohortSize, onChange }: RealSyntheticRatioProps) {
  const realCount = Math.round(cohortSize * value);
  const syntheticCount = cohortSize - realCount;
  const pct = Math.round(value * 100);

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
      <h3 className="mb-4 text-lg font-semibold text-kz-text-primary">
        Real vs Generated Models
      </h3>

      {/* Visual split bar */}
      <div className="mb-4 flex h-8 overflow-hidden rounded-lg">
        <div
          className="flex items-center justify-center bg-kz-blue/70 transition-all duration-300"
          style={{ width: `${pct}%` }}
        >
          {pct >= 15 && (
            <span className="text-xs font-semibold text-kz-bg-primary">{pct}%</span>
          )}
        </div>
        <div
          className="flex items-center justify-center bg-kz-purple/70 transition-all duration-300"
          style={{ width: `${100 - pct}%` }}
        >
          {100 - pct >= 15 && (
            <span className="text-xs font-semibold text-kz-bg-primary">{100 - pct}%</span>
          )}
        </div>
      </div>

      <KzSlider
        min={5}
        max={95}
        step={5}
        value={pct}
        onChange={(v) => onChange(v / 100)}
      />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-start gap-2">
          <Database size={16} className="mt-0.5 text-kz-blue" />
          <div>
            <p className="text-sm font-semibold text-kz-text-primary">
              {realCount.toLocaleString()}
            </p>
            <p className="text-xs text-kz-text-secondary">Real patient models</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Sparkles size={16} className="mt-0.5 text-kz-purple" />
          <div>
            <p className="text-sm font-semibold text-kz-text-primary">
              {syntheticCount.toLocaleString()}
            </p>
            <p className="text-xs text-kz-text-secondary">Generated models</p>
          </div>
        </div>
      </div>
    </div>
  );
}
