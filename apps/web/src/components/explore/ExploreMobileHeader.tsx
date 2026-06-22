import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

const menuLinks = [
  { to: '/', label: 'Início' },
  { to: '/explore', label: 'Explorar' },
  { to: '/dogs', label: 'Cães' },
  { to: '/my-pets', label: 'Meu Pet' },
  { to: '/reminders', label: 'Lembretes' },
  { to: '/adoption-match', label: 'Adoção' },
];

export function ExploreMobileHeader({ variant = 'default' }: { variant?: 'default' | 'light' }) {
  const [open, setOpen] = useState(false);
  const isLight = variant === 'light';

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="mb-5 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            isLight ? 'text-[#083f31] hover:bg-[#eef3ea] dark:text-emerald-100 dark:hover:bg-slate-800' : 'text-forest hover:bg-forest/10 dark:text-forest-light'
          }`}
          aria-label="Abrir menu"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>

        <Link
          to="/reminders"
          className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            isLight ? 'text-[#083f31] hover:bg-[#eef3ea] dark:text-emerald-100 dark:hover:bg-slate-800' : 'text-forest hover:bg-forest/10 dark:text-forest-light'
          }`}
          aria-label="Lembretes"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 20a2 2 0 004 0" strokeLinecap="round" />
          </svg>
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#39b882] ring-2 ring-[#fbfaf7] dark:ring-slate-950" />
        </Link>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-forest-dark/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          />
          <nav className="absolute left-0 top-0 flex h-full w-[min(18rem,85vw)] flex-col bg-card p-5 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-lg font-semibold text-forest dark:text-forest-light">PetCare</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-text-secondary hover:bg-muted"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-1">
              {menuLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 font-medium text-text-secondary transition-colors hover:bg-forest/10 hover:text-forest dark:hover:text-forest-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-border pt-4">
              <ThemeToggle showLabel className="w-full justify-start border-0 bg-transparent px-3" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
