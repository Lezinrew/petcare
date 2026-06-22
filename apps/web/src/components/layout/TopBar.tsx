import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { tutorDisplayName, useTutorProfile } from '../../contexts/TutorProfileContext';
import { cn } from '../../utils/cn';
import { TutorProfileIncompleteBadge } from '../tutor/TutorProfileIncompleteBadge';
import { ThemeToggle } from '../ui/ThemeToggle';

const navLinks = [
  { to: '/', label: 'Início', end: true },
  { to: '/explore', label: 'Explorar' },
  { to: '/dogs', label: 'Cães' },
  { to: '/my-pets', label: 'Meu Pet' },
  { to: '/profile', label: 'Perfil' },
  { to: '/reminders', label: 'Lembretes' },
  { to: '/adoption-match', label: 'Adoção' },
];

export function TopBar({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const { profile } = useTutorProfile();
  const isCarePage = ['/', '/my-pets', '/reminders', '/profile'].includes(pathname);
  const firstName = tutorDisplayName(profile);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur-md',
        isCarePage
          ? 'border-emerald-950/10 bg-[#fbfaf7]/95 text-emerald-950 dark:border-slate-700/80 dark:bg-slate-950/95 dark:text-emerald-50'
          : 'border-border bg-card/90',
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-105',
              isCarePage ? 'bg-emerald-950 text-white shadow-xs dark:bg-emerald-500/20 dark:text-emerald-100' : 'bg-primary-light',
            )}
          >
            🐾
          </span>
          <div className="min-w-0">
            <p className={cn('text-sm font-bold leading-tight', isCarePage ? 'text-emerald-950 dark:text-emerald-50' : 'text-brand')}>PetCare</p>
            <p className={cn('truncate text-xs font-medium leading-tight', isCarePage ? 'text-emerald-900/70 dark:text-emerald-200/70' : 'text-text-secondary')}>
              {firstName ? `Olá, ${firstName}` : 'Responsável'}
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <RouterNavLink
            to="/profile"
            title={firstName ? `Perfil de ${firstName}` : 'Meu perfil'}
            className={({ isActive }) =>
              cn(
                'relative inline-flex h-9 min-w-9 max-w-[5.5rem] items-center justify-center rounded-full px-2 text-sm font-bold transition-colors md:hidden',
                isCarePage
                  ? isActive
                    ? 'bg-emerald-900 text-white shadow-xs dark:bg-emerald-600'
                    : 'border border-emerald-950/10 bg-white/70 text-emerald-900 shadow-xs hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-100 dark:hover:bg-slate-800'
                  : isActive
                    ? 'bg-primary text-white'
                    : 'border border-border bg-card text-brand hover:bg-muted',
              )
            }
          >
            {firstName ? <span className="truncate text-xs">{firstName}</span> : '◎'}
            <TutorProfileIncompleteBadge profile={profile} variant="dot" />
          </RouterNavLink>
          <ThemeToggle
            className={cn(
              'md:hidden',
              isCarePage && 'h-9 w-9 rounded-full border-emerald-950/10 bg-white/70 p-0 text-emerald-900 shadow-xs hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-amber-200 dark:hover:bg-slate-800',
            )}
          />
          <nav className="hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isCarePage
                      ? isActive
                        ? 'bg-white font-semibold text-emerald-950 shadow-xs dark:bg-slate-800 dark:text-emerald-50'
                        : 'font-medium text-emerald-900/70 hover:bg-white/70 hover:text-emerald-950 dark:text-emerald-100/70 dark:hover:bg-slate-800 dark:hover:text-emerald-50'
                      : isActive
                        ? 'bg-primary-light font-semibold text-brand'
                        : 'font-medium text-text-secondary hover:bg-muted hover:text-brand',
                  )
                }
              >
                <span className="inline-flex items-center gap-1.5">
                  {link.label}
                  {link.to === '/profile' && <TutorProfileIncompleteBadge profile={profile} />}
                </span>
              </RouterNavLink>
            ))}
          </nav>
          <ThemeToggle
            className={cn(
              'hidden md:inline-flex',
              isCarePage && 'h-9 w-9 rounded-full border-emerald-950/10 bg-white/70 p-0 text-emerald-900 shadow-xs hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-amber-200 dark:hover:bg-slate-800',
            )}
          />
        </div>
      </div>
    </header>
  );
}
