'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {JSX, useState} from 'react';
import {ThemeProvider} from 'next-themes';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import ThemeDataProvider from "@/components/ui/theme-toggle/theme-data-provider";
import Toaster from "@/components/compunds/toaster";

export function Providers({children}: { children: React.ReactNode }): JSX.Element {

    const [queryClient] = useState(() => new QueryClient({
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
