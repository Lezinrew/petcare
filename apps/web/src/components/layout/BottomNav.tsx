import { NavLink, useLocation } from 'react-router-dom';
import { useTutorProfile } from '../../contexts/TutorProfileContext';
import { cn } from '../../utils/cn';
import { TutorProfileIncompleteBadge } from '../tutor/TutorProfileIncompleteBadge';
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-8.5z" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" strokeLinecap="round" />
    </svg>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <ellipse cx="8" cy="8" rx="2.2" ry="2.6" />
      <ellipse cx="12" cy="6" rx="2.2" ry="2.6" />
      <ellipse cx="16" cy="8" rx="2.2" ry="2.6" />
      <ellipse cx="12" cy="14" rx="4" ry="3.2" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20a2 2 0 004 0" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
    </svg>
  );
}

const links = [
  { to: '/', label: 'Início', Icon: HomeIcon, end: true },
  { to: '/explore', label: 'Explorar', Icon: SearchIcon },
  { to: '/my-pets', label: 'Pet', Icon: PawIcon },
  { to: '/profile', label: 'Perfil', Icon: UserIcon },
  { to: '/reminders', label: 'Alertas', Icon: BellIcon },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const { profile } = useTutorProfile();
  const isExplore = pathname === '/explore';
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 border-t px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden',
        isExplore
          ? 'border-[#ece7dd] bg-white/95 dark:border-slate-700/80 dark:bg-slate-950/95'
          : 'border-border/80 bg-card/95',
      )}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-1">
        {links.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'relative flex flex-1 items-center justify-center rounded-full py-2 text-xs font-semibold transition-all duration-200',
                isActive
                  ? 'flex-row gap-1.5 bg-forest px-3 text-white shadow-soft'
                  : cn(
                      'flex-col gap-0.5 px-1',
                      isExplore ? 'text-[#083f31]/75 dark:text-emerald-100/75' : 'text-forest/75 dark:text-forest-light/75',
                    ),
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-white' : '')} />
                <span className="truncate leading-tight">{label}</span>
                {to === '/profile' && (
                  <TutorProfileIncompleteBadge profile={profile} variant="dot" className="right-2 top-1" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
