import { CareIllustration } from './CareIllustration';

type Props = {
  title: string;
  icon: string;
  color: string;
  iconBg: string;
  sectionKey: string;
  children: React.ReactNode;
  disclaimer?: string;
};

export function CareInfoCard({ title, icon, color, iconBg, sectionKey, children, disclaimer }: Props) {
  return (
    <article className="relative min-h-[220px] overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-soft">
      <header className="relative z-10 mb-4 flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl shadow-xs ${iconBg}`}
          aria-hidden
        >
          {icon}
        </span>
        <h3 className={`text-sm font-bold uppercase tracking-wide ${color}`}>{title}</h3>
      </header>

      <div className="relative z-10 max-w-[72%]">{children}</div>

      <div className="absolute -bottom-1 -right-1 opacity-90 dark:opacity-80">
        <CareIllustration section={sectionKey} className="h-24 w-24 md:h-28 md:w-28" />
      </div>

      {disclaimer && (
        <p className="relative z-10 mt-4 max-w-[72%] rounded-lg border border-health/20 bg-health/5 p-2 text-xs font-medium text-health">
          {disclaimer}
        </p>
      )}
    </article>
  );
}
