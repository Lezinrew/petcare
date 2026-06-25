import { createHash } from 'crypto';
import { Request } from 'express';
import { DeviceType, parseBrowser, parseDeviceType, parseLocale, parseOs } from './userAgent';

export interface VisitorContext {
  ipHash?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  deviceType?: DeviceType;
  browser?: string;
  os?: string;
  locale?: string;
}
function getClientIp(req: Request): string | undefined {
  const forwarded = req.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim();
  }

  return req.get('x-real-ip') || req.socket.remoteAddress || undefined;
}

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

function firstHeader(req: Request, ...names: string[]): string | undefined {
  for (const name of names) {
    const value = req.get(name)?.trim();
    if (value) return value;
  }
  return undefined;
}

function normalizeCountryCode(value?: string): string | undefined {
  if (!value) return undefined;
  const code = value.trim().toUpperCase();
  if (code.length !== 2 || code === 'XX' || code === 'T1') return undefined;
  return code;
}

export function extractVisitorContext(req: Request): VisitorContext {
  const userAgent = req.get('user-agent');
  const ip = getClientIp(req);

  return {
    ipHash: ip ? hashIp(ip) : undefined,
    countryCode: normalizeCountryCode(
      firstHeader(
        req,
        'cf-ipcountry',
        'x-vercel-ip-country',
        'x-appengine-country',
        'cloudfront-viewer-country',
      ),
    ),
    region: firstHeader(
      req,
      'cf-region',
      'x-vercel-ip-country-region',
      'cloudfront-viewer-country-region',
    ),
    city: firstHeader(req, 'cf-ipcity', 'x-vercel-ip-city', 'cloudfront-viewer-city'),
    deviceType: parseDeviceType(userAgent),
    browser: parseBrowser(userAgent),
    os: parseOs(userAgent),
    locale: parseLocale(req.get('accept-language')),
  };
}
