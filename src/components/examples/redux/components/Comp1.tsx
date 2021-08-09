import { FC, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, appSelector, CounterAction } from "../store"

export const Comp1: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    let appData = appSelector(s => s);
    const incCounter = (e: MouseEvent<HTMLButtonElement>) => {
        let action: CounterAction = { type: "INC" };
        dispatch(action);
    }
    const decCounter = (e: MouseEvent<HTMLButtonElement>) => {
        let action: CounterAction = { type: "DEC" };
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