import React from 'react'
import "./Password.css";

function Password() {
  return (
    <div className="password-wrapper">
      <div className="general-details-info">
        <div className="general-details-title">
          <h3>Password</h3>
          <p>Enter your current password to make a new one.</p>
        </div>
        <div className='general-details-btn-wrapper'>
          <button className='general-details-btn1' type='reset'>Cancel</button>
          <button className='general-details-btn2' type='submit'>Save</button>
        </div>
      </div>
      <form className="general-details-form">
        <table>
          <tr>
            <td><b style={{ fontSize: '20px' }}>Current Password</b></td>
            <td><input className='password-input' type='password'></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='password-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '20px' }}>New Password</b></td>
            <td><input className='password-input' type='password'></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='password-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '20px' }}>Confirm new Password</b></td>
            <td><input className='password-input' type='password'></input></td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default Password