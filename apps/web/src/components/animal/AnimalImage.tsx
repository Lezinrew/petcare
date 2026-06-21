import { useState } from 'react';
import { cn } from '../../utils/cn';

export type AnimalImageProps = {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  emojiFallback?: string;
  imgClassName?: string;
};

type Stage = 'primary' | 'fallback' | 'emoji';

export function AnimalImage({
  src,
  fallbackSrc,
  alt,
  className,
  emojiFallback = '🐾',
  imgClassName,
}: AnimalImageProps) {
  const [stage, setStage] = useState<Stage>(src ? 'primary' : fallbackSrc ? 'fallback' : 'emoji');

  if (stage === 'emoji' || (!src && !fallbackSrc)) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-primary-light text-4xl',
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden>{emojiFallback}</span>
      </div>
    );
  }

  const currentSrc = stage === 'primary' ? src : fallbackSrc;

  return (
    <div className={cn('overflow-hidden bg-primary-light', className)}>
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover', imgClassName)}
        onError={() => {
          if (stage === 'primary' && fallbackSrc) {
            setStage('fallback');
          } else {
            setStage('emoji');
          }
        }}
      />
    </div>
  );
}
