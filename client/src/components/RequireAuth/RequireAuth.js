import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("userId") !== null) {
            setIsAuthenticated(true);
        }
    }, [])
    
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/homepage" state={{ from: location }} replace/>
    )
}

export default RequireAuth;