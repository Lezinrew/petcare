import { FormEvent, useState } from 'react';
import { CreatePetInput, PetProfile } from '../../types/pet';
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
      <Select
        label="Espécie"
        value={form.species}
        onChange={(e) => setForm({ ...form, species: e.target.value as CreatePetInput['species'] })}
        options={[
          { value: 'dog', label: 'Cão' },
          { value: 'cat', label: 'Gato' },
          { value: 'other', label: 'Outro' },
        ]}
      />
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
