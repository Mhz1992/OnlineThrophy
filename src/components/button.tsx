import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { LoaderCircleIcon } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center justify-center  gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
                destructive: 'bg-destructive text-white hover:bg-destructive-hover',
                outline: 'border border-input bg-background hover:bg-accent text-primary',
                secondary: 'bg-secondary text-primary hover:bg-secondary-hover',
                ghost: 'hover:bg-accent text-primary focus-visible:ring-0 focus-visible:ring-offset-0',
                link: 'text-black hover:text-primary underline-offset-4 hover:underline focus-visible:ring-0 focus-visible:ring-offset-0',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        isLoading?: boolean;
        href?: string;
        icon?: React.ReactNode;
    };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, icon, size, asChild = false, children, isLoading, href, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        const content = (
            <>
                {isLoading ? (
                    <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                    <>
                        {icon && <span>{icon}</span>}
                        {children}
                    </>
                )}
            </>
        );

        return href ? (
            <Link className={cn(buttonVariants({ variant, size, className }))} href={href}>
                {content}
            </Link>
        ) : (
            <Comp
                className={cn(buttonVariants({ variant, size, className }), isLoading && 'opacity-50 cursor-not-allowed')}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                <span className="flex items-center gap-1">
                    {content}
                </span>
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
