import React, {JSX, ReactNode, useEffect, useRef, useState} from 'react';

const SupportPanningScroll = ({ children, className }: { children: ReactNode; className?: string }): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const startY = useRef(0);
    const scrollLeft = useRef(0);
    const scrollTop = useRef(0);
    const mouseDownTime = useRef(0);
    const hasMoved = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onMouseDown = (event: MouseEvent): void => {
            setIsDragging(true);
            startX.current = event.pageX - container.offsetLeft;
            startY.current = event.pageY - container.offsetTop;
            scrollLeft.current = container.scrollLeft;
            scrollTop.current = container.scrollTop;
            mouseDownTime.current = Date.now();
            hasMoved.current = false;
        };

        const onMouseUp = (): void => {
            setIsDragging(false);
        };

        const onMouseMove = (event: MouseEvent): void => {
            if (!isDragging) return;
            const xCoord = event.pageX - container.offsetLeft;
            const yCoord = event.pageY - container.offsetTop;
            const walkX = xCoord - startX.current;
            const walkY = yCoord - startY.current;
            container.scrollLeft = scrollLeft.current - walkX;
            container.scrollTop = scrollTop.current - walkY;

            if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
                hasMoved.current = true;
            }
        };

        const onClick = (event: MouseEvent): void => {
            const clickDuration = Date.now() - mouseDownTime.current;
            if (hasMoved.current && clickDuration > 200) {
                event.stopPropagation();
                event.preventDefault();
            }
        };

        container.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        container.addEventListener('click', onClick, true);

        return (): void => {
            container.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('click', onClick, true);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
            }}
        >
            {children}
        </div>
    );
};

export default SupportPanningScroll;
