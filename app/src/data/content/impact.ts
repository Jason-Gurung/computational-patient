export const impactContent = {
  title: 'The Impact',
  subtitle: 'What changes when you can simulate before you trial',

  comparisons: [
    {
      category: 'Drug Development Timeline',
      traditional: { value: '10-15 years', detail: 'Sequential phases, each requiring full patient recruitment' },
      computational: { value: '6-9 years', detail: 'Virtual pre-screening eliminates dead-end candidates early' },
    },
    {
      category: 'Cost Per Approved Drug',
      traditional: { value: '$2.6 billion', detail: 'Including cost of all failed candidates' },
      computational: { value: '$1.4 billion', detail: 'Higher hit rate means fewer expensive late-stage failures' },
    },
    {
      category: 'Phase II → Phase III Success',
      traditional: { value: '28%', detail: 'Most drugs fail due to efficacy or safety surprises' },
      computational: { value: '52%', detail: 'Model identifies likely failures before human exposure' },
    },
    {
      category: 'Required Human Participants',
      traditional: { value: '3,000-5,000', detail: 'Large cohorts needed for statistical power' },
      computational: { value: '800-1,200', detail: 'Virtual trials provide the evidence base; human trials confirm' },
    },
    {
      category: 'Rare Disease Feasibility',
      traditional: { value: 'Often impossible', detail: 'Not enough patients to recruit for meaningful trials' },
      computational: { value: 'Fully feasible', detail: 'Generate virtual patients with rare genetic profiles at any scale' },
    },
  ],

  moat: {
    title: 'The Unreplicable Advantage',
    points: [
      'Decades of proprietary trial data — successes and failures',
      'Clinical data from diverse global populations',
      'Deep molecular and genomic datasets',
      'Every new drug developed further trains the model',
      'Competitors start from zero; Pfizer starts from Drug 50',
    ],
  },

  efficiency: {
    title: 'Organisational Efficiency',
    description: 'Smaller trials, shorter timelines, model-driven decisions. The same pipeline throughput with fewer people, greater output, and dramatically reduced risk.',
  },
} as const;
