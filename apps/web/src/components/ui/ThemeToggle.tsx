import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

type Props = {
  className?: string;
  showLabel?: boolean;
};

export function ThemeToggle({ className, showLabel }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card p-2 text-sm font-medium text-text-secondary transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
        showLabel && 'px-3',
        className,
      )}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Modo claro' : 'Modo escuro'}
    >
      <span className="text-base leading-none" aria-hidden>
        {isDark ? '☀️' : '🌙'}
      </span>
      {showLabel && <span>{isDark ? 'Claro' : 'Escuro'}</span>}
    </button>
  );
}
