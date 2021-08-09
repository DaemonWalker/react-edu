import { FC } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, createStore, Store } from "redux";

export interface ReducerState {
    name: string;
}

const initState: ReducerState = { name: "" };

interface CorrectAction {
    type: "SetName" | "SetEmail",
    value: string;
}

interface ErrorAction {
    type: "SetName2" | "SetEmail2",
    value: string;
}

const correct = (state: ReducerState | undefined, action: CorrectAction): ReducerState => {
    switch (action?.type) {
        case "SetName":
            return {
                ...state,
                name: action.value
            };
        default:
            return state ?? { name: "" };

    }
}

const error = (state: ReducerState | undefined, action: ErrorAction): ReducerState => {
    if (!state) {
        return { name: "" };
    }
    switch (action?.type) {
        case "SetName2":
            state.name = action.value;
            return state;
        default:
            return state ?? { name: "" };
    }
}

const reducer = combineReducers({ correct, error });
export const store = createStore(reducer);
type RootState = ReturnType<typeof store.getState>;
const appSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppDispatch = typeof store.dispatch;

export const WrongExample: FC = () => {
    const appData = appSelector(s => s);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <div>{appData.correct.name}</div>
            <div>{appData.error.name}</div>

            <div><input type="text" value={appData.correct.name} onChange={e => dispatch({ value: e.target.value, type: "SetName" })}></input></div>
            <div><input type="text" value={appData.error.name} onChange={e => dispatch({ value: e.target.value, type: "SetName2" })}></input></div>
        </div>
    );
}