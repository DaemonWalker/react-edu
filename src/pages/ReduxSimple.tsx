import { FC } from 'react';
import { Provider } from 'react-redux';

import { store as store1, ReduxIndex } from '../components/examples/redux/pages/ReduxIndex';
import { UnionTest } from '../components/examples/redux/pages/UnionTest';
import { WrongExample, store as wrongStore } from '../components/examples/redux/pages/WrongExample';
import store from '../components/examples/redux/store'
import '../content/style/simple.css'

export const Simple: FC = () => {
    return (
        <div>
            <Provider store={store}>
                <div>
                    <div>
                        <UnionTest></UnionTest>
                    </div>
                </div >
            </Provider>
            <Provider store={store1}>
                <div>
                    <ReduxIndex></ReduxIndex>
                </div>
            </Provider>
            <Provider store={wrongStore}>
                <WrongExample></WrongExample>
            </Provider>
        </div>
    )
}