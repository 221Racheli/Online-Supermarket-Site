import * as React from 'react';
import { useState } from 'react';
import { createContext } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [logedIn,setLogedIn]=useState(JSON.stringify(localStorage.getItem('token'))?true:false);

    return (
        <AuthContext.Provider value={{ logedIn,setLogedIn }}>
            {children}
        </AuthContext.Provider>
    )
}