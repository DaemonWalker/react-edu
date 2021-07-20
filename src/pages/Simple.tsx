import { FC } from 'react';
import { ClassButton } from '../components/examples/ClassButton';
import { ClassLabel } from '../components/examples/ClassLabel';
import { ClassButtonNew } from '../components/examples/ClassNewButton';
import { ClassTextBox } from '../components/examples/ClassTextBox';
import { FCButton } from '../components/examples/FCButton';
import { FCLabel } from '../components/examples/FCLabel';
import { FCTextBox } from '../components/examples/FCTextBox';
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
        </div>
    )
}