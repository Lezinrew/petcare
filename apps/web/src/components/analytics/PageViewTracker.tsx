import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { usePrivacyConsent } from '../../contexts/PrivacyConsentContext';
import { trackPageView } from '../../services/analytics.service';

function getExternalReferrer(): string | undefined {
  const ref = document.referrer;
  if (!ref) return undefined;

  try {
    const host = new URL(ref).hostname;
    if (host === window.location.hostname) return undefined;
    return host;
  } catch {
    return undefined;
  }
}

function getUtmParams(search: string) {
  const params = new URLSearchParams(search);
  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  };
}

export function PageViewTracker() {
  const location = useLocation();
  const previousPath = useRef<string>();
  const { hasConsent } = usePrivacyConsent();

  useEffect(() => {
    if (!hasConsent) return;

    const path = `${location.pathname}${location.search}`;
    const referrer = previousPath.current;
    previousPath.current = path;
    const utm = getUtmParams(location.search);

    const timer = window.setTimeout(() => {
      void trackPageView(path, document.title, referrer, {
        externalReferrer: getExternalReferrer(),
        utmSource: utm.utmSource,
        utmMedium: utm.utmMedium,
        utmCampaign: utm.utmCampaign,
      }).catch(() => {
        // Analytics must never block navigation or show user-facing errors.
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search, hasConsent]);

  return null;
}
