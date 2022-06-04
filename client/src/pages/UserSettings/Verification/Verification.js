import React, { useState } from 'react'
import VerificationPopup from '../../../components/EmailVerification/VerificationPopup'
import "./Verification.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Verification({ isVerified }) {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async () => {
      axios.get("http://localhost:5000/user/confirm-email", { withCredentials: true }).then((response) => {
        if (response.data) {
          console.log(response.data);
        }
      }).catch((error) => {
        console.log(error.message);
      })
  }

  return (
    <div className="verification-wrapper">
      <div className="general-details-info">
        <div className="general-details-title">
          <h3>Verification</h3>
          {
            isVerified ? 
            <p>You are verified and authorized to advertise rentals.</p> :
            <p>Your account has not been verified.</p>
          }
        </div>
      </div>
      {
        isVerified ? "" :
        <div className="verification-form">
           <button className="verification-btn" onClick={() => {setIsClicked(true); sendEmail()}}>Verify your email address</button>
           <VerificationPopup open={isClicked} onClose={() => setIsClicked(false)} onSend={() => sendEmail()}/>
        </div>
      }
    </div>
  )
}

export default Verification