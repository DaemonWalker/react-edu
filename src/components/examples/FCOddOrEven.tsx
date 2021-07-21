import { FC } from "react";

interface IProps {
    num: number;
}

export const FCOddOrEven: FC<IProps> = ({ num }) => {
    return (<label>{num} is an {num % 2 === 0 ? "even" : "odd"} number</label>)
}