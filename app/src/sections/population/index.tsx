import { PageShell, SectionHeading } from '@/shared/components';

export default function PopulationViewPage() {
  return (
    <PageShell>
      <SectionHeading
        title="Virtual Trial — Population View"
        subtitle="10,000 computational patients running in parallel"
      />
      <div className="rounded-lg border border-kz-border-default bg-kz-bg-secondary p-8 text-center">
        <p className="text-kz-text-secondary">Population view — to be built by Agent C</p>
      </div>
    </PageShell>
  );
}
