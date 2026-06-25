import { apiPost } from './api';

const STORAGE_KEY = 'petcare-admin-token';

type AdminSession = {
  token: string;
  expiresAt: string;
};

export function getAdminToken(): string | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AdminSession;
    if (!session.token || !session.expiresAt) return null;
    if (Date.now() > new Date(session.expiresAt).getTime()) {
      clearAdminToken();
      return null;
    }
    return session.token;
  } catch {
    clearAdminToken();
    return null;
  }
}

export function setAdminToken(session: AdminSession): void {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function loginAdmin(password: string) {
  return apiPost<AdminSession>('/admin/login', { password });
}
