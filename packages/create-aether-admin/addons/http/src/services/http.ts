export interface HttpRequestOptions extends RequestInit {
  query?: Record<string, boolean | number | string | null | undefined>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export async function http<T>(path: string, options: HttpRequestOptions = {}) {
  const { query, headers, body, ...init } = options;
  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && typeof body !== 'string' ? JSON.stringify(body) : body,
  });

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText, await response.text());
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: string,
  ) {
    super(`${status} ${statusText}`);
  }
}

function buildUrl(path: string, query?: HttpRequestOptions['query']) {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE_URL}${path}`, window.location.origin);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}
