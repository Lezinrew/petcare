import { ButtonLink } from '../ui/ButtonLink';

type Props = {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
};

export function PageHeader({ title, subtitle, backTo, backLabel = '← Voltar' }: Props) {
  return (
    <div className="mb-6">
      {backTo && (
        <ButtonLink to={backTo} variant="ghost-primary" size="sm" className="-ml-2 mb-2">
          {backLabel}
        </ButtonLink>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-text-primary md:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl font-medium leading-relaxed text-text-secondary">{subtitle}</p>}
    </div>
  );
}
