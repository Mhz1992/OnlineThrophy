'use client';
import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { useFieldSchema } from '@formily/react';

type InputPropsType = {
    placeholder?: string;
    className?: string;
    value?: string;
    type?: React.HTMLInputTypeAttribute;
    readonly?: boolean;
    disabled?: boolean;
    require?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(({ className, type, ...props }, ref) => {
    const schema = useFieldSchema();
    const isFileInput = type === 'file';
    const [file, setFile] = React.useState<File | null>(null);
    const classNames = cn(
        'block w-full h-fit text-sm bg-transparent text-foreground placeholder:text-muted-foreground appearance-none focus:outline-none focus:ring-0 peer px-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-sm font-normal leading-5',
        className,
    );
    return (
        <>
            {isFileInput ? (
                <div>
                    <label
                        htmlFor="file-input"
                        className={cn(classNames, 'flex cursor-pointer justify-between text-foreground')}
                    >
                        <p className="m-0 text-xs">
                            {props.placeholder || (
                                <p dir="ltr" className="text-sm">
                                    {file?.name || 'موردی انتخاب نشده'}
                                </p>
                            )}
                        </p>
                    </label>
                    <input
                        type={type}
                        id="file-input"
                        ref={ref}
                        className="hidden"
                        onChange={(event) => {
                            const files = event.target.files;
                            if (files) setFile(files[0]);
                            else setFile(null);
                        }}
                    />
                </div>
            ) : (
                <input
                    type={type}
                    className={cn(classNames, {
                        'bg-input-required': schema?.required,
                    })}
                    ref={ref}
                    {...props}
                />
            )}
        </>
    );
});
Input.displayName = 'Input';

export { Input };
