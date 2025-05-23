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


export function CallSupportDrawer(props: {
    open: boolean,
    onOpenChange: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    onClick: () => void,
    supportphonenumber: string
}) {
    return <Drawer open={props.open} onOpenChange={props.onOpenChange}>
        <DrawerContent className="rounded-t-[30px] rounded-b-none max-w-3xl mx-auto">
            <DrawerHeader>
                <DrawerTitle className={"text-right"}>
                    تماس با پشتیبانی
                </DrawerTitle>
                <DrawerDescription className={"text-right"}>
                    برای ارتباط با تیم پشتیبانی، روی شماره زیر کلیک کنید
                </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
                <div
                    onClick={props.onClick}
                    className={cn(
                        "flex items-center justify-center p-4 bg-primary text-primary-foreground rounded-lg shadow-md cursor-pointer",
                        "hover:bg-primary/90 transition-colors"
                    )}
                >
                    <span className="text-2xl font-bold tracking-wide">{props.supportphonenumber}</span>
                </div>
            </div>
            <DrawerFooter>
                <DrawerClose asChild>
                    <Button variant="outline">
                        <span>بستن</span>
                    </Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>;
}