import { ChangeEvent, FC, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setTexter, appendTexter, appSelector, TexterAction } from "../store";

export const Comp2: FC = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    let appData = appSelector(s => s);

    return (
        <div style={{ padding: 20, borderColor: "red", borderWidth: 2 }}>
            <div>counter2: {appData.counter}</div>
            <div>texter2: {appData.texter}</div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)}></input>
            </div>
            <div>
                <button onClick={() => dispatch(setTexter(text))}>SetText</button>
                <button onClick={() => dispatch(appendTexter(text))}>AppendText</button>
            </div>
        </div >
    )
}