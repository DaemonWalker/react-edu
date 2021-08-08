import { configureStore, createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { FC } from "react";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";


export interface CounterState {
    value: number;
    status: "INC" | "DEC";
}

const initialState: CounterState = {
    value: 0,
    status: 'INC',
};

const slice = createSlice({
    name: "name",
    initialState,
    reducers: {
        inc: s => {
            s.value = s.value + 1;
        },
        dec: s => {
            s.value = s.value - 1;
        },
        add: (s, p) => {
            console.log(p);
            s.value = s.value + p.payload;
        }
    }
});

export const store = configureStore({
    reducer: {
        counter: slice.reducer
    },
});

export const ReduxIndex: FC = () => {
    const counter = useSelector<ReturnType<typeof store.getState>, number>((s) => s.counter.value)
    const dispatch = useDispatch();

    return (
        <div>
            <div>{counter}</div>
            <button onClick={e => store.dispatch(slice.actions.inc())}>+1</button>
        </div>
    )

}