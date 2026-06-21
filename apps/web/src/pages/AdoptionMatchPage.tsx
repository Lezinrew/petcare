import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { matchAdoption } from '../services/adoption.service';
import { AdoptionMatchRequest, AdoptionMatchResult } from '../types/adoption';

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

export function AdoptionMatchPage() {
  const [form, setForm] = useState<AdoptionMatchRequest>(defaultForm);
  const [result, setResult] = useState<AdoptionMatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="page-container">
      <PageHeader
        title="Adoção responsável"
        subtitle="Responda algumas perguntas e descubra raças compatíveis com seu estilo de vida."
      />

      {!result ? (
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Select
              label="Você mora em casa ou apartamento?"
              value={form.housing}
              onChange={(e) => setForm({ ...form, housing: e.target.value as AdoptionMatchRequest['housing'] })}
              options={[
                { value: 'apartment', label: 'Apartamento' },
                { value: 'house', label: 'Casa' },
              ]}
            />

            <Checkbox label="Tem quintal?" checked={form.hasBackyard} onChange={(v) => setForm({ ...form, hasBackyard: v })} />
            <Checkbox label="Tem crianças?" checked={form.hasChildren} onChange={(v) => setForm({ ...form, hasChildren: v })} />
            <Checkbox label="Tem outros animais?" checked={form.hasOtherPets} onChange={(v) => setForm({ ...form, hasOtherPets: v })} />

            <Select
              label="Experiência com pets"
              value={form.experienceLevel}
              onChange={(e) => setForm({ ...form, experienceLevel: e.target.value as AdoptionMatchRequest['experienceLevel'] })}
              options={[
                { value: 'none', label: 'Nenhuma' },
                { value: 'some', label: 'Alguma' },
                { value: 'experienced', label: 'Experiente' },
              ]}
            />

            <Select
              label="Tempo livre por dia"
              value={form.freeTimePerDay}
              onChange={(e) => setForm({ ...form, freeTimePerDay: e.target.value as AdoptionMatchRequest['freeTimePerDay'] })}
              options={[
                { value: 'low', label: 'Pouco' },
                { value: 'medium', label: 'Moderado' },
                { value: 'high', label: 'Muito' },
              ]}
            />

            <Checkbox label="Pode passear todos os dias?" checked={form.canWalkDaily} onChange={(v) => setForm({ ...form, canWalkDaily: v })} />

            <Select
              label="Porte preferido"
              value={form.preferredSize}
              onChange={(e) => setForm({ ...form, preferredSize: e.target.value as AdoptionMatchRequest['preferredSize'] })}
              options={[
                { value: 'any', label: 'Qualquer' },
                { value: 'pequeno', label: 'Pequeno' },
                { value: 'médio', label: 'Médio' },
                { value: 'grande', label: 'Grande' },
              ]}
            />

            <Checkbox label="Gosta de animais ativos?" checked={form.likesActivePets} onChange={(v) => setForm({ ...form, likesActivePets: v })} />

            {error && <p className="text-sm text-health">{error}</p>}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Analisando...' : 'Ver recomendações'}
            </Button>
          </form>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-primary">Seu perfil</h2>
            <p className="mt-2 text-text-secondary">{result.profile}</p>
          </Card>

          <section>
            <h2 className="mb-3 text-lg font-semibold">Raças recomendadas</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {result.recommendedBreeds.map((breed) => (
                <Card key={breed.slug}>
                  <h3 className="font-semibold">{breed.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{breed.reason}</p>
                  <Link to={`/dogs/${breed.slug}`} className="mt-3 inline-block text-sm text-primary hover:underline">
                    Ver ficha →
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <Card>
            <h2 className="text-lg font-semibold text-behavior">Alertas de responsabilidade</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-text-secondary">
              {result.responsibilityAlerts.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </Card>

          <aside className="rounded-xl border border-primary/20 bg-primary-light p-4 text-sm text-primary">
            {result.antiAbandonmentMessage}
          </aside>

          <Button variant="secondary" onClick={() => { setResult(null); setForm(defaultForm); }}>
            Refazer simulação
          </Button>
        </div>
      )}
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
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded"
      />
      {label}
    </label>
  );
}
