import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { getTutorProfileCompleteness } from '../../utils/tutorProfileCompleteness';
import { TutorProfile } from '../../types/tutorProfile';

type Props = {
  profile: TutorProfile | null;
  className?: string;
  variant?: 'pill' | 'dot';
};

export function TutorProfileIncompleteBadge({ profile, className, variant = 'pill' }: Props) {
  const { isComplete, filled, total } = getTutorProfileCompleteness(profile);
  if (isComplete) return null;

  if (variant === 'dot') {
    return (
      <span
        className={cn(
          'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500 dark:border-slate-950',
          className,
        )}
        aria-label={`Perfil incompleto: ${filled} de ${total} campos`}
      />
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-amber-950 dark:bg-amber-950/50 dark:text-amber-100',
        className,
      )}
    >
      {filled}/{total}
    </span>
  );
}

type BannerProps = {
  profile: TutorProfile | null;
  className?: string;
};

export function TutorProfileIncompleteBanner({ profile, className }: BannerProps) {
  const { isComplete, missingLabels } = getTutorProfileCompleteness(profile);
  if (isComplete) return null;

  const missingText = missingLabels.slice(0, 3).join(', ');
  const suffix = missingLabels.length > 3 ? '…' : '';

  return (
    <Link
      to="/profile"
      className={cn(
        'group flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-xs transition-all hover:border-amber-300 hover:bg-amber-100/80 dark:border-amber-700/40 dark:bg-amber-950/35 dark:hover:bg-amber-950/50',
        className,
      )}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-200/80 text-lg dark:bg-amber-900/50">
        ◎
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-amber-950 dark:text-amber-100">Complete seu perfil</span>
          <TutorProfileIncompleteBadge profile={profile} />
        </span>
        <span className="mt-1 block text-sm font-medium leading-relaxed text-amber-900/85 dark:text-amber-100/85">
          Faltam: {missingText}{suffix}. Isso ajuda a personalizar pets, lembretes e adoção.
        </span>
      </span>
      <span className="shrink-0 pt-1 text-sm font-bold text-amber-900 transition-transform group-hover:translate-x-0.5 dark:text-amber-100">
        →
      </span>
    </Link>
  );
}
