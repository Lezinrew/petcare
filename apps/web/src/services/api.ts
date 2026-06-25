const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';
const API_BASE = API_URL.replace(/\/$/, '');

export class ApiClientError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error?.message ?? 'Erro na requisição';
    const code = data?.error?.code;
    throw new ApiClientError(message, code, response.status);
  }

  return data as T;
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string>,
  headers?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`, window.location.origin);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }
  const response = await fetch(url.toString(), {
    headers: headers ? { ...headers } : undefined,
  });
  return handleResponse<T>(response);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(new URL(`${API_BASE}${path}`, window.location.origin), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(new URL(`${API_BASE}${path}`, window.location.origin), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function apiPatch<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(new URL(`${API_BASE}${path}`, window.location.origin), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

export async function apiDelete(path: string): Promise<void> {
  const response = await fetch(new URL(`${API_BASE}${path}`, window.location.origin), { method: 'DELETE' });
  await handleResponse<void>(response);
}
