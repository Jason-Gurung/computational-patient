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
  // Each patient gets a random "onset week" when they begin showing their outcome.
  // This staggers transitions so the grid has visual variety at every timepoint.
  const onsetWeek = Math.floor(rand() * 40); // 0–39, so some show from week 0

  const history: OutcomeAtTime[] = [
    { weekNumber: 0, outcome: onsetWeek === 0 ? finalOutcome : 'stable' },
  ];

  const checkpoints = [2, 6, 12, 20, 30, 42, 52];
  for (const week of checkpoints) {
    if (week >= onsetWeek) {
      history.push({ weekNumber: week, outcome: finalOutcome });
    } else {
      // Before onset: small chance of an intermediate signal
      const earlySignal = rand() < 0.15;
      history.push({
        weekNumber: week,
        outcome: earlySignal ? finalOutcome : 'stable',
      });
    }
  }

  return history;
}

function generateGridPatients(cohortSize: number): PopulationPatient[] {
  const rand = seededRandom(42);
  const patients: PopulationPatient[] = [];
  const GRID_COLS = Math.ceil(Math.sqrt(cohortSize));

  const outcomeDistribution: [PatientOutcome, number][] = [
    ['responding', 0.35],
    ['stable', 0.25],
    ['non-responding', 0.20],
    ['adverse-event', 0.12],
    ['milestone', 0.05],
    ['withdrawn', 0.03],
  ];

  for (let i = 0; i < cohortSize; i++) {
    const outcome = weightedRandom(outcomeDistribution, rand);
    patients.push({
      id: `pop-${String(i).padStart(5, '0')}`,
      gridPosition: { row: Math.floor(i / GRID_COLS), col: i % GRID_COLS },
      outcome,
      outcomeHistory: generateOutcomeHistory(outcome, rand),
      isClickable: false,
    });
  }

  // 3 clickable patients at proportional positions through the grid
  const clickableIndices = [
    Math.floor(cohortSize * 0.42),
    Math.floor(cohortSize * 0.19),
    Math.floor(cohortSize * 0.76),
  ];
  const linkedIds = ['patient-001', 'patient-002', 'patient-003'];
  const clickableOutcomes: PatientOutcome[] = ['responding', 'adverse-event', 'non-responding'];

  clickableIndices.forEach((idx, i) => {
    if (idx < cohortSize) {
      patients[idx].isClickable = true;
      patients[idx].linkedPatientId = linkedIds[i];
      patients[idx].outcome = clickableOutcomes[i];
    }
  });

  return patients;
}

const _cache = new Map<number, PopulationPatient[]>();

export function getGridPatients(cohortSize: number = 10000): PopulationPatient[] {
  if (_cache.has(cohortSize)) return _cache.get(cohortSize)!;
  const patients = generateGridPatients(cohortSize);
  _cache.set(cohortSize, patients);
  return patients;
}

export function getGridCols(cohortSize: number): number {
  return Math.ceil(Math.sqrt(cohortSize));
}

export const CLICKABLE_LINKED_IDS = ['patient-001', 'patient-002', 'patient-003'];
