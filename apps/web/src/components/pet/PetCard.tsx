import { PetProfile } from '../../types/pet';
import { speciesLabels } from '../../utils/labels';
import { getSpeciesEmoji } from '../../utils/speciesEmoji';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type Props = {
  pet: PetProfile;
  onEdit: (pet: PetProfile) => void;
  onDelete: (id: string) => void;
};

export function PetCard({ pet, onEdit, onDelete }: Props) {
  const emoji = pet.species === 'other' ? '🐾' : getSpeciesEmoji(pet.species);
  const details = [
    pet.ageMonths != null ? `${pet.ageMonths} meses` : null,
    pet.weightKg != null ? `${pet.weightKg} kg` : null,
    pet.neutered ? 'Castrado' : null,
  ].filter(Boolean);

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-card dark:border-slate-700/80 dark:bg-slate-900/90">
      <div className="flex gap-4 p-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#edf3ec] dark:bg-emerald-950/45">
          {pet.photoUrl ? (
            <img src={pet.photoUrl} alt={pet.name} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-4xl">{emoji}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-2xl font-bold text-emerald-950 dark:text-emerald-50">{pet.name}</h3>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{speciesLabels[pet.species]}</p>
            </div>
            <Badge color="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100">{emoji}</Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {pet.breedSlug && <Badge color="bg-[#f3f7f2] text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">{pet.breedSlug.replace(/-/g, ' ')}</Badge>}
            {details.map((detail) => (
              <Badge key={detail} color="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{detail}</Badge>
            ))}
          </div>
        </div>
      </div>
      {pet.notes && (
        <p className="border-t border-slate-100 px-4 py-3 text-sm font-medium leading-relaxed text-slate-600 dark:border-slate-700/80 dark:text-slate-300">
          {pet.notes}
        </p>
      )}
      <div className="flex gap-2 border-t border-slate-100 bg-slate-50/70 p-3 dark:border-slate-700/80 dark:bg-slate-950/45">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(pet)}>
          Editar
        </Button>
        <Button variant="danger-ghost" size="sm" onClick={() => pet.id && onDelete(pet.id)}>
          Excluir
        </Button>
      </div>
    </article>
  );
}
