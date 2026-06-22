import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Props = HTMLAttributes<HTMLDivElement> & {
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
};

const paddingMap = { sm: 'p-3', md: 'p-4', lg: 'p-6' };

export function Card({ padding = 'md', interactive, className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card shadow-xs',
        paddingMap[padding],
        interactive && 'card-interactive',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
