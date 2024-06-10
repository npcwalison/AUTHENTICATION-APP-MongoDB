import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const storedData = JSON.parse(localStorage.getItem('use_data'));

    useEffect(() => {
        if(storedData) {
            const {userToken, user} = storedData;
            setToken(userToken)
            setUserData(user)
            setisAuthenticated(true)
        }
    }, [])

    const login = (newToken, newData) => {
        localStorage.setItem("user_data", JSON.stringify({
            userToken: newToken, user: newData
            }))

        setToken(newToken)
        setUserData(newData)
        setisAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem('user_data')
        setToken(null)
        setUserData(null)
        setisAuthenticated(false)
    }


    return <AuthContext.Provider
        value={{token, isAuthenticated, login, logout, userData}}
    >
        { children }
    </AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
