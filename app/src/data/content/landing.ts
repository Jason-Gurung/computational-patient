export const landingContent = {
  hero: {
    headline: 'The Computational Patient',
    subheadline: 'What if you could test every drug on every patient — before a single human is dosed?',
    cta: 'Configure a Virtual Trial',
  },

  keyMessages: [
    {
      title: 'Biology is Computable',
      body: 'The trajectory is clear. From molecular dynamics to organ-level physiology, every layer of human biology is becoming simulatable. The question is when, not whether.',
      icon: 'dna',
    },
    {
      title: 'A Pre-Trial Safety Layer',
      body: 'No human is exposed to a drug the model flags as dangerous. Clinical trials still happen — they\'re just smaller, safer, and higher-confidence.',
      icon: 'shield',
    },
    {
      title: 'The Model Gets Better With Every Drug',
      body: 'Drug 1 starts from first principles. Drug 50 predicts outcomes from molecular structure alone. Every trial — success or failure — makes the model more accurate.',
      icon: 'trending-up',
    },
    {
      title: 'Pfizer\'s Data is the Moat',
      body: 'Decades of proprietary trial data, including failures, are training data no competitor can replicate. The computational patient turns historical data into a permanent strategic advantage.',
      icon: 'database',
    },
  ],

  impacts: [
    { label: 'Time to Market', description: 'Every phase compresses. Virtual trials run in parallel. Failures are caught computationally, not in clinic.', icon: 'clock' },
    { label: 'Development Cost', description: 'Higher hit rates mean fewer expensive late-stage failures. Smaller trials cost less to run.', icon: 'dollar-sign' },
    { label: 'Trial Success Rate', description: 'Better candidates enter trials. Better trial designs detect real effects. The model catches failures early.', icon: 'trending-up' },
    { label: 'Patient Burden', description: 'Fewer people exposed to drugs destined to fail. Smaller cohorts needed. Rare diseases become feasible.', icon: 'users' },
  ],
} as const;
