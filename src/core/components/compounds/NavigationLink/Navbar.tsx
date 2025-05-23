import NavigationLinks from '@/src/core/components/compounds/NavigationLink';
import { Button } from '@/src/components/button';
import {
    NavInfoIcon,
    GuardIcon,
    LocationIcon,
    MicroscopeIcon,
    RepairIcon,
    ListIcon,
    RaceIcon,
    SearchIcon,
} from '@/src/features/common/assets/svg';
import { FC } from 'react';

const data = [
    {
        title: 'اطلاعات پرونده',
        url: '/contract/contract-information',
        icon: <NavInfoIcon className="size-4" />,
        hasTab: true,
    },
    {
        title: 'ارجاعات و محرمانگی',
        url: '/contract/confidentiality',
        icon: <GuardIcon className="size-4" />,
        hasTab: true,
    },
    { title: 'صحنه جرم', url: '/contract/crime-scene', icon: <LocationIcon className="size-4" />, hasTab: true },
    { title: 'تشخیص هویت', url: '/contract/identification', icon: <MicroscopeIcon className="size-4" />, hasTab: true },
    { title: 'مرکز ارتباطات', url: '/contract/communications', icon: <RepairIcon className="size-4" />, hasTab: true },
    { title: 'رویدادهای پرونده', url: '/contract/events', icon: <ListIcon className="size-4" />, hasTab: false },
    { title: 'نتیجه نهایی', url: '/contract/final-result', icon: <RaceIcon className="size-4" />, hasTab: false },
];

const Navbar: FC = () => {
    return (
        <div className="sticky top-[75.99px] z-20 flex items-center justify-between border-b border-t border-[#E8E8E8] bg-white pl-[34px] shadow-[0px_4px_15px_-10px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-x-3">
                <NavigationLinks navLinks={data} />
                <SearchIcon className="size-4" />
            </div>
            <Button className="bg-[#2E7D320F] text-[#2E7D32] hover:bg-[#2E7D320F]">821938102938</Button>
        </div>
    );
};

export default Navbar;
