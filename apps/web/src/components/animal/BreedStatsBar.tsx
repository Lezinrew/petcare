import { AnimalBreed } from '../../types/animal';
import { energyLabels, sizeLabels } from '../../utils/labels';

type Props = { breed: AnimalBreed };

export function BreedStatsBar({ breed }: Props) {
  const stats = [
    { label: 'Origem', value: breed.origin },
    { label: 'Função', value: breed.originalFunction },
    { label: 'Vida', value: breed.lifeExpectancy },
    { label: 'Porte', value: sizeLabels[breed.size] },
    { label: 'Energia', value: energyLabels[breed.energyLevel] },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl bg-primary-light p-3 text-center">
          <p className="text-xs font-medium text-text-secondary">{stat.label}</p>
          <p className="mt-1 text-sm font-semibold text-primary">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
