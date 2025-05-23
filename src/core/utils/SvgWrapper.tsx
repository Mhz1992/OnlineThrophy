'use client';

import { memo } from 'react';

type SvgWrapperProps = {
    svgContent: string;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const SvgWrapper = memo(function SvgWrapper({ svgContent, className = '', ...props }: SvgWrapperProps) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: svgContent }} {...props} />;
});
