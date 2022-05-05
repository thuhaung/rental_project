import React, {useState} from 'react'
import {Link} from "react-router-dom"
import LoginPopup from './LoginPopup'
import "./Nav.css"

function Nav() {
    const [isOpen, setIsOpen] = useState(false)
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
                    <button onClick={() => setIsOpen(true)}>Sign in</button>
                    <LoginPopup open={isOpen} onClose={() => setIsOpen(false)}/>
                </li>
            </ul>
        </nav>
    )
}

export default Nav
