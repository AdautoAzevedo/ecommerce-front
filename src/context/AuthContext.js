import { createContext, useState, useContext, useEffect } from "react";

//Created a new context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        console.log('authToken updated:', authToken);
        // Perform any action that needs to occur after authToken changes
      }, [authToken]);
      
    const setToken = (token) => {
        console.log("TOKEN NO AuthContext: ", token);
        setAuthToken(token);
        console.log("authToken no AuthContext: ", authToken);
    };

    return (
        <AuthContext.Provider value={{ authToken, setToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);