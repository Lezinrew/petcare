import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const links = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/explore', label: 'Explorar', icon: '🔍' },
  { to: '/my-pets', label: 'Meu Pet', icon: '🐾' },
  { to: '/reminders', label: 'Lembretes', icon: '🔔' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/90 bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex justify-around px-2 py-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-xs transition-colors',
                isActive ? 'bg-primary-light font-semibold text-primary' : 'text-text-secondary hover:text-primary',
              )
            }
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
