# Disease Models — How Modelling Differs Across Therapeutic Areas

## Why One Model Doesn't Fit All

Cancer isn't like diabetes. Alzheimer's isn't like a bacterial infection. Each disease type has fundamentally different modelling challenges, different data availability, different resolution requirements, and different definitions of what "success" means in a simulation.

The Computational Patient platform isn't a single model — it's a **framework of disease-specific models** built on shared biological infrastructure but specialised for the unique dynamics of each therapeutic area.

## Oncology — Modelling an Evolving Adversary

### The Unique Challenge

Cancer is not a static target. It's an evolutionary system — a population of cells that mutates, adapts, and develops resistance in real time. Modelling cancer means modelling evolution itself.

### What the Model Captures

**Tumour heterogeneity**: A tumour isn't one type of cell — it's a diverse ecosystem. Different clones with different mutations coexist, compete, and cooperate. The model represents this diversity explicitly, tracking multiple clonal populations and their relative fitness.

**Evolutionary dynamics under treatment**: When a drug kills 99% of tumour cells, the 1% that survive may be inherently resistant. They expand to fill the void, and the tumour comes back — now entirely resistant. The model simulates this evolutionary pressure:

```
Treatment start:   [Sensitive: 95%] [Resistant clone A: 3%] [Resistant clone B: 2%]
Week 4:            [Sensitive: 20%] [Resistant clone A: 55%] [Resistant clone B: 25%]
Week 12:           [Sensitive: 1%]  [Resistant clone A: 72%] [Resistant clone B: 27%]
Relapse:           Tumour regrowth dominated by clone A — predictable, actionable
```

**The tumour microenvironment**: Cancer doesn't exist in isolation — it remodels its surroundings. It recruits blood vessels (angiogenesis), suppresses local immune cells, creates a hypoxic acidic environment that protects it from drugs. The model includes the microenvironment as an active participant.

**Immune interaction**: Immunotherapy doesn't target the cancer — it targets the immune system's interaction with the cancer. Modelling immunotherapy response requires simulating both sides: the tumour's immune evasion strategies and the immune system's capacity to recognise and attack.

### What This Enables

- **Combination sequencing**: Not just which drugs, but in what order. The model identifies sequences that prevent resistance evolution — you might use Drug A first to eliminate clone B, then Drug B to clear clone A, rather than using both simultaneously.
- **Adaptive therapy**: Instead of maximum tolerable dose, the model explores maintaining sensitive cells as competitors against resistant clones — evolutionary game theory applied to treatment.
- **Neoantigen prediction**: From the tumour's mutational landscape, identify which mutations create proteins the immune system can recognise, and predict whether immunotherapy will work for this specific patient.

## Rare Genetic Diseases — Perfect Targets for Computation

### The Unique Challenge

Rare diseases affect small populations — often too small for traditional clinical trials. There may be 500 patients worldwide with a specific condition. You can't run a 1,000-patient Phase III.

### Why Computational Patients Are Transformative Here

This is arguably where the Computational Patient has its most radical impact. For rare diseases, the choice isn't "computational trial vs. traditional trial" — it's **"computational trial vs. no trial at all."**

**Single-gene disorders are the most modelable diseases**: When a disease is caused by a known mutation in a known gene, the molecular cascade from mutation to disease is traceable. Cystic fibrosis: a specific CFTR mutation leads to a specific protein misfolding leads to specific chloride channel dysfunction leads to specific organ-level symptoms. Each step is mechanistically understandable and simulatable.

**Variant-specific modelling**: Rare diseases often have multiple variants — different mutations in the same gene cause different severity. The model can simulate each variant individually:

- Does this gene therapy correct variant A but not variant B?
- Does this drug work for the truncation mutation but not the missense mutation?
- Which patients need dose adjustment based on their specific genotype?

**Natural history simulation**: For many rare diseases, the natural progression is poorly characterised because so few patients exist. The model can simulate disease progression across virtual patients, generating the natural history data needed to design meaningful trials.

### What This Enables

- **n-of-1 trial design**: For ultra-rare diseases, simulate treatments for each individual patient before administering them
- **Regulatory evidence generation**: Provide computational evidence to support approval when traditional trial sizes are impossible
- **Gene therapy optimisation**: Test different gene delivery vectors, promoters, and expression levels computationally before manufacturing

## Immunology and Autoimmune Disease — Modelling a System Fighting Itself

### The Unique Challenge

Autoimmune diseases occur when the immune system attacks the body's own tissues. The drug needs to suppress the harmful immune response while preserving the beneficial one — surgical precision in the most complex adaptive system in human biology.

### What the Model Captures

**Immune network dynamics**: The immune system isn't a single entity — it's a network of cell types with activating and suppressing relationships. T cells, B cells, macrophages, dendritic cells, regulatory cells — each with subtypes, each communicating through cytokines. The model simulates this network:

```
Rheumatoid Arthritis:
  Trigger: Self-reactive T cells recognise joint cartilage proteins
  ├── Th17 cells → produce IL-17 → recruit neutrophils to joint
  ├── B cells → produce autoantibodies → form immune complexes
  ├── Macrophages → produce TNF-α → chronic inflammation
  ├── Regulatory T cells → attempt suppression → overwhelmed
  └── Joint outcome: progressive cartilage destruction

Drug intervention at TNF-α:
  ├── Inflammation ↓
  ├── But: Th17 pathway still active
  ├── And: Infection defence ↓ (TNF needed for pathogen clearance)
  └── Net outcome: partial relief + increased infection risk
```

**Flare-relapse dynamics**: Autoimmune diseases cycle between flares and remission. The model captures the bistable dynamics — what tips the system into flare, what allows it to settle into remission, and how treatment affects the transition probabilities.

**Immune tolerance vs. suppression**: The ultimate goal isn't lifelong immunosuppression — it's restoring tolerance (teaching the immune system to stop attacking self). The model explores whether a treatment merely suppresses symptoms or actually resets the immune set point.

### What This Enables

- **Cytokine network prediction**: Identify which node in the immune network is the optimal intervention point for each patient's specific disease manifestation
- **Withdrawal simulation**: Can the patient stop treatment? The model predicts relapse probability after drug withdrawal based on their immune state
- **Combination immunotherapy**: Safely explore combinations that would be too risky to test empirically — targeting multiple pathways simultaneously to achieve tolerance

## Neurodegenerative Disease — The Longest Horizon

### The Unique Challenge

Alzheimer's, Parkinson's, and ALS develop over decades. By the time symptoms appear, enormous irreversible damage has occurred. Clinical trials measure decline over 18 months and try to detect a slowing of that decline — a notoriously noisy signal.

### What the Model Captures

**Decades-scale progression**: The model simulates the full disease trajectory — from the first molecular misfolding event through decades of gradual accumulation to clinical symptoms. This is something no trial can observe.

**Multi-causal pathology**: Neurodegenerative diseases are increasingly understood as convergent outcomes of multiple interacting pathways:
- Protein aggregation (amyloid, tau, alpha-synuclein, TDP-43)
- Neuroinflammation (microglial activation, astrocyte reactivity)
- Metabolic dysfunction (mitochondrial failure, glucose hypometabolism)
- Vascular contributions (blood-brain barrier breakdown, reduced perfusion)
- Synaptic dysfunction (network-level changes before cell death)

The model doesn't commit to a single disease hypothesis — it simulates all interacting pathways and lets the dynamics determine the outcome.

**Individual trajectory variation**: Some patients decline rapidly; others plateau for years. The model captures this variation mechanistically — it's not random noise, it's different biology.

### What This Enables

- **Identify the intervention window**: When in the decades-long progression does a drug need to be given to matter? The model identifies the point of no return and the window before it
- **Surrogate endpoint discovery**: Find measurable biomarkers that correlate with the simulated disease trajectory — giving trials something to measure that changes faster than clinical decline
- **Combination timing**: Two drugs that each fail alone might succeed together, or might succeed if given in sequence rather than simultaneously. The model explores timing strategies

## Infectious Disease — Speed is Everything

### The Unique Challenge

Pandemics don't wait for clinical trials. A new pathogen emerges, and the clock starts. Every week of development time costs lives.

### What the Model Captures

**Pathogen-host interaction**: How the virus or bacteria enters cells, hijacks machinery, replicates, and spreads. How the immune system detects and responds. The race between pathogen replication and immune activation.

**Resistance evolution**: Like cancer, pathogens evolve under drug pressure. The model simulates how quickly resistance emerges for different drug targets and dosing strategies.

**Population-level transmission dynamics**: How treatment affects not just the individual patient but the epidemic. Does reducing viral load reduce transmission? Does widespread prophylaxis drive resistance at the population level?

### What This Enables

- **Rapid candidate screening**: When a new pathogen emerges, computationally screen Pfizer's entire compound library against it within days
- **Dose optimisation for resistance prevention**: Identify dosing strategies that clear the pathogen faster than it can evolve resistance
- **Vaccine response prediction**: Simulate immune responses to vaccine candidates across diverse populations, predicting efficacy and identifying likely non-responders before Phase I

## Cross-Therapeutic Learning

The deepest value emerges when disease models talk to each other:

- Tumour immune evasion strategies inform autoimmune tolerance models (both involve the immune system failing to regulate appropriately)
- Neurodegeneration protein aggregation models share mathematics with cardiac amyloidosis
- Rare disease gene therapy delivery models transfer directly to oncology gene therapies
- Infectious disease immune response models calibrate the immune baseline for all other disease areas

**Every disease Pfizer studies strengthens the platform's understanding of every other disease.** The models don't live in silos — they share the underlying human biology simulation, and each disease-specific calibration improves the shared foundation.
