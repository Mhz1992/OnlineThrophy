'use client';
import { cn } from '@/src/lib/utils';
import { ChevronIcon } from '@/src/features/common/assets/svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const NavigationLinks: FC<NavigationLinkProps> = (props) => {
    const pathName = usePathname();

    return (
        <nav className={cn('sticky top-[200px] flex gap-x-3 py-4 pr-8', props.classNames?.container)}>
            {props.navLinks.map((item, index) => (
                <Link
                    key={index}
                    href={item.url}
                    className={cn(
                        'flex items-center gap-x-2 rounded-[6px] bg-white px-3 py-1 text-[#2C2C2C]',
                        {
                            [props.classNames?.activeLink || 'bg-[#F3FAF4] px-3 py-1 text-[#2E7D32]']:
                                pathName === item.url,
                        },
                        props.classNames?.link,
                    )}
                >
                    {item.icon && item.icon}
                    {item.title}
                    {item.hasTab && <ChevronIcon className="size-3" />}
                </Link>
            ))}
        </nav>
    );
};

export default NavigationLinks;
