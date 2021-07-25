import { FC } from "react";

interface IProps {
    num: number;
}

export const FCOddOrEven: FC<IProps> = ({ num }) => {
    return (
        <>
            {
                num % 2 === 0 ?
                    <label>{num} is an even number</label> :
                    <label>{num} is an odd number</label>
            }
        </>
    )
}