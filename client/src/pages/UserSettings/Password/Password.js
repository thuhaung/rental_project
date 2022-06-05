import axios from 'axios';
import React, { useState } from 'react'
import "./Password.css";

function Password() {
  const [isEdit, setIsEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNew, setConfirmNew] = useState("");

  const submit = async () => {
    if (newPass === confirmNew) {
      const form = {
        pass: currPass,
        new: newPass
      }
      axios.post("http://localhost:5000", form, { withCredentials: true }).then((response) => {
        setMessage("Information is successfully updated.");
        setIsEdit(false);
      }).catch((error) => setMessage(error.message));
    }
    else {
      setMessage("Your new and confirmed passwords don't match.");
    }
  }

  return (
    <div className="password-wrapper">
      <div className="general-details-info">
        <div className="general-details-title">
          <h3>Password</h3>
          <p>Enter your current password to make a new one.</p>
          <p>{message}</p>
        </div>
        {
          isEdit ? 
          <div className='general-details-btn-wrapper'>
            <button className='general-details-btn1' type='reset' onClick={() => setIsEdit(false)}>Cancel</button>
            <button className='general-details-btn2' type='submit' onClick={() => {submit()}}>Save</button>
          </div> :
          <div className='general-details-btn-wrapper'>
            <button className='general-details-btn2' type='submit' onClick={() => setIsEdit(true)}>Edit</button>
          </div>
        }
      </div>
      <form className="general-details-form">
        <table>
          <tr>
            <td><b style={{ fontSize: '20px' }}>Current Password</b></td>
            <td><input className='password-input' type='password' disabled={!isEdit && "disabled"} value={currPass} onChange={(e) => setCurrPass(e.target.value)}></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='password-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '20px' }}>New Password</b></td>
            <td><input className='password-input' type='password' disabled={!isEdit && "disabled"} value={newPass} onChange={(e) => setNewPass(e.target.value)}></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='password-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '20px' }}>Confirm new Password</b></td>
            <td><input className='password-input' type='password' disabled={!isEdit && "disabled"} value={confirmNew} onChange={(e) => setConfirmNew(e.target.value)}></input></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default Password