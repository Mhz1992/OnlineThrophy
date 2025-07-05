import localFont from 'next/font/local';
import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Providers} from './providers';

const APP_NAME = "MindfullSex";
const APP_DEFAULT_TITLE = `MindfullSex`;
const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
const APP_DESCRIPTION = APP_DEFAULT_TITLE;

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,
    width: "device-width",
    themeColor: "#bcd2e9",
};
export const metadata: Metadata = {
    manifest: "/manifest.json",
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },

    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        startupImage: [
            {
                url: "/ios/1024.png",
                media: "(device-width: 768px) and (device-height: 1024px)",
            },
        ],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

const dana = localFont({
    src: './fonts/DanaVF.woff2',
    variable: '--font-yekan-sans',
    weight: '100 900',
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" className={`${dana.variable} ss02 h-full text-foreground mx-auto max-w-3xl `}
              suppressHydrationWarning>
        <head>
            <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>
        </head>
        <body className="h-full ">
        {/*
            The main content wrapper.
            - h-full: Ensures it takes 100% height of its parent (body), which is 100% of viewport.
            - overflow-y-auto: Makes this div scrollable if its content exceeds its height,
              preventing the entire body from scrolling.
            - Removed min-h-screen: This was causing the div to potentially exceed viewport height.
            - pb-16: Retained for bottom padding, likely for the bottom navigation bar.
        */}
        <div dir="rtl" className="h-full bg-gray-100 dark:bg-gray-900 px-3 pb-16 overflow-y-auto">
            <Providers>
                {children}
            </Providers>
        </div>
        </body>
        </html>
    );
}
