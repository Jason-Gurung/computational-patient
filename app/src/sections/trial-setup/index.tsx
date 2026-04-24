import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageShell, SectionHeading } from '@/shared/components';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp } from '@/shared/design-tokens';
import { defaultTrialConfig } from '@/data/trial';
import { DISEASE_MAP } from '@/shared/constants';
import type { TrialConfig, DiseaseId } from '@/shared/types';

import { CohortSizeSelector } from './CohortSizeSelector';
import { RealSyntheticRatio } from './RealSyntheticRatio';
import { DiseaseSelector } from './DiseaseSelector';
import { DrugSelector } from './DrugSelector';
import { PlacementOptions } from './PlacementOptions';
import { ComorbidityPanel } from './ComorbidityPanel';
import { TrialSummaryCard } from './TrialSummaryCard';
import { LaunchButton } from './LaunchButton';

// Each disease maps to its matching drug by targetDisease
const DISEASE_TO_DRUG: Record<string, TrialConfig['drugId']> = {
  'attr-cm': 'vyndaqel',
  'nsclc-alk': 'lorbrena',
  'rheumatoid-arthritis': 'xeljanz',
  'breast-hr-her2': 'ibrance',
  prostate: 'xtandi',
  'blood-clots': 'eliquis',
  'renal-cell': 'sutent',
  cml: 'bosulif',
};

export default function TrialSetupPage() {
  const [config, setConfig] = useState<TrialConfig>(defaultTrialConfig);
  const { ref, inView } = useScrollReveal();

  const disease = DISEASE_MAP[config.diseaseId];

  const updateConfig = <K extends keyof TrialConfig>(key: K, value: TrialConfig[K]) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const handleDiseaseChange = (id: DiseaseId) => {
    setConfig((prev) => ({
      ...prev,
      diseaseId: id,
      drugId: DISEASE_TO_DRUG[id] ?? 'vyndaqel',
      diseasePlacement: DISEASE_MAP[id]?.canVaryPlacement ? prev.diseasePlacement : 'uniform',
    }));
  };

  return (
    <PageShell>
      <SectionHeading
        title="Configure Virtual Trial"
        subtitle="Set up the parameters for your computational clinical trial"
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        {/* Left column — controls */}
        <div className="space-y-6">
          <motion.div variants={slideUp}>
            <CohortSizeSelector
              value={config.cohortSize}
              onChange={(v) => updateConfig('cohortSize', v)}
            />
          </motion.div>

          <motion.div variants={slideUp}>
            <RealSyntheticRatio
              value={config.realToSyntheticRatio}
              cohortSize={config.cohortSize}
              onChange={(v) => updateConfig('realToSyntheticRatio', v)}
            />
          </motion.div>

          <motion.div variants={slideUp}>
            <DiseaseSelector
              selected={config.diseaseId}
              onChange={handleDiseaseChange}
            />
          </motion.div>

          <motion.div variants={slideUp}>
            <DrugSelector disease={disease} />
          </motion.div>

          <motion.div variants={slideUp}>
            <PlacementOptions
              disease={disease}
              value={config.diseasePlacement}
              onChange={(v) => updateConfig('diseasePlacement', v)}
            />
          </motion.div>

          <motion.div variants={slideUp}>
            <ComorbidityPanel />
          </motion.div>
        </div>

        {/* Right column — summary + launch */}
        <div className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <motion.div variants={slideUp}>
            <TrialSummaryCard config={config} />
          </motion.div>
          <motion.div variants={slideUp}>
            <LaunchButton />
          </motion.div>
        </div>
      </motion.div>
    </PageShell>
  );
}
