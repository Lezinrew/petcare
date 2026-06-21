import { Link } from 'react-router-dom';
import { AnimalBreed } from '../../types/animal';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { energyLabels, sizeLabels } from '../../utils/labels';

type Props = { breed: AnimalBreed };

export function BreedCard({ breed }: Props) {
  return (
    <Card className="flex flex-col gap-3">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">{breed.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-text-secondary">{breed.shortDescription}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>{sizeLabels[breed.size]}</Badge>
        <Badge color="bg-orange-100 text-exercise">{energyLabels[breed.energyLevel]}</Badge>
        <Badge color={breed.apartmentFriendly ? 'bg-green-100 text-feeding' : 'bg-red-100 text-health'}>
          Apt: {breed.apartmentFriendly ? 'Sim' : 'Não'}
        </Badge>
        <Badge color={breed.goodWithChildren ? 'bg-green-100 text-feeding' : 'bg-slate-100 text-text-secondary'}>
          Crianças: {breed.goodWithChildren ? 'Sim' : 'Não'}
        </Badge>
      </div>
      <Link to={`/dogs/${breed.slug}`}>
        <Button fullWidth variant="secondary">
          Ver cuidados
        </Button>
      </Link>
    </Card>
  );
}
