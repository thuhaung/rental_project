import React from 'react'
import './GeneralDetail.css'

function GeneralDetail({email,firstName,middlename,lastName}) {
  return (
    <>
        <p style={{ fontWeight: '600', fontSize: '30px', lineHeight: '36px', marginTop: '0px' }}>General Details</p>
        <p style={{ fontWeight: '400', fontSize: '25px', lineHeight: '30px', marginTop: '-15px' }}>
          These information will be displayed on your profile.</p>
        <form>
          <table>
            <tr>
              <td><b style={{ fontSize: '22px' }}>Email</b></td>
              <td><input className='generaldetail-input' type='text' placeholder={email}></input></td>
            </tr>
            <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
            <tr>
              <td><b style={{ fontSize: '22px' }}>First Name</b></td>
              <td><input className='generaldetail-input' type='text' placeholder={firstName}></input></td>
            </tr>
            <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
            <tr>
              <td><b style={{ fontSize: '22px' }}>Middle Name</b></td>
              <td><input className='generaldetail-input' type='text' placeholder={middlename}></input></td>
            </tr>
            <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
            <tr>
              <td><b style={{ fontSize: '22px' }}>Last Name</b></td>
              <td><input className='generaldetail-input' type='text' placeholder={lastName}></input></td>
            </tr>
            <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
            <tr>
              <td><b style={{ fontSize: '22px' }}>Profile Photo</b></td>
            </tr>
          </table>
          <div className='generaldetail-btn-wrapper'>
            <button className='generaldetail-btn1' type='reset'>Cancel</button>
            <button className='generaldetail-btn2' type='submit'>Save</button>
          </div>
        </form>
      </>
  )
}

export default GeneralDetail