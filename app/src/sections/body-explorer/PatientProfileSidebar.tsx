import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Dna, Pill, AlertTriangle, Activity, Heart } from 'lucide-react';
import type { PatientProfile } from '@/shared/types';

interface PatientProfileSidebarProps {
  patient: PatientProfile;
  isDeepZoom: boolean;
  currentWeek: number;
}

function getPhaseLabel(week: number): { label: string; color: string } {
  if (week < 12) return { label: 'Untreated — Baseline', color: 'text-kz-text-secondary' };
  if (week < 36) return { label: 'Tafamidis Active', color: 'text-kz-cyan' };
  return { label: 'Post-Treatment', color: 'text-kz-purple' };
}

function getResponseBadge(response: 'responding' | 'progressing') {
  return response === 'responding'
    ? { label: 'Responding', bg: 'bg-kz-green/20', text: 'text-kz-green' }
    : { label: 'Progressing', bg: 'bg-kz-red/20', text: 'text-kz-red' };
}

/** Simulated cardiac metrics that evolve gradually across 3 treatment stages + baseline */
function getCardiacStatus(
  patient: PatientProfile,
  week: number,
): Array<{ label: string; value: string; color?: string }> {
  const baseline = patient.organFunction.heart;

  // Stage 0: Untreated baseline (weeks 0-11)
  if (week < 12) {
    return [
      { label: 'NYHA Class', value: 'II' },
      { label: 'EF', value: baseline.metrics['EF'] ?? '48%' },
      { label: 'NT-proBNP', value: baseline.metrics['NT-proBNP'] ?? '1,847 pg/mL' },
      { label: 'Wall Thickness', value: baseline.metrics['Wall Thickness'] ?? '14mm' },
    ];
  }

  if (patient.treatmentResponse === 'responding') {
    // Stage 1: Drug just arriving (weeks 12-24) — subtle improvement
    if (week < 25) return [
      { label: 'NYHA Class', value: 'II' },
      { label: 'EF', value: '49%', color: 'text-kz-green' },
      { label: 'NT-proBNP', value: '1,620 pg/mL', color: 'text-kz-green' },
      { label: 'Wall Thickness', value: '14mm' },
    ];
    // Stage 2: Clear improvement (weeks 25-40)
    if (week < 41) return [
      { label: 'NYHA Class', value: 'II', color: 'text-kz-green' },
      { label: 'EF', value: '51%', color: 'text-kz-green' },
      { label: 'NT-proBNP', value: '1,180 pg/mL', color: 'text-kz-green' },
      { label: 'Wall Thickness', value: '13.5mm', color: 'text-kz-green' },
    ];
    // Stage 3: Mostly recovered (weeks 41+)
    return [
      { label: 'NYHA Class', value: 'I–II', color: 'text-kz-green' },
      { label: 'EF', value: '53%', color: 'text-kz-green' },
      { label: 'NT-proBNP', value: '920 pg/mL', color: 'text-kz-green' },
      { label: 'Wall Thickness', value: '13mm', color: 'text-kz-green' },
    ];
  }

  // Progressing
  // Stage 1: Drug failing — slight worsening (weeks 12-24)
  if (week < 25) return [
    { label: 'NYHA Class', value: 'II–III', color: 'text-kz-orange' },
    { label: 'EF', value: '44%', color: 'text-kz-orange' },
    { label: 'NT-proBNP', value: '2,300 pg/mL', color: 'text-kz-orange' },
    { label: 'Wall Thickness', value: '14.5mm' },
  ];
  // Stage 2: Clear worsening (weeks 25-40)
  if (week < 41) return [
    { label: 'NYHA Class', value: 'III', color: 'text-kz-red' },
    { label: 'EF', value: '38%', color: 'text-kz-red' },
    { label: 'NT-proBNP', value: '3,200 pg/mL', color: 'text-kz-red' },
    { label: 'Wall Thickness', value: '16mm', color: 'text-kz-orange' },
  ];
  // Stage 3: Severe disease (weeks 41+)
  return [
    { label: 'NYHA Class', value: 'III–IV', color: 'text-kz-red' },
    { label: 'EF', value: '32%', color: 'text-kz-red' },
    { label: 'NT-proBNP', value: '4,200 pg/mL', color: 'text-kz-red' },
    { label: 'Wall Thickness', value: '17mm', color: 'text-kz-red' },
  ];
}

export function PatientProfileSidebar({ patient, isDeepZoom, currentWeek }: PatientProfileSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const shouldCollapse = collapsed || isDeepZoom;
  const phase = getPhaseLabel(currentWeek);
  const isTreated = currentWeek >= 12;
  const responseBadge = getResponseBadge(patient.treatmentResponse);
  const cardiacMetrics = getCardiacStatus(patient, currentWeek);

  return (
    <div className={`absolute left-4 top-14 z-10 max-h-[calc(100%-9rem)] transition-all duration-300 ${shouldCollapse ? 'w-10' : 'w-64'}`}>
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-3 z-20 flex h-6 w-6 items-center justify-center rounded-full border border-kz-border-default bg-kz-bg-tertiary text-kz-text-secondary transition-colors hover:text-kz-text-primary"
      >
        {shouldCollapse ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {shouldCollapse ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 p-2 backdrop-blur-md">
          <User size={16} className="text-kz-blue" />
          <span className="text-[10px] font-semibold text-kz-text-tertiary" style={{ writingMode: 'vertical-lr' }}>
            {patient.name}
          </span>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 p-4 backdrop-blur-md" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-kz-blue/20">
              <User size={20} className="text-kz-blue" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-kz-text-primary">{patient.name}</h3>
              <p className="text-xs text-kz-text-tertiary">
                {patient.age}y {patient.sex} &middot; {patient.ancestry}
                {patient.isGenerated && <span className="ml-1 text-kz-purple">(synthetic)</span>}
              </p>
            </div>
          </div>

          {/* Vitals */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Weight', value: `${patient.weightKg}kg` },
              { label: 'Height', value: `${patient.heightCm}cm` },
              { label: 'BMI', value: patient.bmi.toFixed(1) },
            ].map((v) => (
              <div key={v.label} className="rounded-lg bg-kz-bg-tertiary px-2 py-1.5 text-center">
                <div className="text-[10px] text-kz-text-tertiary">{v.label}</div>
                <div className="text-xs font-semibold text-kz-text-primary">{v.value}</div>
              </div>
            ))}
          </div>

          {/* Treatment Status */}
          <Section icon={<Activity size={14} />} title="Treatment Status">
            <div className="rounded-lg bg-kz-bg-tertiary px-2 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-kz-text-tertiary">Phase</span>
                <span className={`text-xs font-semibold ${phase.color}`}>{phase.label}</span>
              </div>
            </div>
            {isTreated && (
              <div className={`flex items-center justify-between rounded-lg ${responseBadge.bg} px-2 py-1.5`}>
                <span className="text-[10px] text-kz-text-tertiary">Model Prediction</span>
                <span className={`text-xs font-semibold ${responseBadge.text}`}>{responseBadge.label}</span>
              </div>
            )}
            <div className="text-[10px] text-kz-text-tertiary">
              Week {Math.round(currentWeek)} of 52
            </div>
          </Section>

          {/* Cardiac Metrics */}
          <Section icon={<Heart size={14} />} title="Cardiac Status">
            {cardiacMetrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-lg bg-kz-bg-tertiary px-2 py-1.5">
                <span className="text-[10px] text-kz-text-tertiary">{m.label}</span>
                <span className={`text-xs font-semibold ${m.color ?? 'text-kz-text-primary'}`}>{m.value}</span>
              </div>
            ))}
          </Section>

          {/* Genomics */}
          <Section icon={<Dna size={14} />} title="Genomic Highlights">
            {patient.genomicHighlights.map((g) => (
              <div key={g.gene} className="rounded-lg bg-kz-bg-tertiary px-2 py-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-kz-purple">{g.gene}</span>
                  <span className="text-[10px] text-kz-text-secondary">{g.variant}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-kz-text-tertiary">{g.impact}</p>
              </div>
            ))}
          </Section>

          {/* Comorbidities */}
          <Section icon={<AlertTriangle size={14} />} title="Comorbidities">
            {patient.comorbidities.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-lg bg-kz-bg-tertiary px-2 py-1.5">
                <span className="text-xs text-kz-text-secondary">{c.name}</span>
                <span className={`text-[10px] font-semibold ${c.controlled ? 'text-kz-green' : 'text-kz-orange'}`}>
                  {c.controlled ? 'Controlled' : 'Uncontrolled'}
                </span>
              </div>
            ))}
          </Section>

          {/* Medications */}
          <Section icon={<Pill size={14} />} title="Current Medications">
            {patient.currentMedications.map((m) => (
              <div key={m.name} className="rounded-lg bg-kz-bg-tertiary px-2 py-1.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-kz-text-primary">{m.name}</span>
                  <span className="text-[10px] text-kz-text-tertiary">{m.dosage}</span>
                </div>
                <p className="text-[10px] text-kz-text-tertiary">{m.frequency} &middot; {m.category}</p>
              </div>
            ))}
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="text-kz-text-tertiary">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-kz-text-tertiary">{title}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
