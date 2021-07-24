import React from "react";

interface IProps {
    infos: string[]
}

export class ClassMapToLi extends React.Component<IProps>{
    render() {
        return (<ol>
            {this.props.infos.map(info => <li key={info}>{info}</li>)}
        </ol>);
    }
}