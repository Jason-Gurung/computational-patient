import { motion } from 'framer-motion';
import { Dna, Shield, TrendingUp, Database } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { slideUp, staggerContainer } from '@/shared/design-tokens';
import { landingContent } from '@/data/content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  dna: Dna,
  shield: Shield,
  'trending-up': TrendingUp,
  database: Database,
};

const ICON_COLORS = [
  'text-kz-cyan',
  'text-kz-green',
  'text-kz-orange',
  'text-kz-purple',
];

export function ConceptCards() {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={slideUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-kz-text-tertiary"
        >
          The Core Thesis
        </motion.p>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2"
        >
          {landingContent.keyMessages.map((msg, i) => {
            const Icon = ICON_MAP[msg.icon] ?? Dna;
            return (
              <motion.div
                key={msg.title}
                variants={slideUp}
                className="group rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6 transition-colors hover:border-kz-blue/50"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-kz-bg-tertiary ${ICON_COLORS[i]}`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-kz-text-primary">
                  {msg.title}
                </h3>
                <p className="text-sm leading-relaxed text-kz-text-secondary">
                  {msg.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
