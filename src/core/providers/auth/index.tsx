import { storage } from '@/core/cache';
import { login, logout } from '@/features/auth/data';
import { User } from '@/features/auth/models';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AuthData = {
    token: string;
    refreshToken: string;
};

type AuthContextType = {
    authData: AuthData | null;
    userData: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        const userDataString = storage.getString('userData');
        if (userDataString) {
            try {
                const parsedUserData = JSON.parse(userDataString) as User;
                setUserData(parsedUserData);
            } catch (error) {
                console.error('Error parseando userData', error);
            }
        }
        const token = storage.getString('authToken');
        const refreshTokenVal = storage.getString('refreshToken');
        if (token && refreshTokenVal) {
            setAuthData({ token, refreshToken: refreshTokenVal });
        }
    }, []);

    const loginHandler = async (email: string, password: string): Promise<boolean> => {
        const result = await login(email, password);
        if (result) {
            setAuthData({ token: result.token, refreshToken: result.refreshToken });
            setUserData(result.userData);
            return true;
        }
        return false;
    };

    const logoutHandler = async () => {
        await logout();
        setAuthData(null);
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login: loginHandler, logout: logoutHandler, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
