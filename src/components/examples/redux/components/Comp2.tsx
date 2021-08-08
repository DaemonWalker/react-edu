import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import store, { appSelector, TexterAction } from "../store";

export const Comp2: FC = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const setTexter = (e: MouseEvent<HTMLButtonElement>) => {
        let seter: TexterAction = { type: "SET", text: text };
        dispatch(seter);
    }

    const appendTexter = (e: MouseEvent<HTMLButtonElement>) => {
        let seter: TexterAction = { type: "APPEND", text: text };
        dispatch(seter);
    }

    let appData = appSelector(s => s);

    return (
        <div style={{ padding: 20, borderColor: "red", borderWidth: 2 }}>
            <div>counter: {appData.counter}</div>
            <div>texter: {appData.texter}</div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)}></input>
            </div>
            <div>
                <button onClick={setTexter}>SetText</button>
                <button onClick={appendTexter}>AppendText</button>
            </div>
        </div >
    )
}