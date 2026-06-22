import { TutorProfile } from '../../types/tutorProfile';
import { cn } from '../../utils/cn';
import { getTutorProfileChecklist, getTutorProfileCompleteness } from '../../utils/tutorProfileCompleteness';

type Props = {
  profile: TutorProfile | null;
  className?: string;
};

export function TutorProfileChecklist({ profile, className }: Props) {
  const { filled, total, isComplete } = getTutorProfileCompleteness(profile);
  const items = getTutorProfileChecklist(profile);
  const progress = total > 0 ? Math.round((filled / total) * 100) : 0;

  return (
    <section
      className={cn(
        'rounded-[1.5rem] border p-4 shadow-xs',
        isComplete
          ? 'border-emerald-200 bg-emerald-50/80 dark:border-emerald-800/40 dark:bg-emerald-950/30'
          : 'border-amber-200 bg-amber-50/80 dark:border-amber-800/40 dark:bg-amber-950/30',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-serif text-lg font-bold text-emerald-950 dark:text-emerald-50">
          {isComplete ? 'Perfil essencial completo' : 'Complete o essencial'}
        </h2>
        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
          {filled}/{total} · {progress}%
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/70 dark:bg-slate-900/50">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            isComplete ? 'bg-emerald-600 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400',
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item.key}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold',
              item.filled
                ? 'bg-white/70 text-emerald-900 dark:bg-slate-900/50 dark:text-emerald-100'
                : 'bg-white/50 text-amber-950 dark:bg-slate-950/35 dark:text-amber-100',
            )}
          >
            <span
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs',
                item.filled
                  ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                  : 'border border-amber-400 text-amber-700 dark:border-amber-500 dark:text-amber-300',
              )}
              aria-hidden
            >
              {item.filled ? '✓' : '·'}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
