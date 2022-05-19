import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import "./LoginPopup.css";
import axios from "axios";

function LoginPopup({ open, onClose }) {
    const { setIsAuthenticated } = useAuth();
    const { auth } = useAuth();
    const cookies = new Cookies();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            email: email,
            password: password
        }
        setErrorMessage("");

        axios.post("http://localhost:5000/login", form, { withCredentials: true }).then((response) => {
            //console.log(response.data);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        }).then(() => {
            //console.log(cookies.get("userId"));
            navigate(from, { replace: true });
        }).catch((error) => {
            if (!error.response) {
                setErrorMessage("No Server Response.");
            }
            else if (error.response.status === 400) {
                setErrorMessage("Incorrect username or password.");
            }
        })
    }

    return open ? (
        <div className="login-popup">
            <div className="inner-popup">
                <h2>Welcome to Casa</h2>
                <div className="sections">
                    <h3>Login</h3>
                    <h3>Sign up</h3>
                </div>
                <hr></hr>
                {errorMessage === null ? "" : 
                    <p>
                        {errorMessage}
                    </p>
                }
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="email-div">
                        <label htmlFor="email"><h3>Email</h3></label>
                        <input type="text" id="email" placeholder="Enter email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="password-div">
                        <label htmlFor="password"><h3>Password</h3></label>
                        <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <h4>Forgot your password?</h4>
                    <div className="submit-div">
                        <input type="submit" className="submit-button" value="Submit"/>
                    </div>
                    <button className="close-button" onClick={onClose}>close</button>
                </form>
            </div>
        </div>
    ) : ""
}

export default LoginPopup
