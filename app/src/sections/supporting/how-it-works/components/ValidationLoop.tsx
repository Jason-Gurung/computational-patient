import { motion } from 'framer-motion';
import { BrainCircuit, FlaskConical, Search, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp, fadeIn } from '@/shared/design-tokens';
import { howItWorksContent } from '@/data/content';

const stepIcons = [BrainCircuit, FlaskConical, Search, TrendingUp];
const stepLabels = ['Predict', 'Test', 'Learn', 'Improve'];
const stepColors = ['text-kz-blue', 'text-kz-green', 'text-kz-yellow', 'text-kz-cyan'];
const stepBorders = [
  'border-kz-blue/40',
  'border-kz-green/40',
  'border-kz-yellow/40',
  'border-kz-cyan/40',
];
const stepBgs = [
  'bg-kz-blue/10',
  'bg-kz-green/10',
  'bg-kz-yellow/10',
  'bg-kz-cyan/10',
];

export function ValidationLoop() {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.h3
        variants={fadeIn}
        className="mb-3 text-2xl font-semibold text-kz-text-primary"
      >
        {howItWorksContent.validationLoop.title}
      </motion.h3>
      <motion.p variants={fadeIn} className="mb-10 text-sm leading-relaxed text-kz-text-secondary">
        Every prediction is tested against reality. Every discrepancy teaches the model something new.
      </motion.p>

      {/* Loop visualization */}
      <div className="relative">
        {/* Desktop: horizontal loop */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {howItWorksContent.validationLoop.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div key={i} variants={slideUp} className="relative">
                {/* Arrow connector (hidden on mobile, hidden on last item) */}
                {i < 3 && (
                  <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14m-5-5 5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-kz-text-tertiary"
                      />
                    </svg>
                  </div>
                )}

                <div
                  className={`rounded-xl border ${stepBorders[i]} ${stepBgs[i]} p-5 text-center`}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-kz-border-default bg-kz-bg-primary">
                    <Icon size={24} className={stepColors[i]} />
                  </div>
                  <div className={`mb-2 text-sm font-semibold uppercase tracking-wider ${stepColors[i]}`}>
                    {stepLabels[i]}
                  </div>
                  <p className="text-xs leading-relaxed text-kz-text-secondary">{step}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Return arrow — loops back from Improve to Predict */}
        <motion.div
          variants={fadeIn}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <svg width="100%" height="40" viewBox="0 0 800 40" fill="none" className="max-w-2xl">
            <path
              d="M700 8 C 750 8, 780 20, 780 20 C 780 20, 750 32, 700 32 L 100 32 C 50 32, 20 20, 20 20 C 20 20, 50 8, 100 8"
              stroke="#546E7A"
              strokeWidth="1"
              strokeDasharray="6 4"
              fill="none"
            />
            <polygon points="95,4 105,8 95,12" fill="#546E7A" />
          </svg>
        </motion.div>
        <p className="mt-1 text-center text-xs text-kz-text-tertiary">
          Continuous improvement cycle
        </p>
      </div>
    </motion.div>
  );
}
