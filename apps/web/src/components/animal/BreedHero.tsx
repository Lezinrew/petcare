import { AnimalBreed } from '../../types/animal';
import { getSpeciesEmoji } from '../../utils/speciesEmoji';
import { AnimalImage } from './AnimalImage';
import { BreedQuickTags, BreedStatsBar } from './BreedStatsBar';

type Props = { breed: AnimalBreed };

export function BreedHero({ breed }: Props) {
  const emoji = getSpeciesEmoji(breed.species);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="grid md:grid-cols-[1fr,minmax(220px,42%)]">
        <div className="flex flex-col justify-center p-6 md:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-brand md:text-4xl">{breed.name}</h1>
          <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-text-secondary">
            {breed.shortDescription}
          </p>
          <div className="mt-5">
            <BreedQuickTags breed={breed} />
          </div>
        </div>

        <div className="relative min-h-[240px] bg-gradient-to-l from-card via-card/80 to-transparent md:min-h-[300px]">
          <AnimalImage
            src={breed.imageUrl}
            fallbackSrc={breed.placeholderUrl}
            alt={breed.imageAlt ?? breed.name}
            emojiFallback={emoji}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-cover object-center md:object-right"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent md:w-24" />
        </div>
      </div>

      <BreedStatsBar breed={breed} />

      {breed.imageCredit && (
        <p className="border-t border-border px-6 py-2 text-xs font-medium text-text-secondary md:px-8">
          {breed.imageCredit}
          {breed.imageSource ? ` · ${breed.imageSource}` : ''}
        </p>
      )}
    </section>
  );
}
