'use client';
import { FC } from 'react';
// import { CheckIcon, CloseIcon, ErrorIcon, InfoIcon, WarningIcon } from '@/src/features/common/assets/svg';
import { ToasterProps, Toaster as ToasterSonner } from 'sonner';

// const defaultIcon = {
//     warning: <WarningIcon />,
//     error: <ErrorIcon />,
//     info: <InfoIcon />,
//     success: <CheckIcon />,
//     close: <CloseIcon className="size-5 fill-white" />,
// };

const Toaster: FC<ToasterProps> = ({ icons=undefined , toastOptions, ...props }) => {
    return (
        <>
            <ToasterSonner
                dir="rtl"
                icons={icons}
                position="top-right"
                // closeButton
                toastOptions={{
                    ...toastOptions,
                    classNames: {
                        toast: 'grid grid-cols-6 items-start max-w-[320px] rounded-sm group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                        description: 'group-[.toast]:text-muted-foreground text-14 font-medium w-full',
                        actionButton:
                            'order-last order-4 col-start-1 col-end-3 justify-self group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                        cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                        error: 'bg-red-500 dark:bg-red-700 text-white',
                        warning: 'bg-orange-500 text-white dark:bg-orange-700',
                        info: 'bg-cyan-500 dark:bg-cyan-700 text-white',
                        success: 'bg-green-500 dark:bg-green-700 text-white',
                        closeButton:
                            'static  mt-2 order-13 order-3 justify-self-end !bg-transparent rounded-none border-none !right-auto',
                        icon: 'button-full mt-1  ml-3 order-1',
                        content: 'flex-1 flex flex-col order-2 col-span-4',
                        title: 'text-16 font-medium flex-1',
                        ...toastOptions?.classNames,
                    },
                }}
                {...props}
            />
        </>
    );
};
export default Toaster;
