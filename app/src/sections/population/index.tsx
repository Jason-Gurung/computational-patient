import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Microscope } from 'lucide-react';
import { PageShell, TimeControls } from '@/shared/components';
import { useSimulationTime } from '@/shared/hooks';
import { fadeIn } from '@/shared/design-tokens';
import { useTrialConfig } from '@/shared/context/TrialConfigContext';
import { DISEASE_MAP, DRUG_MAP } from '@/shared/constants';
import type { PatientOutcome } from '@/shared/types';
import { PatientGrid } from './PatientGrid';
import { OutcomeMetrics } from './OutcomeMetrics';
import { OutcomeFilters } from './OutcomeFilters';
import { PopulationSummaryChart } from './PopulationSummaryChart';
import { formatWeekLabel } from '@/lib/format';

export default function PopulationViewPage() {
  const { state, toggle, setWeek, setSpeed } = useSimulationTime(52);
  const [activeFilters, setActiveFilters] = useState<PatientOutcome[]>([]);
  const { config } = useTrialConfig();

  const disease = DISEASE_MAP[config.diseaseId];
  const drug = DRUG_MAP[config.drugId];

  const handleFilterToggle = useCallback((outcome: PatientOutcome) => {
    setActiveFilters((prev) =>
      prev.includes(outcome) ? prev.filter((o) => o !== outcome) : [...prev, outcome]
    );
  }, []);

  return (
    <PageShell>
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Users size={20} className="text-kz-blue" />
              <span className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
                Virtual Clinical Trial
              </span>
            </div>
            <h1 className="text-3xl font-bold text-kz-text-primary">
              Population Trial View
            </h1>
            <p className="mt-1 text-sm text-kz-text-secondary">
              {config.cohortSize.toLocaleString()} computational patients · {drug?.brandName ?? 'Vyndaqel'} ({drug?.genericName ?? 'tafamidis'}) · {disease?.shortName ?? 'ATTR-CM'}
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-kz-border-default bg-kz-bg-secondary px-4 py-2">
            <Microscope size={16} className="text-kz-cyan" />
            <span className="text-sm font-semibold text-kz-text-primary">
              {formatWeekLabel(state.currentWeek)}
            </span>
            <span className="text-xs text-kz-text-tertiary">
              of 52 weeks
            </span>
          </div>
        </div>

        {/* Timeline Controls — full width */}
        <div className="mb-6">
          <TimeControls
            currentWeek={state.currentWeek}
            maxWeek={state.maxWeek}
            isPlaying={state.isPlaying}
            speed={state.speed}
            onToggle={toggle}
            onSetWeek={setWeek}
            onSetSpeed={setSpeed}
          />
        </div>

        {/* Main content: Grid + Sidebar */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left: Patient Grid */}
          <div>
            <PatientGrid
              currentWeek={state.currentWeek}
              activeFilters={activeFilters}
              cohortSize={config.cohortSize}
            />
          </div>

          {/* Right Sidebar: Metrics + Filters */}
          <div className="flex flex-col gap-4">
            <OutcomeMetrics currentWeek={state.currentWeek} />
            <OutcomeFilters
              activeFilters={activeFilters}
              onToggle={handleFilterToggle}
              currentWeek={state.currentWeek}
              cohortSize={config.cohortSize}
            />
            {/* Legend */}
            <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
                How to explore
              </h4>
              <p className="text-xs leading-relaxed text-kz-text-secondary">
                Press play to watch outcomes evolve over 52 weeks.
                Filter by outcome type to isolate groups.
                Hover over glowing dots to find explorable patients — click to dive into their body explorer.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Chart */}
        <PopulationSummaryChart currentWeek={state.currentWeek} cohortSize={config.cohortSize} />
      </motion.div>
    </PageShell>
  );
}
