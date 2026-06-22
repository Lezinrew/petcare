import { useCallback, useEffect, useState } from 'react';
import { PetCard } from '../components/pet/PetCard';
import { PetForm } from '../components/pet/PetForm';
import { TutorContextBanner } from '../components/tutor/TutorContextBanner';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { createPet, deletePet, fetchPets, updatePet } from '../services/pets.service';
import { CreatePetInput, PetProfile } from '../types/pet';

export function MyPetsPage() {
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PetProfile | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPets(await fetchPets());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (data: CreatePetInput) => {
    await createPet(data);
    setShowForm(false);
    await load();
  };

  const handleUpdate = async (data: CreatePetInput) => {
    if (!editing?.id) return;
    await updatePet(editing.id, data);
    setEditing(null);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este pet?')) return;
    await deletePet(id);
    await load();
  };

  if (loading) return <div className="page-container"><LoadingState /></div>;
  if (error) return <div className="page-container"><ErrorState message={error} onRetry={load} /></div>;

  const petsWithNotes = pets.filter((pet) => pet.notes).length;
  const petsWithPhoto = pets.filter((pet) => pet.photoUrl).length;

  return (
    <div className="care-page px-5 pb-28 pt-6 md:px-8 md:pb-10">
      <div className="mx-auto max-w-5xl">
        <section className="mb-5 rounded-[2rem] border border-emerald-900/10 bg-white/85 p-5 shadow-card dark:border-slate-700/80 dark:bg-slate-900/90 md:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-[#edf3ec] px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">
                Perfis cadastrados
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-emerald-950 dark:text-emerald-50">Meu Pet</h1>
              <p className="mt-3 max-w-xl font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                Guarde as informações essenciais de cada companheiro e mantenha a rotina conectada aos lembretes.
              </p>
            </div>
            {!showForm && !editing && (
              <Button size="lg" onClick={() => setShowForm(true)}>
                Novo pet
              </Button>
            )}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-[#f3f7f2] px-3 py-4 text-center dark:bg-emerald-950/45">
              <p className="text-2xl font-black text-emerald-950 dark:text-emerald-50">{pets.length}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-800/70 dark:text-emerald-200/75">pets</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-3 py-4 text-center dark:bg-sky-950/45">
              <p className="text-2xl font-black text-sky-950 dark:text-sky-50">{petsWithPhoto}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-sky-800/70 dark:text-sky-200/75">fotos</p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-3 py-4 text-center dark:bg-amber-950/45">
              <p className="text-2xl font-black text-amber-950 dark:text-amber-50">{petsWithNotes}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-amber-800/70 dark:text-amber-200/75">notas</p>
            </div>
          </div>
        </section>

        <TutorContextBanner context="pets" />

        {(showForm || editing) && (
          <Card className="mb-5 rounded-[1.5rem] border-slate-100 bg-white shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">
                {editing ? 'Editar perfil' : 'Novo perfil'}
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                Quanto mais completo o perfil, mais útil fica a rotina.
              </p>
            </div>
            <PetForm
              initial={editing ?? undefined}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </Card>
        )}

        {pets.length === 0 && !showForm ? (
          <section className="rounded-[1.5rem] border border-dashed border-emerald-900/20 bg-white/70 p-8 text-center shadow-xs dark:border-emerald-200/25 dark:bg-slate-900/80">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#edf3ec] text-4xl dark:bg-emerald-950/50">🐾</div>
            <h2 className="mt-5 font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">Nenhum pet cadastrado</h2>
            <p className="mx-auto mt-2 max-w-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              Comece criando um perfil simples. Depois você pode conectar cuidados, observações e lembretes.
            </p>
            <div className="mt-5">
              <Button onClick={() => setShowForm(true)}>Cadastrar pet</Button>
            </div>
          </section>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={setEditing}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
