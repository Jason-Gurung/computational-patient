import { motion } from 'framer-motion';
import { useScrollReveal } from '@/shared/hooks';
import { slideUp, staggerContainer, fadeIn } from '@/shared/design-tokens';

/* ------------------------------------------------------------------ */
/*  Data: Traditional vs Computational timelines                      */
/* ------------------------------------------------------------------ */

interface Phase {
  name: string;
  years: string;
  span: number; // relative width out of 100
  color: string;
}

const traditionalPhases: Phase[] = [
  { name: 'Discovery', years: '3-6 yrs', span: 30, color: 'bg-kz-purple' },
  { name: 'Preclinical', years: '1-3 yrs', span: 15, color: 'bg-kz-blue' },
  { name: 'Phase I', years: '1-2 yrs', span: 12, color: 'bg-kz-cyan' },
  { name: 'Phase II', years: '2-3 yrs', span: 18, color: 'bg-kz-orange' },
  { name: 'Phase III', years: '2-4 yrs', span: 20, color: 'bg-kz-pink' },
  { name: 'Review', years: '1-2 yrs', span: 5, color: 'bg-kz-text-tertiary' },
];

const computationalPhases: Phase[] = [
  { name: 'AI Discovery', years: '1-2 yrs', span: 18, color: 'bg-kz-purple' },
  { name: 'Virtual Preclinical', years: '6-12 mo', span: 10, color: 'bg-kz-blue' },
  { name: 'Phase I', years: '6-12 mo', span: 10, color: 'bg-kz-cyan' },
  { name: 'Phase II', years: '1-2 yrs', span: 15, color: 'bg-kz-orange' },
  { name: 'Phase III', years: '1-2 yrs', span: 15, color: 'bg-kz-green' },
  { name: 'Review', years: '6-12 mo', span: 5, color: 'bg-kz-text-tertiary' },
];

/* ------------------------------------------------------------------ */
/*  Timeline bar component                                            */
/* ------------------------------------------------------------------ */

function TimelineBar({
  phases,
  label,
  totalYears,
  inView,
  accentColor,
}: {
  phases: Phase[];
  label: string;
  totalYears: string;
  inView: boolean;
  accentColor: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-kz-text-primary">{label}</h3>
        <span className={`text-xs font-semibold ${accentColor}`}>{totalYears}</span>
      </div>

      {/* Bar */}
      <div className="flex gap-1 overflow-hidden rounded-xl">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.name}
            className={`${phase.color} relative h-10 overflow-hidden rounded-sm`}
            style={{ width: `${phase.span}%` }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: 'easeOut',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <span className="truncate px-1 text-[10px] font-semibold text-kz-bg-primary">
                {phase.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Phase details below the bar */}
      <div className="mt-2 flex gap-1">
        {phases.map((phase) => (
          <div key={phase.name} style={{ width: `${phase.span}%` }} className="text-center">
            <span className="text-[10px] text-kz-text-tertiary">{phase.years}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Timeline Comparison section                                       */
/* ------------------------------------------------------------------ */

export function TimelineComparison() {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-4 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-kz-text-tertiary">
            Side by Side
          </p>
          <h2 className="text-2xl font-semibold text-kz-text-primary">
            Compressing the Timeline
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 space-y-10"
        >
          {/* Traditional */}
          <motion.div
            variants={slideUp}
            className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6"
          >
            <TimelineBar
              phases={traditionalPhases}
              label="Traditional Drug Development"
              totalYears="10-15 years"
              inView={inView}
              accentColor="text-kz-pink"
            />
          </motion.div>

          {/* Divider with arrow */}
          <motion.div variants={fadeIn} className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-kz-border-default" />
            <span className="text-xs font-semibold uppercase tracking-wider text-kz-cyan">
              With Computational Patients
            </span>
            <div className="h-px flex-1 bg-kz-border-default" />
          </motion.div>

          {/* Computational */}
          <motion.div
            variants={slideUp}
            className="rounded-xl border border-kz-blue/30 bg-kz-bg-secondary p-6"
          >
            <TimelineBar
              phases={computationalPhases}
              label="Computational Patient Approach"
              totalYears="6-9 years"
              inView={inView}
              accentColor="text-kz-green"
            />
          </motion.div>
        </motion.div>

        {/* Key callout */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-sm text-kz-text-secondary"
        >
          Phases overlap more. Virtual trials run in parallel. Failures are caught in silico, not in clinic.
        </motion.p>
      </div>
    </section>
  );
}
