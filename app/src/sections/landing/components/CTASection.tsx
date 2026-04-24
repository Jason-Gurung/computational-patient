import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { fadeIn, slideUp } from '@/shared/design-tokens';
import { ROUTES } from '@/shared/constants';

export function CTASection() {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-32">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <motion.div variants={fadeIn} className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kz-blue/10 text-kz-blue">
            <Sparkles size={28} />
          </div>
        </motion.div>

        <motion.h2
          variants={slideUp}
          className="mb-4 text-3xl font-bold text-kz-text-primary md:text-4xl"
        >
          See It in Action
        </motion.h2>

        <motion.p
          variants={slideUp}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-kz-text-secondary"
        >
          Configure a virtual trial, generate 10,000 computational patients, and
          explore how a drug moves through a single human body — from bloodstream
          to molecular target.
        </motion.p>

        <motion.div variants={fadeIn}>
          <Link
            to={ROUTES.TRIAL_SETUP}
            className="inline-flex items-center gap-2 rounded-xl bg-kz-blue px-10 py-4 text-lg font-semibold text-kz-bg-primary shadow-[0_0_20px_rgba(79,195,247,0.3)] hover:opacity-80 transition-opacity"
          >
            Configure a Virtual Trial
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
