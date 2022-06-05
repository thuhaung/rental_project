import axios from 'axios';
import React, { useState } from 'react'
import './GeneralDetails.css'

function GeneralDetails({ email, firstName, middleName, lastName}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userEmail, setUserEmail] = useState(email);
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userMiddleName, setUserMiddleName] = useState(middleName);
  const [userLastName, setUserLastName] = useState(lastName);
  const [message, setMessage] = useState("");

  const submit = async () => {
    const form = {
      email: userEmail,
      first_name: userFirstName,
      middle_name: userMiddleName,
      last_name: userLastName
    }
    axios.post("http://localhost:5000", form, { withCredentials: true }).then((response) => {
      if (response.data) {
        setMessage("Information is successfully changed.");
      }
    }).catch((error) => {
      setMessage(error.message);
    })
  }

  return (
    <div className="general-details-wrapper">  
      <div className="general-details-info">
        <div className="general-details-title">
          <h3>General Details</h3>
          <p>These information will be displayed on your profile.</p>
          <p>{message}</p>
        </div>
          {
            isEdit ? 
            <div className='general-details-btn-wrapper'>
              <button className='general-details-btn1' type='reset' onClick={() => setIsEdit(false)}>Cancel</button>
              <button className='general-details-btn2' type='submit' onClick={() => setIsEdit(false)}>Save</button>
            </div> :
            <div className='general-details-btn-wrapper'>
              <button className='general-details-btn2' type='submit' onClick={() => setIsEdit(true)}>Edit</button>
            </div>
          }
      </div>
      <form className="general-details-form">
        <table className="general-details-table">
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px' }}>Email</b></td>
            <td><input className='general-details-input' value={userEmail} type='text' placeholder={email} disabled={!isEdit && "disabled"} onChange={(e) => setUserEmail(e.target.value)}/></td>
          </tr>
          <tr className="general-details-row">
            <td colSpan="2"><div className='general-details-straightline'></div></td>
          </tr>
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px' }}>First Name</b></td>
            <td><input className='general-details-input' value={userFirstName} type='text' placeholder={firstName} disabled={!isEdit && "disabled"} onChange={(e) => setUserFirstName(e.target.value)}/></td>
          </tr>
          <tr className="general-details-row">
            <td colSpan="2"><div className='general-details-straightline'></div></td>
          </tr>
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px' }}>Middle Name</b></td>
            <td><input className='general-details-input' value={userMiddleName} type='text' placeholder={middleName} disabled={!isEdit && "disabled"} onChange={(e) => setUserMiddleName(e.target.value)}/></td>
          </tr>
          <tr className="general-details-row">
            <td colSpan="2"><div className='general-details-straightline'></div></td>
          </tr>
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px' }}>Last Name</b></td>
            <td><input className='general-details-input' value={userLastName} type='text' placeholder={lastName} disabled={!isEdit && "disabled"} onChange={(e) => setUserLastName(e.target.value)}/></td>
          </tr>
        </table>
        
      </form>
    </div>
  )
}

export default GeneralDetails