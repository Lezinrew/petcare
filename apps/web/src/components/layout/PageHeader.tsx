type Props = {
  title: string;
  subtitle?: string;
  backTo?: string;
};

export function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-text-primary md:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-text-secondary">{subtitle}</p>}
    </div>
  );
}
