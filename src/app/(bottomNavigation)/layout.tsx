import { BottomNavigationBar } from '@/src/components/layout/BottomNavigationBar'; // Import the new component
import React from 'react'; // Ensure React is imported for JSX

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // Set the container to full viewport height and use flex column
        <div dir="rtl" className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
            {/* Main content area - takes 90% of viewport height */}
            {/* Use overflow-y-auto to allow scrolling within the content area if it exceeds 90vh */}
            <main className="flex-grow overflow-y-auto" style={{ height: '92vh' }}>
                {children}
            </main>

            {/* Bottom Navigation Bar - takes 10% of viewport height */}
            {/* The BottomNavigationBar component itself should be styled internally to fit this height */}
            <div className="w-full" style={{ height: '5vh' }}>
                <BottomNavigationBar />
            </div>
        </div>
    );
}
