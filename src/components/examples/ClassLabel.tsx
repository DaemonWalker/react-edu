import React from 'react';

export class ClassLabel extends React.Component<IProps> {
    render() {
        return (<label>{this.props.name}</label>);
    }
}
interface IProps {
    name?: string;
}