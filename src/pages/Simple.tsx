import { FC } from 'react';
import { ClassButton } from '../components/examples/react-simple/ClassButton';
import { ClassLabel } from '../components/examples/react-simple/ClassLabel';
import { ClassButtonNew } from '../components/examples/react-simple/ClassNewButton';
import { ClassOddOrEven } from '../components/examples/react-simple/ClassOddOrEven';
import { ClassTextBox } from '../components/examples/react-simple/ClassTextBox';
import { FCButton } from '../components/examples/react-simple/FCButton';
import { FCLabel } from '../components/examples/react-simple/FCLabel';
import { FCOddOrEven } from '../components/examples/react-simple/FCOddOrEven';
import { FCTextBox } from '../components/examples/react-simple/FCTextBox';
import { ReduxIndex } from '../components/examples/redux/pages/ReduxIndex';
import '../content/style/simple.css'

export const Simple: FC = () => {
    return (
        <div>
            <div>
                <div>
                    <ClassLabel name="Class Button"></ClassLabel>
                    <ClassButton />
                </div>
                <div>
                    <FCLabel>Class Button New</FCLabel>
                    <ClassButtonNew />
                </div>
                <div>
                    <FCLabel>FC Button</FCLabel>
                    <FCButton />
                </div>
            </div>
            <div>
                <div>
                    <FCLabel>FCText with default value</FCLabel>
                    <FCTextBox />
                </div>
                <div>
                    <FCLabel>ClassText with default value</FCLabel>
                    <ClassTextBox />
                </div>
            </div>
            <div>
                <div>
                    <FCLabel>FC Condition Check</FCLabel>
                    <FCOddOrEven num={2}></FCOddOrEven>
                </div>
                <div>
                    <FCLabel>FC Condition Check</FCLabel>
                    <ClassOddOrEven num={3}></ClassOddOrEven>
                </div>
            </div>
            <div>
                <ReduxIndex></ReduxIndex>
            </div>
        </div >
    )
}