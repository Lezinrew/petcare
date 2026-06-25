import { createHmac, timingSafeEqual } from 'crypto';
import { getAdminSessionSecret } from '../../config/env';
import { ApiError } from '../../utils/apiError';

const TOKEN_TTL_MS = 8 * 60 * 60 * 1000;

function signPayload(exp: number): string {
  const secret = getAdminSessionSecret();
  if (!secret) {
    throw new ApiError(500, 'ADMIN_MISCONFIGURED', 'Proteção admin mal configurada');
  }
  return createHmac('sha256', secret).update(String(exp)).digest('base64url');
}

export function createAdminToken(): { token: string; expiresAt: string } {
  const exp = Date.now() + TOKEN_TTL_MS;
  const signature = signPayload(exp);
  const token = Buffer.from(JSON.stringify({ exp, sig: signature })).toString('base64url');
  return { token, expiresAt: new Date(exp).toISOString() };
}

export function validateAdminToken(token: string): void {
  let payload: { exp?: number; sig?: string };
  try {
    payload = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as {
      exp?: number;
      sig?: string;
    };
  } catch {
    throw new ApiError(401, 'ADMIN_UNAUTHORIZED', 'Acesso administrativo negado');
  }

  if (!payload.exp || !payload.sig) {
    throw new ApiError(401, 'ADMIN_UNAUTHORIZED', 'Acesso administrativo negado');
  }

  if (Date.now() > payload.exp) {
    throw new ApiError(401, 'ADMIN_UNAUTHORIZED', 'Sessão administrativa expirada');
  }

  const expected = signPayload(payload.exp);
  const actual = Buffer.from(payload.sig);
  const expectedBuf = Buffer.from(expected);

  if (actual.length !== expectedBuf.length || !timingSafeEqual(actual, expectedBuf)) {
    throw new ApiError(401, 'ADMIN_UNAUTHORIZED', 'Acesso administrativo negado');
  }
}
