import { useState } from 'react';
import { AnimalBreed } from '../../types/animal';
import { energyLabels, sizeLabels } from '../../utils/labels';
import { getSpeciesEmoji } from '../../utils/speciesEmoji';

type Props = { breed: AnimalBreed };

export function BreedHero({ breed }: Props) {
  const [imageError, setImageError] = useState(false);
  const emoji = getSpeciesEmoji(breed.species);
  const showImage = breed.imageUrl && !imageError;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-2xl font-bold md:text-3xl">{breed.name}</h1>
          <p className="mt-3 text-primary-light">{breed.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{sizeLabels[breed.size]}</span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{energyLabels[breed.energyLevel]}</span>
          </div>
        </div>
        <div className="relative z-10 flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/15 md:h-32 md:w-32">
          {showImage ? (
            <img
              src={breed.imageUrl}
              alt={breed.name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-5xl" aria-hidden>{emoji}</span>
          )}
        </div>
      </div>
      {!showImage && (
        <div className="pointer-events-none absolute -right-4 -top-4 text-8xl opacity-10">{emoji}</div>
      )}
    </div>
  );
}
