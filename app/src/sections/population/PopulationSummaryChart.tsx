import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { getGridPatients } from '@/data/population';
import { OUTCOME_COLORS, OUTCOME_LABELS } from '@/shared/constants/outcomes';
import type { PatientOutcome, PopulationPatient } from '@/shared/types';
import { colors } from '@/shared/design-tokens';

const WEEK_SNAPSHOTS = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52];

const ALL_OUTCOMES: PatientOutcome[] = [
  'responding', 'stable', 'non-responding', 'adverse-event', 'milestone', 'withdrawn',
];

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

function buildChartData(cohortSize: number) {
  return WEEK_SNAPSHOTS.map((week) => {
    const counts: Record<string, number> = {};
    for (const o of ALL_OUTCOMES) counts[o] = 0;
    const patients = getGridPatients(cohortSize);
    for (const p of patients) {
      const outcome = getOutcomeAtWeek(p, week);
      counts[outcome] = (counts[outcome] || 0) + 1;
    }
    const total = patients.length;
    const row: Record<string, number | string> = { week: `W${week}` };
    for (const o of ALL_OUTCOMES) {
      row[o] = Number(((counts[o] / total) * 100).toFixed(1));
    }
    return row;
  });
}

interface PopulationSummaryChartProps {
  currentWeek: number;
  cohortSize: number;
}

export function PopulationSummaryChart({ currentWeek, cohortSize }: PopulationSummaryChartProps) {
  const data = useMemo(() => buildChartData(cohortSize), [cohortSize]);

  const currentWeekLabel = `W${currentWeek}`;

  return (
    <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-4">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
        Outcome Distribution Over Time
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border.subtle} />
          <XAxis
            dataKey="week"
            tick={{ fill: colors.text.tertiary, fontSize: 11 }}
            axisLine={{ stroke: colors.border.default }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: colors.text.tertiary, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.bg.tertiary,
              border: `1px solid ${colors.border.strong}`,
              borderRadius: 12,
              fontSize: 12,
              color: colors.text.primary,
            }}
            formatter={(value: number, name: string) => [
              `${value}%`,
              OUTCOME_LABELS[name as PatientOutcome] ?? name,
            ]}
          />
          <ReferenceLine
            x={currentWeekLabel}
            stroke={colors.accent.cyan}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
          {ALL_OUTCOMES.map((outcome) => (
            <Area
              key={outcome}
              type="monotone"
              dataKey={outcome}
              stackId="1"
              fill={OUTCOME_COLORS[outcome]}
              stroke={OUTCOME_COLORS[outcome]}
              fillOpacity={0.7}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
