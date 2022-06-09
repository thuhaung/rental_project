import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import "./RecoverPass.css";
import Nav from "../../components/Nav/Nav.js";
import axios from 'axios';

function RecoverPass() {
    const [errorMessage, setErrorMessage] = useState("");
    const { code } = useParams();

    const verifyCode = async () => {
        /*axios.post("http://localhost:5000/user/password/recover/verify", { code: code }).then((response) => {
            if (response.status !== 200) {
                setErrorMessage("You are not authorized to use this link.");
            }
        }).catch((error) => {
            setErrorMessage("You are not authorized to use this link.");
        })*/
    }

    useEffect(() => {
        //verifyCode();
    }, []);


    return (
        <div className="recover-pass-wrapper">
            <Nav />
            {
                errorMessage ? 
                <p className="recover-pass-error-message">{errorMessage}</p> :
                <div className="recover-pass-inner">
                    <h2>Reset your password</h2>
                    <p>Enter a new password</p>
                    <input type="password" />
                </div>
            }
            
        </div>
    )
}

export default RecoverPass
