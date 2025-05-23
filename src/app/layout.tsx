import localFont from 'next/font/local';
import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Providers} from './providers';

const APP_NAME = "مشاور آنلاین";
const APP_DEFAULT_TITLE = `اپلیکیشن ${APP_NAME}`;
const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
const APP_DESCRIPTION = APP_DEFAULT_TITLE;

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,
    width: "device-width",
    themeColor: "#00A86B",
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
        <html lang="fa" className={`${dana.variable} ss02 h-full text-foreground mx-auto max-w-3xl `} suppressHydrationWarning>
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
