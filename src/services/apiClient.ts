const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface ApiError {
  status: number;
  message: string;
  isUnavailable?: boolean;
}

export class ApiClientError extends Error {
  status: number;
  isUnavailable: boolean;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.isUnavailable = status === 404 || status === 501;
    this.name = 'ApiClientError';
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  // Setup headers
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Get token if auth is implemented later
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorMsg = `API Error: ${response.status} ${response.statusText}`;
      throw new ApiClientError(errorMsg, response.status);
    }
    
    // For 204 No Content
    if (response.status === 204) return {} as T;
    
    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    // Network or other fetch errors (e.g. backend completely down)
    throw new ApiClientError('Service unavailable or network error', 503);
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body: any, options?: RequestInit) => 
    request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  put: <T>(endpoint: string, body: any, options?: RequestInit) => 
    request<T>(endpoint, { 
      ...options, 
      method: 'PUT', 
      body: body instanceof FormData ? body : JSON.stringify(body) 
    }),
  delete: <T>(endpoint: string, options?: RequestInit) => request<T>(endpoint, { ...options, method: 'DELETE' })
};
