import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  PrivacyConsentStatus,
  readPrivacyConsent,
  writePrivacyConsent,
} from '../utils/privacyConsent';

type PrivacyConsentContextValue = {
  status: PrivacyConsentStatus;
  hasConsent: boolean;
  accept: () => void;
  reject: () => void;
};

const PrivacyConsentContext = createContext<PrivacyConsentContextValue | null>(null);

export function PrivacyConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<PrivacyConsentStatus>(() => readPrivacyConsent());

  const accept = useCallback(() => {
    writePrivacyConsent('accepted');
    setStatus('accepted');
  }, []);

  const reject = useCallback(() => {
    writePrivacyConsent('rejected');
    setStatus('rejected');
  }, []);

  const value = useMemo(
    () => ({
      status,
      hasConsent: status === 'accepted',
      accept,
      reject,
    }),
    [status, accept, reject],
  );

  return <PrivacyConsentContext.Provider value={value}>{children}</PrivacyConsentContext.Provider>;
}

export function usePrivacyConsent() {
  const context = useContext(PrivacyConsentContext);
  if (!context) {
    throw new Error('usePrivacyConsent deve ser usado dentro de PrivacyConsentProvider');
  }
  return context;
}
