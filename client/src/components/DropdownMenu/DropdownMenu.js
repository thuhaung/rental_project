import axios from 'axios';
import Cookies from "universal-cookie";
import React from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./DropdownMenu.css";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function DropdownMenu() {
    const navigate = useNavigate();
    const cookie = new Cookies;
    const userId = cookie.get("userId");
    const axiosPrivate = useAxiosPrivate();

    const handleLogOut = (e) => {
        e.preventDefault();

        axiosPrivate.delete("/logout").then((response) => {
            console.log("Logged out.");
            navigate("/");
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <div className="dropdown-menu">
            <ul className="dropdown-list">
                <li className="dropdown-item"><Link to={`/user/${userId}/info`}>Profile</Link></li>
                <li className="dropdown-item"><Link to="/user/settings">Settings</Link></li>
                <li className="dropdown-item"><Link to={`/user/${userId}/chatroom`}>Inbox</Link></li>
                {/*
                <li className="dropdown-item">Saved rentals</li>
                <li className="dropdown-item">Your advertisements</li>
                 */}
                <hr className="dropdown-line"></hr>
                <li className="dropdown-item"><a href="#" onClick={handleLogOut}>Sign out</a></li>
            </ul>
        </div>
    )
}

export default DropdownMenu
