import { DISEASE_MAP, DRUG_MAP } from '@/shared/constants';
import type { TrialConfig } from '@/shared/types';
import { FlaskConical, Users, Database, Sparkles, Target, Pill } from 'lucide-react';

interface TrialSummaryCardProps {
  config: TrialConfig;
}

export function TrialSummaryCard({ config }: TrialSummaryCardProps) {
  const disease = DISEASE_MAP[config.diseaseId];
  const drug = Object.values(DRUG_MAP).find((d) => d.targetDisease === config.diseaseId);

  const realCount = Math.round(config.cohortSize * config.realToSyntheticRatio);
  const syntheticCount = config.cohortSize - realCount;

  return (
    <div className="rounded-xl border border-kz-border-strong bg-kz-bg-tertiary p-6">
      <div className="mb-5 flex items-center gap-3">
        <FlaskConical size={20} className="text-kz-cyan" />
        <h3 className="text-lg font-semibold text-kz-text-primary">Trial Summary</h3>
      </div>

      <div className="space-y-4">
        {/* Cohort */}
        <SummaryRow
          icon={<Users size={16} className="text-kz-blue" />}
          label="Total Cohort"
          value={config.cohortSize.toLocaleString()}
        />
        <SummaryRow
          icon={<Database size={16} className="text-kz-blue" />}
          label="Real Models"
          value={realCount.toLocaleString()}
        />
        <SummaryRow
          icon={<Sparkles size={16} className="text-kz-purple" />}
          label="Generated Models"
          value={syntheticCount.toLocaleString()}
        />

        <hr className="border-kz-border-subtle" />

        {/* Disease */}
        <SummaryRow
          icon={<Target size={16} className="text-kz-pink" />}
          label="Disease"
          value={disease?.shortName ?? config.diseaseId}
        />
        {disease?.canVaryPlacement && (
          <SummaryRow
            icon={null}
            label="Placement"
            value={config.diseasePlacement === 'uniform' ? 'Uniform' : 'Varied'}
          />
        )}

        <hr className="border-kz-border-subtle" />

        {/* Drug */}
        <SummaryRow
          icon={<Pill size={16} className="text-kz-green" />}
          label="Treatment"
          value={drug?.brandName ?? '—'}
        />
        {drug && (
          <SummaryRow
            icon={null}
            label="Generic"
            value={drug.genericName}
          />
        )}
      </div>

      {/* Duration estimate */}
      <div className="mt-6 rounded-lg bg-kz-bg-surface p-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
          Simulated Duration
        </p>
        <p className="mt-1 text-2xl font-bold text-kz-text-primary">52 weeks</p>
        <p className="mt-1 text-xs text-kz-text-secondary">
          Estimated compute: &lt;3 minutes
        </p>
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon ?? <span className="w-4" />}
        <span className="text-sm text-kz-text-secondary">{label}</span>
      </div>
      <span className="text-sm font-semibold text-kz-text-primary">{value}</span>
    </div>
  );
}
