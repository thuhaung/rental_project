import React, { useState } from 'react'
import VerificationPopup from '../../../components/EmailVerification/VerificationPopup'
import "./Verification.css"
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import { useNavigate } from "react-router-dom";

function Verification({ isVerified, from }) {
  const [isClicked, setIsClicked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const sendEmail = async () => {
      axiosPrivate.get("/user/confirm-email").then((response) => {
        if (response.data) {
          console.log(response.data);
        }
      })
      /*.then(() => {
        if (fromLocation) {
          navigate(fromLocation, { replace: true});
        }
      })*/
      .catch((error) => {
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
            <p>Your account has not been verified to advertise a place.</p>
          }
        </div>
      </div>
      {
        isVerified ? "" :
        <div className="verification-form">
           <button className="verification-btn" onClick={() => {setIsClicked(true); sendEmail()}}>Verify your email address</button>
           <VerificationPopup open={isClicked} from={from} onClose={() => setIsClicked(false)} onSend={() => sendEmail()}/>
        </div>
      }
    </div>
  )
}

export default Verification