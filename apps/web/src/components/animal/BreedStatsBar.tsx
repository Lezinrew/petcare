import { AnimalBreed } from '../../types/animal';
import { energyLabels, sizeLabels } from '../../utils/labels';

type Props = { breed: AnimalBreed };

const SUMMARY_ICONS: Record<string, string> = {
  Origem: '🌍',
  'Função original': '🛡️',
  'Expectativa de vida': '❤️',
};

export function BreedStatsBar({ breed }: Props) {
  const stats = [
    { label: 'Origem', value: breed.origin },
    { label: 'Função original', value: breed.originalFunction },
    { label: 'Expectativa de vida', value: breed.lifeExpectancy },
  ];

  return (
    <div className="grid gap-4 bg-primary px-5 py-5 text-white sm:grid-cols-3 md:px-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg">
            {SUMMARY_ICONS[stat.label]}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/75">{stat.label}</p>
            <p className="mt-0.5 text-sm font-semibold leading-snug">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BreedQuickTags({ breed }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-text-secondary">
        Porte: {sizeLabels[breed.size]}
      </span>
      <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-text-secondary">
        Energia: {energyLabels[breed.energyLevel]}
      </span>
      <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-text-secondary">
        {breed.apartmentFriendly ? 'Apartamento OK' : 'Espaço amplo'}
      </span>
    </div>
  );
}
