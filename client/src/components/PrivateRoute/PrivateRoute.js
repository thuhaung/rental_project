import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const cookies = new Cookies();
    const location = useLocation();
    
    return cookies.get("userId") ? children : <Navigate to="/homepage" state={{ from: location, isPoppedUp: true }} replace/>

}

export default PrivateRoute
