import { AnimalBreed } from '../../types/animal';
import { getSpeciesLabel } from '../../utils/speciesCareSections';
import { energyLabels, sizeLabels } from '../../utils/labels';
import { getSpeciesEmoji } from '../../utils/speciesEmoji';
import { AnimalImage } from './AnimalImage';

type Props = { breed: AnimalBreed };

export function BreedHero({ breed }: Props) {
  const emoji = getSpeciesEmoji(breed.species);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="grid md:grid-cols-[1fr,280px]">
        <AnimalImage
          src={breed.imageUrl}
          fallbackSrc={breed.placeholderUrl}
          alt={breed.imageAlt ?? breed.name}
          emojiFallback={emoji}
          className="aspect-[16/10] min-h-[200px] w-full md:aspect-auto md:min-h-[280px]"
          imgClassName="object-cover"
        />
        <div className="flex flex-col justify-center bg-gradient-to-br from-primary to-primary-dark p-6 text-white md:p-8">
          <p className="text-sm font-medium text-primary-light/90">{getSpeciesLabel(breed.species)}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{breed.name}</h1>
          <p className="mt-3 leading-relaxed text-primary-light/95">{breed.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{sizeLabels[breed.size]}</span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{energyLabels[breed.energyLevel]}</span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">
              {breed.apartmentFriendly ? 'Indoor OK' : 'Espaço amplo'}
            </span>
          </div>
          {breed.imageCredit && (
            <p className="mt-4 text-xs text-primary-light/70">
              {breed.imageCredit}
              {breed.imageSource ? ` · ${breed.imageSource}` : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
