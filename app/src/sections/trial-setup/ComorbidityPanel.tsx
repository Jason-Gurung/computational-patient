import { useState } from 'react';
import { Activity, Lock } from 'lucide-react';

interface ComorbidityOption {
  id: string;
  label: string;
  prevalence: string;
}

const COMORBIDITIES: ComorbidityOption[] = [
  { id: 'hypertension', label: 'Hypertension', prevalence: '~45%' },
  { id: 'diabetes-t2', label: 'Type 2 Diabetes', prevalence: '~12%' },
  { id: 'obesity', label: 'Obesity (BMI > 30)', prevalence: '~36%' },
  { id: 'ckd', label: 'Chronic Kidney Disease', prevalence: '~15%' },
  { id: 'copd', label: 'COPD', prevalence: '~6%' },
  { id: 'depression', label: 'Depression', prevalence: '~8%' },
];

export function ComorbidityPanel() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
      <div className="mb-1 flex items-center gap-3">
        <Activity size={20} className="text-kz-teal" />
        <h3 className="text-lg font-semibold text-kz-text-primary">Comorbidities</h3>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-kz-bg-surface px-2.5 py-0.5 text-xs text-kz-text-tertiary">
          <Lock size={12} />
          Preview
        </span>
      </div>
      <p className="mb-4 text-xs text-kz-text-tertiary">
        Pre-existing conditions layered onto the virtual cohort. Coming in a future release.
      </p>

      <div className="space-y-2">
        {COMORBIDITIES.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-lg bg-kz-bg-tertiary px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-kz-text-primary">{c.label}</span>
              <span className="text-xs text-kz-text-tertiary">{c.prevalence}</span>
            </div>

            {/* Mocked toggle */}
            <button
              onClick={() =>
                setToggles((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
              }
              className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${
                toggles[c.id] ? 'bg-kz-teal/60' : 'bg-kz-bg-surface'
              }`}
            >
              <span
                className={`absolute top-0.5 block h-4 w-4 rounded-full bg-kz-text-primary transition-transform ${
                  toggles[c.id] ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
