'use client';

import Link from 'next/link';
// Removed unused Image import
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/src/lib/utils';
import { HomeIcon, InfoIcon, SettingIcon} from "@/features/common/assets/svg";

interface NavItemProps {
    href: string;
    label: string;
    isActive: boolean;
    icon: React.ElementType; // Added icon prop
}

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive, icon:Icon }) => {
    console.log(Icon)
    return (
        <Link
            href={href}
            className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors",
                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
            )}
        >
            <Icon  className={`m-auto size-5 ${isActive?"text-primary" : "text-muted-foreground hover:text-foreground"}`} />
            <span className={"pt-2"}>{label}</span>
        </Link>
    );
};

export const BottomNavigationBar: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/profile', label: 'حساب  من', icon: SettingIcon }, // Use imported component directly
        { href: '/performance', label: 'عملکرد من', icon: InfoIcon }, // Use imported component directly
        { href: '/', label: 'خانه', icon: HomeIcon }, // Use imported component directly

    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg md:hidden">
            <div className="flex h-full mt-1 items-center justify-around">
                {[...navItems].reverse().map((item) => ( // Reverse the order here
                    <NavItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        isActive={pathname === item.href || (item.href === '/' && pathname === '/')} // Simple active state
                    />
                ))}
            </div>
        </nav>
    );
};
