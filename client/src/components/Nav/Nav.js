import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom"
import LoginPopup from '../Login/LoginPopup'
import "./Nav.css"

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isPoppedUp = location.state;

    useEffect(() => {
        if (isPoppedUp !== null) {
            setIsOpen(true);
        }
    }, []);

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/rentals">Rent</Link>
                </li>
                <li>
                    <Link to="/advertisements">Advertise</Link>
                </li>
                <li>
                    Help
                </li>
                <li>
                    <button onClick={() => setIsOpen(!isOpen)}>Sign in</button>
                    <LoginPopup open={isOpen} onClose={() => setIsOpen(false)}/>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
