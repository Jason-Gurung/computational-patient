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
    {
      id: 'micro-untreated',
      title: 'The Molecular Culprit — Misfolding TTR',
      body: 'Transthyretin normally exists as a stable tetramer — four identical subunits arranged around a central channel that transports thyroxine (thyroid hormone) and retinol (vitamin A). The Val122Ile mutation destabilises the tetramer. It dissociates into monomers that partially unfold, exposing sticky hydrophobic patches. These misfolded monomers aggregate into protofilaments, then mature amyloid fibrils — the insoluble deposits destroying Edward\'s heart.',
      phase: 'untreated',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [0, 12],
      highlights: [
        { term: 'tetramer', definition: 'A protein complex made of four subunits (monomers). TTR\'s stability depends on all four staying together.' },
        { term: 'Val122Ile', definition: 'A single amino acid change (valine to isoleucine at position 122) that weakens the tetramer, making it prone to dissociation' },
        { term: 'protofilaments', definition: 'Intermediate structures where misfolded monomers begin to stack — the precursors to mature amyloid fibrils' },
      ],
    },
    {
      id: 'micro-drug',
      title: 'Tafamidis — Molecular Stabilisation',
      body: 'Tafamidis binds to the two thyroxine-binding sites in the central channel of the TTR tetramer. By occupying these pockets, it acts as a molecular clamp — dramatically increasing the energy barrier for tetramer dissociation. The mutant TTR can no longer fall apart into amyloidogenic monomers. This is kinetic stabilisation: the drug doesn\'t fix the mutation, it prevents the consequence. The computational model calculates binding affinity, residence time, and the resulting reduction in monomer formation rate.',
      phase: 'drug-administered',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [12, 36],
      highlights: [
        { term: 'kinetic stabilisation', definition: 'Slowing down the rate of tetramer dissociation rather than thermodynamically shifting the equilibrium — the drug makes it harder for the protein to fall apart' },
        { term: 'binding affinity', definition: 'How strongly the drug binds to its target — measured in nanomolar (nM). Tafamidis has high affinity for the TTR binding pocket' },
        { term: 'residence time', definition: 'How long the drug stays bound to its target before dissociating — longer is better for sustained stabilisation' },
      ],
    },
    {
      id: 'micro-post',
      title: 'Sustained Stabilisation',
      body: 'At therapeutic plasma concentrations, over 90% of circulating TTR tetramers are stabilised by tafamidis. The model shows monomer formation rate reduced by >95%, effectively halting new amyloid production. The remaining question — which the model can explore — is whether natural clearance mechanisms can slowly reduce existing amyloid burden over years, or whether it will persist indefinitely.',
      phase: 'post-treatment',
      zoomLevel: ZoomLevel.Micro,
      timeRange: [36, 52],
    },
  ],
  metrics: [
    { label: 'TTR Stabilisation', value: '>90%', trend: 'up', contextNote: 'Tetramers held intact by tafamidis' },
    { label: 'Monomer Rate', value: '<5%', trend: 'down', contextNote: 'Dramatically reduced misfolding' },
    { label: 'Drug Occupancy', value: '94%', contextNote: 'Both binding sites occupied at steady state' },
    { label: 'Binding Affinity', value: '2 nM', contextNote: 'High affinity — strong molecular grip' },
  ],
};
