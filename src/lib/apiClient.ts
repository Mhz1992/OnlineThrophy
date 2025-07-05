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
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
    isAuthRequest?: boolean; // Flag to indicate if it's an authentication request (e.g., login/register)
    skipRefreshToken?: boolean; // Flag to skip token refresh attempt (to prevent infinite loops)
}


/**
 * A centralized API client for making requests.
 * Assumes authentication tokens are handled by HTTP-only cookies and Next.js middleware.
 * Handles JSON parsing and error throwing.
 * Automatically attempts to refresh the access token via a server-side endpoint if a 401 error occurs.
 *
 * @param url The API endpoint path (e.g., '/auth/login', '/home'). It will be prefixed with '/api/backend'.
 * @param options Request options including method, body, headers, and an optional isAuthRequest flag.
 * @returns A Promise that resolves with the parsed JSON response.
 * @throws An Error if the network request fails or the API returns a non-OK status.
 * @throws An AuthError if the API returns a 401 or 403 status and token refresh fails.
 */
export async function apiClient<T>(url: string, options: ApiClientOptions = {}): Promise<T> {
    const {method = 'GET', body, headers} = options;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        ...headers,
    };

    // IMPORTANT: The Authorization header is NOT set here from client-side localStorage.
    // It is assumed that Next.js middleware or the backend will read the HTTP-only
    // 'accessToken' cookie and attach the Authorization header before the request
    // reaches your Django backend.

    const config: RequestInit = {
        method,
        headers: defaultHeaders,
        credentials: 'include', // Ensure cookies are sent with the request
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
        config.body = JSON.stringify(body);
    }

    // Use the baseURL from environment variables if available, otherwise use the proxied path
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    const fullUrl = `${baseUrl}${url}`;

    try {
        const response = await fetch(fullUrl, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({message: 'An unknown error occurred'}));

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
                        .filter(([_key, value]) => Array.isArray(value) || typeof value === 'string')
                        .map(([key, value]) => {
                            const errorValue = Array.isArray(value) ? value.join(', ') : value;
                            return `${key}: ${errorValue}`;
                        });

                    if (fieldErrors.length > 0) {
                        errorMessage = fieldErrors.join(' | ');
                    }
                }
            }

            // If we get a 401 and we're not already trying to refresh the token, attempt to refresh
            if (response.status === 401) {
                try {
                    console.log("Attempting to refresh token via server-side endpoint...");
                    // Call the new server-side refresh endpoint
                    const refreshResponse = await fetch(`${origin}/api/auth/refresh-token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include', // Ensure cookies are sent for refresh request
                    });
                    if (!refreshResponse.ok) {
                        // If server-side refresh fails, it means the refresh token is invalid or expired
                        // The server-side endpoint should have already cleared cookies.
                        console.error('Server-side token refresh failed:', refreshResponse.status);
                        throw new AuthError(errorMessage || 'Authentication failed or forbidden', response.status);
                    }

                    console.log("Token refreshed successfully. Retrying original request.");
                    // Retry the original request with the new token (cookies will be sent automatically)
                    return apiClient<T>(url, {
                        ...options,
                        skipRefreshToken: true, // Prevent infinite refresh loops
                    });
                } catch (refreshError) {
                    console.error('Error during client-side refresh attempt:', refreshError);
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

        throw new Error(`API Request Failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
