import { useNavigate } from "react-router";
import axios from "../utils/axios";
import React, { createContext, useEffect, useState } from "react";
import type { AuthProviderProps, LoginProps, authStatus, UserProps } from "../types/types";


const AuthContext = createContext<AuthProviderProps>({
    user: null,
    login: () => { },
    logout: () => { },
    getUser: () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserProps | null>(null);
    const [status, setStatus] = useState<authStatus>('idle');
    const navigate = useNavigate();


    useEffect(() => {
        getUser()
    }, [])

    const login = async (credintials: LoginProps) => {

        try {
            // send request to the csrf route
            await axios.get('sanctum/csrf-cookie');

            // login 
            const user = await axios.post('login', credintials);
            setUser(user.data.user);
            setStatus('authenticated');
            navigate('/')
        } catch (e) {

            console.log(e);
            throw (e);
        }

    }

    const logout = async () => {
        try {

            await axios.post('logout')
            setStatus('loggedout');
            setUser(null);
            navigate('/login',{replace:true});
        } catch (e) {
            console.log(e);
            throw (e);
        }

    }

    const getUser = async () => {
        try {
            const auth = await axios.get('api/user');
            setUser(auth.data.user)
            setStatus('authenticated')
        } catch (e) {
            console.log('logout', e);
            setStatus('unauthorized');
            throw e;

        }

    }

    return (
        <AuthContext.Provider value={{ login, logout, getUser, user, status }}>
            {children}
        </AuthContext.Provider>
    )
}

// custom wrapper to access context

export default AuthProvider;

export {
    AuthContext
}