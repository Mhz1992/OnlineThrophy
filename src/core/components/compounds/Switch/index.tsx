import { Switch } from '@/src/components/switch';
import { FC } from 'react';

const ToggleSwitch: FC<SwitchProps> = (props) => {
    const { isEnabled, setIsEnabled } = props;
    return (
        <Switch
            checked={isEnabled}
            onChange={setIsEnabled}
            className="group relative inline-flex h-3.5 w-[34px] items-center rounded-full bg-gray-300 transition data-[checked]:bg-[#96BD98]"
        >
            <span className="absolute size-5 translate-x-1.5 rounded-full bg-white shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)] transition group-data-[checked]:-translate-x-5 group-data-[checked]:bg-[#2E7D32]" />
        </Switch>
    );
};

export default ToggleSwitch;
