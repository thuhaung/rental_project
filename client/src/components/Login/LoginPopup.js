import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import "./LoginPopup.css";
import axios from "axios";

function LoginPopup({ open, onClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const handleLogin = (e) => {
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
            if (!from) {
                onClose();
            }
            else {
                navigate(from, { replace: true });
            }
        }).catch((error) => {
            if (!error.response) {
                setErrorMessage("No Server Response.");
            }
            else if (error.response.status === 400) {
                setErrorMessage("Incorrect username or password.");
            }
        })
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const birthdate = year + "-" + month + "-" + date;
        const form = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            birthdate: birthdate
        }
        axios.post("http://localhost:5000/register", form).then((response) => {
            if (response.data) {
                setIsRegister(false);
            }
        }).catch((error) => {
            setErrorMessage("Email is not unique.");
        })
    }

    return open ? (
        <div className="login-popup">
            {
                !isForgot ? 
                <div className="inner-popup">
                    <h2>Welcome to Casa</h2>
                    <div className="sections">
                        <h3 className={(!isRegister && "login-") + "section"} onClick={() => {setIsRegister(false); setErrorMessage(""); setEmail(""); setPassword("")}}>Login</h3>
                        <h3 className={(isRegister && "register-") + "section"}onClick={() => {setIsRegister(true); setErrorMessage(""); setEmail(""); setPassword("")}}>Sign up</h3>
                    </div>
                    <hr className="popup-line"></hr>
                    { errorMessage === null ? "" : 
                        <p>
                            {errorMessage}
                        </p>
                    }
                    { !isRegister ?
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="login-form-div">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-input" id="email" value={email} placeholder="Enter email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="login-form-div">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-input" id="password" value={password} placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <h4 className="forgot-password" onClick={() => setIsForgot(true)}>Forgot your password?</h4>
                        <div className="login-form-submit-div">
                            <input type="submit" className="login-submit-button" value="Submit"/>
                        </div>
                        <div className="no-account-register-here">
                            <p className="no-account">Haven't got an account?</p>
                            <h4 className="forgot-password" onClick={() => setIsRegister(true)}>Register here</h4>
                        </div>
                    </form> : 
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="register-form-div">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-input" id="email" value={email} placeholder="Enter email" autoComplete="off" required onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="register-form-div">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-input" id="password" value={password} placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div className="register-form-div">
                            <div className="register-form-name-div">
                                <div className="register-name-div">
                                    <label htmlFor="first-name" className="form-label">First name</label>
                                    <input type="text" id="first-name" className="form-input" placeholder="Enter first name" required onChange={(e) => setFirstName(e.target.value)}></input>
                                </div>
                                <div className="register-name-div">
                                    <label htmlFor="last-name" className="form-label">Last name</label>
                                    <input type="text" id="last-name" className="form-input" placeholder="Enter last name" required onChange={(e) => setLastName(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                        <div className="register-form-div">
                            <label htmlFor="birthdate" className="form-label">Date of birth</label>
                            <div className="register-form-birthdate">
                                <select className="register-form-select-month" onChange={(e) => setMonth(e.target.value)}>
                                    {
                                        months.map((month, index) => 
                                            <option className="register-form-option" key={index} value={index + 1}>{month}</option>
                                        )
                                    }
                                </select>
                                <select className="register-form-select-date" onChange={(e) => setDate(e.target.value)}>
                                    {
                                        Array.from(new Array(31), (x, i) => i + 1).map((date, index) => 
                                            <option className="register-form-option" key={index} value={index + 1}>{date}</option>
                                        )
                                    }
                                </select>
                                <select className="register-form-select-year" onChange={(e) => setYear(e.target.value)}>
                                    {
                                        Array.from(new Array(83), (x, i) => i + 1922).map((year, index) => 
                                            <option className="register-form-option" key={index} value={index + 1922}>{year}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="login-form-submit-div">
                            <input type="submit" className="login-submit-button" value="Submit"/>
                        </div>
                        <p className="no-account">By submitting, I accept Casa's terms of use.</p>
                    </form>
                    }
                    <button className="close-button" onClick={onClose}>x</button>
                </div> :
                <div className="inner-popup">
                    <div className="forgot-password-wrapper">
                        <h2>Forgot your password?</h2>
                        <h3>Enter your email address and we'll send you a link to reset your password</h3>
                        <hr className="popup-line"></hr>
                        <form className="forgot-password-form">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-input" placeholder="Enter your email" required />
                            <input type="submit" value="Submit" className="login-submit-button" />
                        </form>
                        <div className="know-password">
                            <p>Know your password?</p>
                            <p style={{"font-weight": "700", "color": "#7d89dd", "cursor": "pointer"}} onClick={() => setIsForgot(false)}>Sign in</p>
                        </div>
                        <button className="close-button" onClick={onClose}>x</button>
                    </div>
                </div>
            }
        </div>
    ) : ""
}

export default LoginPopup
