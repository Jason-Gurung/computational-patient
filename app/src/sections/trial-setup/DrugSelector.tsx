import { DRUG_MAP } from '@/shared/constants';
import type { DiseaseDefinition } from '@/shared/types';
import { Pill, Syringe } from 'lucide-react';

interface DrugSelectorProps {
  disease: DiseaseDefinition;
}

export function DrugSelector({ disease }: DrugSelectorProps) {
  const drug = Object.values(DRUG_MAP).find((d) => d.targetDisease === disease.id);

  if (!drug) {
    return (
      <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
        <h3 className="text-lg font-semibold text-kz-text-primary">Treatment</h3>
        <p className="mt-2 text-sm text-kz-text-tertiary">No drug matched for this disease.</p>
      </div>
    );
  }

  const RouteIcon = drug.administrationRoute === 'oral' ? Pill : Syringe;

  return (
    <div className="rounded-xl border border-kz-blue bg-kz-bg-tertiary p-6 shadow-[0_0_20px_rgba(79,195,247,0.1)]">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kz-blue/10">
          <RouteIcon size={20} className="text-kz-blue" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-kz-text-primary">{drug.brandName}</h3>
          <p className="text-xs text-kz-text-secondary">{drug.genericName}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
            Mechanism
          </p>
          <p className="mt-1 text-sm leading-relaxed text-kz-text-secondary">
            {drug.mechanism}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
            Route
          </p>
          <p className="mt-1 text-sm capitalize text-kz-text-secondary">
            {drug.administrationRoute}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
            Timeline
          </p>
          <div className="mt-2 flex gap-2">
            {drug.responseTimeline.map((tp) => (
              <div
                key={tp.weekNumber}
                className="rounded-md bg-kz-bg-surface px-2 py-1 text-xs text-kz-text-secondary"
              >
                {tp.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
