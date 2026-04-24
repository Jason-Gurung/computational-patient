# Agent A — Landing Page

> **FIRST:** Read `app/agent-prompts/_shared-preamble.md` and follow all instructions there before starting.

## Setup

```
cd app
npm run dev
```

Read these files for context (in addition to those listed in the shared preamble):
- `app/src/data/content/landing.ts` — the mock content for this page
- `app/src/shared/design-tokens/colors.ts` — the Kurzgesagt colour palette
- `app/src/shared/design-tokens/animations.ts` — Framer Motion variants
- `app/src/shared/hooks/useScrollReveal.ts` — scroll-triggered animation hook
- `app/src/shared/components/index.ts` — available shared components

## What You're Building

The **landing page** for a Computational Patient vision pitch demo. This is the first thing the viewer sees — it needs to inspire and set up the concept before they configure a virtual trial.

**Visual style: Kurzgesagt** — bold vector art, bright vivid colours on dark backgrounds (#0B0E17), stylised and smooth, friendly but scientific. Think the YouTube channel Kurzgesagt.

## Your Territory

You ONLY write files inside `app/src/sections/landing/`. Never touch files outside this folder.

Import only from:
- `@/shared/components` — PageShell, SectionHeading, etc.
- `@/shared/design-tokens` — colours, animations
- `@/shared/constants` — routes
- `@/data/content` — landing page content
- `@/lib/*` — utilities
- Third-party packages already installed: `framer-motion`, `lucide-react`, `recharts`

## Components to Build

Inside `app/src/sections/landing/`:

1. **HeroSection** — Full-viewport hero with:
   - Large headline: "The Computational Patient"
   - Subheadline: "What if you could test every drug on every patient — before a single human is dosed?"
   - Animated background — particles, cells, or abstract biology shapes using canvas or CSS. Keep it performant.
   - Subtle entrance animations using Framer Motion

2. **ConceptCards** — Grid of 4 key message cards (data in `landing.ts`):
   - "Biology is Computable"
   - "A Pre-Trial Safety Layer"
   - "The Model Gets Better With Every Drug"
   - "Pfizer's Data is the Moat"
   - Each with an icon (use lucide-react), staggered reveal animation

3. **ImpactNumbers** — Show current-state metrics with qualitative improvement labels:
   - 10-15 years → "Dramatically shorter"
   - $2.6B → "Substantially reduced"
   - 28% success rate → "Significantly higher"
   - 3,000+ participants → "A fraction of today"
   - Animate the current numbers counting up on scroll into view. Do NOT use specific projected improvement numbers — only qualitative descriptions.

4. **TimelineComparison** — Visual comparison:
   - Traditional drug development timeline (long, sequential phases)
   - Computational approach (compressed, overlapping phases)
   - Side-by-side or stacked comparison

5. **CTASection** — Call to action:
   - Button: "Configure a Virtual Trial" → navigates to `/setup`
   - Use `react-router-dom`'s `useNavigate` or `Link`

## Page Structure

```tsx
// src/sections/landing/index.tsx
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <ConceptCards />
      <ImpactNumbers />
      <TimelineComparison />
      <CTASection />
    </>
  );
}
```

No `PageShell` wrapper needed — the hero should be full-width/full-viewport. The NavBar is already rendered by the App shell.

## Quality Bar

- Looks impressive on screen recording (optimise for 1920x1080)
- Smooth scroll-triggered animations
- Dark background throughout (#0B0E17)
- Kurzgesagt colour accents (blues, cyans, greens, oranges from the palette)
- Readable text — don't sacrifice legibility for style
