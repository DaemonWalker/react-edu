import { FC, useState } from "react";
import { Child1 } from "./Child1";

export const Parent: FC = () => {
    const [name, setName] = useState("");
    return (
        <div>
            <label>name:</label>
            <input type="text" onChange={e => setName(e.target.value)}></input>
            <Child1 name={name}></Child1>
        </div >
    )
}