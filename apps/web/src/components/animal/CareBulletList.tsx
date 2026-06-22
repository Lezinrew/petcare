import { ReactNode } from 'react';

type Item = { label: string; value: ReactNode };

type Props = {
  items: Item[];
};

export function CareBulletList({ items }: Props) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2.5 text-sm leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
          <span>
            <strong className="font-semibold text-text-primary">{item.label}:</strong>{' '}
            <span className="font-medium text-text-secondary">{item.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CareBulletPoints({ points }: { points: string[] }) {
  return (
    <ul className="space-y-1.5">
      {points.map((point) => (
        <li key={point} className="flex gap-2.5 text-sm leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
          <span className="font-medium text-text-secondary">{point}</span>
        </li>
      ))}
    </ul>
  );
}
