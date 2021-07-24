import React, { ChangeEvent } from "react";

interface IProps { }
interface IState {
    name: string;
    area: string;
    comment: string;
}

export class ClassFormSimple extends React.Component<IProps, IState>{
    setName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value
        })
    }

    setArea = (e: ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            area: e.target.value
        })
    }

    setComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            comment: e.target.value
        })
    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.name} onChange={this.setName} />
                <select value={this.state.area} onChange={this.setArea}>
                    <option>中山区</option>
                    <option>沙河口区</option>
                    <option>西岗区</option>
                    <option>甘井子区</option>
                </select>
                <textarea value={this.state.comment} onChange={this.setComment}></textarea>
            </form>
        )
    }
}