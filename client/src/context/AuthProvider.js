import { createContext, useState } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticated] = useState(() => cookies.get("userId") ? true : false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;