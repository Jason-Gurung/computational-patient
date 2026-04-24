import { motion } from 'framer-motion';
import { useScrollReveal } from '@/shared/hooks';
import { fadeIn } from '@/shared/design-tokens';
import { impactContent } from '@/data/content';
import { MetricComparison } from './components/MetricComparison';
import { CostTimeline } from './components/CostTimeline';
import { MoatDiagram } from './components/MoatDiagram';
import { EfficiencySection } from './components/EfficiencySection';

export default function ImpactPage() {
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-kz-green">
              The Numbers
            </p>
            <h1 className="text-5xl font-bold text-kz-text-primary">
              {impactContent.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-kz-text-secondary">
              {impactContent.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before / After Comparisons */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-kz-blue">
              Head to Head
            </p>
            <h2 className="text-2xl font-semibold text-kz-text-primary">
              Traditional vs. Computational
            </h2>
          </div>
          <MetricComparison />
        </div>
      </section>

      {/* Timeline Compression */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-kz-cyan">
              Time &amp; Cost
            </p>
            <h2 className="text-2xl font-semibold text-kz-text-primary">
              Timeline Compression
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-kz-text-secondary">
              Every phase gets shorter. Virtual pre-screening eliminates dead ends before a single dollar
              is spent on human trials.
            </p>
          </div>
          <CostTimeline />
        </div>
      </section>

      {/* Competitive Moat */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-kz-green">
              Competitive Advantage
            </p>
            <h2 className="text-2xl font-semibold text-kz-text-primary">
              {impactContent.moat.title}
            </h2>
          </div>
          <MoatDiagram />
        </div>
      </section>

      {/* Organisational Efficiency */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <EfficiencySection />
        </div>
      </section>
    </div>
  );
}
