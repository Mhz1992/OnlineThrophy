import { cn } from '@/src/lib/utils';
import { CSSProperties, FC, ReactNode, useRef } from 'react';

export type CheckListPropsType = {
    label: string;
    onChange?: (_value: string[] | number[]) => void;
    mode?: 'multiSelect' | 'singleSelect';
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    labelClassName?: string;
};

const CheckList: FC<CheckListPropsType> = ({
    children,
    onChange,
    mode = 'multiSelect',
    label,
    className,
    style,
    labelClassName,
}) => {
    const value = useRef<string[] | number[]>([]);

    return (
        <form
            dir="rtl"
            className={cn('relative rounded-sm border-2 px-1.5 py-4', className)}
            style={style}
            onSubmit={(event) => event.preventDefault()}
            onChange={(event) => {
                const target = event.target as HTMLInputElement;
                if (mode === 'multiSelect') {
                    if (target.checked) {
                        value.current.push(target.value as never);
                    } else {
                        const index = value.current.findIndex((item) => item === target.value);
                        value.current.splice(index, 1);
                    }
                } else {
                    if (target.checked) {
                        value.current[0] = target.value;
                    } else {
                        value.current = [];
                    }
                }
                onChange?.(value.current);
            }}
        >
            <label
                className={`absolute top-2.5 -translate-y-5 scale-75 bg-inherit before:absolute before:left-0 before:top-[8px] before:-z-10 before:h-[8px] before:w-[120%] before:-translate-x-[10%] before:px-2 before:transition-all before:duration-300 before:content-[""] ${labelClassName}`}
            >
                {label}
            </label>
            {children}
        </form>
    );
};
export default CheckList;
