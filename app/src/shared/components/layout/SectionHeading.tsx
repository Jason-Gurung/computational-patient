interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-kz-text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-lg text-kz-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}
