import { FC, MouseEvent, useState } from 'react';

export const FCButton: FC = () => {

    const [state, setstate] = useState<IState>({ num: 0 })

    let clickFoo = (e: MouseEvent<HTMLInputElement>) => {
        setstate({
            num: state.num + 1
        });
        e.preventDefault();
    }
    return (
        <input type="button" value={state.num} onClick={clickFoo} />
    );
}

interface IState {
    num: number;
}