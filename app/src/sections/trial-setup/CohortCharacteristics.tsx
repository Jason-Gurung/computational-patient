import { useState } from 'react';
import type { DiseaseDefinition } from '@/shared/types';
import { SlidersHorizontal, MapPin, Activity, Calendar, Users2 } from 'lucide-react';
import { KzSlider } from './KzSlider';

interface CohortCharacteristicsProps {
  disease: DiseaseDefinition;
  placement: 'uniform' | 'varied';
  onPlacementChange: (value: 'uniform' | 'varied') => void;
}

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

export function CohortCharacteristics({
  disease,
  placement,
  onPlacementChange,
}: CohortCharacteristicsProps) {
  const [ageMin, setAgeMin] = useState(18);
  const [ageMax, setAgeMax] = useState(85);
  const [femalePct, setFemalePct] = useState(50);
  // Three states: 'off' | 'include' | 'required'
  const [comorbidities, setComorbidities] = useState<Record<string, 'off' | 'include' | 'required'>>({});

  const cycleComorbidity = (id: string) =>
    setComorbidities((prev) => {
      const current = prev[id] ?? 'off';
      const next = current === 'off' ? 'include' : current === 'include' ? 'required' : 'off';
      return { ...prev, [id]: next };
    });

  const activeCount = Object.values(comorbidities).filter((v) => v !== 'off').length;

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
      <div className="mb-5 flex items-center gap-3">
        <SlidersHorizontal size={20} className="text-kz-teal" />
        <h3 className="text-lg font-semibold text-kz-text-primary">Cohort Characteristics</h3>
      </div>
      <p className="mb-6 text-sm leading-relaxed text-kz-text-secondary">
        Define who your virtual patients are. Leave open for maximum diversity, or constrain to study a specific population.
      </p>

      <div className="space-y-6">
        {/* Age Range */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-kz-yellow" />
            <span className="text-sm font-semibold text-kz-text-primary">Age Range</span>
            <span className="ml-auto text-sm font-semibold text-kz-text-primary">
              {ageMin} – {ageMax} years
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 text-xs text-kz-text-tertiary">Min</span>
              <div className="flex-1">
                <KzSlider
                  min={18}
                  max={90}
                  step={1}
                  value={ageMin}
                  onChange={(v) => setAgeMin(Math.min(v, ageMax - 1))}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 text-xs text-kz-text-tertiary">Max</span>
              <div className="flex-1">
                <KzSlider
                  min={18}
                  max={90}
                  step={1}
                  value={ageMax}
                  onChange={(v) => setAgeMax(Math.max(v, ageMin + 1))}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-kz-border-subtle" />

        {/* Sex Distribution */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Users2 size={16} className="text-kz-purple" />
            <span className="text-sm font-semibold text-kz-text-primary">Sex Distribution</span>
          </div>
          <div className="mb-2 flex h-6 overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-kz-purple/60 transition-all duration-300"
              style={{ width: `${femalePct}%` }}
            >
              {femalePct >= 20 && (
                <span className="text-xs font-semibold text-kz-text-primary">{femalePct}% F</span>
              )}
            </div>
            <div
              className="flex items-center justify-center bg-kz-blue/60 transition-all duration-300"
              style={{ width: `${100 - femalePct}%` }}
            >
              {100 - femalePct >= 20 && (
                <span className="text-xs font-semibold text-kz-text-primary">{100 - femalePct}% M</span>
              )}
            </div>
          </div>
          <KzSlider
            min={0}
            max={100}
            step={5}
            value={femalePct}
            onChange={setFemalePct}
          />
          <div className="mt-1 flex justify-between text-xs text-kz-text-tertiary">
            <span>All female</span>
            <span>All male</span>
          </div>
        </div>

        {/* Disease Placement — only for diseases that can vary */}
        {disease.canVaryPlacement && (
          <>
            <hr className="border-kz-border-subtle" />
            <div>
              <div className="mb-3 flex items-center gap-2">
                <MapPin size={16} className="text-kz-orange" />
                <span className="text-sm font-semibold text-kz-text-primary">Disease Placement</span>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-kz-text-secondary">
                {disease.shortName} can originate in different locations. Choose whether each
                virtual patient gets the same placement or varied across the cohort.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onPlacementChange('uniform')}
                  className={`cursor-pointer rounded-xl border p-3 text-left transition-colors ${
                    placement === 'uniform'
                      ? 'border-kz-blue bg-kz-bg-tertiary'
                      : 'border-kz-border-default hover:border-kz-blue/50'
                  }`}
                >
                  <p className="text-sm font-semibold text-kz-text-primary">Uniform</p>
                  <p className="mt-0.5 text-xs text-kz-text-secondary">Same location, all patients</p>
                </button>
                <button
                  onClick={() => onPlacementChange('varied')}
                  className={`cursor-pointer rounded-xl border p-3 text-left transition-colors ${
                    placement === 'varied'
                      ? 'border-kz-blue bg-kz-bg-tertiary'
                      : 'border-kz-border-default hover:border-kz-blue/50'
                  }`}
                >
                  <p className="text-sm font-semibold text-kz-text-primary">Varied</p>
                  <p className="mt-0.5 text-xs text-kz-text-secondary">Randomised across cohort</p>
                </button>
              </div>
            </div>
          </>
        )}

        <hr className="border-kz-border-subtle" />

        {/* Comorbidities — three-state: off / include / required */}
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Activity size={16} className="text-kz-green" />
            <span className="text-sm font-semibold text-kz-text-primary">Pre-existing Conditions</span>
            {activeCount > 0 && (
              <span className="rounded-full bg-kz-green/20 px-2 py-0.5 text-xs font-semibold text-kz-green">
                {activeCount} active
              </span>
            )}
          </div>
          <p className="mb-3 text-xs leading-relaxed text-kz-text-secondary">
            Click to cycle: <span className="text-kz-text-tertiary">Off</span> →{' '}
            <span className="text-kz-green">Include</span> (some patients have it) →{' '}
            <span className="text-kz-cyan">Required</span> (all patients must have it)
          </p>
          <div className="space-y-1.5">
            {COMORBIDITIES.map((c) => {
              const state = comorbidities[c.id] ?? 'off';
              return (
                <button
                  key={c.id}
                  onClick={() => cycleComorbidity(c.id)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2.5 transition-colors ${
                    state === 'required'
                      ? 'border-kz-cyan/40 bg-kz-cyan/10'
                      : state === 'include'
                        ? 'border-kz-green/30 bg-kz-green/10'
                        : 'border-transparent bg-kz-bg-tertiary hover:border-kz-border-default'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-kz-text-primary">{c.label}</span>
                    <span className="text-xs text-kz-text-tertiary">{c.prevalence}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      state === 'required'
                        ? 'bg-kz-cyan/20 text-kz-cyan'
                        : state === 'include'
                          ? 'bg-kz-green/20 text-kz-green'
                          : 'bg-kz-bg-surface text-kz-text-tertiary'
                    }`}
                  >
                    {state === 'required' ? 'Required' : state === 'include' ? 'Include' : 'Off'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
