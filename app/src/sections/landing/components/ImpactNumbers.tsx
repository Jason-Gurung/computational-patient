import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/shared/hooks';
import { slideUp, staggerContainer, fadeIn } from '@/shared/design-tokens';
import { landingContent } from '@/data/content';

/* ------------------------------------------------------------------ */
/*  Animated number — counts up on scroll reveal                      */
/* ------------------------------------------------------------------ */

function AnimatedText({
  text,
  inView,
  delay = 0,
}: {
  text: string;
  inView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(text);
  const [started, setStarted] = useState(false);

  const numMatch = text.match(/([\d,.]+)/);
  const hasNumber = numMatch !== null;
  const numericVal = hasNumber ? parseFloat(numMatch[1].replace(/,/g, '')) : 0;
  const prefix = hasNumber ? text.slice(0, text.indexOf(numMatch[1])) : '';
  const suffix = hasNumber
    ? text.slice(text.indexOf(numMatch[1]) + numMatch[1].length)
    : '';
  const hasDecimal = numMatch ? numMatch[1].includes('.') : false;

  useEffect(() => {
    if (!inView || started || !hasNumber) return;
    setStarted(true);
    const duration = 2000;
    const startTime = performance.now() + delay;

    function tick(now: number) {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericVal;
      const formatted = hasDecimal
        ? current.toFixed(1)
        : Math.round(current).toLocaleString();
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, started, hasNumber, numericVal, prefix, suffix, hasDecimal, delay]);

  return <span>{display}</span>;
}

/* ------------------------------------------------------------------ */
/*  Impact Numbers section                                            */
/* ------------------------------------------------------------------ */

export function ImpactNumbers() {
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
            Projected Impact
          </p>
          <h2 className="text-2xl font-semibold text-kz-text-primary">
            What Changes When the Model Works
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {landingContent.impactNumbers.map((item, i) => (
            <motion.div
              key={item.label}
              variants={slideUp}
              className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6 text-center"
            >
              <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
                {item.label}
              </p>

              {/* Current state */}
              <div className="mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary">
                  Today
                </span>
                <p className="mt-1 text-2xl font-bold text-kz-text-primary">
                  <AnimatedText text={item.current} inView={inView} delay={i * 120} />
                </p>
              </div>

              {/* Improvement */}
              <p className="inline-block rounded-lg bg-kz-green/10 px-3 py-1 text-sm font-semibold text-kz-green">
                {item.improvement}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
