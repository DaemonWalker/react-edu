import React, { MouseEvent } from 'react';

export class ClassButtonNew extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            num: 0
        }
    }
    render() {
        return (
            <input type="button" onClick={this.clickFoo} value={this.state.num} />
        )
    }
    clickFoo = (e: MouseEvent<HTMLInputElement>) => {
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