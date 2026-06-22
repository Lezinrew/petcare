import { FormEvent, useEffect, useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { tutorDisplayName, useTutorProfile } from '../contexts/TutorProfileContext';
import { matchAdoption } from '../services/adoption.service';
import { AdoptionMatchRequest, AdoptionMatchResult } from '../types/adoption';
import { adoptionDefaultsFromTutorProfile } from '../utils/tutorProfileAdoption';

const defaultForm: AdoptionMatchRequest = {
  housing: 'apartment',
  hasBackyard: false,
  hasChildren: false,
  hasOtherPets: false,
  experienceLevel: 'none',
  freeTimePerDay: 'low',
  canWalkDaily: true,
  preferredSize: 'any',
  likesActivePets: false,
};

const yesNoTone = 'rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-primary/30 hover:bg-muted dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

const formSections = [
  {
    eyebrow: '1 de 3',
    title: 'Sua casa',
    desc: 'Ambiente, crianças e outros animais mudam muito a adaptação.',
  },
  {
    eyebrow: '2 de 3',
    title: 'Sua rotina',
    desc: 'Tempo livre e passeios evitam frustração para tutor e pet.',
  },
  {
    eyebrow: '3 de 3',
    title: 'Preferência',
    desc: 'Preferência ajuda, mas compatibilidade vem antes da aparência.',
  },
];

export function AdoptionMatchPage() {
  const { profile } = useTutorProfile();
  const firstName = tutorDisplayName(profile);
  const [form, setForm] = useState<AdoptionMatchRequest>(defaultForm);
  const [result, setResult] = useState<AdoptionMatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profileHint, setProfileHint] = useState(false);

  useEffect(() => {
    if (!profile) return;
    const merged = adoptionDefaultsFromTutorProfile(profile, defaultForm);
    const usedProfile =
      profile.housingType !== undefined || profile.petExperience !== undefined;
    setForm(merged);
    setProfileHint(usedProfile);
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await matchAdoption(form);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="care-page px-5 pb-28 pt-6 md:px-8 md:pb-10">
      <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Adoção responsável"
        subtitle="Simule compatibilidade antes da decisão. A meta é evitar escolha por impulso e reduzir risco de abandono."
      />

      {!result ? (
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="rounded-[1.5rem] border border-emerald-900/10 bg-white/80 p-5 shadow-xs dark:border-slate-700/80 dark:bg-slate-900/85">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">Antes de escolher</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Compatibilidade é cuidado preventivo.</h2>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
              O resultado sugere caminhos, mas não substitui conversa com veterinário, protetor responsável ou criador ético.
            </p>
            <div className="mt-5 space-y-3">
              {formSections.map((section) => (
                <div key={section.title} className="rounded-2xl bg-[#f3f7f2] p-3 dark:bg-emerald-950/35">
                  <p className="text-[0.68rem] font-bold uppercase tracking-wide text-emerald-800/75 dark:text-emerald-200/75">{section.eyebrow}</p>
                  <h3 className="mt-1 font-bold text-emerald-950 dark:text-emerald-50">{section.title}</h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">{section.desc}</p>
                </div>
              ))}
            </div>
          </aside>

          <Card className="rounded-[1.5rem] border-slate-100 bg-white shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
            {profileHint && (
              <p className="mb-4 rounded-xl bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-900 dark:bg-sky-950/40 dark:text-sky-100">
                Alguns campos foram pré-preenchidos com base no seu{' '}
                <ButtonLink to="/profile" variant="ghost-primary" size="sm" className="inline -ml-1">
                  perfil de tutor
                </ButtonLink>
                .
              </p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50">Casa e convivência</h2>
                <Select
                  label="Você mora em casa ou apartamento?"
                  value={form.housing}
                  onChange={(e) => setForm({ ...form, housing: e.target.value as AdoptionMatchRequest['housing'] })}
                  options={[
                    { value: 'apartment', label: 'Apartamento' },
                    { value: 'house', label: 'Casa' },
                  ]}
                />
                <div className="grid gap-2 sm:grid-cols-3">
                  <Checkbox label="Tem quintal" checked={form.hasBackyard} onChange={(v) => setForm({ ...form, hasBackyard: v })} />
                  <Checkbox label="Tem crianças" checked={form.hasChildren} onChange={(v) => setForm({ ...form, hasChildren: v })} />
                  <Checkbox label="Tem outros pets" checked={form.hasOtherPets} onChange={(v) => setForm({ ...form, hasOtherPets: v })} />
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50">Tempo e experiência</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select
                    label="Experiência com pets"
                    value={form.experienceLevel}
                    onChange={(e) => setForm({ ...form, experienceLevel: e.target.value as AdoptionMatchRequest['experienceLevel'] })}
                    options={[
                      { value: 'none', label: 'Sou iniciante' },
                      { value: 'some', label: 'Já cuidei antes' },
                      { value: 'experienced', label: 'Tenho bastante experiência' },
                    ]}
                  />
                  <Select
                    label="Tempo livre por dia"
                    value={form.freeTimePerDay}
                    onChange={(e) => setForm({ ...form, freeTimePerDay: e.target.value as AdoptionMatchRequest['freeTimePerDay'] })}
                    options={[
                      { value: 'low', label: 'Pouco tempo' },
                      { value: 'medium', label: 'Tempo moderado' },
                      { value: 'high', label: 'Bastante tempo' },
                    ]}
                  />
                </div>
                <Checkbox label="Consigo passear ou enriquecer a rotina todos os dias" checked={form.canWalkDaily} onChange={(v) => setForm({ ...form, canWalkDaily: v })} />
              </section>

              <section className="space-y-3">
                <h2 className="font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50">Preferência inicial</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select
                    label="Porte preferido"
                    value={form.preferredSize}
                    onChange={(e) => setForm({ ...form, preferredSize: e.target.value as AdoptionMatchRequest['preferredSize'] })}
                    options={[
                      { value: 'any', label: 'Sem preferência' },
                      { value: 'pequeno', label: 'Pequeno' },
                      { value: 'médio', label: 'Médio' },
                      { value: 'grande', label: 'Grande' },
                    ]}
                  />
                  <div className="flex flex-col justify-end">
                    <Checkbox label="Gosto de animais ativos" checked={form.likesActivePets} onChange={(v) => setForm({ ...form, likesActivePets: v })} />
                  </div>
                </div>
              </section>

              {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-health dark:bg-red-950/40 dark:text-red-100">{error}</p>}

              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Analisando rotina...' : 'Ver compatibilidade'}
              </Button>
            </form>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="rounded-[1.5rem] border-slate-100 bg-white shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">Resultado da simulação</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Seu perfil</h2>
            <p className="mt-2 font-medium leading-relaxed text-text-secondary">
              {firstName
                ? `${firstName}, identificamos este perfil: ${result.profile}.`
                : result.profile}
            </p>
          </Card>

          <section>
            <h2 className="mb-3 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Recomendações com melhor encaixe</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {result.recommendedBreeds.map((breed) => (
                <Card key={breed.slug} className="overflow-hidden rounded-[1.5rem] border-slate-100 bg-white p-0 shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
                  <div className="aspect-[16/10] overflow-hidden bg-[#edf3ec] dark:bg-slate-800">
                    {breed.imageUrl ? (
                      <img src={breed.imageUrl} alt={breed.imageAlt ?? breed.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl">🐾</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50">{breed.name}</h3>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100">
                        {breed.compatibilityScore}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand dark:text-emerald-200">{breed.compatibilityLabel}</p>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-text-secondary">{breed.reason}</p>
                    <div className="mt-3 rounded-xl bg-amber-50 p-3 text-xs font-semibold leading-relaxed text-amber-950 dark:bg-amber-950/35 dark:text-amber-100">
                      Atenção: {breed.attentionPoints[0]}
                    </div>
                  <ButtonLink
                    to={`/dogs/${breed.slug}`}
                    variant="ghost-primary"
                    size="sm"
                    className="mt-3 -ml-2"
                  >
                    Ver ficha →
                  </ButtonLink>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="rounded-[1.5rem] border-amber-200 bg-amber-50 shadow-card dark:border-amber-700/50 dark:bg-amber-950/30">
            <h2 className="font-serif text-2xl font-bold text-amber-950 dark:text-amber-100">Alertas antes da decisão</h2>
            <div className="mt-3 grid gap-2">
              {result.responsibilityAlerts.map((a) => (
                <p key={a} className="rounded-xl bg-white/65 px-3 py-2 text-sm font-semibold leading-relaxed text-amber-950 dark:bg-slate-950/35 dark:text-amber-100">
                  {a}
                </p>
              ))}
            </div>
          </Card>

          <aside className="rounded-[1.5rem] border border-emerald-900/10 bg-[#f3f7f2] p-5 text-sm font-bold leading-relaxed text-emerald-950 shadow-xs dark:border-emerald-200/20 dark:bg-emerald-950/35 dark:text-emerald-100">
            {result.antiAbandonmentMessage}
          </aside>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => { setResult(null); setForm(defaultForm); }}>
              Refazer simulação
            </Button>
            <ButtonLink to="/explore" variant="ghost-primary">
              Comparar outras espécies
            </ButtonLink>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className={yesNoTone}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
      />
      {label}
    </label>
  );
}
