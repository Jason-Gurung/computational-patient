# The Data Flywheel — Why Every Trial Makes the Next One Better

## The Concept

Most assets depreciate. Equipment wears out. Patents expire. Competitive advantages erode as competitors catch up.

The Computational Patient does the opposite. **It appreciates with every use.** Every drug program that runs through the platform — whether it succeeds or fails — adds real human data that makes the model more accurate. This creates a flywheel: better models → better trials → more data → better models.

```
                    ┌──────────────┐
                    │  More Data   │
                    │  (from every │
                    │   trial)     │
                    └──────┬───────┘
                           │
                           ▼
┌──────────────┐    ┌──────────────┐
│  More Drugs  │◄───│  Better      │
│  Developed   │    │  Models      │
│  (faster,    │    │              │
│   cheaper)   │    └──────┬───────┘
└──────┬───────┘           │
       │                   ▼
       │            ┌──────────────┐
       └───────────►│  Better      │
                    │  Trials      │
                    │  (smaller,   │
                    │   faster)    │
                    └──────────────┘
```

This isn't just an efficiency gain — it's a **structural competitive advantage** that deepens with time.

## What the Model Learns From

### Successful Drugs

When a drug succeeds, the model learns:

- **What "working" looks like at a mechanistic level** — which molecular interactions produced the clinical benefit, and in which patients. This knowledge transfers to similar targets and similar diseases.
- **Dose-response validation** — the predicted therapeutic window versus what was observed. Each calibrated drug sharpens the model's ability to predict dosing for future compounds.
- **Population response patterns** — who responded, who didn't, and why. This refines the population diversity models for future cohort design.
- **Biomarker-outcome correlations** — which measurable signals predicted which outcomes. Each confirmed biomarker becomes a tool for future trials.

### Failed Drugs — The Dark Matter of Pharma

Failed drugs are arguably more valuable to the model than successes:

- **Toxicity mechanisms** — when a drug fails on safety, the model learns the mechanistic pathway from molecule to organ damage. This knowledge prevents future drugs from falling into the same trap.
- **Efficacy failures** — when a drug doesn't work, was the target wrong, the dose wrong, the patient population wrong, or the disease model wrong? Each failure diagnosis improves a different part of the model.
- **The "almost worked" compounds** — drugs that showed a signal but not enough. These are the richest learning examples — the model can investigate why and identify what would need to be different.

**Pfizer has decades of proprietary failure data that no one else has.** Every failed compound, every stopped trial, every abandoned program — the reasons, the data, the patient-level outcomes. This is invisible to competitors but extraordinarily valuable as training data. A startup building computational models from public data is missing the most informative half of the picture.

### Real-World Evidence

After approval, drugs generate real-world data at enormous scale:

- **Electronic health records**: Millions of patients taking the drug in clinical practice — far more diverse than any trial population. Real comedications, real comorbidities, real adherence patterns.
- **Insurance claims data**: Treatment sequences, outcomes, healthcare utilisation — the economic reality of how the drug performs.
- **Patient registries**: Disease-specific databases tracking long-term outcomes.
- **Genomic databases**: As pharmacogenomic testing becomes routine, genotype-outcome data accumulates at scale.
- **Pharmacovigilance reports**: Spontaneous adverse event reports that signal rare problems not visible in trials.

This real-world data continuously calibrates the model's long-term predictions — the aspects that trials are too short and too small to validate.

### External Knowledge

The model doesn't learn only from Pfizer's data:

- **Published clinical trials**: Every competitor's published trial result is a calibration point.
- **Biomedical literature**: New discoveries about biology, disease mechanisms, drug interactions — all fed into the model.
- **Public genomic databases**: Population-scale genetic data that improves the diversity models.
- **Regulatory databases**: FDA/EMA safety databases, drug interaction reports, label changes for all marketed drugs.

The proprietary data is the moat; the public data is the foundation. Both are essential.

## The Compounding Effect in Numbers

### Year 1-3: Foundation Phase

The model is trained on historical data — Pfizer's entire clinical trial archive plus public sources. It makes predictions but its accuracy is limited by the gap between historical data and the model's architecture.

```
Model accuracy at Phase III outcome prediction: ~55-60%
(Slightly better than a well-informed committee — useful but not transformative)
```

### Year 3-7: Calibration Phase

The first wave of drugs developed alongside the computational model generate prospective calibration data. For the first time, the model's predictions are being tested against outcomes in real time, and the model is learning from the discrepancies.

```
Model accuracy at Phase III outcome prediction: ~70-75%
(Substantially better than human judgment — changing real decisions)
Each new drug program improves accuracy by ~0.5-1%
```

### Year 7-15: Maturity Phase

The model has been calibrated against dozens of drug programs across multiple therapeutic areas. Its predictions are trusted enough to reduce trial sizes, accelerate timelines, and influence regulatory submissions.

```
Model accuracy at Phase III outcome prediction: ~80-85%
(The model is now the primary decision-making tool)
Cross-therapeutic transfer learning means progress accelerates
```

### Year 15+: Platform Phase

The model is the drug development platform. New programs are conceived, designed, and optimised computationally. Physical trials are smaller, faster, and confirmatory. The model's accuracy is continuously validated and continuously improving.

```
Model accuracy at Phase III outcome prediction: ~85-90%
(Phase III failures become genuinely rare events)
New therapeutic areas can be entered with transfer learning from mature areas
```

## Why This Can't Be Replicated

### The Data Moat

A competitor starting from scratch faces compounding disadvantages:

- **No proprietary failure data**: Only public successes are visible. The most informative data (failures, near-misses, mechanistic investigations) is locked inside companies.
- **No prospective calibration**: You can't buy 10 years of calibration data. It has to be generated by actually developing drugs and observing outcomes.
- **No cross-program learning**: Each drug program connects to every other through shared biology. A company with 50 calibrated programs has exponentially more cross-references than one with 5.

### The Expertise Moat

Building biological models isn't pure computer science — it requires deep domain expertise:

- **Biologists who understand computation** — to encode biological knowledge into model structures
- **Computational scientists who understand biology** — to build models that capture what matters
- **Clinical developers who trust the model** — to actually change decisions based on its predictions
- **Regulatory scientists who can explain the model** — to gain acceptance from health authorities

This expertise takes years to develop and can't be hired overnight. The team that has been building and calibrating the model for a decade has institutional knowledge that doesn't transfer through job changes.

### The Trust Moat

Regulators will only accept computational evidence from models that have a demonstrated track record of accurate predictions. This track record can only be built over time, one validated prediction at a time.

A new entrant faces a chicken-and-egg problem: they need regulatory trust to use their model in submissions, but they need submissions to build regulatory trust. **The first mover builds the track record that becomes the barrier.**

## The Flywheel Across Therapeutic Areas

The model's knowledge doesn't stay siloed within disease areas. Insights transfer:

```
Oncology trials teach the model about:
  → Cell proliferation dynamics → applicable to fibrosis, wound healing
  → Immune checkpoint biology → applicable to autoimmune disease
  → Drug resistance mechanisms → applicable to infectious disease
  → Biomarker discovery methods → applicable to every area

Cardiovascular trials teach the model about:
  → Organ-level safety modelling → applicable to all drug safety
  → Chronic dosing effects → applicable to all chronic disease drugs
  → Population PK in elderly/comorbid → applicable to most drugs

Rare disease trials teach the model about:
  → Genotype-phenotype precision → applicable to pharmacogenomics
  → Small-N trial design → applicable to biomarker-selected subgroups
  → Gene therapy delivery → applicable to oncology, neurology
```

**Every therapeutic area is simultaneously a consumer of model capability (using it to design better trials) and a producer of model capability (generating data that improves the platform for everyone else).** This cross-pollination is what makes the flywheel spin faster and faster.

## The Virtuous Economics

The flywheel creates a self-reinforcing economic cycle:

1. **Better models → fewer late-stage failures** → saved costs fund more model development
2. **Faster timelines → drugs reach market sooner** → earlier revenue funds more programs
3. **More programs → more calibration data** → better models (back to step 1)
4. **Better models → smaller trials needed** → freed capacity runs more programs (back to step 3)
5. **Better predictions → more regulator confidence** → faster approvals → faster revenue → more investment

The investment case isn't "spend $X on computational infrastructure and save $Y on trial costs." It's "invest in a compounding asset that makes every future dollar of R&D more productive, with the advantage growing every year."
