import { PetProfile } from '../../types/pet';
import { speciesLabels } from '../../utils/labels';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type Props = {
  pet: PetProfile;
  onEdit: (pet: PetProfile) => void;
  onDelete: (id: string) => void;
};

export function PetCard({ pet, onEdit, onDelete }: Props) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{pet.name}</h3>
          <p className="text-sm text-text-secondary">{speciesLabels[pet.species]}</p>
        </div>
        <span className="text-3xl">🐾</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {pet.breedSlug && <Badge>{pet.breedSlug.replace(/-/g, ' ')}</Badge>}
        {pet.ageMonths != null && <Badge color="bg-slate-100 text-text-secondary">{pet.ageMonths} meses</Badge>}
        {pet.weightKg != null && <Badge color="bg-slate-100 text-text-secondary">{pet.weightKg} kg</Badge>}
      </div>
      {pet.notes && <p className="text-sm text-text-secondary">{pet.notes}</p>}
      <div className="flex gap-2 pt-1">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(pet)}>
          Editar
        </Button>
        <Button variant="danger-ghost" size="sm" onClick={() => pet.id && onDelete(pet.id)}>
          Excluir
        </Button>
      </div>
    </Card>
  );
}
