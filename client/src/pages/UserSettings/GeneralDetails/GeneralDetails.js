import React from 'react'
import './GeneralDetails.css'

function GeneralDetails({ email, firstName, middlename, lastName}) {
  return (
    <div className="general-details-wrapper">  
        <div className="general-details-info">
          <div className="general-details-title">
            <h3>General Details</h3>
            <p>These information will be displayed on your profile.</p>
          </div>
          <div className='general-details-btn-wrapper'>
            <button className='general-details-btn1' type='reset'>Cancel</button>
            <button className='general-details-btn2' type='submit'>Save</button>
          </div>
        </div>
        <form className="general-details-form">
          <table className="general-details-table">
            <tr className="general-details-row">
              <td><b style={{ fontSize: '20px' }}>Email</b></td>
              <td><input className='general-details-input' type='text' placeholder={email}></input></td>
            </tr>
            <tr className="general-details-row">
              <td colSpan="2"><div className='general-details-straightline'></div></td>
            </tr>
            <tr className="general-details-row">
              <td><b style={{ fontSize: '20px' }}>First Name</b></td>
              <td><input className='general-details-input' type='text' placeholder={firstName}></input></td>
            </tr>
            <tr className="general-details-row">
              <td colSpan="2"><div className='general-details-straightline'></div></td>
            </tr>
            <tr className="general-details-row">
              <td><b style={{ fontSize: '20px' }}>Middle Name</b></td>
              <td><input className='general-details-input' type='text' placeholder={middlename}></input></td>
            </tr>
            <tr className="general-details-row">
              <td colSpan="2"><div className='general-details-straightline'></div></td>
            </tr>
            <tr className="general-details-row">
              <td><b style={{ fontSize: '20px' }}>Last Name</b></td>
              <td><input className='general-details-input' type='text' placeholder={lastName}></input></td>
            </tr>
          </table>
          
        </form>
      </div>
  )
}

export default GeneralDetails