import { cn } from '@/src/lib/utils';
import { cva } from 'class-variance-authority';
import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

type GlassBoxType = {
    variant: 'light-green' | 'iceBlue' | 'driftwood' | 'pale-pink' | 'soft-gray';
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const glassBoxVariant = cva('', {
    variants: {
        variant: {
            'light-green': 'bg-teal-50 border-gray-200 dark:bg-[#1A2B28] dark:border-[#29443E]',
            iceBlue: 'border-[#D3D7E2] bg-[#F3F6F9] dark:bg-[#2A2E3B] dark:border-[#3B3F4D]',
            driftwood: 'bg-[#F9F6F3] border-[#E2DCD3] dark:bg-[#2C2824] dark:border-[#3B332B]',
            'pale-pink': 'bg-[#F9F3F3] border-[#E2D3D3] dark:bg-[#2B2323] dark:border-[#3B2B2B]',
            'soft-gray': 'bg-[#F8F8F8] border-[#ECECEC] dark:bg-[#232425] dark:border-[#323334]',
        },
    },
});

const GlassBox: FC<GlassBoxType> = ({ children, variant, className, style, ...props }) => {
    const classNames = cn('border rounded-sm py-2 px-4 ', glassBoxVariant({ variant, className }));

    return (
        <div className={classNames} style={style} {...props}>
            {children}
        </div>
    );
};

export default GlassBox;
