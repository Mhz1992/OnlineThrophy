'use client';
import { usePathname } from 'next/navigation';
type RouteMap = Record<string, string>;

const useGenerateBreadcrumbs = (routeMap: RouteMap): { name: string; url: string }[] => {
    const slash = '/';
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter((path) => path);

    return pathSegments.map((__, index) => {
        const route = slash + pathSegments.slice(0, index + 1).join('/');
        const name = routeMap[route] || route;
        return { name, url: route };
    });
};

export default useGenerateBreadcrumbs;
