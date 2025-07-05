'use client';

import {QueryClient, QueryClientProvider, QueryCache, MutationCache} from '@tanstack/react-query';
import {JSX, useState} from 'react';
import {ThemeProvider} from 'next-themes';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import ThemeDataProvider from "@/components/ui/theme-toggle/theme-data-provider";
import Toaster from "@/components/compunds/toaster";

export function Providers({children}: { children: React.ReactNode }): JSX.Element {

    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
        }),
        mutationCache: new MutationCache({
        }),
    }));

    return (
        <>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
                <ThemeDataProvider>
                    <Toaster/>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                    {`${process && process.env?.REACT_QUERY_DEV_TOOLS}` === 'true' ? (
                        <ReactQueryDevtools client={queryClient} initialIsOpen={false}/>
                    ) : null}
                </ThemeDataProvider>
            </ThemeProvider>
            {/* Removed duplicate ReactQueryDevtools */}
        </>
    );
}
