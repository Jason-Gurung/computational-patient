export const impactContent = {
  title: 'The Impact',
  subtitle: 'What changes when you can simulate before you trial',

  comparisons: [
    {
      category: 'Drug Development Timeline',
      traditional: { detail: 'Sequential phases, each requiring full patient recruitment' },
      computational: { detail: 'Virtual pre-screening eliminates dead-end candidates early. Every phase compresses.' },
    },
    {
      category: 'Development Cost',
      traditional: { detail: 'High failure rates mean most investment is lost on drugs that never reach market' },
      computational: { detail: 'Higher hit rates mean fewer expensive late-stage failures. Smaller trials cost less to run.' },
    },
    {
      category: 'Trial Success Rate',
      traditional: { detail: 'Most drugs fail due to efficacy or safety surprises discovered too late' },
      computational: { detail: 'The model identifies likely failures before human exposure. Better candidates advance.' },
    },
    {
      category: 'Patient Burden',
      traditional: { detail: 'Large cohorts needed for statistical power across diverse populations' },
      computational: { detail: 'Virtual trials provide the evidence base. Human trials confirm with far fewer participants.' },
    },
    {
      category: 'Rare Disease Feasibility',
      traditional: { detail: 'Not enough patients to recruit for meaningful trials' },
      computational: { detail: 'Generate virtual patients with rare genetic profiles at any scale.' },
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
