import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/dogs', label: 'Cães', icon: '🐕' },
  { to: '/my-pets', label: 'Meu Pet', icon: '🐾' },
  { to: '/reminders', label: 'Lembretes', icon: '🔔' },
  { to: '/adoption-match', label: 'Adoção', icon: '❤️' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <div className="flex justify-around py-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${isActive ? 'text-primary font-semibold' : 'text-text-secondary'}`
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
