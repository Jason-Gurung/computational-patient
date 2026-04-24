import { ZoomLevel } from '@/shared/types';
import type { ZoomLevelMeta } from '@/shared/types';

export const heartMicro: ZoomLevelMeta = {
  level: ZoomLevel.Micro,
  label: 'Molecular — TTR Protein & Drug Binding',
  description: 'The transthyretin tetramer at molecular resolution, showing tafamidis binding to the thyroxine-binding pocket and stabilising the structure.',
  modelPath: '/assets/models/custom/heart-micro.glb',
  cameraPosition: {
    position: [0, 0, 1.5],
    target: [0, 0, 0],
    fov: 25,
    transitionDuration: 1.2,
  },
  hotspots: [],
  narration: [
    // === UNTREATED ===
    {
      id: 'micro-untreated',
      title: 'The Molecular Culprit — Misfolding TTR',
      body: 'Transthyretin normally exists as a stable tetramer — four identical subunits arranged around a central channel. The Val122Ile mutation destabilises it. It dissociates into monomers that partially unfold, exposing sticky hydrophobic patches. These misfolded monomers aggregate into protofilaments, then mature amyloid fibrils — the insoluble deposits destroying the heart.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [0, 12],
      highlights: [
        { term: 'tetramer', definition: 'A protein complex made of four subunits (monomers). TTR\'s stability depends on all four staying together.' },
        { term: 'Val122Ile', definition: 'A single amino acid change (valine to isoleucine at position 122) that weakens the tetramer, making it prone to dissociation' },
        { term: 'protofilaments', definition: 'Intermediate structures where misfolded monomers begin to stack — the precursors to mature amyloid fibrils' },
      ],
    },

    // === DRUG — responding ===
    {
      id: 'micro-drug-responding',
      title: 'Tafamidis — Molecular Lock Engaged',
      body: 'Tafamidis binds tightly to the two thyroxine-binding sites in the central channel of the TTR tetramer. It acts as a molecular clamp — dramatically increasing the energy barrier for tetramer dissociation. The mutant TTR can no longer fall apart into amyloidogenic monomers. The computational model shows binding affinity of 2 nM and residence time exceeding 24 hours. Over 90% of circulating tetramers are stabilised.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [12, 36],
      responseType: 'responding',
      highlights: [
        { term: 'kinetic stabilisation', definition: 'The drug makes it energetically unfavourable for the tetramer to fall apart — it doesn\'t fix the mutation, it prevents the consequence' },
        { term: 'binding affinity', definition: 'How strongly the drug binds to its target — 2 nM means extremely tight binding' },
      ],
    },
    // === DRUG — progressing ===
    {
      id: 'micro-drug-progressing',
      title: 'Tafamidis — Incomplete Stabilisation',
      body: 'Tafamidis is binding to TTR tetramers, but the computational model reveals a problem: the patient\'s high circulating TTR concentration means the drug cannot occupy enough binding sites to achieve therapeutic stabilisation. Only 60% of tetramers are stabilised — below the 80% threshold needed to meaningfully slow amyloid formation. Monomers continue to dissociate, misfold, and aggregate. The protofibril chain grows longer.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [12, 36],
      responseType: 'progressing',
      highlights: [
        { term: 'TTR concentration', definition: 'Higher circulating TTR means more protein molecules competing for the limited drug — reducing per-tetramer stabilisation' },
        { term: 'therapeutic threshold', definition: 'The minimum level of TTR stabilisation needed to meaningfully reduce amyloid deposition — typically >80%' },
      ],
    },

    // === POST — responding ===
    {
      id: 'micro-post-responding',
      title: 'Sustained Molecular Stabilisation',
      body: 'At therapeutic plasma concentrations, over 90% of circulating TTR tetramers remain stabilised by tafamidis. Monomer formation rate is reduced by >95%, effectively halting new amyloid production. The computational model explores whether natural clearance mechanisms may slowly reduce existing amyloid burden over years — a question that can now be simulated across thousands of virtual patients.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [36, 52],
      responseType: 'responding',
    },
    // === POST — progressing ===
    {
      id: 'micro-post-progressing',
      title: 'Molecular Failure — Exploring Alternatives',
      body: 'TTR stabilisation remains at only 60%. The computational model now simulates alternative molecular strategies: a patisiran-class siRNA that silences TTR gene expression in the liver, reducing circulating TTR by 80%. With less protein to stabilise, the remaining tafamidis can achieve full occupancy. The model predicts this combination approach would reduce monomer formation rate by >90% — a dramatically better outcome than either drug alone.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [36, 52],
      responseType: 'progressing',
      highlights: [
        { term: 'siRNA', definition: 'Small interfering RNA — a molecule that silences specific genes by destroying their messenger RNA before it can be translated into protein' },
        { term: 'combination therapy', definition: 'Using two drugs with complementary mechanisms: one reduces TTR production, the other stabilises what remains' },
      ],
    },
  ],
  metrics: [
    { label: 'TTR Stabilisation', value: '—', contextNote: 'Pre-treatment — no stabilisation' },
    { label: 'Monomer Rate', value: 'High', trend: 'up', contextNote: 'Active misfolding and aggregation' },
    { label: 'Protofibril Length', value: 'Growing', trend: 'up', contextNote: 'Amyloid precursors accumulating' },
  ],
  respondingMetrics: [
    { label: 'TTR Stabilisation', value: '>90%', trend: 'up', contextNote: 'Tetramers held intact by tafamidis' },
    { label: 'Monomer Rate', value: '<5%', trend: 'down', contextNote: 'Misfolding nearly eliminated' },
    { label: 'Drug Occupancy', value: '94%', contextNote: 'Both binding sites occupied at steady state' },
    { label: 'Binding Affinity', value: '2 nM', contextNote: 'High affinity — strong molecular grip' },
  ],
  progressingMetrics: [
    { label: 'TTR Stabilisation', value: '60%', trend: 'stable', contextNote: 'Below therapeutic threshold (>80%)' },
    { label: 'Monomer Rate', value: '35%', trend: 'stable', contextNote: 'Ongoing misfolding despite treatment' },
    { label: 'Drug Occupancy', value: '58%', contextNote: 'Insufficient — too much competing TTR' },
    { label: 'Protofibril Growth', value: 'Active', trend: 'up', contextNote: 'New amyloid precursors forming' },
  ],
};
