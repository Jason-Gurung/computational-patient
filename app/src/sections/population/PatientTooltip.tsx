import type { PopulationPatient, PatientOutcome } from '@/shared/types';
import { OUTCOME_LABELS, OUTCOME_COLORS } from '@/shared/constants/outcomes';
import { MousePointerClick } from 'lucide-react';

const PATIENT_NAMES: Record<string, { name: string; age: number; sex: string }> = {
  'patient-001': { name: 'Eleanor Voss', age: 72, sex: 'Female' },
  'patient-002': { name: 'Marcus Chen', age: 58, sex: 'Male' },
  'patient-003': { name: 'Amara Osei', age: 65, sex: 'Female' },
};

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

interface PatientTooltipProps {
  patient: PopulationPatient;
  position: { x: number; y: number };
  currentWeek: number;
}

export function PatientTooltip({ patient, position, currentWeek }: PatientTooltipProps) {
  const outcome = getOutcomeAtWeek(patient, currentWeek);
  const info = patient.linkedPatientId ? PATIENT_NAMES[patient.linkedPatientId] : null;

  return (
    <div
      className="pointer-events-none fixed z-50 rounded-xl border border-kz-border-strong bg-kz-bg-tertiary p-3 shadow-lg"
      style={{
        left: position.x + 16,
        top: position.y - 8,
        minWidth: 180,
      }}
    >
      {info && (
        <div className="mb-2">
          <div className="text-sm font-semibold text-kz-text-primary">{info.name}</div>
          <div className="text-xs text-kz-text-secondary">
            {info.age}y · {info.sex}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: OUTCOME_COLORS[outcome] }}
        />
        <span className="text-xs font-medium text-kz-text-secondary">
          {OUTCOME_LABELS[outcome]}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1 text-kz-blue">
        <MousePointerClick size={12} />
        <span className="text-xs font-medium">Click to explore</span>
      </div>
    </div>
  );
}
