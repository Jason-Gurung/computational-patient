import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Dna, Pill, AlertTriangle } from 'lucide-react';
import type { PatientProfile } from '@/shared/types';

interface PatientProfileSidebarProps {
  patient: PatientProfile;
  isDeepZoom: boolean;
}

export function PatientProfileSidebar({ patient, isDeepZoom }: PatientProfileSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const shouldCollapse = collapsed || isDeepZoom;

  return (
    <div className={`absolute left-4 top-14 z-10 transition-all duration-300 ${shouldCollapse ? 'w-10' : 'w-64'}`}>
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
        <div className="space-y-3 rounded-xl border border-kz-border-default bg-kz-bg-secondary/80 p-4 backdrop-blur-md">
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
