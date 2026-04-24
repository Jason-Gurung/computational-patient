import { PageShell, SectionHeading } from '@/shared/components';

export default function TrialSetupPage() {
  return (
    <PageShell>
      <SectionHeading
        title="Configure Virtual Trial"
        subtitle="Set up your computational trial parameters"
      />
      <div className="rounded-lg border border-kz-border-default bg-kz-bg-secondary p-8 text-center">
        <p className="text-kz-text-secondary">Trial setup — to be built by Agent B</p>
      </div>
    </PageShell>
  );
}
