import { cn } from '@/src/lib/utils';
import React from 'react';

const Panel: React.FC<ControlPanel.PanelProps> = ({ className, hidden, children }) => {
    return (
        <div
            style={{ display: hidden ? 'none' : 'flex' }}
            className={cn('h-full w-[320px]', { hidden: hidden }, className)}
        >
            {children}
        </div>
    );
};

export default Panel;
