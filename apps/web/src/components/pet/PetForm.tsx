import { FormEvent, useState } from 'react';
import { PET_CATEGORIES } from '../../config/species';
import { CreatePetInput, PetProfile, PetSpecies } from '../../types/pet';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

type Props = {
  initial?: PetProfile;
  onSubmit: (data: CreatePetInput) => Promise<void>;
  onCancel: () => void;
};

export function PetForm({ initial, onSubmit, onCancel }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreatePetInput>({
    name: initial?.name ?? '',
    species: initial?.species ?? 'dog',
    breedSlug: initial?.breedSlug ?? '',
    ageMonths: initial?.ageMonths,
    weightKg: initial?.weightKg,
    sex: initial?.sex ?? 'unknown',
    neutered: initial?.neutered ?? false,
    notes: initial?.notes ?? '',
    photoUrl: initial?.photoUrl ?? '',
  });
  const selectSpecies = (species: PetSpecies) => {
    setForm({ ...form, species });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        ...form,
        ageMonths: form.ageMonths ? Number(form.ageMonths) : undefined,
        weightKg: form.weightKg ? Number(form.weightKg) : undefined,
        breedSlug: form.breedSlug || undefined,
        photoUrl: form.photoUrl || undefined,
        notes: form.notes || undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Nome"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-700 dark:text-slate-200">Espécie</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {PET_CATEGORIES.map((category) => {
            const selected = form.species === category.species;

            return (
              <button
                key={category.species}
                type="button"
                onClick={() => selectSpecies(category.species)}
                aria-pressed={selected}
                className={`group flex min-h-[5.6rem] flex-col items-center justify-center gap-1.5 rounded-2xl border p-2 text-center transition-all ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-[0_10px_24px_rgba(16,185,129,0.16)] dark:border-emerald-300/70 dark:bg-emerald-950/50 dark:text-emerald-50'
                    : 'border-slate-200 bg-white text-slate-700 shadow-xs hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-emerald-400/40 dark:hover:bg-slate-800'
                }`}
              >
                <span className="h-11 w-11 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10">
                  <img
                    src={category.avatarImage}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = category.coverFallback;
                    }}
                  />
                </span>
                <span className="max-w-full truncate text-[0.72rem] font-bold leading-tight">{category.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => selectSpecies('other')}
            aria-pressed={form.species === 'other'}
            className={`flex min-h-[5.6rem] flex-col items-center justify-center gap-1.5 rounded-2xl border p-2 text-center transition-all ${
              form.species === 'other'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-[0_10px_24px_rgba(16,185,129,0.16)] dark:border-emerald-300/70 dark:bg-emerald-950/50 dark:text-emerald-50'
                : 'border-slate-200 bg-white text-slate-700 shadow-xs hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-emerald-400/40 dark:hover:bg-slate-800'
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10">
              +
            </span>
            <span className="max-w-full truncate text-[0.72rem] font-bold leading-tight">Outro</span>
          </button>
        </div>
      </fieldset>
      <Input
        label="Raça (slug)"
        placeholder="labrador-retriever"
        value={form.breedSlug ?? ''}
        onChange={(e) => setForm({ ...form, breedSlug: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Idade (meses)"
          type="number"
          min={0}
          value={form.ageMonths ?? ''}
          onChange={(e) => setForm({ ...form, ageMonths: e.target.value ? Number(e.target.value) : undefined })}
        />
        <Input
          label="Peso (kg)"
          type="number"
          min={0}
          step={0.1}
          value={form.weightKg ?? ''}
          onChange={(e) => setForm({ ...form, weightKg: e.target.value ? Number(e.target.value) : undefined })}
        />
      </div>
      <Select
        label="Sexo"
        value={form.sex ?? 'unknown'}
        onChange={(e) => setForm({ ...form, sex: e.target.value as CreatePetInput['sex'] })}
        options={[
          { value: 'unknown', label: 'Não informado' },
          { value: 'male', label: 'Macho' },
          { value: 'female', label: 'Fêmea' },
        ]}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.neutered ?? false}
          onChange={(e) => setForm({ ...form, neutered: e.target.checked })}
          className="h-4 w-4 rounded"
        />
        Castrado
      </label>
      <Input
        label="URL da foto (opcional)"
        value={form.photoUrl ?? ''}
        onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
      />
      <Textarea
        label="Observações"
        value={form.notes ?? ''}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <div className="flex gap-2">
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Salvando...' : initial ? 'Atualizar' : 'Cadastrar'}
        </Button>
        <Button type="button" variant="ghost-primary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
