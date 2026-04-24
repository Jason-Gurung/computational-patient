import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { fadeIn, slideUp } from '@/shared/design-tokens';
import { ROUTES } from '@/shared/constants';

/* ------------------------------------------------------------------ */
/*  Animated canvas background — floating cells / biology particles   */
/* ------------------------------------------------------------------ */

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const PARTICLE_COLORS = [
  'rgba(79,195,247,',   // blue
  'rgba(0,229,255,',    // cyan
  'rgba(105,240,174,',  // green
  'rgba(179,136,255,',  // purple
  'rgba(100,255,218,',  // teal
];

function initParticles(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.4 + 0.1,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.02 + 0.005,
  }));
}

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height, 80);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = `rgba(79,195,247,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.pulse += p.pulseSpeed;
        const pulseScale = 1 + Math.sin(p.pulse) * 0.3;
        const r = p.r * pulseScale;
        const alpha = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);

        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grad.addColorStop(0, `${p.color}${alpha * 0.4})`);
        grad.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,195,247,0.08) 0%, rgba(0,229,255,0.04) 30%, transparent 70%)',
        }}
      />

      {/* Animated particles */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-kz-cyan"
        >
          A Vision for Pharmaceutical Development
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-5xl font-bold leading-tight text-kz-text-primary md:text-7xl"
        >
          The Computational{' '}
          <span className="bg-gradient-to-r from-kz-blue to-kz-cyan bg-clip-text text-transparent">
            Patient
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-kz-text-secondary md:text-xl"
        >
          What if you could test every drug on every patient — before a single
          human is dosed?
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Link
            to={ROUTES.TRIAL_SETUP}
            className="inline-flex items-center gap-2 rounded-xl bg-kz-blue px-8 py-3.5 text-base font-semibold text-kz-bg-primary shadow-[0_0_20px_rgba(79,195,247,0.3)] hover:opacity-80 transition-opacity"
          >
            Configure a Virtual Trial
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-kz-text-tertiary"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
