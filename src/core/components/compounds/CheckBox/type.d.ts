import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type CheckBoxPropsType = {
    name?: string;
    id: string;
    type?: 'checkbox' | 'radio';
    wrapperClassName?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
