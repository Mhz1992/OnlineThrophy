import Image from 'next/image';
import { FC } from 'react';
import picture from '@/src/features/common/assets/images/picture.png';
import { STR_SUPREME_LEADER, STR_SUPREME_LEADER_DESCRIPTION } from '@/src/lib/constants/constants';
const Message: FC = () => {
    return (
        <div className="flex w-full items-center gap-4 rounded-full border bg-card p-4 shadow shadow-white/10 md:w-10/12">
            <Image width={79} height={79} alt="picture" src={picture} />
            <div className="flex flex-col gap-2.5">
                <p className="w-11/12 text-xs font-normal leading-5 text-foreground md:w-10/12">
                    {STR_SUPREME_LEADER_DESCRIPTION}
                </p>
                <span className="text-xs font-semibold text-primary">{STR_SUPREME_LEADER}</span>
            </div>
        </div>
    );
};
export default Message;
