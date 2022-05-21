import axios from 'axios';
import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./DropdownMenu.css";

function DropdownMenu() {
    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e.preventDefault();

        axios.delete("http://localhost:5000/logout", { withCredentials: true }).then((response) => {
            console.log("Logged out.");
            navigate("/");
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <div className="dropdown-menu">
            <ul className="dropdown-list">
                <li className="dropdown-item"><Link to="/user-info">Profile</Link></li>
                <li className="dropdown-item">Inbox</li>
                <li className="dropdown-item">Saved rentals</li>
                <li className="dropdown-item">Your advertisements</li>
                <hr className="dropdown-line"></hr>
                <li className="dropdown-item"><a href="#" onClick={handleLogOut}>Sign out</a></li>
            </ul>
        </div>
    )
}

export default DropdownMenu
