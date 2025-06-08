export class AuthError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'AuthError';
        this.statusCode = statusCode;
    }
}
//  @typescript-eslint/no-explicit-any
interface ApiClientOptions {
    method?: string;
    body?: Record<string, any>;
    headers?: Record<string, string>;
    isAuthRequest?: boolean; // Flag to indicate if it's an authentication request (e.g., login/register)
}

/**
 * A centralized API client for making requests.
 * Automatically adds Authorization header with token from localStorage for non-auth requests.
 * Handles JSON parsing and error throwing.
 *
 * @param url The API endpoint path (e.g., '/auth/login', '/home'). It will be prefixed with '/api/backend'.
 * @param options Request options including method, body, headers, and an optional isAuthRequest flag.
 * @returns A Promise that resolves with the parsed JSON response.
 * @throws An Error if the network request fails or the API returns a non-OK status.
 * @throws An AuthError if the API returns a 401 or 403 status.
 */
export async function apiClient<T>(url: string, options: ApiClientOptions = {}): Promise<T> {
    const { method = 'GET', body, headers, isAuthRequest = false } = options;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
    };

    // Add Authorization header if a token exists and it's not an authentication request
    if (!isAuthRequest) {
        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    const config: RequestInit = {
        method,
        headers: defaultHeaders,
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
        config.body = JSON.stringify(body);
    }

    // Use the proxied path for all backend calls as configured in next.config.mjs
    const fullUrl = `/api/backend${url}`;

    const response = await fetch(fullUrl, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));

        // Throw AuthError for 401 or 403 responses
        if (response.status === 401 || response.status === 403) {
            throw new AuthError(errorData.message || 'Authentication failed or forbidden', response.status);
        }

        // For other non-OK responses, throw a generic Error
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return response.json();
}
