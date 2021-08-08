import { combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux"

export interface CounterAction {
    type: "INC" | "DEC";
    value: number;
}

export interface CounterType {
    value: number;
}

const counter = (state: CounterType | undefined, action: CounterAction): CounterType => {
    console.log("counter", state, action);
    switch (action.type) {
        case "INC":
            return { value: state?.value ?? 0 + 1 };
        case "DEC":
            return { value: state?.value ?? 0 - 1 };
        default:
            return state ?? { value: 0 };
    }
};

export interface TexterAction {
    type: "SET" | "APPEND";
    text: string;
}

const texter = (state: string | undefined, action: TexterAction) => {
    console.log("texter", state, action);
    if (!state) {
        return action?.text ?? "";
    }
    switch (action.type) {
        case "SET":
            return action.text;
        case "APPEND":
            return state?.concat(action.text);
        default:
            return state;
    }
}

export const reducers = combineReducers({ texter, counter });
const store = createStore(reducers);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export const appSelector: TypedUseSelectorHook<RootState> = useSelector;