import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { Rocket } from 'lucide-react';

export function LaunchButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ROUTES.POPULATION)}
      className="group relative w-full cursor-pointer overflow-hidden rounded-xl bg-kz-blue px-8 py-4 text-lg font-bold text-kz-bg-primary transition-opacity hover:opacity-80"
    >
      {/* Glow pulse */}
      <span className="absolute inset-0 animate-pulse rounded-xl bg-kz-cyan/20" />

      <span className="relative flex items-center justify-center gap-3">
        <Rocket size={20} className="transition-transform group-hover:-translate-y-0.5" />
        Run Virtual Trial
      </span>
    </button>
  );
}
