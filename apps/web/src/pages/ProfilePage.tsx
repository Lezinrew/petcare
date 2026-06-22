import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TutorProfileIncompleteBadge } from '../components/tutor/TutorProfileIncompleteBadge';
import { TutorProfileChecklist } from '../components/tutor/TutorProfileChecklist';
import { useTutorProfile } from '../contexts/TutorProfileContext';
import { TutorProfileForm } from '../components/tutor/TutorProfileForm';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { fetchPets } from '../services/pets.service';
import { fetchReminders } from '../services/reminders.service';
import { updateTutorProfile } from '../services/tutorProfile.service';
import {
  HOUSING_TYPE_OPTIONS,
  PET_EXPERIENCE_OPTIONS,
  UpdateTutorProfileInput,
} from '../types/tutorProfile';
import { getTutorProfileCompleteness } from '../utils/tutorProfileCompleteness';

function labelFor<T extends { value: string; label: string }>(options: T[], value?: string): string | undefined {
  return options.find((opt) => opt.value === value)?.label;
}

export function ProfilePage() {
  const { profile, loading, refresh, setProfile } = useTutorProfile();
  const [error, setError] = useState<string | null>(null);
  const [petCount, setPetCount] = useState(0);
  const [reminderCount, setReminderCount] = useState(0);

  const loadCounts = useCallback(async () => {
    try {
      const [pets, reminders] = await Promise.all([fetchPets(), fetchReminders()]);
      setPetCount(pets.length);
      setReminderCount(reminders.length);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados vinculados');
    }
  }, []);

  useEffect(() => {
    void loadCounts();
  }, [loadCounts]);

  const handleSave = async (data: UpdateTutorProfileInput) => {
    const updated = await updateTutorProfile(data);
    setProfile(updated);
  };

  if (loading && !profile) return <div className="page-container"><LoadingState /></div>;
  if (!profile) return <div className="page-container"><ErrorState message={error ?? 'Perfil indisponível'} onRetry={refresh} /></div>;

  const { filled: filledFields, total: totalFields, isComplete } = getTutorProfileCompleteness(profile);

  return (
    <div className="care-page px-5 pb-28 pt-6 md:px-8 md:pb-10">
      <div className="mx-auto max-w-5xl">
        <section className="mb-5 rounded-[2rem] border border-emerald-900/10 bg-white/85 p-5 shadow-card dark:border-slate-700/80 dark:bg-slate-900/90 md:p-7">
          <div>
            <p className="inline-flex rounded-full bg-[#edf3ec] px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
              Tutor demo
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-4xl font-bold leading-tight text-emerald-950 dark:text-emerald-50">
                Meu perfil
              </h1>
              <TutorProfileIncompleteBadge profile={profile} />
            </div>
            <p className="mt-3 max-w-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              Seus dados básicos ajudam a contextualizar pets e lembretes no modo demonstração — sem login real ainda.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-2xl bg-[#f3f7f2] px-3 py-4 text-center dark:bg-emerald-950/45">
              <p className="text-2xl font-black text-emerald-950 dark:text-emerald-50">{filledFields}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-800/70 dark:text-emerald-200/75">de {totalFields}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-3 py-4 text-center dark:bg-sky-950/45">
              <p className="text-2xl font-black text-sky-950 dark:text-sky-50">{petCount}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sky-800/70 dark:text-sky-200/75">pets</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-3 py-4 text-center dark:bg-amber-950/45">
              <p className="text-2xl font-black text-amber-950 dark:text-amber-50">{reminderCount}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-800/70 dark:text-amber-200/75">lembretes</p>
            </div>
            <div className="rounded-2xl bg-violet-50 px-3 py-4 text-center dark:bg-violet-950/45 sm:col-span-1 col-span-2">
              <p className="truncate text-sm font-bold text-sky-950 dark:text-sky-50">
                {profile.name?.trim() || 'Nome ainda não informado'}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sky-800/70 dark:text-sky-200/75">
                {profile.city && profile.state
                  ? `${profile.city} / ${profile.state}`
                  : 'Localização opcional'}
              </p>
            </div>
          </div>
        </section>

        {(profile.housingType || profile.petExperience) && (
          <section className="mb-5 grid gap-3 sm:grid-cols-2">
            {profile.housingType && (
              <div className="rounded-[1.25rem] border border-slate-100 bg-white/80 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-900/80">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Moradia</p>
                <p className="mt-1 font-semibold text-emerald-950 dark:text-emerald-50">
                  {labelFor(HOUSING_TYPE_OPTIONS, profile.housingType)}
                </p>
              </div>
            )}
            {profile.petExperience && (
              <div className="rounded-[1.25rem] border border-slate-100 bg-white/80 px-4 py-3 dark:border-slate-700/80 dark:bg-slate-900/80">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Experiência</p>
                <p className="mt-1 font-semibold text-emerald-950 dark:text-emerald-50">
                  {labelFor(PET_EXPERIENCE_OPTIONS, profile.petExperience)}
                </p>
              </div>
            )}
          </section>
        )}

        {!isComplete && <TutorProfileChecklist profile={profile} className="mb-5" />}

        <Card className="mb-5 rounded-[1.5rem] border-slate-100 bg-white shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
          <div className="mb-4">
            <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Dados do tutor</h2>
            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              Informações usadas no piloto para personalizar a experiência do usuário demo.
            </p>
          </div>
          <TutorProfileForm initial={profile} onSubmit={handleSave} />
        </Card>

        <section className="rounded-[1.5rem] border border-dashed border-emerald-900/20 bg-white/70 p-5 dark:border-emerald-200/25 dark:bg-slate-900/80">
          <p className="text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
            Pets e lembretes já ficam vinculados ao mesmo usuário demo. Quando o login real chegar, este perfil será a base da conta.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/my-pets"
              className="inline-flex h-10 items-center rounded-xl bg-[#edf3ec] px-4 text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-900 hover:text-white dark:bg-emerald-950/50 dark:text-emerald-100 dark:hover:bg-emerald-700"
            >
              Ver meus pets
            </Link>
            <Link
              to="/reminders"
              className="inline-flex h-10 items-center rounded-xl border border-emerald-900/15 bg-white px-4 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-50 dark:border-slate-600 dark:bg-slate-800 dark:text-emerald-50 dark:hover:bg-slate-700"
            >
              Ver lembretes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
