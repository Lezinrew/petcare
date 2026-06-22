import { useCallback, useEffect, useState } from 'react';
import { ReminderCard } from '../components/reminder/ReminderCard';
import { ReminderForm } from '../components/reminder/ReminderForm';
import { CareEmptyState } from '../components/care/CareEmptyState';
import { TutorContextBanner } from '../components/tutor/TutorContextBanner';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import {
  createReminder,
  deleteReminder,
  fetchReminders,
  markReminderDone,
  updateReminder,
} from '../services/reminders.service';
import { fetchPets } from '../services/pets.service';
import { CreateReminderInput, Reminder } from '../types/reminder';
import { PetProfile } from '../types/pet';
import { isUpcoming } from '../utils/formatDate';

export function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Reminder | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [remindersData, petsData] = await Promise.all([fetchReminders(), fetchPets()]);
      setReminders(remindersData);
      setPets(petsData);
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
  const done = reminders.filter((r) => r.status === 'done');
  const others = reminders.filter((r) => !upcoming.includes(r));
  const petNameById = new Map(pets.filter((pet) => pet.id).map((pet) => [pet.id!, pet.name]));

  if (loading) return <div className="page-container"><LoadingState /></div>;
  if (error) return <div className="page-container"><ErrorState message={error} onRetry={load} /></div>;

  return (
    <div className="care-page px-5 pb-28 pt-6 md:px-8 md:pb-10">
      <div className="mx-auto max-w-5xl">
        <section className="mb-5 rounded-[2rem] border border-emerald-900/10 bg-white/85 p-5 shadow-card dark:border-slate-700/80 dark:bg-slate-900/90 md:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-[#edf3ec] px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
                Rotina de cuidado
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-emerald-950 dark:text-emerald-50">Lembretes</h1>
              <p className="mt-3 max-w-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                Vacinas, consultas, medicação e cuidados recorrentes com prioridade visual para o que está chegando.
              </p>            </div>
            {!showForm && !editing && (
              <Button size="lg" onClick={() => setShowForm(true)}>
                Novo lembrete
              </Button>
            )}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-[#f3f7f2] px-3 py-4 text-center dark:bg-emerald-950/45">
              <p className="text-2xl font-black text-emerald-950 dark:text-emerald-50">{reminders.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-800/70 dark:text-emerald-200/75">total</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-3 py-4 text-center dark:bg-amber-950/45">
              <p className="text-2xl font-black text-amber-950 dark:text-amber-50">{upcoming.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-800/70 dark:text-amber-200/75">próximos</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-3 py-4 text-center dark:bg-sky-950/45">
              <p className="text-2xl font-black text-sky-950 dark:text-sky-50">{done.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sky-800/70 dark:text-sky-200/75">concluídos</p>
            </div>
          </div>
        </section>

        <TutorContextBanner
          context="reminders"
          linkedPetCount={pets.length}
          linkedReminderCount={reminders.length}
        />

        {(showForm || editing) && (
          <Card className="mb-5 rounded-[1.5rem] border-slate-100 bg-white shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">
                {editing ? 'Editar lembrete' : 'Novo lembrete'}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                Datas claras ajudam a rotina a não depender da memória.
              </p>
            </div>
            <ReminderForm
              initial={editing ?? undefined}
              pets={pets}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </Card>
        )}

        {reminders.length === 0 && !showForm ? (
          <CareEmptyState
            icon="◷"
            title="Nenhum lembrete"
            description={
              pets.length === 0
                ? 'Cadastre um pet em Meu Pet para vincular lembretes com mais contexto. Tudo fica no mesmo usuário demo.'
                : 'Crie o primeiro cuidado com data e recorrência. Você pode associar a um pet cadastrado.'
            }
            actions={
              pets.length === 0
                ? [
                    { label: 'Cadastrar pet', to: '/my-pets' },
                    { label: 'Ver perfil', to: '/profile', variant: 'secondary' },
                  ]
                : [
                    { label: 'Criar lembrete', onClick: () => setShowForm(true) },
                    { label: 'Ver pets', to: '/my-pets', variant: 'secondary' },
                  ]
            }
          />
        ) : (
          <div className="space-y-6">
            {upcoming.length > 0 && (
              <section>
                <h2 className="mb-3 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Próximos</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {upcoming.map((r) => (
                    <ReminderCard
                      key={r.id}
                      reminder={r}
                      petName={r.petId ? petNameById.get(r.petId) : undefined}
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
                <h2 className="mb-3 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Todos</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {others.map((r) => (
                    <ReminderCard
                      key={r.id}
                      reminder={r}
                      petName={r.petId ? petNameById.get(r.petId) : undefined}
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
    </div>
  );
}
