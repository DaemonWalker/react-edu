import { FC } from "react";
interface IProps {
    isLogin: boolean
}
export const FCIsLogin: FC<IProps> = ({ isLogin }) => {
    return (
        <>
            {isLogin && <label>您已经登录</label>}
        </>
    );
}