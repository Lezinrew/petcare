import { AnimalBreed } from '../../types/animal';
import { SpeciesRouteKey } from '../../config/species';
import { getBreedCardMeta } from '../../utils/speciesCareSections';
import { getSpeciesEmoji } from '../../utils/speciesEmoji';
import { Badge } from '../ui/Badge';
import { ButtonLink } from '../ui/ButtonLink';
import { Card } from '../ui/Card';
import { AnimalImage } from './AnimalImage';

type Props = { breed: AnimalBreed; routeKey?: SpeciesRouteKey };

export function BreedCard({ breed, routeKey = 'dogs' }: Props) {
  const meta = getBreedCardMeta(breed);

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <AnimalImage
        src={breed.imageUrl}
        fallbackSrc={breed.placeholderUrl}
        alt={breed.imageAlt ?? breed.name}
        emojiFallback={getSpeciesEmoji(breed.species)}
        className="aspect-[4/3] w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{breed.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {breed.shortDescription}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{meta.primary}</Badge>
          <Badge color="bg-orange-100 text-exercise">{meta.secondary}</Badge>
          <Badge color="bg-slate-100 text-text-secondary">{meta.tertiary}</Badge>
          {meta.beginnerFriendly && (
            <Badge color="bg-green-100 text-feeding">Iniciantes</Badge>
          )}
        </div>
        <ButtonLink
          to={`/${routeKey}/${breed.slug}`}
          variant="secondary"
          fullWidth
          className="mt-auto"
        >
          Ver cuidados
        </ButtonLink>
      </div>
    </Card>
  );
}
