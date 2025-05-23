import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/drawer";
import {Button} from "@/components/ui/button";
import React from "react";

export function ConfirmChangePasswordDrawer(props: {
    open: boolean,
    onOpenChange: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    passwordToConfirm: string,
    onClick: () => Promise<void>,
    disabled: boolean
}) {
    return <>
        {/* Confirmation Drawer */}
        <Drawer open={props.open} onOpenChange={props.onOpenChange}>
            <DrawerContent className="rounded-t-[30px] rounded-b-none max-w-3xl mx-auto">
                <DrawerHeader>
                    <DrawerTitle  className={"text-right"}>
                        تایید تغییر رمز عبور
                    </DrawerTitle>
                    <DrawerDescription  className={"text-right"}>
                        آیا از تغییر رمز عبور خود به
                        <span className="font-mono font-bold">
                                {props.passwordToConfirm ? "*".repeat(props.passwordToConfirm.length) : ""}
                            </span>{" "}
                        اطمینان دارید؟
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button onClick={props.onClick} disabled={props.disabled}>
                        {props.disabled ? "در حال تغییر..." : "تایید و تغییر رمز عبور"}
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" disabled={props.disabled}>
                            لغو
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>;
}
