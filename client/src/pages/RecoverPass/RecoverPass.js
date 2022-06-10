import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./RecoverPass.css";
import Nav from "../../components/Nav/Nav.js";
import axios from 'axios';

function RecoverPass() {
    const [errorMessage, setErrorMessage] = useState("");
    const { code } = useParams();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const verifyCode = async () => {
        axios.post("http://localhost:5000/user/password/recover/verify", { code: code }).then((response) => {
            if (response.status !== 200) {
                setErrorMessage("You are not authorized to use this link.");
            }
            else {
                setEmail(response.data);
            }
        }).catch((error) => {
            setErrorMessage("You are not authorized to use this link.");
        })
    }

    const resetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            alert("Please fill out all parts of the form.");
        }
        else if (newPassword !== confirmPassword) {
            alert("New password and re-entered password have to match.");
        }
        else {
            axios.post("http://localhost:5000/user/password/recover/new-password", { email: email, newPassword: newPassword }).then((response) => {
                if (response.data) {
                    navigate("../homepage", { state: { isPoppedUp: true }});
                }
            }).catch((error) => {
                console.log(error.message);
            })
        }
    }

    useEffect(() => {
        verifyCode();
    }, []);


    return (
        <div className="recover-pass-wrapper">
            <Nav />
            {
                errorMessage ?
                <div className="recover-pass-error-wrapper">
                    <p className="recover-pass-error-message">{errorMessage}</p>
                </div> 
                :
                <div className="recover-pass-inner">
                    <div className="recover-pass-form">
                        <h2>Reset your password</h2>
                        <div className="recover-pass-line"></div>
                        <div className="recover-pass-form-enter">
                            <div className="recover-pass-form-section">
                                <p>Enter a new password</p>
                                <input type="password" onChange={(e) => setNewPassword(e.target.value)}/>
                            </div>
                            <div className="recover-pass-form-section">
                                <p>Re-enter new password</p>
                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>
                        </div>
                        <button className="recover-pass-submit-btn" onClick={() => resetPassword()}>Submit</button>
                    </div>
                </div>
            }
            
        </div>
    )
}

export default RecoverPass
