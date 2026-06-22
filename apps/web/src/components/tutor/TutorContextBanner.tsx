import { Link } from 'react-router-dom';
import { useTutorProfile } from '../../contexts/TutorProfileContext';
import {
  HOUSING_TYPE_OPTIONS,
  PET_EXPERIENCE_OPTIONS,
  TutorProfile,
} from '../../types/tutorProfile';
import { cn } from '../../utils/cn';
import { getTutorProfileCompleteness } from '../../utils/tutorProfileCompleteness';
import { TutorProfileIncompleteBadge } from './TutorProfileIncompleteBadge';

type Props = {
  context: 'pets' | 'reminders';
  className?: string;
};

function labelFor<T extends { value: string; label: string }>(options: T[], value?: string): string | undefined {
  return options.find((opt) => opt.value === value)?.label;
}

function buildSubtitle(profile: TutorProfile): string | null {
  const parts: string[] = [];
  const housing = labelFor(HOUSING_TYPE_OPTIONS, profile.housingType);
  const experience = labelFor(PET_EXPERIENCE_OPTIONS, profile.petExperience);
  if (housing) parts.push(housing);
  if (experience) parts.push(experience);
  return parts.length > 0 ? parts.join(' · ') : null;
}

const contextCopy = {
  pets: {
    title: 'Tutor responsável por estes pets',
    emptyHint: 'Complete o perfil para contextualizar os cadastros.',
  },
  reminders: {
    title: 'Tutor responsável por estes lembretes',
    emptyHint: 'Complete o perfil para organizar a rotina com mais contexto.',
  },
} as const;

export function TutorContextBanner({ context, className }: Props) {
  const { profile, loading } = useTutorProfile();

  if (loading || !profile) return null;

  const copy = contextCopy[context];
  const { isComplete } = getTutorProfileCompleteness(profile);
  const displayName = profile.name?.trim() || 'Tutor demo';
  const location =
    profile.city && profile.state
      ? `${profile.city} / ${profile.state}`
      : profile.city || profile.state || null;
  const subtitle = buildSubtitle(profile);

  return (
    <Link
      to="/profile"
      className={cn(
        'group mb-5 flex items-start gap-3 rounded-[1.25rem] border border-violet-200/80 bg-violet-50/80 px-4 py-3 shadow-xs transition-all hover:border-violet-300 hover:bg-violet-100/80 dark:border-violet-800/40 dark:bg-violet-950/30 dark:hover:bg-violet-950/45',
        className,
      )}
    >
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-200/70 text-lg font-bold text-violet-900 dark:bg-violet-900/50 dark:text-violet-100">
        ◎
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-violet-800/80 dark:text-violet-200/80">
            {copy.title}
          </span>
          <TutorProfileIncompleteBadge profile={profile} />
        </span>
        <span className="mt-1 block truncate font-serif text-lg font-bold text-violet-950 dark:text-violet-50">
          {displayName}
        </span>
        {location && (
          <span className="mt-0.5 block text-sm font-semibold text-violet-900/80 dark:text-violet-100/80">
            {location}
          </span>
        )}
        {subtitle ? (
          <span className="mt-1 block text-sm font-medium text-violet-900/75 dark:text-violet-100/75">
            {subtitle}
          </span>
        ) : (
          !isComplete && (
            <span className="mt-1 block text-sm font-medium text-violet-900/75 dark:text-violet-100/75">
              {copy.emptyHint}
            </span>
          )
        )}
      </span>
      <span className="shrink-0 pt-1 text-sm font-bold text-violet-800 transition-transform group-hover:translate-x-0.5 dark:text-violet-200">
        Perfil →
      </span>
    </Link>
  );
}
