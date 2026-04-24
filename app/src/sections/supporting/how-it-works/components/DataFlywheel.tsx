import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Rocket, Crown } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp, fadeIn } from '@/shared/design-tokens';
import { howItWorksContent } from '@/data/content';

const milestones = [
  {
    drug: 'Drug 1',
    calibration: 100,
    prediction: 15,
    label: 'First Principles',
    detail: 'Extensive calibration required. Model learns fundamental biological pathways from scratch.',
    icon: Zap,
    color: 'kz-orange',
    barColor: 'bg-kz-orange',
    textColor: 'text-kz-orange',
  },
  {
    drug: 'Drug 10',
    calibration: 45,
    prediction: 62,
    label: 'Pattern Recognition',
    detail: 'Model recognises drug class behaviour. Calibration time cut in half. Predictions increasingly reliable.',
    icon: Rocket,
    color: 'kz-blue',
    barColor: 'bg-kz-blue',
    textColor: 'text-kz-blue',
  },
  {
    drug: 'Drug 50',
    calibration: 8,
    prediction: 94,
    label: 'Molecular Prediction',
    detail: 'Predicts outcomes from molecular structure alone. Near-zero calibration. The model is the competitive moat.',
    icon: Crown,
    color: 'kz-green',
    barColor: 'bg-kz-green',
    textColor: 'text-kz-green',
  },
];

function AnimatedBar({ value, color, inView }: { value: number; color: string; inView: boolean }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-kz-bg-primary">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

function AnimatedNumber({ value, inView, duration = 1500 }: { value: number; inView: boolean; duration?: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return <span>{display}</span>;
}

export function DataFlywheel() {
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
        {howItWorksContent.flywheel.title}
      </motion.h3>
      <motion.p
        variants={fadeIn}
        className="mb-10 max-w-2xl text-sm leading-relaxed text-kz-text-secondary"
      >
        {howItWorksContent.flywheel.description}
      </motion.p>

      <div className="grid gap-6 md:grid-cols-3">
        {milestones.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.drug}
              variants={slideUp}
              className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-kz-bg-primary">
                  <Icon size={20} className={m.textColor} />
                </div>
                <div>
                  <div className={`text-sm font-semibold ${m.textColor}`}>{m.drug}</div>
                  <div className="text-xs text-kz-text-tertiary">{m.label}</div>
                </div>
              </div>

              {/* Description */}
              <p className="mb-5 text-xs leading-relaxed text-kz-text-secondary">
                {m.detail}
              </p>

              {/* Calibration bar */}
              <div className="mb-3">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-xs text-kz-text-tertiary">Calibration Effort</span>
                  <span className="text-sm font-semibold text-kz-text-primary">
                    <AnimatedNumber value={m.calibration} inView={inView} />%
                  </span>
                </div>
                <AnimatedBar value={m.calibration} color="bg-kz-orange/70" inView={inView} />
              </div>

              {/* Prediction accuracy bar */}
              <div>
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="text-xs text-kz-text-tertiary">Prediction Accuracy</span>
                  <span className="text-sm font-semibold text-kz-text-primary">
                    <AnimatedNumber value={m.prediction} inView={inView} />%
                  </span>
                </div>
                <AnimatedBar value={m.prediction} color={m.barColor} inView={inView} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Arrow progression */}
      <motion.div variants={fadeIn} className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2 rounded-xl border border-kz-border-subtle bg-kz-bg-secondary/50 px-6 py-3">
          <span className="text-sm text-kz-orange">Drug 1</span>
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <path d="M0 6h32m-4-4 4 4-4 4" stroke="#546E7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm text-kz-blue">Drug 10</span>
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <path d="M0 6h32m-4-4 4 4-4 4" stroke="#546E7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-semibold text-kz-green">Drug 50</span>
          <span className="ml-2 text-xs text-kz-text-tertiary">every drug makes the model better</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
