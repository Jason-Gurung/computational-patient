import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp } from '@/shared/design-tokens';
import { impactContent } from '@/data/content';

export function MetricComparison() {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="grid gap-5"
    >
      {impactContent.comparisons.map((comp) => (
        <motion.div
          key={comp.category}
          variants={slideUp}
          className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6"
        >
          {/* Category label */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
            {comp.category}
          </p>

          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            {/* Traditional */}
            <div className="rounded-xl border border-kz-border-subtle bg-kz-bg-primary/50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
                Traditional
              </p>
              <p className="text-2xl font-bold text-kz-text-secondary">
                {comp.traditional.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-kz-text-tertiary">
                {comp.traditional.detail}
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-kz-blue/30 bg-kz-blue/10">
                <ArrowRight size={20} className="text-kz-blue" />
              </div>
            </div>

            {/* Computational */}
            <div className="rounded-xl border border-kz-blue/30 bg-kz-blue/5 p-4 shadow-[0_0_20px_rgba(79,195,247,0.1)]">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-kz-blue">
                Computational
              </p>
              <p className="text-2xl font-bold text-kz-text-primary">
                {comp.computational.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-kz-text-secondary">
                {comp.computational.detail}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
