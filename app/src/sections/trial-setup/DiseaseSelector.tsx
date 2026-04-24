import { DISEASES } from '@/shared/constants';
import type { DiseaseId, BodyRegion } from '@/shared/types';
import { motion } from 'framer-motion';
import { staggerContainer, slideUp } from '@/shared/design-tokens';
import {
  Heart,
  Wind,
  Bone,
  CircleDot,
  Droplets,
  Shield,
  type LucideIcon,
} from 'lucide-react';

interface DiseaseSelectorProps {
  selected: DiseaseId;
  onChange: (id: DiseaseId) => void;
}

const regionIcons: Record<BodyRegion, LucideIcon> = {
  heart: Heart,
  lungs: Wind,
  joints: Bone,
  breast: CircleDot,
  prostate: CircleDot,
  cardiovascular: Droplets,
  kidneys: Droplets,
  immune: Shield,
  blood: Droplets,
};

const regionColors: Record<BodyRegion, string> = {
  heart: 'text-kz-pink',
  lungs: 'text-kz-blue',
  joints: 'text-kz-orange',
  breast: 'text-kz-purple',
  prostate: 'text-kz-teal',
  cardiovascular: 'text-kz-pink',
  kidneys: 'text-kz-orange',
  immune: 'text-kz-green',
  blood: 'text-kz-pink',
};

export function DiseaseSelector({ selected, onChange }: DiseaseSelectorProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-kz-text-primary">Disease</h3>

      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {DISEASES.map((disease) => {
          const Icon = regionIcons[disease.bodyRegion];
          const iconColor = regionColors[disease.bodyRegion];
          const isSelected = disease.id === selected;

          return (
            <motion.button
              key={disease.id}
              variants={slideUp}
              onClick={() => onChange(disease.id)}
              className={`cursor-pointer rounded-xl border p-4 text-left transition-colors ${
                isSelected
                  ? 'border-kz-blue bg-kz-bg-tertiary shadow-[0_0_20px_rgba(79,195,247,0.15)]'
                  : 'border-kz-border-default bg-kz-bg-secondary hover:border-kz-blue/50'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Icon size={20} className={iconColor} />
                <span className="text-sm font-semibold text-kz-text-primary">
                  {disease.shortName}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-kz-text-secondary">
                {disease.bodyRegion.charAt(0).toUpperCase() + disease.bodyRegion.slice(1)}
              </p>
              <p className="mt-1 text-xs font-semibold text-kz-blue">{disease.brand}</p>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
