import { FC } from 'react'

export const FCTextBox: FC<IProps> = ({ value }) => {
    return (<input type="text" value={value} />)
}

const defaultProps = {
    value: "default value"
}

type IProps = {
    value?: string
} & Partial<typeof defaultProps>