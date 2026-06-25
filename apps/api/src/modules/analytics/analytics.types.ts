import { DeviceType } from '../../utils/userAgent';

export interface PageView {
  id?: string;
  path: string;
  title?: string;
  referrer?: string;
  externalReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  speciesGroup?: string;
  ipHash?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  deviceType?: DeviceType;
  browser?: string;
  os?: string;
  locale?: string;
  createdAt?: string;
}

export interface PageMetric {
  path: string;
  title?: string;
  views: number;
  lastViewedAt?: string;
}

export interface GeoMetric {
  countryCode: string;
  region?: string;
  views: number;
}

export interface AreaInsight {
  countryCode: string;
  region?: string;
  views: number;
  topPages: PageMetric[];
}

export interface DeviceMetric {
  deviceType: DeviceType;
  views: number;
}

export interface LocaleMetric {
  locale: string;
  views: number;
}

export interface CountMetric {
  label: string;
  views: number;
}

export interface EngagementMetric {
  uniqueVisitors: number;
  estimatedSessions: number;
  avgPagesPerSession: number;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniquePages: number;
  engagement: EngagementMetric;
  topPages: PageMetric[];
  recentViews: PageView[];
  geoByCountry: GeoMetric[];
  areaInsights: AreaInsight[];
  deviceBreakdown: DeviceMetric[];
  localeBreakdown: LocaleMetric[];
  osBreakdown: CountMetric[];
  hourlyBreakdown: CountMetric[];
  weekdayBreakdown: CountMetric[];
  speciesBreakdown: CountMetric[];
  externalReferrerBreakdown: CountMetric[];
  utmSourceBreakdown: CountMetric[];
  utmCampaignBreakdown: CountMetric[];
}

export interface TrackPageViewInput {
  path: string;
  title?: string;
  referrer?: string;
  externalReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}
