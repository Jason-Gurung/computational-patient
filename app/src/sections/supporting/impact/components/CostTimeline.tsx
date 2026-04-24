import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp, fadeIn } from '@/shared/design-tokens';

const phases = [
  { name: 'Discovery', traditional: 4, computational: 2 },
  { name: 'Preclinical', traditional: 2, computational: 1 },
  { name: 'Phase I', traditional: 1.5, computational: 0.8 },
  { name: 'Phase II', traditional: 2.5, computational: 1.5 },
  { name: 'Phase III', traditional: 3, computational: 2 },
  { name: 'Review', traditional: 1.5, computational: 1 },
];

const traditionalTotal = phases.reduce((s, p) => s + p.traditional, 0); // 14.5
const computationalTotal = phases.reduce((s, p) => s + p.computational, 0); // 8.3

function AnimatedNumber({ value, inView, suffix = '', prefix = '' }: { value: number; inView: boolean; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value * 10) / 10);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span>{prefix}{display.toFixed(1)}{suffix}</span>;
}

export function CostTimeline() {
  const { ref, inView } = useScrollReveal();

  const maxYears = traditionalTotal;

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Summary stats */}
      <motion.div variants={slideUp} className="mb-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-5 text-center">
          <Clock size={24} className="mx-auto mb-2 text-kz-text-tertiary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">Time Saved</p>
          <p className="mt-1 text-2xl font-bold text-kz-green">
            <AnimatedNumber value={traditionalTotal - computationalTotal} inView={inView} suffix=" years" />
          </p>
        </div>
        <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-5 text-center">
          <DollarSign size={24} className="mx-auto mb-2 text-kz-text-tertiary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">Cost Reduction</p>
          <p className="mt-1 text-2xl font-bold text-kz-green">
            <AnimatedNumber value={46} inView={inView} suffix="%" />
          </p>
        </div>
        <div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-5 text-center">
          <Clock size={24} className="mx-auto mb-2 text-kz-text-tertiary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">Drugs to Market / Decade</p>
          <p className="mt-1 text-2xl font-bold text-kz-cyan">
            2x
          </p>
        </div>
      </motion.div>

      {/* Dual timeline */}
      <motion.div variants={fadeIn} className="space-y-8">
        {/* Traditional timeline */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
            Traditional — {traditionalTotal} years
          </p>
          <div className="flex h-12 overflow-hidden rounded-xl border border-kz-border-subtle">
            {phases.map((phase, i) => {
              const widthPct = (phase.traditional / maxYears) * 100;
              return (
                <motion.div
                  key={phase.name}
                  className="relative flex items-center justify-center border-r border-kz-bg-primary/50 bg-kz-bg-surface/80 last:border-r-0"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${widthPct}%` } : { width: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                >
                  <span className="truncate px-1 text-[10px] text-kz-text-tertiary">
                    {phase.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Computational timeline */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-kz-cyan">
            Computational — {computationalTotal} years
          </p>
          <div className="flex overflow-hidden rounded-xl border border-kz-cyan/30" style={{ width: `${(computationalTotal / maxYears) * 100}%` }}>
            <div className="flex h-12 w-full">
              {phases.map((phase, i) => {
                const widthPct = (phase.computational / computationalTotal) * 100;
                return (
                  <motion.div
                    key={phase.name}
                    className="relative flex items-center justify-center border-r border-kz-bg-primary/50 bg-kz-cyan/10 last:border-r-0"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${widthPct}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                  >
                    <span className="truncate px-1 text-[10px] text-kz-cyan/80">
                      {phase.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Saved time indicator */}
          <div
            className="mt-2 flex items-center justify-end"
            style={{ width: `${(traditionalTotal / maxYears) * 100}%` }}
          >
            <div className="flex items-center gap-1 rounded-full border border-kz-green/30 bg-kz-green/10 px-3 py-1">
              <span className="text-xs font-semibold text-kz-green">
                {(traditionalTotal - computationalTotal).toFixed(1)} years saved
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
