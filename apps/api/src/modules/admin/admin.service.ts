import { createHash, timingSafeEqual } from 'crypto';
import { env, getAdminSessionSecret, isAdminProtectionEnabled } from '../../config/env';
import { ApiError } from '../../utils/apiError';
import { createAdminToken } from './admin.token';

function hashPassword(password: string): Buffer {
  return createHash('sha256').update(password).digest();
}

export class AdminService {
  login(password: string): { token: string; expiresAt: string } {
    if (!isAdminProtectionEnabled()) {
      throw new ApiError(503, 'ADMIN_DISABLED', 'Proteção administrativa não configurada');
    }

    if (!getAdminSessionSecret()) {
      throw new ApiError(500, 'ADMIN_MISCONFIGURED', 'Proteção admin mal configurada');
    }

    const input = hashPassword(password);
    const expected = hashPassword(env.adminPassword);

    if (input.length !== expected.length || !timingSafeEqual(input, expected)) {
      throw new ApiError(401, 'ADMIN_INVALID_PASSWORD', 'Senha administrativa inválida');
    }

    return createAdminToken();
  }
}

export const adminService = new AdminService();
