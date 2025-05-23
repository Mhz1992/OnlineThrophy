import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as Icons from "lucide-react";
import React from "react";
import localFont from "next/font/local";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconByName(name: keyof typeof Icons): React.ReactElement | null {
  const IconComponent = Icons[name];
  return IconComponent ? React.createElement(IconComponent as React.FunctionComponent) : null;
}

export const toPersianNumber = (num: number | string): string => {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return String(num).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};


export const danaFont = localFont({
    src: '../app/fonts/DanaVF.woff2',
    variable: '--font-yekan-sans',
    weight: '100 900',
});