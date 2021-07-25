import React from 'react'

export class ClassTextBox extends React.Component<IProps>{
    render() {
        return (<label>{this.props.value}</label>)
    }
}

const defaultProps = {
    value: "default value"
}

class IProps {
    value?: string = "this is default value"
}