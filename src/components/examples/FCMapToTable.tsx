import { Table } from "antd";
import { FC } from "react";

interface Info {
    name: string;
    email: string;
}

interface IProps {
    infos: Info[];
}

export const FCMapToTable: FC<IProps> = ({ infos }) => {
    return (
        <Table>
            <thead>
                <tr><th>name</th><th>email</th></tr>
                {
                    infos.map(item =>
                        <tr key={item.email}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    )
                }
            </thead>
        </Table>
    )
}