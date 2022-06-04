import React from 'react'

function Password() {
  return (
    <>
      <p style={{ fontWeight: '600', fontSize: '30px', lineHeight: '36px', marginTop: '0px' }}>Password</p>
      <p style={{ fontWeight: '400', fontSize: '25px', lineHeight: '30px', marginTop: '-15px' }}>
        Enter your current password to make a new one.</p>
      <form>
        <table>
          <tr>
            <td><b style={{ fontSize: '22px' }}>Current Password</b></td>
            <td><input className='generaldetail-input' type='text'></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '22px' }}>New Password</b></td>
            <td><input className='generaldetail-input' type='text'></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '22px' }}>Confirm new Password</b></td>
            <td><input className='generaldetail-input' type='text'></input></td>
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

export default Password