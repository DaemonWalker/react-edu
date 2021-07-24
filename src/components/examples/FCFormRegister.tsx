import { ChangeEvent, FC, useState } from "react";

interface IState {
    name: string;
    email: string;
    address: string;
}

export const FCFormRegister: FC = () => {
    const [state, setState] = useState<IState>({
        name: "",
        email: "",
        address: ""
    });

    let txtChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState({
            ...state,
            [name]: value,
        })
    }

    return (
        <form>
            <input type="text" value={state.name} onChange={txtChange}></input>
            <input type="text" value={state.email} onChange={txtChange}></input>
            <input type="text" value={state.address} onChange={txtChange}></input>
        </form >
    );
}