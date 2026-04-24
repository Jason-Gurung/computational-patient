import type { PopulationPatient, PatientOutcome, OutcomeAtTime } from '@/shared/types';

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function weightedRandom(
  distribution: [PatientOutcome, number][],
  rand: () => number
): PatientOutcome {
  const r = rand();
  let cumulative = 0;
  for (const [outcome, weight] of distribution) {
    cumulative += weight;
    if (r <= cumulative) return outcome;
  }
  return distribution[distribution.length - 1][0];
}

function generateOutcomeHistory(
  finalOutcome: PatientOutcome,
  rand: () => number
): OutcomeAtTime[] {
  const history: OutcomeAtTime[] = [
    { weekNumber: 0, outcome: 'stable' },
  ];

  const transitions: number[] = [4, 12, 24, 36, 52];
  for (const week of transitions) {
    if (week < 52) {
      const midOutcome = rand() > 0.4 ? 'stable' : finalOutcome;
      history.push({ weekNumber: week, outcome: midOutcome });
    } else {
      history.push({ weekNumber: week, outcome: finalOutcome });
    }
  }

  return history;
}

function generateGridPatients(): PopulationPatient[] {
  const rand = seededRandom(42);
  const patients: PopulationPatient[] = [];
  const GRID_COLS = 100;

  const outcomeDistribution: [PatientOutcome, number][] = [
    ['responding', 0.35],
    ['stable', 0.25],
    ['non-responding', 0.20],
    ['adverse-event', 0.12],
    ['milestone', 0.05],
    ['withdrawn', 0.03],
  ];

  for (let i = 0; i < 10000; i++) {
    const outcome = weightedRandom(outcomeDistribution, rand);
    patients.push({
      id: `pop-${String(i).padStart(5, '0')}`,
      gridPosition: { row: Math.floor(i / GRID_COLS), col: i % GRID_COLS },
      outcome,
      outcomeHistory: generateOutcomeHistory(outcome, rand),
      isClickable: false,
    });
  }

  // 3 clickable patients linked to real profiles
  patients[4247].isClickable = true;
  patients[4247].linkedPatientId = 'patient-001';
  patients[4247].outcome = 'responding';

  patients[1893].isClickable = true;
  patients[1893].linkedPatientId = 'patient-002';
  patients[1893].outcome = 'adverse-event';

  patients[7621].isClickable = true;
  patients[7621].linkedPatientId = 'patient-003';
  patients[7621].outcome = 'non-responding';

  return patients;
}

export const gridPatients = generateGridPatients();

export const CLICKABLE_PATIENT_IDS = ['pop-04247', 'pop-01893', 'pop-07621'];
