import { FC } from 'react';
import isStringNullOrEmpty from '../../utils/stringUtils';

export const FCLabel: FC<IProps> = ({ name, children }) => {
    return (<label>{isStringNullOrEmpty(name) ? name : children}</label>)
}

interface IProps {
    name?: string;
}