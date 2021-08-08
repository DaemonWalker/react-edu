import { FC } from "react";
import { Provider } from "react-redux";
import { Comp1 } from "../components/Comp1";
import { Comp2 } from "../components/Comp2";
import store from '../store';


export const UnionTest: FC = () => {
    return (
        <Provider store={store}>
            <Comp1></Comp1>
            <Comp2></Comp2>
        </Provider>
    )
}