import { useMemo } from 'react';
import { FilterBar } from '@/shared/components';
import { OUTCOME_LABELS, OUTCOME_COLORS } from '@/shared/constants/outcomes';
import { gridPatients } from '@/data/population';
import type { PatientOutcome, PopulationPatient } from '@/shared/types';

function getOutcomeAtWeek(patient: PopulationPatient, week: number): PatientOutcome {
  let current: PatientOutcome = patient.outcomeHistory[0].outcome;
  for (const entry of patient.outcomeHistory) {
    if (entry.weekNumber <= week) {
      current = entry.outcome;
    } else {
      break;
    }
  }
  return current;
}

const ALL_OUTCOMES: PatientOutcome[] = [
  'responding', 'stable', 'non-responding', 'adverse-event', 'milestone', 'withdrawn',
];

interface OutcomeFiltersProps {
  activeFilters: PatientOutcome[];
  onToggle: (outcome: PatientOutcome) => void;
  currentWeek: number;
}

export function OutcomeFilters({ activeFilters, onToggle, currentWeek }: OutcomeFiltersProps) {
  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const o of ALL_OUTCOMES) map[o] = 0;
    for (const p of gridPatients) {
      const outcome = getOutcomeAtWeek(p, currentWeek);
      map[outcome] = (map[outcome] || 0) + 1;
    }
    return map;
  }, [currentWeek]);

  const items = ALL_OUTCOMES.map((o) => ({
    id: o,
    label: `${OUTCOME_LABELS[o]} (${counts[o]?.toLocaleString() ?? 0})`,
    color: OUTCOME_COLORS[o],
  }));

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-4">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
        Filter by Outcome
      </h4>
      <FilterBar
        items={items}
        activeIds={activeFilters}
        onToggle={(id) => onToggle(id as PatientOutcome)}
      />
    </div>
  );
}
