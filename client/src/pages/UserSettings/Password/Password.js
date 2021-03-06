import axios from 'axios';
import React, { useState,useEffect } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import "./Password.css";

function Password({userId}) {
  const [isEdit, setIsEdit] = useState(false);
  // const [message, setMessage] = useState("");
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNew, setConfirmNew] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const url = `/user/password/${userId}`

  const submit = async () => {
    if (newPass == '' || confirmNew == '' || currPass == '')
      alert('Please fill out all of the information')
    else if (newPass === confirmNew) {
      const form = {
        currentPassword: currPass,
        newPassword: newPass
      }
      axiosPrivate.put(url, form).then((response) => {
        // setMessage("Information is successfully updated.");
        alert('Password is changed successfully')
        setIsEdit(false);
      }).catch((error) => alert('Wrong current Password'));
    }
    else {
      // setMessage("Your new and confirmed passwords don't match.");
      alert("Your new and confirmed passwords don't match.")
    }
  }

  function handleReset(){
    setCurrPass("")
    setConfirmNew("")
    setNewPass("")
    setIsEdit(false)
  }

  useEffect(()=>{
    handleReset()
  },[])

  return (
    <div className="password-wrapper">
      <div className="general-details-info">
        <div className="general-details-title">
          <h3>Password</h3>
          <p>Enter your current password to make a new one.</p>
          {/* <p>{message}</p> */}
        </div>
        {
          isEdit ? 
          <div className='general-details-btn-wrapper'>
            <button className='general-details-btn1' type='reset' onClick={handleReset}>Cancel</button>
            <button className='general-details-btn2' type='submit' onClick={() => submit()}>Save</button>
          </div> :
          <div className='general-details-btn-wrapper'>
            <button className='general-details-btn2' type='submit' onClick={() => setIsEdit(true)}>Edit</button>
          </div>
        }
      </div>
      <form className="general-details-form">
        <table>
          <tr>
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Current Password</b></td>
            <td><input className='password-input' type='password' disabled={!isEdit && "disabled"} value={currPass} onChange={(e) => setCurrPass(e.target.value)} ></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='password-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>New Password</b></td>
            <td><input className='password-input' type='password' disabled={!isEdit && "disabled"} value={newPass} onChange={(e) => setNewPass(e.target.value)} ></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='password-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Confirm new Password</b></td>
            <td><input className='password-input' type='password' disabled={!isEdit && "disabled"} value={confirmNew} onChange={(e) => setConfirmNew(e.target.value)} ></input></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default Password