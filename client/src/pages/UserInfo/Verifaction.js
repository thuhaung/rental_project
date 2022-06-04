import React from 'react'

function Verifaction() {
  return (
    <div>
      <p style={{ fontWeight: '600', fontSize: '30px', lineHeight: '36px', marginTop: '0px' }}>Verifaction</p>
      <p style={{ fontWeight: '400', fontSize: '25px', lineHeight: '30px', marginTop: '-15px' }}>
      Enter your government ID and take a picture of your ID to verify.</p>
      <form>
        <table>
          <tr>
            <td><b style={{ fontSize: '22px' }}>Government ID</b></td>
            <td><input className='generaldetail-input' type='text'></input></td>
          </tr>
          <tr>
              <td colSpan="2"><div className='generaldetail-straightline'></div></td>
            </tr>
          <tr>
            <td><b style={{ fontSize: '22px' }}>Upload Picture</b></td>
            <td><input className='generaldetail-input' type='text'></input></td>
          </tr>
        </table>
        <div className='generaldetail-btn-wrapper'>
            <button className='generaldetail-btn1' type='reset'>Cancel</button>
            <button className='generaldetail-btn2' type='submit'>Save</button>
          </div>
      </form>
    </div>
  )
}

export default Verifaction