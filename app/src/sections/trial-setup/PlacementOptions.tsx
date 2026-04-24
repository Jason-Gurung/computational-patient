import type { DiseaseDefinition } from '@/shared/types';
import { MapPin } from 'lucide-react';

interface PlacementOptionsProps {
  disease: DiseaseDefinition;
  value: 'uniform' | 'varied';
  onChange: (value: 'uniform' | 'varied') => void;
}

export function PlacementOptions({ disease, value, onChange }: PlacementOptionsProps) {
  if (!disease.canVaryPlacement) return null;

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
      <div className="mb-3 flex items-center gap-3">
        <MapPin size={20} className="text-kz-orange" />
        <h3 className="text-lg font-semibold text-kz-text-primary">Disease Placement</h3>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-kz-text-secondary">
        {disease.shortName} can originate in different locations. Choose whether each virtual
        patient gets the same placement or varied.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange('uniform')}
          className={`cursor-pointer rounded-xl border p-4 text-left transition-colors ${
            value === 'uniform'
              ? 'border-kz-blue bg-kz-bg-tertiary'
              : 'border-kz-border-default bg-kz-bg-secondary hover:border-kz-blue/50'
          }`}
        >
          <p className="text-sm font-semibold text-kz-text-primary">Uniform</p>
          <p className="mt-1 text-xs text-kz-text-secondary">
            Same location for all patients
          </p>
        </button>

        <button
          onClick={() => onChange('varied')}
          className={`cursor-pointer rounded-xl border p-4 text-left transition-colors ${
            value === 'varied'
              ? 'border-kz-blue bg-kz-bg-tertiary'
              : 'border-kz-border-default bg-kz-bg-secondary hover:border-kz-blue/50'
          }`}
        >
          <p className="text-sm font-semibold text-kz-text-primary">Varied</p>
          <p className="mt-1 text-xs text-kz-text-secondary">
            Randomised across patients
          </p>
        </button>
      </div>
    </div>
  );
}
