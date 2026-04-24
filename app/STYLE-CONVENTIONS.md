# Style Conventions — All Agents Must Follow

This document ensures the site feels like one cohesive product, not 5 separate pages. **Read this before building anything.**

## Page Section Spacing

Every major section within a page uses this vertical rhythm:

```tsx
<section className="py-24">  {/* 6rem top/bottom padding */}
  <div className="mx-auto max-w-6xl px-6">
    {/* section content */}
  </div>
</section>
```

- Between sections within a page: `py-24` (96px)
- The hero/first section can be `py-32` or `min-h-screen` for impact
- Never use arbitrary spacing — stick to the scale: `py-12`, `py-16`, `py-24`, `py-32`

## Card / Panel Pattern

All cards, panels, info boxes use THIS pattern:

```tsx
<div className="rounded-xl border border-kz-border-default bg-kz-bg-secondary p-6">
  {/* content */}
</div>
```

Variations:
- **Elevated card** (for emphasis): `bg-kz-bg-tertiary border-kz-border-strong`
- **Glassmorphism overlay** (floating over 3D/canvas): `bg-kz-bg-secondary/80 backdrop-blur-md`
- **Interactive card** (clickable): add `hover:border-kz-blue/50 transition-colors cursor-pointer`
- **Highlighted/selected card**: `border-kz-blue bg-kz-bg-tertiary`

Always use `rounded-xl` (not `rounded-lg` or `rounded-md`). This is a design decision.

## Scroll Reveal Animation

Use the shared `useScrollReveal` hook for scroll-triggered animations. Import from `@/shared/hooks`.

```tsx
import { useScrollReveal } from '@/shared/hooks';
import { motion } from 'framer-motion';
import { slideUp, staggerContainer } from '@/shared/design-tokens';

function MySection() {
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.div variants={slideUp}>Content 1</motion.div>
      <motion.div variants={slideUp}>Content 2</motion.div>
    </motion.div>
  );
}
```

Available animation variants (from `@/shared/design-tokens`):
- `fadeIn` — simple opacity fade (0.6s)
- `slideUp` — fade + slide from below (0.5s)
- `scaleIn` — fade + scale from 80% (0.4s)
- `staggerContainer` — staggers children by 0.1s with 0.2s delay

**DO NOT** create your own animation variants. Use these. Consistency > creativity here.

## Hover States

Interactive elements use a consistent hover pattern:

```
/* Buttons */
hover:opacity-80 transition-opacity

/* Cards */
hover:border-kz-blue/50 transition-colors

/* Text links */
hover:text-kz-blue transition-colors

/* Icon buttons */
hover:text-kz-text-primary transition-colors
```

Transition duration is always the default (150ms). Don't override it.

## Typography Patterns

```
/* Page title (one per page) */
text-4xl font-bold text-kz-text-primary  (or text-5xl/text-6xl for heroes)

/* Section heading */
text-2xl font-semibold text-kz-text-primary

/* Card title */
text-lg font-semibold text-kz-text-primary

/* Body text */
text-sm text-kz-text-secondary leading-relaxed

/* Label / caption */
text-xs font-semibold uppercase tracking-wider text-kz-text-tertiary

/* Metric value */
text-2xl font-bold text-kz-text-primary  (with trend colour if applicable)
```

## Icon Sizing

Use lucide-react icons at these consistent sizes:
- Inline with text: `size={16}`
- In cards/buttons: `size={20}`
- Feature icons (large, standalone): `size={32}` or `size={40}`
- Hero decorative: `size={48}`

## Accent Colour Usage

Don't just pick random colours. Each accent has a meaning:

| Colour | Token | Usage |
|--------|-------|-------|
| Blue `#4FC3F7` | `kz-blue` | Primary actions, links, active states, highlights |
| Cyan `#00E5FF` | `kz-cyan` | Glows, emphasis, secondary highlights |
| Green `#69F0AE` | `kz-green` | Positive outcomes, success, health |
| Pink `#FF4081` | `kz-pink` | Danger, adverse events, destructive |
| Orange `#FF9100` | `kz-orange` | Warnings, non-responding, caution |
| Yellow `#FFD740` | `kz-yellow` | Milestones, attention, achievements |
| Purple `#B388FF` | `kz-purple` | Generated/synthetic, AI-related |
| Teal `#64FFDA` | `kz-teal` | Secondary positive, alternative highlight |

## Number Animation Pattern

For animated counters (used in landing, impact, population):

```tsx
import { useEffect, useState } from 'react';
import { useScrollReveal } from '@/shared/hooks';

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const { ref, inView } = useScrollReveal();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}
```

Don't re-implement this — if you need animated numbers, use this exact pattern.

## Loading / Empty States

When content is loading or missing:

```tsx
<div className="flex items-center justify-center rounded-xl border border-kz-border-default bg-kz-bg-secondary p-12">
  <p className="text-sm text-kz-text-tertiary">Loading...</p>
</div>
```

## Dark Background Rule

The entire site is dark. **Never** use white or light backgrounds anywhere. The lightest background is `kz-bg-surface` (`#242B45`). If something looks light, it's wrong.

## Glow / Emphasis Effect

For glowing elements (hotspots, selected items, CTAs):

```css
shadow-[0_0_20px_rgba(79,195,247,0.3)]   /* blue glow */
shadow-[0_0_20px_rgba(0,229,255,0.3)]     /* cyan glow */
```

Use sparingly — 1-2 glowing elements per viewport max.
