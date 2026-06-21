import { Link } from 'react-router-dom';

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <div>
            <p className="text-sm font-bold text-primary leading-tight">PetCare</p>
            <p className="text-xs text-text-secondary leading-tight">Responsável</p>
          </div>
        </Link>
        <nav className="hidden gap-4 md:flex">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/explore">Explorar</NavLink>
          <NavLink to="/dogs">Cães</NavLink>
          <NavLink to="/my-pets">Meu Pet</NavLink>
          <NavLink to="/reminders">Lembretes</NavLink>
          <NavLink to="/adoption-match">Adoção</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm font-medium text-text-secondary hover:text-primary">
      {children}
    </Link>
  );
}
