export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'unknown';

export function parseDeviceType(userAgent?: string): DeviceType {
  if (!userAgent) return 'unknown';

  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|kindle|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return 'mobile';
  if (/android/i.test(ua)) return 'tablet';
  return 'desktop';
}

export function parseBrowser(userAgent?: string): string | undefined {
  if (!userAgent) return undefined;

  if (/edg\//i.test(userAgent)) return 'Edge';
  if (/opr\//i.test(userAgent) || /opera/i.test(userAgent)) return 'Opera';
  if (/chrome\//i.test(userAgent) && !/edg\//i.test(userAgent)) return 'Chrome';
  if (/safari\//i.test(userAgent) && !/chrome\//i.test(userAgent)) return 'Safari';
  if (/firefox\//i.test(userAgent)) return 'Firefox';
  return 'Outro';
}

export function parseLocale(acceptLanguage?: string): string | undefined {
  if (!acceptLanguage) return undefined;

  const primary = acceptLanguage.split(',')[0]?.trim();
  if (!primary) return undefined;

  return primary.split(';')[0]?.trim().toLowerCase();
}

export function parseOs(userAgent?: string): string | undefined {
  if (!userAgent) return undefined;

  if (/windows nt/i.test(userAgent)) return 'Windows';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  if (/mac os x/i.test(userAgent)) return 'macOS';
  if (/linux/i.test(userAgent)) return 'Linux';
  return 'Outro';
}
