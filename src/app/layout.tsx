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
        <html lang="fa" className={`${dana.variable} ss02 h-full text-foreground `} suppressHydrationWarning>
        <body className="h-full">
        <div dir="rtl" className="h-full bg-gray-100 dark:bg-gray-900 px-6 min-h-screen pb-16">
            <Providers>
                {children}
            </Providers>
        </div>
        </body>
        </html>
    );
}
