import { cn } from '@/src/lib/utils';
import { FC } from 'react';

const RankedList: FC<RankedListProps> = (props) => {
    return (
        <ul className={props.classNames?.container}>
            {props.data.map((item, index) => (
                <li
                    key={index}
                    className={cn('flex w-full items-center justify-between font-medium', props.classNames?.listItem)}
                >
                    {item.title}
                    <hr
                        className={cn('ml-4 mr-1.5 w-full border-dotted border-[#D8D8D8]', props.classNames?.separator)}
                    />
                    {item.value}
                </li>
            ))}
        </ul>
    );
};

export default RankedList;
