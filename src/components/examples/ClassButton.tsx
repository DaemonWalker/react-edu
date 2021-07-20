import React, { MouseEvent } from 'react';

export class ClassButton extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            num: 0
        }
        this.clickFoo = this.clickFoo.bind(this);
    }
        render() {
            return (
                <input type="button" onClick={this.clickFoo} value={this.state.num} />
            )
        }
        clickFoo(e: MouseEvent<HTMLInputElement>) {
            this.setState({
                num: this.state.num + 1
            })
            e.preventDefault();
        }
}

interface IProps { }
interface IState {
    num: number;
}