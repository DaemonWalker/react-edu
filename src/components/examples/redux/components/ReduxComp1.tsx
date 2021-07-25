import { FC } from "react";

interface IProps {
    value: number;
    onInc: () => void;
    onDec: () => void;
}

export const ReduxComp1: FC<IProps> = ({ value, onInc, onDec }) => {
    return (
        <div>
            <div>{value}</div>
            <div>
                <button onClick={onInc}>Inc</button>
            </div>
            <div>
                <button onClick={onDec}>Dec</button>
            </div>
        </div>
    );
}
