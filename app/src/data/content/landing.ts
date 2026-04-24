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

  impactNumbers: [
    { label: 'Drug Development Timeline', before: '10-15 years', after: '6-9 years', savings: '40% reduction' },
    { label: 'Average Trial Cost', before: '$2.6B', after: '$1.4B', savings: '46% reduction' },
    { label: 'Phase II Success Rate', before: '28%', after: '52%', savings: '1.9x improvement' },
    { label: 'Required Trial Participants', before: '3,000+', after: '800-1,200', savings: '60-73% fewer' },
  ],
} as const;
