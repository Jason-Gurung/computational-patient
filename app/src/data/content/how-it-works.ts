export const howItWorksContent = {
  title: 'How the Computational Patient Works',
  subtitle: 'A multi-scale simulation engine that models human biology from molecules to whole organisms',

  scales: [
    {
      level: 'Molecular',
      description: 'Protein folding, receptor binding, enzyme kinetics, drug-target interactions',
      example: 'Tafamidis binding to the TTR tetramer at 2nM affinity, preventing dissociation',
    },
    {
      level: 'Cellular',
      description: 'Signal transduction pathways, gene expression, cell cycle, apoptosis',
      example: 'Cardiomyocyte calcium handling impairment from amyloid mechanical stress',
    },
    {
      level: 'Tissue',
      description: 'Cell-cell interactions, extracellular matrix, vascular networks, immune infiltration',
      example: 'Amyloid fibril deposition between cardiac muscle fibres disrupting coordinated contraction',
    },
    {
      level: 'Organ',
      description: 'Organ-level physiology, haemodynamics, functional metrics',
      example: 'Left ventricular wall thickening and ejection fraction decline in ATTR-CM',
    },
    {
      level: 'Organism',
      description: 'Multi-organ interactions, pharmacokinetics, systemic drug distribution',
      example: 'Drug absorption, liver metabolism, renal clearance, and cardiac target engagement',
    },
  ],

  validationLoop: {
    title: 'Predict → Test → Learn',
    steps: [
      'Model predicts drug response for virtual patient cohort',
      'Predictions validated against real clinical trial data',
      'Discrepancies identify model gaps and drive improvements',
      'Updated model makes better predictions for the next drug',
    ],
  },

  flywheel: {
    title: 'The Compounding Data Advantage',
    description: 'Every drug tested — success or failure — teaches the model something new about human biology. Drug 1 requires extensive calibration. Drug 50 predicts outcomes from molecular structure alone.',
  },
} as const;
