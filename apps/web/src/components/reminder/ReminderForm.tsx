import { FormEvent, useState } from 'react';
import { CreateReminderInput, Reminder } from '../../types/reminder';
import { recurrenceLabels, reminderTypeLabels } from '../../utils/labels';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

type Props = {
  initial?: Reminder;
  onSubmit: (data: CreateReminderInput) => Promise<void>;
  onCancel: () => void;
};

export function ReminderForm({ initial, onSubmit, onCancel }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateReminderInput>({
    type: initial?.type ?? 'vaccine',
    title: initial?.title ?? '',
    dueDate: initial?.dueDate ?? '',
    recurrence: initial?.recurrence ?? 'none',
    petId: initial?.petId,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Select
        label="Tipo"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value as CreateReminderInput['type'] })}
        options={Object.entries(reminderTypeLabels).map(([value, label]) => ({ value, label }))}
      />
      <Input
        label="Título"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <Input
        label="Data"
        type="date"
        required
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />
      <Select
        label="Recorrência"
        value={form.recurrence}
        onChange={(e) => setForm({ ...form, recurrence: e.target.value as CreateReminderInput['recurrence'] })}
        options={Object.entries(recurrenceLabels).map(([value, label]) => ({ value, label }))}
      />
      <div className="flex gap-2">
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Salvando...' : initial ? 'Atualizar' : 'Criar lembrete'}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
