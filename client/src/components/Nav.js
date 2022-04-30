import React from 'react'
import {Link} from "react-router-dom"
import "./Nav.css"

function Nav() {
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
        </ul>
    </nav>
  )
}

export default Nav
