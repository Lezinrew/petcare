import { SPECIES_ROUTE_MAP } from '../data/allBreeds';

const SPECIES_ROUTE_KEYS = new Set(Object.keys(SPECIES_ROUTE_MAP));

export function normalizeAnalyticsPath(path: string): string {
  const withoutQuery = path.split('?')[0]?.split('#')[0] ?? path;
  if (!withoutQuery.startsWith('/')) return `/${withoutQuery}`;
  return withoutQuery || '/';
}

export function deriveSpeciesGroup(pathname: string): string | undefined {
  const segment = normalizeAnalyticsPath(pathname).split('/').filter(Boolean)[0];
  if (!segment || !SPECIES_ROUTE_KEYS.has(segment)) return undefined;
  return segment;
}

export function parseUtmParams(search: string): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
} {
  const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
  const utmSource = params.get('utm_source')?.trim().slice(0, 120) || undefined;
  const utmMedium = params.get('utm_medium')?.trim().slice(0, 120) || undefined;
  const utmCampaign = params.get('utm_campaign')?.trim().slice(0, 120) || undefined;
  return { utmSource, utmMedium, utmCampaign };
}

export function sanitizeExternalReferrer(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value).hostname.slice(0, 120);
  } catch {
    return value.slice(0, 120);
  }
}
