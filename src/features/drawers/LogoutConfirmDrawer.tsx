import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/drawer";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import React from "react";

export function LogoutConfirmDrawer(props: {
    open: boolean,
    onOpenChange: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    onClick: () => void,
    disabled: boolean
}) {
    return <Drawer open={props.open} onOpenChange={props.onOpenChange} >
        <DrawerContent className="rounded-t-[30px] rounded-b-none max-w-3xl mx-auto">
            <DrawerHeader>
                <DrawerTitle className={"text-right"}>
                    تایید خروج
                </DrawerTitle>
                <DrawerDescription className={"text-right"}>
                    آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
                <Button onClick={props.onClick} disabled={props.disabled}>
                    {props.disabled ? "در حال خروج..." : "بله، خارج شوم"}
                </Button>
                <DrawerClose asChild>
                    <Button variant="outline" disabled={props.disabled}>
                        <span>لغو</span>
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>;
}