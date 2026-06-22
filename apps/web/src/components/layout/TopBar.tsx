import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { ThemeToggle } from '../ui/ThemeToggle';

const navLinks = [
  { to: '/', label: 'Início', end: true },
  { to: '/explore', label: 'Explorar' },
  { to: '/dogs', label: 'Cães' },
  { to: '/my-pets', label: 'Meu Pet' },
  { to: '/reminders', label: 'Lembretes' },
  { to: '/adoption-match', label: 'Adoção' },
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-xl transition-transform group-hover:scale-105">
            🐾
          </span>
          <div>
            <p className="text-sm font-bold leading-tight text-primary">PetCare</p>
            <p className="text-xs leading-tight text-text-secondary">Responsável</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle className="md:hidden" />
          <nav className="hidden gap-1 md:flex">
          {navLinks.map((link) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-text-secondary hover:bg-muted hover:text-primary',
                )
              }
            >
              {link.label}
            </RouterNavLink>
          ))}
          </nav>
          <ThemeToggle className="hidden md:inline-flex" />
        </div>
      </div>
    </header>
  );
}
