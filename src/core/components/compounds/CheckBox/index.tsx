'use client';
import { cn } from '@/src/lib/utils';
import { FC, useState } from 'react';
import { CheckIcon } from '@/src/features/common/assets/svg';
import { CheckBoxPropsType } from './type';
import React from 'react';

const defaultIcon = <CheckIcon className="size-4 text-primary-foreground" />;

const CheckBox: FC<CheckBoxPropsType> = ({
    wrapperClassName,
    className,
    children = defaultIcon,
    type = 'checkbox',
    ...props
}) => {
    const [checked, setChecked] = useState<boolean>(props.checked || false);

    const wrapperClassNames = cn(
        'rounded-sm size-9 block flex overflow-hidden items-center justify-center ',
        wrapperClassName,
        { 'bg-primary': checked },
        { 'bg-white border': !checked },
    );

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange?.(event);
        setChecked((prev) => !prev);
    };

    return (
        <div className={cn('flex w-full flex-row items-center', className)}>
            <input type={type} name={props.name} className="hidden" {...props} onChange={handleOnChange} />
            <label className="flex flex-row gap-2" htmlFor={props.id}>
                <div hidden={!checked} className={wrapperClassNames}>
                    {checked && children}
                </div>
                <p>{props.title}</p>
            </label>
        </div>
    );
};

export default React.memo(CheckBox);
