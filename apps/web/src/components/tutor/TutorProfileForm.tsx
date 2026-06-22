import { FormEvent, useState } from 'react';
import {
  BRAZILIAN_STATES,
  HOUSING_TYPE_OPTIONS,
  PET_EXPERIENCE_OPTIONS,
  TutorProfile,
  UpdateTutorProfileInput,
} from '../../types/tutorProfile';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

type Props = {
  initial: TutorProfile;
  onSubmit: (data: UpdateTutorProfileInput) => Promise<void>;
};

export function TutorProfileForm({ initial, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<UpdateTutorProfileInput>({
    name: initial.name ?? '',
    city: initial.city ?? '',
    state: initial.state ?? '',
    housingType: initial.housingType,
    petExperience: initial.petExperience,
    notes: initial.notes ?? '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    try {
      await onSubmit({
        name: form.name || undefined,
        city: form.city || undefined,
        state: form.state || undefined,
        housingType: form.housingType,
        petExperience: form.petExperience,
        notes: form.notes || undefined,
      });
      setSaved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome do tutor"
        placeholder="Como você gostaria de ser chamado"
        value={form.name ?? ''}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <Input
          label="Cidade"
          placeholder="São Paulo"
          value={form.city ?? ''}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <Select
          label="UF"
          value={form.state ?? ''}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          options={[
            { value: '', label: '—' },
            ...BRAZILIAN_STATES.map((uf) => ({ value: uf, label: uf })),
          ]}
          className="w-24"
        />
      </div>
      <Select
        label="Tipo de moradia"
        value={form.housingType ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            housingType: e.target.value ? (e.target.value as UpdateTutorProfileInput['housingType']) : undefined,
          })
        }
        options={[
          { value: '', label: 'Selecione' },
          ...HOUSING_TYPE_OPTIONS,
        ]}
      />
      <Select
        label="Experiência com pets"
        value={form.petExperience ?? ''}
        onChange={(e) =>
          setForm({
            ...form,
            petExperience: e.target.value ? (e.target.value as UpdateTutorProfileInput['petExperience']) : undefined,
          })
        }
        options={[
          { value: '', label: 'Selecione' },
          ...PET_EXPERIENCE_OPTIONS,
        ]}
      />
      <Textarea
        label="Observações gerais"
        placeholder="Rotina, limitações de espaço, preferências de cuidado..."
        value={form.notes ?? ''}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        rows={4}
      />
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar perfil'}
        </Button>
        {saved && (
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Perfil salvo com sucesso.
          </p>
        )}
      </div>
    </form>
  );
}
