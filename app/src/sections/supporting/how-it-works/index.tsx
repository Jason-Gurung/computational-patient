import { motion } from 'framer-motion';
import { useScrollReveal } from '@/shared/hooks';
import { fadeIn } from '@/shared/design-tokens';
import { howItWorksContent } from '@/data/content';
import { ScaleStack } from './components/ScaleStack';
import { ValidationLoop } from './components/ValidationLoop';
import { DataFlywheel } from './components/DataFlywheel';

export default function HowItWorksPage() {
  const heroReveal = useScrollReveal();

  return (
    <div className="min-h-screen bg-kz-bg-primary text-kz-text-primary">
      {/* Hero */}
      <section className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            ref={heroReveal.ref}
            variants={fadeIn}
            initial="hidden"
            animate={heroReveal.inView ? 'visible' : 'hidden'}
            className="text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-kz-blue">
              The Science
            </p>
            <h1 className="text-5xl font-bold text-kz-text-primary">
              {howItWorksContent.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-kz-text-secondary">
              {howItWorksContent.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scale Stack — Multi-scale biology */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-kz-purple">
              Multi-Scale Simulation
            </p>
            <h2 className="text-2xl font-semibold text-kz-text-primary">
              From Molecules to Organisms
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-kz-text-secondary">
              The Computational Patient models human biology across five interconnected scales.
              Each layer feeds into the next — molecular events drive cellular behaviour,
              cells form tissues, tissues compose organs, and organs interact as a living system.
            </p>
          </div>
          <ScaleStack />
        </div>
      </section>

      {/* Validation Loop — Predict-Test-Learn */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <ValidationLoop />
        </div>
      </section>

      {/* Data Flywheel — Compounding advantage */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <DataFlywheel />
        </div>
      </section>
    </div>
  );
}
