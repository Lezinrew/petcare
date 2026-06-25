import { PageViewModel } from './page-view.model';
import {
  AnalyticsSummary,
  AreaInsight,
  CountMetric,
  DeviceMetric,
  EngagementMetric,
  GeoMetric,
  LocaleMetric,
  PageMetric,
  PageView,
} from './analytics.types';

const ANALYTICS_TIMEZONE = 'America/Sao_Paulo';
const WEEKDAY_LABELS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

function toPageView(doc: Record<string, unknown>): PageView {
  return {
    id: String(doc._id),
    path: doc.path as string,
    title: doc.title as string | undefined,
    referrer: doc.referrer as string | undefined,
    externalReferrer: doc.externalReferrer as string | undefined,
    utmSource: doc.utmSource as string | undefined,
    utmMedium: doc.utmMedium as string | undefined,
    utmCampaign: doc.utmCampaign as string | undefined,
    speciesGroup: doc.speciesGroup as string | undefined,
    ipHash: doc.ipHash as string | undefined,
    countryCode: doc.countryCode as string | undefined,
    region: doc.region as string | undefined,
    city: doc.city as string | undefined,
    deviceType: doc.deviceType as PageView['deviceType'],
    browser: doc.browser as string | undefined,
    os: doc.os as string | undefined,
    locale: doc.locale as string | undefined,
    createdAt: (doc.createdAt as Date)?.toISOString(),
  };
}

function labelCountRows<T extends { _id: string; views: number }>(rows: T[]): CountMetric[] {
  return rows.map((row) => ({ label: row._id, views: row.views }));
}

function fillHourlyBreakdown(rows: CountMetric[]): CountMetric[] {
  const map = new Map(rows.map((row) => [row.label, row.views]));
  return Array.from({ length: 24 }, (_, hour) => ({
    label: String(hour).padStart(2, '0'),
    views: map.get(String(hour)) ?? 0,
  }));
}

function fillWeekdayBreakdown(rows: CountMetric[]): CountMetric[] {
  const map = new Map(rows.map((row) => [Number(row.label), row.views]));
  return WEEKDAY_LABELS.map((label, index) => ({
    label,
    views: map.get(index + 1) ?? 0,
  }));
}

export class AnalyticsRepository {
  async createPageView(data: Omit<PageView, 'id' | 'createdAt'>): Promise<PageView> {
    const doc = await PageViewModel.create(data);
    return toPageView(doc.toObject() as unknown as Record<string, unknown>);
  }

  async getEngagementMetrics(totalViews: number): Promise<EngagementMetric> {
    const [uniqueVisitors, sessionRows] = await Promise.all([
      PageViewModel.distinct('ipHash', { ipHash: { $exists: true, $nin: [null, ''] } }).then(
        (values) => values.length,
      ),
      PageViewModel.aggregate<{ sessions: number }>([
        { $match: { ipHash: { $exists: true, $nin: [null, ''] } } },
        {
          $group: {
            _id: {
              ipHash: '$ipHash',
              sessionBucket: {
                $dateTrunc: {
                  date: '$createdAt',
                  unit: 'minute',
                  binSize: 30,
                  timezone: ANALYTICS_TIMEZONE,
                },
              },
            },
          },
        },
        { $count: 'sessions' },
      ]),
    ]);

    const estimatedSessions = sessionRows[0]?.sessions ?? 0;
    const avgPagesPerSession =
      estimatedSessions > 0 ? Math.round((totalViews / estimatedSessions) * 10) / 10 : 0;

    return { uniqueVisitors, estimatedSessions, avgPagesPerSession };
  }

  async getSummary(limit: number): Promise<AnalyticsSummary> {
    const totalViews = await PageViewModel.countDocuments();

    const [
      uniquePages,
      topPages,
      recentViews,
      geoByCountry,
      areaInsights,
      deviceBreakdown,
      localeBreakdown,
      osBreakdown,
      hourlyBreakdown,
      weekdayBreakdown,
      speciesBreakdown,
      externalReferrerBreakdown,
      utmSourceBreakdown,
      utmCampaignBreakdown,
      engagement,
    ] = await Promise.all([
      PageViewModel.distinct('path').then((paths) => paths.length),
      PageViewModel.aggregate<PageMetric>([
        {
          $group: {
            _id: '$path',
            views: { $sum: 1 },
            title: { $last: '$title' },
            lastViewedAt: { $max: '$createdAt' },
          },
        },
        { $sort: { views: -1, lastViewedAt: -1 } },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            path: '$_id',
            title: 1,
            views: 1,
            lastViewedAt: {
              $dateToString: {
                date: '$lastViewedAt',
                format: '%Y-%m-%dT%H:%M:%S.%LZ',
                timezone: 'UTC',
              },
            },
          },
        },
      ]),
      PageViewModel.find().sort({ createdAt: -1 }).limit(10).lean(),
      PageViewModel.aggregate<GeoMetric>([
        { $match: { countryCode: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$countryCode', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
        { $project: { _id: 0, countryCode: '$_id', views: 1 } },
      ]),
      PageViewModel.aggregate<AreaInsight>([
        { $match: { countryCode: { $exists: true, $nin: [null, ''] } } },
        {
          $group: {
            _id: {
              countryCode: '$countryCode',
              region: { $ifNull: ['$region', ''] },
              path: '$path',
            },
            views: { $sum: 1 },
            title: { $last: '$title' },
          },
        },
        { $sort: { views: -1 } },
        {
          $group: {
            _id: { countryCode: '$_id.countryCode', region: '$_id.region' },
            views: { $sum: '$views' },
            topPages: { $push: { path: '$_id.path', title: '$title', views: '$views' } },
          },
        },
        {
          $project: {
            _id: 0,
            countryCode: '$_id.countryCode',
            region: { $cond: [{ $eq: ['$_id.region', ''] }, '$$REMOVE', '$_id.region'] },
            views: 1,
            topPages: { $slice: ['$topPages', 5] },
          },
        },
        { $sort: { views: -1 } },
        { $limit: limit },
      ]),
      PageViewModel.aggregate<DeviceMetric>([
        { $group: { _id: { $ifNull: ['$deviceType', 'unknown'] }, views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $project: { _id: 0, deviceType: '$_id', views: 1 } },
      ]),
      PageViewModel.aggregate<LocaleMetric>([
        { $match: { locale: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$locale', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
        { $project: { _id: 0, locale: '$_id', views: 1 } },
      ]),
      PageViewModel.aggregate<{ _id: string; views: number }>([
        { $match: { os: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$os', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
      ]).then(labelCountRows),
      PageViewModel.aggregate<{ _id: number; views: number }>([
        {
          $group: {
            _id: { $hour: { date: '$createdAt', timezone: ANALYTICS_TIMEZONE } },
            views: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
        .then((rows) => labelCountRows(rows.map((row) => ({ _id: String(row._id), views: row.views }))))
        .then(fillHourlyBreakdown),
      PageViewModel.aggregate<{ _id: number; views: number }>([
        {
          $group: {
            _id: { $dayOfWeek: { date: '$createdAt', timezone: ANALYTICS_TIMEZONE } },
            views: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
        .then((rows) => labelCountRows(rows.map((row) => ({ _id: String(row._id), views: row.views }))))
        .then(fillWeekdayBreakdown),
      PageViewModel.aggregate<{ _id: string; views: number }>([
        { $match: { speciesGroup: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$speciesGroup', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
      ]).then(labelCountRows),
      PageViewModel.aggregate<{ _id: string; views: number }>([
        { $match: { externalReferrer: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$externalReferrer', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
      ]).then(labelCountRows),
      PageViewModel.aggregate<{ _id: string; views: number }>([
        { $match: { utmSource: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$utmSource', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
      ]).then(labelCountRows),
      PageViewModel.aggregate<{ _id: string; views: number }>([
        { $match: { utmCampaign: { $exists: true, $nin: [null, ''] } } },
        { $group: { _id: '$utmCampaign', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
      ]).then(labelCountRows),
      this.getEngagementMetrics(totalViews),
    ]);

    return {
      totalViews,
      uniquePages,
      engagement,
      topPages,
      recentViews: recentViews.map((view) => toPageView(view as Record<string, unknown>)),
      geoByCountry,
      areaInsights,
      deviceBreakdown,
      localeBreakdown,
      osBreakdown,
      hourlyBreakdown,
      weekdayBreakdown,
      speciesBreakdown,
      externalReferrerBreakdown,
      utmSourceBreakdown,
      utmCampaignBreakdown,
    };
  }
}

export const analyticsRepository = new AnalyticsRepository();
