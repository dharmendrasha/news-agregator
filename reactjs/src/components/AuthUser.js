import { api } from '../utils/api.utils'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
};

export default function AuthUser(){
    const navigate = useNavigate();



    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = api()
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}