import { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  padding?: 'sm' | 'md' | 'lg';
};

const paddingMap = { sm: 'p-3', md: 'p-4', lg: 'p-6' };

export function Card({ padding = 'md', className = '', children, ...props }: Props) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${paddingMap[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
