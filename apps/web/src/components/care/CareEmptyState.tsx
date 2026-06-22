import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';

type Action = {
  label: string;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary';
};

type Props = {
  icon: string;
  title: string;
  description: string;
  actions: Action[];
};

export function CareEmptyState({ icon, title, description, actions }: Props) {
  return (
    <section className="rounded-[1.5rem] border border-dashed border-emerald-900/20 bg-white/70 p-8 text-center shadow-xs dark:border-emerald-200/25 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf3ec] text-4xl dark:bg-emerald-950/50">
        {icon}
      </div>
      <h2 className="mt-5 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">{title}</h2>
      <p className="mx-auto mt-2 max-w-md font-medium leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        {actions.map((action) =>
          action.to ? (
            <ButtonLink
              key={action.label}
              to={action.to}
              variant={action.variant === 'secondary' ? 'ghost-primary' : 'primary'}
            >
              {action.label}
            </ButtonLink>
          ) : (
            <Button key={action.label} variant={action.variant === 'secondary' ? 'secondary' : 'primary'} onClick={action.onClick}>
              {action.label}
            </Button>
          ),
        )}
      </div>
    </section>
  );
}
