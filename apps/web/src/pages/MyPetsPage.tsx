import { useCallback, useEffect, useState } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { PetCard } from '../components/pet/PetCard';
import { PetForm } from '../components/pet/PetForm';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
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

  return (
    <div className="page-container">
      <div className="mb-6 flex items-center justify-between">
        <PageHeader title="Meu Pet" subtitle="Cadastre seus pets e acompanhe informações básicas." />
        {!showForm && !editing && (
          <Button onClick={() => setShowForm(true)}>+ Novo pet</Button>
        )}
      </div>

      {(showForm || editing) && (
        <Card className="mb-6">
          <PetForm
            initial={editing ?? undefined}
            onSubmit={editing ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </Card>
      )}

      {pets.length === 0 && !showForm ? (
        <EmptyState
          title="Nenhum pet cadastrado"
          description="Cadastre seu primeiro pet para organizar cuidados e lembretes."
          action={<Button onClick={() => setShowForm(true)}>Cadastrar pet</Button>}
        />
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
  );
}
