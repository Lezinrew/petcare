import { AnimalBreed } from '../../types/animal';
import { energyLabels, sizeLabels } from '../../utils/labels';

type Props = { breed: AnimalBreed };

export function BreedHero({ breed }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-white md:p-8">
      <div className="absolute -right-4 -top-4 text-8xl opacity-20">🐕</div>
      <h1 className="text-2xl font-bold md:text-3xl">{breed.name}</h1>
      <p className="mt-3 max-w-xl text-primary-light">{breed.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{sizeLabels[breed.size]}</span>
        <span className="rounded-full bg-white/20 px-3 py-1 text-sm">{energyLabels[breed.energyLevel]}</span>
      </div>
    </div>
  );
}
