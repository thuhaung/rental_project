import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const VerifiedRoute = ({ children }) => {
    const cookies = new Cookies();
    const [isVerified, setIsVerified] = useState(false);
    const userId = cookies.get("userId");
    const location = useLocation();

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${userId}`).then((response) => {
            if (response.data) {
                setIsVerified(response.data.is_verified);
            }
        }).catch((error) => console.log(error.message));
    }, []);
    
    return isVerified ? children : <Navigate to="/user/settings" state={{ verifiedSection: true }} replace/>

}

export default VerifiedRoute
