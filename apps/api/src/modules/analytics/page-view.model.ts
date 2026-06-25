import { Schema, model, Document } from 'mongoose';
import { PageView } from './analytics.types';

const pageViewSchema = new Schema(
  {
    path: { type: String, required: true, index: true },
    title: { type: String },
    referrer: { type: String },
    externalReferrer: { type: String, index: true },
    utmSource: { type: String, index: true },
    utmMedium: { type: String },
    utmCampaign: { type: String, index: true },
    speciesGroup: { type: String, index: true },
    ipHash: { type: String, index: true },
    countryCode: { type: String, index: true },
    region: { type: String },
    city: { type: String },
    deviceType: { type: String, enum: ['mobile', 'tablet', 'desktop', 'unknown'], index: true },
    browser: { type: String },
    os: { type: String, index: true },
    locale: { type: String },
  },
  { timestamps: true },
);

pageViewSchema.index({ createdAt: -1 });
pageViewSchema.index({ path: 1, createdAt: -1 });
pageViewSchema.index({ countryCode: 1, region: 1, createdAt: -1 });

export type PageViewDocument = Document & PageView;

export const PageViewModel = model<PageViewDocument>('PageView', pageViewSchema);
