import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [useData, setUseData] = useState(null);
    const [isAuthenticad, setIsAuthenticad] = useState(false);
    const storeData = JSON.parse(localStorage.getItem(use_data));

    useEffect(() => {
        if(storeData) {
            const {userToken, user} = storedData;
            setToken(userToken)
            setUseData(user)
            setIsAuthenticad(true)
        }
    }, [])

    const login = (newToken, newData) => {
        localStorage.setItem("user_data", JSON.stringify({
            userToken: newToken, user: newData
            }))

        setToken(newToken)
        setUseData(newData)
        setIsAuthenticad(true)
    }

    const logout = () => {
        localStorage.removeItem('user_data')
        setToken(null)
        setUseData(null)
        setIsAuthenticad(false)
    }


    return <AuthProvider.Provider
        value={(token, isAuthenticad, login, logout, userData)}
    >
        { children }
    </AuthProvider.Provider>
};

export const useAuth = () => useContext(AuthContext);
