import { cn } from '../../utils/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outline-accent'
  | 'ghost'
  | 'ghost-primary'
  | 'danger'
  | 'danger-ghost'
  | 'inverse'
  | 'glass';

export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-lg px-3.5 text-xs',
  md: 'h-10 rounded-xl px-4 text-sm',
  lg: 'h-11 rounded-xl px-5 text-sm',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-md',
  secondary:
    'border border-primary/10 bg-primary-light text-primary hover:border-primary/20 hover:bg-primary-light/80',
  outline:
    'border border-slate-200/90 bg-white text-text-secondary shadow-xs hover:border-primary/30 hover:bg-surface hover:text-primary',
  'outline-accent':
    'border border-primary/20 bg-primary-light/60 text-primary hover:border-primary/35 hover:bg-primary-light',
  ghost: 'text-text-secondary hover:bg-slate-100 hover:text-primary',
  'ghost-primary': 'text-primary hover:bg-primary-light',
  danger: 'bg-health text-white shadow-soft hover:bg-health/90',
  'danger-ghost': 'text-health hover:bg-health/10',
  inverse: 'bg-white text-primary shadow-md hover:bg-primary-light hover:shadow-lg',
  glass:
    'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/20',
};

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth?: boolean,
  className?: string,
): string {
  return cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className);
}
