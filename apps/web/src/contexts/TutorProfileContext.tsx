import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { fetchTutorProfile } from '../services/tutorProfile.service';
import { TutorProfile } from '../types/tutorProfile';

type TutorProfileContextValue = {
  profile: TutorProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  setProfile: (profile: TutorProfile) => void;
};

const TutorProfileContext = createContext<TutorProfileContextValue | null>(null);

export function TutorProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setProfile(await fetchTutorProfile());
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ profile, loading, refresh, setProfile }),
    [profile, loading, refresh],
  );

  return <TutorProfileContext.Provider value={value}>{children}</TutorProfileContext.Provider>;
}

export function useTutorProfile(): TutorProfileContextValue {
  const context = useContext(TutorProfileContext);
  if (!context) {
    throw new Error('useTutorProfile deve ser usado dentro de TutorProfileProvider');
  }
  return context;
}

export function tutorDisplayName(profile: TutorProfile | null): string | null {
  const name = profile?.name?.trim();
  if (!name) return null;
  return name.split(/\s+/)[0] ?? name;
}
