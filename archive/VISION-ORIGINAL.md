# The Future of AI at Pfizer — A Vision Document

## The Big Idea

What if AI didn't just make Pfizer's existing processes faster — but fundamentally changed the **medium** through which the company creates, shares, and acts on knowledge?

Every information revolution didn't speed up the old thing. It made the old thing obsolete. Oral → written made knowledge persistent. Print made it reproducible. Digital made it searchable. The web made it linked.

**AI makes knowledge _directly comprehensible_.** The document — the fundamental unit of organizational knowledge for centuries — stops being the medium. Reality itself becomes queryable.

This vision document captures three interconnected ideas that together represent what an AI-first Pfizer could look like.

---

## 1. Pfizer Brain — The Organizational Intelligence Layer

### Concept

A unified AI system that sits on top of all internal project, tool, and knowledge metadata — accessible through natural language via Teams/Copilot. Every employee can ask it anything about what exists, what's being built, who knows what, and how things connect.

### What It Knows

**Project Registry**: Every project across Pfizer (IT, R&D, commercial, manufacturing) lives in a structured registry with:

- **Status & Lifecycle**: Active / Paused / Shelved / Completed / Deprecated / Exploring — including _why_ things were shelved
- **Capability Tags**: What it does in plain language, problem domain, technology stack
- **Access & Availability**: Open to all / Business unit restricted / Role restricted / Pilot only / Needs license
- **People & Ownership**: Product owner, tech lead, SMEs, "ask me anything" contacts
- **Lineage & Relationships**: Built on what, replaced what, similar to what (AI-detected and human-tagged)
- **Artifacts**: Repos, docs, demos — with AI-generated summaries so you don't need to read a 40-page design doc

### How Projects Are Understood

The system doesn't rely on humans writing documentation. It **ingests and comprehends** projects from wherever they live:

| Source | What It Extracts |
|--------|-----------------|
| GitHub/GitLab | Repos, READMEs, commit history, contributors, activity patterns |
| Launchpad | Official descriptions, status, ownership, access tiers |
| Confluence | Design docs, architecture decisions, meeting notes |
| Jira/ADO | Tickets, sprints, velocity, blockers |
| SharePoint | User guides, training materials |
| ServiceNow | Support tickets, incident frequency, user complaints |
| Teams channels | Metadata signals (existence, membership, activity) |
| Power Platform | Registered apps, flows, builders, usage stats |
| API Gateway | Internal APIs, consumers, call volume |

For each source, the AI builds a **comprehension layer** — reading the README, understanding the Jira board's trajectory, mapping dependencies from architecture docs, identifying pain points from support tickets. It synthesizes all fragments of a single project into one unified understanding.

**A project doesn't have documentation. A project IS its own documentation.** The AI generates explanations on demand from the living reality — always current, always tailored to the person asking.

### User Classification & Agent Architecture

Every employee has a multi-dimensional profile:

- **Primary Persona**: Developer / Data Scientist / Scientist / Clinician / Regulatory / Commercial / Manufacturing / Finance / HR / Legal / Executive / PM / Business Analyst
- **Secondary Personas**: A scientist who writes Python is Scientist + Developer
- **Skill Vectors**: Inferred from tools used, repos contributed to, questions asked/answered
- **Work Context**: Active projects, therapeutic area, current priorities

A **master agent** with full organizational awareness routes queries to **specialist agents** that understand the vocabulary, workflows, and pain points of each domain:

```
                    ┌─────────────────────┐
                    │    MASTER AGENT      │
                    │    "Pfizer Brain"    │
                    └──────────┬───────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        ▼          ▼           ▼           ▼          ▼
   ┌─────────┐ ┌────────┐ ┌────────┐ ┌─────────┐ ┌────────┐
   │Dev Agent│ │Science │ │Commerc.│ │Mfg      │ │Corp    │
   │         │ │Agent   │ │Agent   │ │Agent    │ │Agent   │
   └─────────┘ └────────┘ └────────┘ └─────────┘ └────────┘
```

The same question gets completely different responses depending on who asks. A developer asking about "visualization tools" gets pointed to Python libraries and internal APIs. A marketer gets pointed to Tableau and self-service analytics portals.

### Proactive Intelligence

The system doesn't just answer questions. It:

- **Detects duplication**: When a new project is registered, it scans for overlaps and notifies both teams
- **Surfaces relevant work**: Proactively recommends tools, projects, and people based on your current work context
- **Identifies gaps**: Analyzes what people ask for that doesn't exist — "142 people searched for a competitive intelligence tool last quarter. Nothing exists."
- **Preserves institutional memory**: Failed projects become active wisdom. When someone starts work similar to a past failure, the system surfaces what went wrong and what's changed since then.

### The Staleness Engine

The system actively monitors for decay:

| Signal | Implication |
|--------|------------|
| No commits in 90+ days | Development may have stopped |
| Jira board frozen | Work may have stalled |
| Teams channel dead | Team may have disbanded |
| Key contributors left company | Knowledge may be orphaned |
| Dependencies deprecated | Project may be silently broken |

**Graduated response**:
1. **Automated check-in**: Messages the project owner in Teams asking for a status update
2. **Escalated inquiry**: If no response, flags to team lead or division digital lead
3. **Human investigation**: A small dedicated **maintenance dev team** (5-8 people) investigates cases the AI can't resolve — they're knowledge archaeologists who talk to people, reconcile conflicting information, rescue orphaned projects, and validate AI-generated understanding

### Example Interactions

> **"Is there a slide generation tool I can use?"**
>
> "There are three. **DeckForge** (open to all, 2,400 monthly users). **SlideCraft** (R&D only, scientific templates). **PresentAI** (shelved — pilot in Commercial last year, codebase available, tech lead happy to consult). Want me to connect you?"

> **"I'm building a protocol deviation tracker. Is anyone else doing this?"**
>
> "Yes — **DeviationTracker** in Clinical Ops is in active development (expected Q3). The **Site Intelligence Platform** has a deviation detection module. I'd recommend talking to both teams before building from scratch. Here's a comparison of what each covers."

> **"Who at Pfizer actually understands graph databases?"**
>
> "Based on project involvement: **James Okafor** (3 years Neo4j, built the drug interaction knowledge graph), **Priya Sharma** (published internal tech talk on graph-based molecular search). James is tagged as open to mentoring."

---

## 2. The Death of the Document — A New Information Medium

### The Paradigm Shift

Despite all our technology, the fundamental unit of knowledge transfer is still the **document**. Confluence pages, slide decks, emails, wikis, READMEs — all share properties unchanged since the invention of writing:

1. A human authors it at a point in time
2. It's frozen the moment it's written
3. It's linear — fixed structure chosen by the author
4. It's written for an imagined audience
5. Understanding is the reader's problem

**AI replaces the document with directly comprehensible reality.**

### What This Means in Practice

**Projects as their own documentation**: You don't read about a project — you talk to it. The AI generates explanations from the project's living reality (code, commits, conversations, decisions) on demand, always current, always tailored to who's asking.

**People as their own credentials**: Nobody maintains a skills profile. Your actual work IS your credential. The system understands what you've built, at what depth, and what your real (not self-reported) capabilities are.

**Decisions as their own audit trail**: Decisions are captured as they happen — in conversations, code reviews, configuration changes. The AI understands that a decision was made, what the alternatives were, and what the consequences were. No separate decision log needed. The act of deciding IS the record.

**Questions as their own routing**: You don't need to know who to ask or where to look. You express the need. The knowledge substrate routes it to the answer — synthesized from all relevant sources, with human connections made where needed.

**Failures as their own wisdom**: Failed projects become active wisdom that the system brings to bear automatically when relevant — not a post-mortem someone files and forgets.

**Conversations as their own work product**: A Teams call where three people discuss an architecture decision automatically becomes a complete decision record. No meeting notes, no action item transcription. The conversation was directly comprehended.

### The Elimination of the Translation Step

```
Current:  Reality → Human authoring → Document → Human reading → Understanding
                    ↑ BOTTLENECK       ↑ DECAYS    ↑ LOSSY

Future:   Reality → Direct AI comprehension → On-demand rendering for anyone
```

---

## 3. The Computational Patient — Transforming Clinical Trials

### The Problem

Clinical trials take 10-15 years and cost $1-2 billion per approved drug. ~90% of drugs that enter Phase I never get approved. The most devastating failures are the late ones — a Phase III failure costs $100-300M and 3-4 years, for nothing.

### The Solution: A Computational Modeling Layer

Not a replacement for clinical trials, but an **additional continuous layer** that runs in parallel with existing phases, reducing what each phase needs to accomplish.

```
Preclinical     COMPUTATIONAL      Phase I      Phase II      Phase III      Review
(animal/lab)    MODELING LAYER     (safety)     (efficacy)    (confirm)      (FDA)
                ═══════════════════════════════════════════════════════════
                ↑ runs continuously, refines at each phase
                ↑ feeds INTO each phase and learns FROM each phase
```

### Before Phase I: The First Big Filter

Simulate the drug in **thousands of virtual patients** representing population diversity. Predict dose-response curves, toxicity profiles, at-risk subpopulations, therapeutic windows.

- Kill candidates that show clear problems before first-in-human dosing (saving $10-20M per killed program)
- Enter Phase I with computationally informed dosing strategies instead of blind dose escalation

**Phase I compresses from 1-2 years to 6-12 months.**

### Phase I → Phase II: Smarter Trial Design

Feed real Phase I data back into the model. It recalibrates from theoretical predictions to empirically grounded ones. Then:

- **Dose optimization**: Enter Phase II with computationally optimized dosing, potentially variable by patient characteristics
- **Patient selection**: Enrich enrollment for likely responders — a drug that works for 20% of an unselected population might work for 60% of a computationally selected subgroup
- **Endpoint optimization**: Identify the most sensitive measurable outcome for the clearest signal in the shortest time
- **Trial simulation**: Simulate thousands of Phase II designs to find the smallest, fastest one with the highest probability of detecting a real effect

**Phase II compresses from 2-3 years to 12-18 months. Drugs that advance are higher quality candidates.**

### Phase II → Phase III: The Most Expensive Decision

~50% of drugs that enter Phase III fail. Each failure: $100-300M, wasted.

The model, now calibrated on real Phase I and Phase II data, simulates the Phase III trial before running it:

> "73% probability of success with the planned design. If enriched for biomarker profile X, that rises to 84%. The trial could achieve 90% power with 1,400 patients instead of 2,200, saving ~$80M and 8 months."

Or crucially:

> "28% probability of success. The efficacy signal is concentrated in ~15% of the population. Recommendation: redesign as a biomarker-selected trial or discontinue. Running as planned has a 72% chance of being a $200M write-off."

**Preventing even 2-3 Phase III failures per decade saves $400-900M and frees 6-12 years of organizational capacity.**

### During Phase III: Real-Time Calibration

The model runs alongside the trial, detecting divergent subgroups, emerging safety signals, and convergence toward success/futility faster than traditional statistical methods.

### The Compounding Effect

Every drug Pfizer develops makes the model better. Every failure teaches it. Every success validates it.

```
Drug 1:  Model starts with general knowledge → learns from each phase
Drug 10: Model predicts Phase III outcomes from Phase I data alone
Drug 50: Model predicts clinical outcomes from molecular structure
```

**The model is a compounding asset.** This is Pfizer's structural moat — no startup or tech company has the decades of clinical trial data needed to train these models.

### Projected Impact

| Metric | Current | With Computational Layer |
|--------|---------|------------------------|
| Phase I duration | 1-2 years | 6-12 months |
| Phase II success rate | ~30% | ~45-55% |
| Phase II duration | 2-3 years | 12-18 months |
| Phase III success rate | ~50% | ~65-75% |
| Phase III trial size | 1,000-3,000+ | 30-50% reduction |
| Overall timeline | 10-15 years | 6-9 years |
| Cost per approved drug | $1-2B | $500M-$1B |

---

## How These Ideas Connect

These aren't three separate initiatives. They share a foundation:

1. **Pfizer Brain** creates the organizational intelligence to coordinate and de-duplicate work across 90,000 people
2. **The new information medium** eliminates the documentation overhead that slows everything down
3. **The computational patient** applies the same philosophy to the core business — making clinical reality directly computable rather than mediated through slow, expensive, lossy trial processes

The common thread: **eliminating the translation layer between reality and understanding**. Whether that's organizational reality (what projects exist, who knows what) or biological reality (how a drug interacts with a human body), the shift is the same — from static snapshots to living, queryable, continuously updated comprehension.

---

## What This Requires That Doesn't Exist Yet

| Future Capability | What It Enables |
|-------------------|----------------|
| Persistent evolving world models | AI that continuously comprehends organizational state, not just retrieves on demand |
| Zero-cost knowledge capture | Understanding extracted from work itself, not authored documents |
| Calibrated uncertainty | AI that reliably knows what it doesn't know |
| Autonomous long-running agency | Systems that monitor, investigate, and maintain over months/years |
| True multi-source reconciliation | Unified understanding from contradictory, scattered fragments |
| Continuous learning from outcomes | Models that get measurably better from every interaction |
| Biological simulation at scale | Computational models of human pharmacology detailed enough for clinical prediction |

---

*This document represents an ambitious, idealistic vision for how AI could fundamentally transform Pfizer — not as incremental automation, but as a paradigm shift in how knowledge, decisions, and medicine itself work.*
