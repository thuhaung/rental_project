import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import Cookies from 'universal-cookie';
import useAuth from '../../hooks/useAuth';
import LoginPopup from '../Login/LoginPopup'
import logo from "../../assets/logo-lilac.png";
import icon from "../../assets/profile-icon.png";
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import "./Nav.css"


function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const { isAuthenticated } = useAuth();
    const cookies = new Cookies();
    const isAuth = cookies.get("userId") ? true : false;
    const location = useLocation();
    const isPoppedUp = location.state?.isPoppedUp;


    useEffect(() => {
        if (isPoppedUp && isPoppedUp === true) {
            setIsOpen(true);
        }

    }, []);


    return (
        <nav>
            <div className="logo-div">
                <img src={logo} alt="logo" />
                <p><Link to="/">Casa</Link></p>
            </div>
            <ul>
                <div className="main-sections">
                    <li>
                        <Link to="/rentals">Rent</Link>
                    </li>
                    <li>
                        <Link to="/advertisements">Advertise</Link>
                    </li>
                    <li>
                        Help
                    </li>
                </div>
                <li>
                    <div className="user-section" onClick={() => {setIsDropped(!isDropped); setIsOpen(!isOpen)}}>
                        <div className="stripes">
                            <div className="stripe" />
                            <div className="stripe" />
                            <div className="stripe" />
                        </div>
                        
                        {/*isAuth ? <button><Link to="/user-info">User info</Link></button> :
                            <div>
                                <button onClick={() => setIsOpen(!isOpen)}>Sign in</button>
                                <LoginPopup open={isOpen} onClose={() => setIsOpen(false)}/>
                            </div>
                        */}
                        <div className="icon">
                            <img src={icon} alt="profile-icon"/>
                        </div>
                    </div>
                </li>
            </ul>
            {
                isAuth ? 
                    isDropped ? <DropdownMenu /> : ""
                    : <LoginPopup open={isOpen} onClose={() => {setIsOpen(false); setIsDropped(false)}}/>
            }
        </nav>
    )
}

export default Nav
