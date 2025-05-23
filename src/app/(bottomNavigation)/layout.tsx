import { BottomNavigationBar } from '@/src/components/layout/BottomNavigationBar'; // Import the new component
import React from 'react'; // Ensure React is imported for JSX

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div dir="rtl" className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 ">
            <main className="flex-grow overflow-y-auto" style={{ height: '92vh' }}>
                {children}
            </main>

            <div className="w-full" style={{ height: '5vh' }}>
                <BottomNavigationBar />
            </div>
        </div>
    );
}
