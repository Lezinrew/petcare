import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { ReminderCard } from '../components/reminder/ReminderCard';
import { ReminderForm } from '../components/reminder/ReminderForm';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import {
  createReminder,
  deleteReminder,
  fetchReminders,
  markReminderDone,
  updateReminder,
} from '../services/reminders.service';
import { CreateReminderInput, Reminder } from '../types/reminder';
import { isUpcoming } from '../utils/formatDate';

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Reminder | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setReminders(await fetchReminders());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar lembretes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (data: CreateReminderInput) => {
    await createReminder(data);
    setShowForm(false);
    await load();
  };

  const handleUpdate = async (data: CreateReminderInput) => {
    if (!editing?.id) return;
    await updateReminder(editing.id, data);
    setEditing(null);
    await load();
  };

  const handleDone = async (id: string) => {
    await markReminderDone(id);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este lembrete?')) return;
    await deleteReminder(id);
    await load();
  };

  const upcoming = reminders.filter(
    (r) => r.status === 'pending' && isUpcoming(r.dueDate),
  );
  const others = reminders.filter((r) => !upcoming.includes(r));

  if (loading) return <div className="page-container"><LoadingState /></div>;
  if (error) return <div className="page-container"><ErrorState message={error} onRetry={load} /></div>;

  return (
    <div className="page-container">
      <div className="mb-6 flex items-center justify-between">
        <PageHeader title="Lembretes" subtitle="Organize vacinas, banhos, consultas e cuidados do dia a dia." />
        {!showForm && !editing && (
          <Button size="sm" onClick={() => setShowForm(true)}>+ Novo</Button>
        )}
      </div>

      {(showForm || editing) && (
        <Card className="mb-6">
          <ReminderForm
            initial={editing ?? undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </Card>
      )}

      {reminders.length === 0 && !showForm ? (
        <EmptyState
          title="Nenhum lembrete"
          description="Crie lembretes para não esquecer os cuidados do seu pet."
          action={<Button onClick={() => setShowForm(true)}>Criar lembrete</Button>}
        />
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold text-primary">Próximos lembretes</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {upcoming.map((r) => (
                  <ReminderCard
                    key={r.id}
                    reminder={r}
                    highlight
                    onDone={handleDone}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </section>
          )}
          {others.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold">Todos os lembretes</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {others.map((r) => (
                  <ReminderCard
                    key={r.id}
                    reminder={r}
                    onDone={handleDone}
                    onEdit={setEditing}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
