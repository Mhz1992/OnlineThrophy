import { cn } from "@/lib/utils";

export const BellIcon = ({ onClick, className }: { onClick?: () => void; className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        onClick={onClick}
        className={cn("cursor-pointer", className)}
    >
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2.5c0-.83-.67-1.5-1.5-1.5S9 1.67 9 2.5v.18C6.63 3.36 5 5.93 5 9v7l-2 2v1h18v-1l-2-2z" />
    </svg>
);
