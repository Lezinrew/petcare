import { Outlet, useLocation } from 'react-router-dom';
import { TutorProfileProvider } from '../../contexts/TutorProfileContext';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

export function AppShell() {
  const { pathname } = useLocation();
  const hideTopBarOnMobile = pathname === '/explore';

  return (
    <TutorProfileProvider>
      <div className="min-h-screen bg-surface">
        <TopBar className={hideTopBarOnMobile ? 'hidden md:block' : undefined} />
        <main>
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </TutorProfileProvider>
  );
}
