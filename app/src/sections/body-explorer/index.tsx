import { useParams } from 'react-router-dom';
import { PageShell, SectionHeading } from '@/shared/components';

export default function BodyExplorerPage() {
  const { patientId } = useParams<{ patientId: string }>();

  return (
    <PageShell>
      <SectionHeading
        title="Body Explorer"
        subtitle={`Exploring patient: ${patientId}`}
      />
      <div className="rounded-lg border border-kz-border-default bg-kz-bg-secondary p-8 text-center">
        <p className="text-kz-text-secondary">3D body explorer — to be built by Agent D</p>
      </div>
    </PageShell>
  );
}
