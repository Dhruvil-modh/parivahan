import React, { useContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setCurrentUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setLoading(false);
        });
    },[]);

    const value = {
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
    }

    return (
        <AuthContext.Provider value={value}>
            { !loading && children}
        </AuthContext.Provider>
    )
}
