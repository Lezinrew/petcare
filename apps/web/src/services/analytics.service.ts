import { AnalyticsSummary, TrackPageViewOptions } from '../types/analytics';
import { getAdminToken } from './adminAuth.service';
import { apiGet, apiPost } from './api';

export function trackPageView(
  path: string,
  title?: string,
  referrer?: string,
  options?: TrackPageViewOptions,
) {
  return apiPost('/analytics/page-view', {
    path,
    title,
    referrer,
    ...options,
  });
}

export function fetchAnalyticsSummary() {
  const token = getAdminToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiGet<AnalyticsSummary>('/analytics/summary', undefined, headers);
}
