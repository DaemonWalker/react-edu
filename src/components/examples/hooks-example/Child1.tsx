import { FC, useEffect, useState } from "react";

interface IProps {
    name: string;
}

export const Child1: FC<IProps> = ({ name }) => {
    const [tel, setTel] = useState("");
    useEffect(() => {
        setTel(name + tel);
    }, [name])
    return (
        <div>
            <div>
                <span>name: {name}</span>
            </div>
            <div>
                <label>tel</label>
                <input type="text" value={tel} onChange={e => setTel(e.target.value)}></input>
            </div>
        </div>
    );
}