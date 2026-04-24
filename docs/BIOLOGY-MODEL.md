# The Biology Model — How You Actually Simulate a Human

## The Multi-Scale Challenge

A human body is not one system — it's systems within systems within systems, each operating at different scales of size and time. The Computational Patient must model all of them and, critically, model how they interact.

```
Scale              Size            Time              What Happens Here
─────────────────────────────────────────────────────────────────────────
Molecular          nanometres      picoseconds       Drug binds receptor, enzyme cleaves bond
Protein            nanometres      microseconds      Conformational changes, signalling activation
Cellular           micrometres     minutes-hours     Gene expression, cell division, apoptosis
Tissue             millimetres     hours-days        Inflammation, repair, immune recruitment
Organ              centimetres     days-weeks        Functional adaptation, damage, compensation
Organism           metres          weeks-years       Systemic response, homeostasis, chronic effects
Population         —               years-decades     Epidemiology, evolution, resistance
```

The revolutionary insight: **you don't need to simulate every atom.** You need to simulate at the right resolution for each question, with faithful interfaces between scales.

## Layer 1: The Molecular Engine

### What It Models

The drug as a physical object interacting with biological machinery:

- **Binding dynamics**: How the drug molecule physically docks with its target protein. Not just whether it binds, but how tightly, for how long, and in what orientation. This determines whether the drug activates, inhibits, or modulates its target.
- **Metabolic pathways**: How the body breaks down the drug. Which enzymes in the liver process it. What metabolites are produced. Whether those metabolites are active, inert, or toxic.
- **Off-target interactions**: What else the drug sticks to. Every molecule in the body that has even partial affinity. This is where unexpected side effects originate.
- **Pharmacokinetics**: How the drug moves through the body — absorption from the gut, distribution through blood, penetration into tissues, clearance through kidneys and liver. The concentration-time curve in every compartment.

### How It Works

Molecular dynamics simulations model the physical forces between atoms. Quantum mechanical calculations capture the electronic interactions that govern binding. Machine learning models trained on millions of known drug-target interactions predict affinities for novel combinations.

The key advance: **hybrid physics-AI models** that use physical laws where they're well understood and learned patterns where they're not. The physics provides generalisability (the model works for molecules it's never seen). The AI provides speed (approximating calculations that would take centuries to compute from first principles).

### What Makes Pfizer's Version Unique

Pfizer has proprietary data on thousands of compounds — not just the ones that became drugs, but the ones that failed and why. Every failed compound is a training example: this molecule, with this structure, caused this problem in this population. No public dataset contains this. It's the dark matter of drug development, and it's extraordinarily valuable for training molecular models.

## Layer 2: The Cell Simulator

### What It Models

Cells as living computational units that receive signals, process them, and respond:

- **Signal transduction**: When the drug hits its target, what cascade of molecular events follows inside the cell? Dozens of interconnected pathways activate, inhibit, and cross-talk with each other.
- **Gene expression changes**: Which genes get turned up or down in response? This determines whether the cell grows, divides, specialises, repairs itself, or dies.
- **Metabolic shifts**: How the cell's internal chemistry changes. Energy production, waste processing, synthesis of proteins and lipids.
- **Cell fate decisions**: The big outcomes — does the cell live, die, divide, migrate, differentiate, or become senescent? And how do these decisions propagate across a population of cells?

### The Network Approach

Cells aren't modelled as bags of chemicals but as **regulatory networks** — webs of genes, proteins, and metabolites that control each other. The drug perturbs this network, and the simulation traces how that perturbation ripples through the system.

Different cell types have different networks. A liver cell responds differently to the same drug than an immune cell or a heart cell. The model maintains distinct cell-type architectures — hundreds of them — each calibrated against experimental data from those specific cell types.

### Emergent Behaviour

The most important cellular responses are **emergent** — they arise from the network dynamics, not from any single gene or protein. Drug resistance, for example: a cancer cell doesn't "decide" to become resistant. Resistance emerges from the network finding alternative pathways around the drug's blockade. The cell simulator captures this because it models the full network, not just the drug's immediate target.

## Layer 3: The Tissue Architecture

### What It Models

Tissues as organised communities of diverse cell types in a physical structure:

- **Spatial organisation**: Cells aren't floating in isolation — they're arranged in specific architectures. Liver lobules, kidney nephrons, intestinal villi, tumour microenvironments. The spatial arrangement matters because it determines which cells are exposed to what, and how signals propagate.
- **Immune infiltration**: How immune cells are recruited to a site, how they interact with tissue cells, how inflammation develops and resolves. This is critical for understanding both efficacy (in immunotherapy) and toxicity (in autoimmune side effects).
- **Extracellular matrix**: The structural scaffold that cells live in. It changes in disease (fibrosis, cancer) and affects how drugs penetrate and distribute within a tissue.
- **Vascular access**: How blood vessels deliver the drug to the tissue. Tumours grow their own chaotic vasculature. Inflamed tissues become more permeable. The blood-brain barrier blocks most molecules entirely.

### Agent-Based Modelling

At the tissue scale, individual cells become **agents** — autonomous entities that follow rules derived from the cell simulator below. Each agent senses its local environment, makes decisions, and acts. Thousands to millions of agents interacting produce the tissue-level behaviour.

This is where you see tumours grow, immune responses mount, organs sustain damage and attempt repair. It's where the drug's effect becomes visible at a scale a pathologist would recognise.

## Layer 4: The Organ System

### What It Models

Organs as functional units with measurable performance:

- **The liver**: Drug metabolism capacity. How much of a drug it can process. When it becomes overwhelmed. How repeated exposure causes cumulative damage. The model tracks individual hepatocyte function across the entire organ, rolling up to organ-level metrics like ALT/AST levels that clinicians actually measure.
- **The heart**: Electrical conduction, contractile function, rhythm. Cardiac toxicity is one of the most common reasons drugs fail — the model simulates ion channel interactions, action potential propagation, and identifies arrhythmia risk before it manifests.
- **The kidneys**: Filtration rate, drug clearance, tubular damage. Renal toxicity and renal-adjusted dosing are modelled mechanistically rather than estimated from crude creatinine formulas.
- **The brain**: Neurotransmitter dynamics, receptor occupancy, blood-brain barrier penetration. For CNS drugs, this is where efficacy and cognitive side effects are predicted.
- **The immune system**: Not an organ but a distributed system — bone marrow production, lymph node activation, tissue-resident responses. Modelled as a network of interacting cell populations across the body.

### Organ Cross-Talk

Organs don't operate in isolation. The liver's metabolism affects the drug concentration the heart sees. The kidney's clearance rate affects how long the liver is exposed. Immune activation in one tissue can cause inflammation in distant organs.

The organ layer models these interactions through a **whole-body physiologically-based pharmacokinetic (PBPK) model** — a circulatory system connecting all organs, with each organ both consuming and producing signals that affect the others.

## Layer 5: The Whole Patient

### The Integration Layer

This is where everything comes together into a single simulated human being:

- **Homeostatic regulation**: The body's set-point control systems — temperature, pH, blood pressure, glucose, hormone levels. The drug perturbs these; the body compensates. The interplay between perturbation and compensation determines the patient's actual experience.
- **Circadian rhythms**: Biology isn't constant — it cycles. Drug metabolism varies by time of day. Immune activity peaks and troughs. Dosing timing matters, and the model captures why.
- **Adaptation and tolerance**: The body adjusts to chronic drug exposure. Receptors up-regulate or down-regulate. Enzymes are induced. The dose that works in week 1 may not work in month 6. The model simulates this dynamic adaptation.
- **Ageing**: A 25-year-old and a 75-year-old are biologically different in ways that go far beyond organ function. Cellular senescence, immune ageing, reduced regenerative capacity, altered metabolism. The model ages with the patient.

### The Patient Specification

Each computational patient is instantiated from a **patient specification** — a structured description of everything that makes them biologically unique:

```
Patient #47,293
├── Genome: Full sequence with known variant annotations
├── Age: 67
├── Sex: Female
├── Weight: 72kg, BMI 26.1
├── Organ function
│   ├── Liver: CYP2D6 poor metaboliser, mild fatty liver
│   ├── Kidney: eGFR 68 (mild reduction)
│   ├── Heart: Normal rhythm, mild LVH
│   └── Immune: Slightly elevated baseline inflammation
├── Existing conditions: Type 2 diabetes (controlled), osteoarthritis
├── Current medications: Metformin 1000mg bid, Ibuprofen prn
├── Microbiome: Profile cluster B7 (associated with slower gut absorption)
└── Lifestyle: Non-smoker, moderate alcohol, sedentary
```

The simulation runs the candidate drug through this specific person and reports what happens — not in averages, but in mechanistic detail specific to her biology.

## The Validation Loop

None of this works without relentless validation against reality. The model's predictions are continuously compared against:

- **In vitro experiments**: Cell-level predictions checked against lab assays
- **Animal studies**: Organ-level predictions checked against preclinical data
- **Phase I data**: First-in-human predictions checked against real safety/PK results
- **Phase II/III data**: Efficacy and population-level predictions checked against trial outcomes
- **Real-world evidence**: Post-market surveillance data closes the loop on long-term predictions

Every discrepancy between prediction and reality is a learning opportunity. The model doesn't just predict — it's designed to be wrong in informative ways, and to get less wrong over time.

```
Prediction: "Drug X will show 40% response rate in this population"
Reality:    "Actual response rate was 28%"
Learning:   "The model over-estimated target engagement in cells with high P-gp expression.
            Adjusting the efflux transporter model. Re-simulating..."
Updated:    "Revised prediction for similar compounds: 30% ± 5%"
```

This feedback loop is what transforms the model from a theoretical exercise into a calibrated instrument. And it's why the model gets better with every drug program — not because someone improves the code, but because the model learns from the gap between what it predicted and what actually happened.
