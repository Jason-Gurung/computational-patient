# Ethics — The Hard Questions

## Why This Section Matters

A vision document that doesn't address ethics is either naive or evasive. The Computational Patient raises genuine questions that deserve genuine answers — not because they're blockers, but because thinking through them now is what separates a responsible vision from a reckless one.

## Algorithmic Bias in Virtual Populations

### The Risk

If the models are trained primarily on data from historical clinical trials, they inherit those trials' biases. Historical trials have disproportionately enrolled white, male, younger, and healthier participants. A model trained on this data will be most accurate for those populations — and least accurate for exactly the populations that most need better representation.

**A biased computational patient is worse than no computational patient at all** — because it gives false confidence that a drug is safe and effective for populations it hasn't actually modelled well.

### The Response

**Explicit uncertainty by population**: The model must report its confidence broken down by demographic group. "Prediction confidence for white males 30-50: high. For Black females 65+: moderate. For South Asian patients with CKD: low." This makes the gaps visible rather than hiding them behind an overall accuracy number.

**Targeted data acquisition**: Where the model identifies its own weaknesses, this drives targeted real-world evidence collection. If the model is uncertain about drug metabolism in a specific ancestry group, that becomes a priority for pharmacogenomic studies.

**Bias auditing**: Every model version undergoes systematic bias testing before deployment — does its accuracy vary meaningfully across demographic groups? Are its errors correlated with patient characteristics in ways that would disadvantage specific populations?

**Synthetic augmentation with explicit labelling**: Where real data is sparse, the model can generate synthetic patients for under-represented groups — but these must be explicitly labelled as synthetic with wider uncertainty bounds, never presented as equivalent to empirically grounded predictions.

The goal: **the Computational Patient should be the least biased tool in drug development** — more representative than any real trial population, with honest uncertainty where data is thin.

## Informed Consent in a Computational World

### The Evolving Question

When a patient enrols in a clinical trial, they consent to be a research subject. What does consent mean when their data contributes to a computational model that will be used to make predictions about future drugs and future patients?

**Current consent frameworks** typically cover the specific trial. But the Computational Patient creates value from data aggregation across trials, across years, across indications. A patient's Phase I data from 2024 might improve a model prediction in 2034 for a different disease.

### The Response

**Broad but transparent consent**: Consent forms should explicitly describe that de-identified data may be used to build and improve computational models for future drug development. This isn't buried in boilerplate — it's a highlighted section with plain-language explanation.

**De-identification as a floor, not a ceiling**: All individual patient data entering the model is de-identified beyond regulatory minimums. The model learns from patterns across populations, not from identifiable individuals.

**No re-identification pathway**: The model architecture must be designed so that individual patient data cannot be extracted from the trained model. This is a technical design constraint, not just a policy.

**Ongoing benefit sharing**: Patients whose data contributed to the model's development should benefit from its existence — through faster access to better-designed trials, through drugs reaching market sooner, and through the model's ability to identify treatments for conditions that would otherwise be unfeasible to study.

## Rare Disease Populations — The Greatest Promise and Greatest Responsibility

### The Promise

For rare diseases, the Computational Patient may be the only way to generate sufficient evidence for drug approval. A disease affecting 200 people worldwide cannot support a traditional trial. Computational modelling can simulate thousands of virtual patients, providing evidence that would be physically impossible to collect.

### The Responsibility

These are also the most vulnerable populations:

- **Small community, high stakes**: Rare disease patients often have no treatment alternatives. The pressure to accept computational evidence is immense — and so is the risk if the model is wrong.
- **Data scarcity = model uncertainty**: By definition, rare diseases have the least real-world data to train on. The model's predictions for rare conditions carry wider uncertainty than for common diseases.
- **Publication bias**: Published rare disease case reports may be skewed toward unusual presentations, biasing the model.

### The Response

**Extreme transparency about uncertainty**: For rare disease applications, model predictions must come with explicit, prominently displayed uncertainty characterisation. "This prediction is based on mechanistic modelling with limited empirical calibration — confidence level: exploratory."

**Patient community engagement**: Rare disease patient communities should be involved in how computational evidence is generated and used. They have deep lived expertise in their conditions and legitimate authority over how their data is used.

**Cautious regulatory positioning**: Computational evidence for rare diseases should supplement, not replace, every scrap of real evidence available. If 50 real patients exist, their data anchors the model — the computational extension provides context, but doesn't replace the anchor.

## The "Too Confident" Problem

### The Risk

A well-functioning model that's usually right is dangerous precisely because it's usually right. Decision-makers begin to trust it implicitly. Edge cases and novel situations get less scrutiny because the model says it's fine. When the model is wrong in a novel way, the organisation may not catch it.

This is the automation paradox: the better the tool, the less humans practice the skills needed to detect its failures.

### The Response

**Mandatory uncertainty display**: Model outputs never show point estimates without confidence intervals. Never show a probability without the model's self-assessed reliability for that type of prediction.

**Novelty detection**: The model explicitly flags when it's extrapolating beyond its training domain. "This drug mechanism has no close analogue in the training data — prediction uncertainty is elevated." This isn't optional — it's a core model feature.

**Adversarial validation**: An independent team whose job is to find cases where the model is wrong. They construct scenarios designed to break it, identify blind spots, and stress-test predictions before decisions are made. This team reports to a different chain of command than the model development team.

**Preserved human judgment**: The model informs decisions; it doesn't make them. Clinical development teams are trained to interpret model outputs critically, understand their limitations, and override them when clinical judgment disagrees. The model's prediction is one input to the decision, not the decision itself.

**Calibration monitoring**: Continuous tracking of "was the model's stated uncertainty accurate?" If the model says "70% ± 10%" for a class of predictions, and the outcomes actually fall in range only 60% of the time, the model's uncertainty is miscalibrated — and this is caught and corrected systematically.

## Data Privacy at Scale

### The Challenge

The Computational Patient works by aggregating enormous amounts of patient data — clinical trial data, electronic health records, genomic data, real-world evidence. This aggregation creates privacy risks even when individual datasets are de-identified:

- **Re-identification through combination**: Two de-identified datasets that share a patient can re-identify them through unique combinations of attributes
- **Model memorisation**: Machine learning models can sometimes memorise and regurgitate training examples, potentially exposing individual patient data
- **Genetic data sensitivity**: Genomic data is inherently identifying — you can't fully de-identify a genome — and it implicates family members who never consented

### The Response

**Privacy-preserving computation**: Techniques like federated learning (the model goes to the data, not data to the model), differential privacy (mathematical guarantees that the model can't memorise individuals), and secure enclaves (data processed in encrypted environments) are architectural choices, not afterthoughts.

**Genomic data governance**: Genomic data gets its own governance framework — stricter access controls, stronger anonymisation, explicit governance over how genetic information is used and stored.

**Data minimisation**: The model is designed to learn from the minimum data necessary. Not every piece of patient data needs to be in the training set — the architecture should be selective about what data actually improves predictions versus what adds privacy risk without proportional benefit.

## Job Displacement and Organisational Change

### The Reality

If computational modelling replaces 50% of the need for physical clinical trials, that changes the work landscape substantially:

- **Clinical research organisations (CROs)** that run physical trials face reduced demand
- **Clinical site staff** — investigators, coordinators, nurses — see trial volumes decrease
- **Roles shift from execution to interpretation** — running a trial requires different skills than interrogating a computational model

### The Response

**Honest acknowledgment**: Transformative technology changes the nature of work. Pretending otherwise isn't ethical. Some current roles will become less necessary.

**Transition planning**: Invest in retraining and role evolution. Clinical scientists who understand both biology and computation are extraordinarily valuable — the transition is toward higher-skilled, higher-value work, but the transition itself requires investment and support.

**Net impact is job creation**: The computational platform creates entirely new roles — biological model engineers, validation scientists, computational clinical pharmacologists, model auditors. History consistently shows that transformative technology creates more jobs than it destroys, but the transition period requires intentional management.

**Patient-facing roles remain central**: Even with computational modelling, real patients will still participate in trials — smaller, shorter, and better designed. The roles supporting those patients don't disappear; they evolve.

## The Non-Negotiables

Regardless of how the technology evolves, certain principles are absolute:

1. **Patient safety is paramount.** No computational prediction, however confident, overrides a real safety signal. The model supplements human judgment; it never replaces the obligation to protect real patients.

2. **Transparency is total.** Regulators, patients, and the public have a right to understand what the model predicts, how confident it is, and where it might be wrong. Black-box predictions are unacceptable for decisions that affect human health.

3. **Bias is actively hunted.** The model's developers have a continuous obligation to find and address biases — not just to avoid them, but to actively search for them.

4. **Uncertainty is honest.** Overstating confidence is more dangerous than understating it. The model's uncertainty estimates are calibrated, monitored, and corrected when they drift.

5. **Human oversight endures.** The model makes recommendations. Humans make decisions. This isn't a transitional state — it's the design.
