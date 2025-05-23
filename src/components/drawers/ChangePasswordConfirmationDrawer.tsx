'use client';

import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/drawer';
import { Button } from '@/components/ui/button';

interface ChangePasswordConfirmationDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    passwordToConfirm: string;
    onConfirm: () => void;
    loading: boolean;
}

export const ChangePasswordConfirmationDrawer: React.FC<ChangePasswordConfirmationDrawerProps> = ({
    open,
    onOpenChange,
    passwordToConfirm,
    onConfirm,
    loading,
}) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="rounded-t-[30px] rounded-b-none">
                <DrawerHeader>
                    <DrawerTitle>تایید تغییر رمز عبور</DrawerTitle>
                    <DrawerDescription>
                        آیا از تغییر رمز عبور خود به{' '}
                        <span className="font-mono font-bold">
                            {passwordToConfirm ? '*'.repeat(passwordToConfirm.length) : ''}
                        </span>{' '}
                        اطمینان دارید؟
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button onClick={onConfirm} disabled={loading}>
                        {loading ? 'در حال تغییر...' : 'تایید و تغییر رمز عبور'}
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" disabled={loading}>
                            لغو
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
