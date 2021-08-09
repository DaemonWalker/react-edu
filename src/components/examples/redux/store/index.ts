import { combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export interface CounterAction {
    type: "INC" | "DEC";
}

const counter = (state: number = 0, action: CounterAction): number => {
    console.log("counter", state, action);
    switch (action.type) {
        case "INC":
            return state + 1;
        case "DEC":
            return state - 1;
        default:
            return state;
    }
};

export interface TexterAction {
    type: "SET" | "APPEND";
    text: string;
}

const texter = (state: string = "", action: TexterAction) => {
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

const setTexter = (text: string): TexterAction => {
    return { "text": text, type: "SET" }
}

const appendTexter = (text: string): TexterAction => {
    return { "text": text, type: "APPEND" }
}

export const reducers = combineReducers({ texter, counter });
const store = createStore(reducers);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appSelector: TypedUseSelectorHook<RootState> = useSelector;
export { setTexter, appendTexter };