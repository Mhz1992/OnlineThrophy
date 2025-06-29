// src/lib/apiClient.ts

// Custom error class for authentication failures
export class AuthError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'AuthError';
        this.statusCode = statusCode;
    }
}

interface ApiClientOptions {
    method?: string;
    body?: Record<string, unknown>; // Changed 'any' to 'unknown'
    headers?: Record<string, string>;
    isAuthRequest?: boolean; // Flag to indicate if it's an authentication request (e.g., login/register)
    skipRefreshToken?: boolean; // Flag to skip token refresh attempt (to prevent infinite loops)
}

interface TokenResponse {
    access: string;
    refresh?: string;
}

/**
 * Refreshes the access token using the refresh token
 * @returns A Promise that resolves with the new access token
 */
export async function refreshAccessToken(): Promise<TokenResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        throw new AuthError('No refresh token available', 401);
    }

    try {
        const baseUrl = process.env.BACKEND_CORE_URL || '/api/backend';
        const response = await fetch(`${baseUrl}/api/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            throw new AuthError('Failed to refresh token', response.status);
        }

        const data = await response.json();

        // Update tokens in localStorage
        if (data.access) {
            localStorage.setItem('accessToken', data.access);
        }
        if (data.refresh) {
            localStorage.setItem('refreshToken', data.refresh);
        }

        // Update tokens in cookies
        try {
            await fetch('/api/auth/set-token-cookie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    access: data.access, 
                    refresh: data.refresh || refreshToken 
                }),
            });
        } catch (cookieError) {
            console.error('Failed to update token cookie:', cookieError);
        }

        return data;
    } catch (error) {
        // If refresh token is invalid, clear all tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authToken'); // For backward compatibility

        // Clear cookies
        try {
            await fetch('/api/auth/clear-token-cookie', {
                method: 'POST',
            });
        } catch (cookieError) {
            console.error('Failed to clear token cookie:', cookieError);
        }

        throw error;
    }
}

/**
 * A centralized API client for making requests.
 * Automatically adds Authorization header with token from localStorage for non-auth requests.
 * Handles JSON parsing and error throwing.
 * Automatically refreshes the access token if a 403 error occurs.
 *
 * @param url The API endpoint path (e.g., '/auth/login', '/home'). It will be prefixed with '/api/backend'.
 * @param options Request options including method, body, headers, and an optional isAuthRequest flag.
 * @returns A Promise that resolves with the parsed JSON response.
 * @throws An Error if the network request fails or the API returns a non-OK status.
 * @throws An AuthError if the API returns a 401 or 403 status and token refresh fails.
 */
export async function apiClient<T>(url: string, options: ApiClientOptions = {}): Promise<T> {
    const { method = 'GET', body, headers, isAuthRequest = false, skipRefreshToken = false } = options;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
    };

    // Add Authorization header if a token exists and it's not an authentication request
    if (!isAuthRequest) {
        // Try to get the access token first, fall back to authToken for backward compatibility
        const token = localStorage.getItem('accessToken')
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

    // Use the baseURL from environment variables if available, otherwise use the proxied path
    const baseUrl = process.env.NEXT_PUBLIC_URL ;
    const fullUrl = `${baseUrl}${url}`;

    try {
        const response = await fetch(fullUrl, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));

            // Extract error message from Django response format
            let errorMessage = 'An unknown error occurred';
            if (errorData) {
                if (errorData.message) {
                    // Standard message format
                    errorMessage = errorData.message;
                } else if (errorData.detail) {
                    // Django often uses 'detail' for non-field errors
                    errorMessage = errorData.detail;
                } else if (typeof errorData === 'object') {
                    // Django field errors format: {"field_name": ["error message"]}
                    const fieldErrors = Object.entries(errorData)
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        .filter(([_key, value]) => Array.isArray(value) || typeof value === 'string') // Changed 'key' to '_key' here
                        .map(([key, value]) => {
                            const errorValue = Array.isArray(value) ? value.join(', ') : value;
                            return `${key}: ${errorValue}`;
                        });

                    if (fieldErrors.length > 0) {
                        errorMessage = fieldErrors.join(' | ');
                    }
                }
            }

            // If we get a 403 and we're not already trying to refresh the token, attempt to refresh
            if (response.status === 403 && !skipRefreshToken && !isAuthRequest) {
                try {
                    // Refresh the token
                    await refreshAccessToken();

                    // Retry the original request with the new token
                    return apiClient<T>(url, {
                        ...options,
                        skipRefreshToken: true, // Prevent infinite refresh loops
                    });
                } catch (refreshError) {
                    console.log(refreshError)
                    // If refresh fails, throw the original error
                    throw new AuthError(errorMessage || 'Authentication failed or forbidden', response.status);
                }
            }

            // Throw AuthError for 401 or 403 responses
            if (response.status === 401 || response.status === 403) {
                throw new AuthError(errorMessage || 'Authentication failed or forbidden', response.status);
            }

            // For other non-OK responses, throw a generic Error with the extracted message
            throw new Error(errorMessage || `API Error: ${response.statusText}`);
        }

        // For void return types or empty responses, don't try to parse JSON
        if (response.headers.get('content-length') === '0' || response.status === 204) {
            return {} as T;
        }

        // Otherwise parse the JSON response
        return response.json();
    } catch (error) {
        // Re-throw AuthErrors
        if (error instanceof AuthError) {
            throw error;
        }

        // For network errors or other unexpected errors
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new new Error(`API Request Failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
