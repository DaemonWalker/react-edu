import { FC } from "react";
import { ReduxComp1 } from "../components/ReduxComp1";
import { ReduxComp2 } from "../components/ReduxComp2";
import { createStore } from "redux";

import counter from "../reducers"

export const ReduxIndex: FC = () => {
    const store = createStore(counter, 0);
    const onClick = (type: "INC" | "DEC") => {
        console.log(type);
        store.dispatch({ type: type });
    }
    store.subscribe(() => {
        console.log(store.getState());
    })
    return (
        <div>
            <ReduxComp1 value={store.getState()} onInc={() => onClick("INC")} onDec={() => onClick("DEC")}></ReduxComp1>
            <ReduxComp2 value={store.getState()} onInc={() => onClick("INC")} onDec={() => onClick("DEC")}></ReduxComp2>
        </div>

    )
}