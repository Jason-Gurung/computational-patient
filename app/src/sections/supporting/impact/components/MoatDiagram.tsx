import { motion } from 'framer-motion';
import { Shield, Database, Globe, TrendingUp, Target } from 'lucide-react';
import { useScrollReveal } from '@/shared/hooks';
import { staggerContainer, slideUp, fadeIn } from '@/shared/design-tokens';
import { impactContent } from '@/data/content';

const ringIcons = [Database, Globe, Target, TrendingUp, Shield];
const ringColors = [
  { text: 'text-kz-blue', border: 'border-kz-blue/30', bg: 'bg-kz-blue/5', ring: 'border-kz-blue/20' },
  { text: 'text-kz-purple', border: 'border-kz-purple/30', bg: 'bg-kz-purple/5', ring: 'border-kz-purple/20' },
  { text: 'text-kz-teal', border: 'border-kz-teal/30', bg: 'bg-kz-teal/5', ring: 'border-kz-teal/20' },
  { text: 'text-kz-cyan', border: 'border-kz-cyan/30', bg: 'bg-kz-cyan/5', ring: 'border-kz-cyan/20' },
  { text: 'text-kz-green', border: 'border-kz-green/30', bg: 'bg-kz-green/5', ring: 'border-kz-green/20' },
];

export function MoatDiagram() {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1fr]">
        {/* Concentric rings visualization */}
        <motion.div variants={fadeIn} className="flex items-center justify-center">
          <div className="relative">
            {/* Rings from outside in */}
            {[...impactContent.moat.points].reverse().map((_, i) => {
              const size = 280 - i * 48;
              const reverseIdx = impactContent.moat.points.length - 1 - i;
              const color = ringColors[reverseIdx];
              return (
                <motion.div
                  key={i}
                  className={`absolute left-1/2 top-1/2 rounded-full border-2 ${color.ring}`}
                  style={{
                    width: size,
                    height: size,
                    marginLeft: -size / 2,
                    marginTop: -size / 2,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                />
              );
            })}
            {/* Center label */}
            <motion.div
              className="relative flex h-[280px] w-[280px] items-center justify-center"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center">
                <Shield size={32} className="mx-auto mb-2 text-kz-green" />
                <p className="text-sm font-semibold text-kz-text-primary">Pfizer's</p>
                <p className="text-sm font-semibold text-kz-green">Moat</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* List of moat points */}
        <div className="space-y-4">
          {impactContent.moat.points.map((point, i) => {
            const Icon = ringIcons[i];
            const color = ringColors[i];
            return (
              <motion.div
                key={i}
                variants={slideUp}
                className={`flex items-start gap-4 rounded-xl border ${color.border} ${color.bg} p-4`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kz-bg-primary">
                  <Icon size={20} className={color.text} />
                </div>
                <p className="text-sm leading-relaxed text-kz-text-secondary">{point}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom callout */}
      <motion.div
        variants={fadeIn}
        className="mt-10 rounded-xl border border-kz-green/30 bg-kz-green/5 p-6 text-center shadow-[0_0_20px_rgba(105,240,174,0.1)]"
      >
        <p className="text-lg font-semibold text-kz-text-primary">
          Competitors start from zero.{' '}
          <span className="text-kz-green">Pfizer starts from Drug 50.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
