import { FC, ReactNode, useRef } from 'react';
import { useOnClickOutside } from '@/src/core/hooks/useClickOutSide';

type ClickOutSidePropsType = {
    children: ReactNode;
    clickOutSide: () => void;
};

const ClickOutSide: FC<ClickOutSidePropsType> = ({ children, clickOutSide }) => {
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, clickOutSide);
    return <div ref={ref}>{children}</div>;
};
export default ClickOutSide;
