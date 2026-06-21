import { AnimalBreed } from '../../types/animal';
import { SpeciesRouteKey } from '../../config/species';
import { Badge } from '../ui/Badge';
import { ButtonLink } from '../ui/ButtonLink';
import { Card } from '../ui/Card';
import { energyLabels, sizeLabels } from '../../utils/labels';

type Props = { breed: AnimalBreed; routeKey?: SpeciesRouteKey };

export function BreedCard({ breed, routeKey = 'dogs' }: Props) {
  return (
    <Card className="flex h-full flex-col gap-3">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">{breed.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">{breed.shortDescription}</p>
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
      <ButtonLink
        to={`/${routeKey}/${breed.slug}`}
        variant="secondary"
        fullWidth
        className="mt-auto"
      >
        Ver cuidados
      </ButtonLink>
    </Card>
  );
}
