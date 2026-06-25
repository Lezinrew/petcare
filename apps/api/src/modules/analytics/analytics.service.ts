import { z } from 'zod';
import {
  deriveSpeciesGroup,
  normalizeAnalyticsPath,
  parseUtmParams,
  sanitizeExternalReferrer,
} from '../../utils/analyticsPath';
import { VisitorContext } from '../../utils/visitorContext';
import { analyticsRepository } from './analytics.repository';
import { AnalyticsSummary, PageView, TrackPageViewInput } from './analytics.types';

const trackPageViewSchema = z.object({
  path: z.string().min(1).max(500),
  title: z.string().max(160).optional(),
  referrer: z.string().max(500).optional(),
  externalReferrer: z.string().max(200).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
});

function enrichPageViewInput(input: TrackPageViewInput): Omit<PageView, 'id' | 'createdAt'> {
  const rawPath = input.path;
  const queryIndex = rawPath.indexOf('?');
  const pathname = normalizeAnalyticsPath(queryIndex >= 0 ? rawPath.slice(0, queryIndex) : rawPath);
  const query = queryIndex >= 0 ? rawPath.slice(queryIndex) : '';
  const utmFromQuery = parseUtmParams(query);

  return {
    path: pathname,
    title: input.title,
    referrer: input.referrer ? normalizeAnalyticsPath(input.referrer.split('?')[0] ?? input.referrer) : undefined,
    externalReferrer: sanitizeExternalReferrer(input.externalReferrer),
    utmSource: input.utmSource ?? utmFromQuery.utmSource,
    utmMedium: input.utmMedium ?? utmFromQuery.utmMedium,
    utmCampaign: input.utmCampaign ?? utmFromQuery.utmCampaign,
    speciesGroup: deriveSpeciesGroup(pathname),
  };
}

export class AnalyticsService {
  async trackPageView(input: TrackPageViewInput, visitor: VisitorContext): Promise<PageView> {
    const data = trackPageViewSchema.parse(input);
    const enriched = enrichPageViewInput(data);

    return analyticsRepository.createPageView({
      ...enriched,
      ...visitor,
    });
  }

  async getSummary(): Promise<AnalyticsSummary> {
    return analyticsRepository.getSummary(10);
  }
}

export const analyticsService = new AnalyticsService();
