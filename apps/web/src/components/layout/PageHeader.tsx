import { ButtonLink } from '../ui/ButtonLink';

type Props = {
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
};

export function PageHeader({ title, subtitle, backTo, backLabel = '← Voltar' }: Props) {
  return (
    <div className="mb-7">
      {backTo && (
        <ButtonLink to={backTo} variant="ghost-primary" size="sm" className="-ml-2 mb-3 font-bold">
          {backLabel}
        </ButtonLink>
      )}
      <h1 className="font-serif text-4xl font-bold leading-tight text-emerald-950 dark:text-emerald-50 md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
