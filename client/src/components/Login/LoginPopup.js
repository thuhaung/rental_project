import React from 'react'
import "./LoginPopup.css"

function LoginPopup({ open, onClose }) {
    return open ? (
        <div className="login-popup">
            <div className="inner-popup">
                <h2>Welcome to Casa</h2>
                <div className="sections">
                    <h3>Login</h3>
                    <h3>Sign up</h3>
                </div>
                <hr></hr>
                <form className="login-form">
                    <div className="email-div">
                        <h3>Email</h3>
                        <input type="text" name="email" placeholder="Enter email"></input>
                    </div>
                    <div className="password-div">
                        <h3>Password</h3>
                        <input type="password" name="password" placeholder="Enter password"></input>
                    </div>
                </form>
                <h4>Forgot your password?</h4>
                <div className="submit-div">
                    <button className="submit-button">Submit</button>
                </div>


                <button className="close-button" onClick={onClose}>close</button>
            </div>
        </div>
    ) : ""
}

export default LoginPopup
