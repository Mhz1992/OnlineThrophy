'use client';

import {QueryClient, QueryClientProvider, QueryCache, MutationCache} from '@tanstack/react-query';
import {JSX, useState} from 'react';
import {ThemeProvider} from 'next-themes';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import ThemeDataProvider from "@/components/ui/theme-toggle/theme-data-provider";
import Toaster from "@/components/compunds/toaster";
import { useRouter } from 'next/navigation'; // Import useRouter
import { AuthError } from '@/src/lib/apiClient'; // Import AuthError

export function Providers({children}: { children: React.ReactNode }): JSX.Element {
    const router = useRouter(); // Get router instance

    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            onError: async (error) => { // Made async to await cookie clearing
                if (error instanceof AuthError && (error.statusCode === 401 || error.statusCode === 403)) {
                    localStorage.removeItem('authToken'); // Clear token from localStorage

                    // Call the new API route to clear the HTTP-only cookie
                    try {
                        await fetch('/api/auth/clear-token-cookie', {
                            method: 'POST',
                        });
                    } catch (cookieError) {
                        console.error('Failed to clear token cookie:', cookieError);
                    }

                    router.push('/login'); // Redirect to login page
                    // Optionally, show a toast message
                    // toast.error(error.message || 'Your session has expired. Please log in again.');
                }
            },
        }),
        mutationCache: new MutationCache({
            onError: async (error) => { // Made async to await cookie clearing
                if (error instanceof AuthError && (error.statusCode === 401 || error.statusCode === 403)) {
                    localStorage.removeItem('authToken'); // Clear token from localStorage

                    // Call the new API route to clear the HTTP-only cookie
                    try {
                        await fetch('/api/auth/clear-token-cookie', {
                            method: 'POST',
                        });
                    } catch (cookieError) {
                        console.error('Failed to clear token cookie:', cookieError);
                    }

                    router.push('/login'); // Redirect to login page
                    // Optionally, show a toast message
                    // toast.error(error.message || 'Your session has expired. Please log in again.');
                }
            },
        }),
    }));

    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                <ThemeDataProvider>
                    <Toaster/>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                    {`${process && process.env?.REACT_QUERY_DEV_TOOLS}` === 'true' ? (
                        <ReactQueryDevtools client={queryClient} initialIsOpen={false}/>
                    ) : null}
                </ThemeDataProvider>
            </ThemeProvider>
            {/* This ReactQueryDevtools is outside ThemeProvider, ensure it's intended */}
            {`${process && process.env?.REACT_QUERY_DEV_TOOLS}` === 'true' ? (
                <ReactQueryDevtools client={queryClient} initialIsOpen={false}/>
            ) : null}
        </>
    );
}
