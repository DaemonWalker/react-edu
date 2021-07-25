import React from "react";

interface IProps {
    num: number;
}

export class ClassOddOrEven extends React.Component<IProps>{
    render() {
        let message = "";
        if (this.props.num % 2 === 0) {
            message = `${this.props.num} is an even number`;
        }
        else {
            message = `${this.props.num} is an odd number`;
        }
        return (
            <label>{message}</label>
        )
    }
}