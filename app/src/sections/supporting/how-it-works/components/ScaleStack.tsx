import { motion } from 'framer-motion';
import { Atom, CircleDot, Layers, Heart, User } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp } from '@/shared/design-tokens';
import { howItWorksContent } from '@/data/content';

const scaleIcons = [Atom, CircleDot, Layers, Heart, User];
const scaleColors = [
  'kz-purple',
  'kz-cyan',
  'kz-teal',
  'kz-pink',
  'kz-blue',
] as const;

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string; line: string }> = {
  'kz-purple': {
    border: 'border-kz-purple/40',
    bg: 'bg-kz-purple/10',
    text: 'text-kz-purple',
    glow: 'shadow-[0_0_20px_rgba(179,136,255,0.2)]',
    line: 'bg-kz-purple/30',
  },
  'kz-cyan': {
    border: 'border-kz-cyan/40',
    bg: 'bg-kz-cyan/10',
    text: 'text-kz-cyan',
    glow: 'shadow-[0_0_20px_rgba(0,229,255,0.2)]',
    line: 'bg-kz-cyan/30',
  },
  'kz-teal': {
    border: 'border-kz-teal/40',
    bg: 'bg-kz-teal/10',
    text: 'text-kz-teal',
    glow: 'shadow-[0_0_20px_rgba(100,255,218,0.2)]',
    line: 'bg-kz-teal/30',
  },
  'kz-pink': {
    border: 'border-kz-pink/40',
    bg: 'bg-kz-pink/10',
    text: 'text-kz-pink',
    glow: 'shadow-[0_0_20px_rgba(255,64,129,0.2)]',
    line: 'bg-kz-pink/30',
  },
  'kz-blue': {
    border: 'border-kz-blue/40',
    bg: 'bg-kz-blue/10',
    text: 'text-kz-blue',
    glow: 'shadow-[0_0_20px_rgba(79,195,247,0.2)]',
    line: 'bg-kz-blue/30',
  },
};

export function ScaleStack() {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative flex flex-col gap-6"
    >
      {howItWorksContent.scales.map((scale, i) => {
        const Icon = scaleIcons[i];
        const color = scaleColors[i];
        const styles = colorMap[color];

        return (
          <motion.div key={scale.level} variants={slideUp} className="relative">
            {/* Connector line to next card */}
            {i < howItWorksContent.scales.length - 1 && (
              <div className={`absolute left-8 top-full z-0 h-6 w-px ${styles.line}`} />
            )}

            <div
              className={`relative rounded-xl border ${styles.border} ${styles.bg} p-6 ${styles.glow} transition-colors`}
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${styles.bg} ${styles.border} border`}
                >
                  <Icon size={32} className={styles.text} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${styles.text}`}>
                      Scale {i + 1}
                    </span>
                    <div className={`h-px flex-1 ${styles.line}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-kz-text-primary">
                    {scale.level}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-kz-text-secondary">
                    {scale.description}
                  </p>
                  <p className="mt-3 rounded-lg border border-kz-border-subtle bg-kz-bg-primary/50 px-3 py-2 text-xs leading-relaxed text-kz-text-tertiary italic">
                    {scale.example}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
