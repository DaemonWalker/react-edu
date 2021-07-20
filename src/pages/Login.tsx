import React, { FC } from 'react';
import { FormLogin } from '../components/FormLogin';

export const Login: FC = () =>
    (<FormLogin action="/login" name="login"></FormLogin>);