import type { PatientProfile } from '@/shared/types';
import { patient001 } from './patient-001';
import { patient002 } from './patient-002';
import { patient003 } from './patient-003';

export { patient001, patient002, patient003 };

export const ALL_PATIENTS: PatientProfile[] = [patient001, patient002, patient003];

export function getPatientById(id: string): PatientProfile | undefined {
  return ALL_PATIENTS.find((p) => p.id === id);
}
