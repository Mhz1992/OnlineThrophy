import React from 'react';

const Container: React.FC<ControlPanel.ContainerProps> = ({ children }) => {
    return (
        <div className="relative float-right h-full">
            <div className="absolute z-[500] h-full bg-background backdrop-blur-[6.8px]">
                <div className="flex h-full w-full flex-row [&>div]:border-l">{children}</div>
            </div>
        </div>
    );
};

export default Container;
