import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Timer from '../Timer/Timer';
import "./VerificationPopup.css";

function VerificationPopup({ open, onClose, onSend, from }) {
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();
    const [confirmationCode, setConfirmationCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const axiosPrivate = useAxiosPrivate();

    const submit = async () => {
        axiosPrivate.post("/user/confirm-email/verify", { confirmationCode: confirmationCode }).then((response) => {
            if (response.status === 200) {
                onClose();
                if (from) {
                    navigate(from, { replace: true });
                }
                else {
                    navigate("../user/settings");
                }
            }
            else if (response.status === 400) {
                setErrorMessage("Incorrect code.");
            }
        }).catch((error) => {
            console.log(error.message)
            setErrorMessage("Incorrect code.");
        });
    }

    return open ?  (
        <div className="verification-popup">
            <div className="verification-popup-inner">
                <p className="verification-close-btn" onClick={() => onClose()}>x</p>
                <div className="verification-popup-title">
                    <h1>Email Verification</h1>
                    <p>{errorMessage}</p>
                </div>
                <div className="verification-popup-line"></div>
                <div className="verification-popup-form">
                    <p>Enter the code sent to your email.</p>
                    <input type="text" placeholder="Enter code" onChange={(e) => setConfirmationCode(e.target.value)}/>
                    <div className="verification-popup-resend">
                        <p className="verification-popup-send-again" style={{cursor: isFinished ? "pointer" : "none"}} onClick={() => {setIsFinished(false); onSend(); setErrorMessage(""); setConfirmationCode("")}}>Didn't receive? Send again</p>
                        {
                            isFinished ? "" : 
                            <Timer minute={1} second={30} onFinish={() => {setIsFinished(true)}}/>
                        }
                        
                    </div>
                </div>
                <button className="verification-popup-btn" onClick={() => submit()}>Submit</button>
            </div>
        </div>
    ) : "";
}

export default VerificationPopup
