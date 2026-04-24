import { motion } from 'framer-motion';
import { Users, ArrowRight, Zap } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp, fadeIn } from '@/shared/design-tokens';
import { impactContent } from '@/data/content';

const metrics = [
  { label: 'Pipeline Throughput', before: '15 drugs/year', after: '15 drugs/year', note: 'Same output' },
  { label: 'R&D Headcount', before: '25,000', after: '12,000', note: '-52%' },
  { label: 'Cost Per Drug', before: '$2.6B', after: '$1.4B', note: '-46%' },
  { label: 'Time to Market', before: '12 years', after: '8 years', note: '-33%' },
];

export function EfficiencySection() {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Central message */}
      <motion.div variants={fadeIn} className="mb-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-kz-yellow/30 bg-kz-yellow/10">
          <Zap size={32} className="text-kz-yellow" />
        </div>
        <h3 className="text-2xl font-semibold text-kz-text-primary">
          {impactContent.efficiency.title}
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-kz-text-secondary">
          {impactContent.efficiency.description}
        </p>
      </motion.div>

      {/* Before/After grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={slideUp}
            className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-5"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
              {m.label}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-lg text-kz-text-tertiary line-through">
                {m.before}
              </span>
              <ArrowRight size={16} className="text-kz-text-tertiary" />
              <span className="text-lg font-semibold text-kz-text-primary">
                {m.after}
              </span>
              <span className="ml-auto rounded-full border border-kz-green/30 bg-kz-green/10 px-2 py-0.5 text-xs font-semibold text-kz-green">
                {m.note}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bold statement */}
      <motion.div
        variants={fadeIn}
        className="mt-8 flex items-center gap-4 rounded-xl border border-kz-yellow/30 bg-kz-yellow/5 p-6"
      >
        <Users size={32} className="shrink-0 text-kz-yellow" />
        <div>
          <p className="text-sm font-semibold text-kz-text-primary">
            Fewer people. Greater output. Dramatically reduced risk.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-kz-text-secondary">
            Model-driven decisions replace committee-driven ones. Smaller teams move faster
            with higher confidence. The organisation becomes leaner and more effective at every level.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
