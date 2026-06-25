export const PRIVACY_CONSENT_KEY = 'petcare-analytics-consent';

export type PrivacyConsentStatus = 'pending' | 'accepted' | 'rejected';

export function readPrivacyConsent(): PrivacyConsentStatus {
  if (typeof window === 'undefined') return 'pending';

  const stored = localStorage.getItem(PRIVACY_CONSENT_KEY);
  if (stored === 'accepted' || stored === 'rejected') return stored;
  return 'pending';
}

export function writePrivacyConsent(status: Exclude<PrivacyConsentStatus, 'pending'>): void {
  localStorage.setItem(PRIVACY_CONSENT_KEY, status);
}

export function hasAnalyticsConsent(): boolean {
  return readPrivacyConsent() === 'accepted';
}
