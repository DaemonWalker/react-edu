import { FC, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { appSelector, CounterAction, RootState } from "../store"


export const Comp1: FC = () => {
    const dispatch = useDispatch();
    let appData = appSelector(s => s);
    const incCounter = (e: MouseEvent<HTMLButtonElement>) => {
        let action: CounterAction = { type: "INC"};
        dispatch(action);
    }
    const decCounter = (e: MouseEvent<HTMLButtonElement>) => {
        let action: CounterAction = { type: "DEC", value:{ appData.counter} };
        dispatch(action);
    }
    return (
        <div style={{ padding: 20, borderColor: "red", borderWidth: 2 }}>
            <div>counter: {appData.counter}</div>
            <div>texter: {appData.texter}</div>
            <button onClick={incCounter}>Add Counter</button>
            <button onClick={decCounter}>Dec Counter</button>
        </div>
    )
}