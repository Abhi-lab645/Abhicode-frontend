import { ApiError } from '../types/problem';
import type { ApiErrorPayload } from '../types/problem';

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...rest } = options;

  let url = `${BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...rest,
    });
  } catch (networkErr: unknown) {
    const message = networkErr instanceof Error ? networkErr.message : 'Network error or service unreachable';
    throw new ApiError(0, 'Service offline or network unreachable', message);
  }

  // Handle empty or text responses
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  let body: unknown = null;
  if (isJson) {
    try {
      body = await response.json();
    } catch {
      body = null;
    }
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    let errorMessage = response.statusText || `Request failed with status ${response.status}`;
    let errorReason: string | undefined = undefined;
    let errorDetails: unknown = undefined;

    if (body && typeof body === 'object') {
      const errorPayload = body as Partial<ApiErrorPayload>;
      if (errorPayload.message) {
        errorMessage = errorPayload.message;
      }
      if (errorPayload.error && typeof errorPayload.error === 'object') {
        const errObj = errorPayload.error as Record<string, unknown>;
        if (typeof errObj.reason === 'string') {
          errorReason = errObj.reason;
        } else if (typeof errObj.id === 'string') {
          errorReason = `Problem ID ${errObj.id} not found`;
        }
        errorDetails = errObj;
      } else if (typeof errorPayload.error === 'string') {
        errorReason = errorPayload.error;
      }
    }

    throw new ApiError(response.status, errorMessage, errorReason, errorDetails);
  }

  return body as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
