import { useNavigate } from "react-router";
import axios from "../utils/axios";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { AuthProviderProps, Login, AuthStatus, UserProps } from "../types/types";


const AuthContext = createContext<AuthProviderProps>({
    user: null,
    status: 'idle',
    login: async () => {
        return Promise.resolve();
    },
    logout: async () => {
        return Promise.resolve();
    },
    getUser: () => { }
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserProps | null>(null);
    const [status, setStatus] = useState<AuthStatus>('idle');
    const navigate = useNavigate();



    const login = useCallback(async (credentials: Login) => {
        try {
            await axios.get("sanctum/csrf-cookie");
            const res = await axios.post("login", credentials);
            setUser(res.data.user);
            setStatus("authenticated");
            navigate("/");
        } catch (e) {
            console.log(e);
            throw e;
        }
    }, [navigate]);

    const logout = useCallback(async () => {
        try {
            await axios.post("logout");
            setStatus("loggedout");
            setUser(null);
            navigate("/login", { replace: true });
            navigate(0) //refresh page extra layer proection

        } catch (e) {
            console.log(e);
         
        }
    }, [navigate]);

    const getUser = useCallback(async () => {
        try {
            const res = await axios.get("api/user");
            setUser(res.data.user);
            setStatus("authenticated");
        } catch (e) {
            console.log("logout", e);
            setStatus("unauthorized");
         
        }
    }, []);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const value = useMemo(() => ({
        user,
        status,
        login,
        logout,
        getUser
    }), [user, status, login, logout, getUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// custom wrapper to access context

export default AuthProvider;

export {
    AuthContext
}