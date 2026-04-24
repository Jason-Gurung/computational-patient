import { motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { slideUp, staggerContainer, fadeIn } from '@/shared/design-tokens';
import { landingContent } from '@/data/content';

const ICON_MAP: Record<string, React.ElementType> = {
  clock: Clock,
  'dollar-sign': DollarSign,
  'trending-up': TrendingUp,
  users: Users,
};

const ICON_COLORS = [
  'text-kz-cyan',
  'text-kz-green',
  'text-kz-orange',
  'text-kz-teal',
];

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
          {landingContent.impacts.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Clock;
            return (
              <motion.div
                key={item.label}
                variants={slideUp}
                className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-kz-bg-tertiary ${ICON_COLORS[i]}`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-kz-text-primary">
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-kz-text-secondary">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
