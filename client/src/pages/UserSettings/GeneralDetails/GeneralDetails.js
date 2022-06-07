import axios from 'axios';
import React, { useState,useRef, useEffect } from 'react'
import './GeneralDetails.css'

function GeneralDetails({ userId, email, firstName, middleName, lastName, phone, birthdate}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userEmail, setUserEmail] = useState(email);
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userMiddleName, setUserMiddleName] = useState(middleName);
  const [userLastName, setUserLastName] = useState(lastName);
  const [userPhone,setUserPhone] = useState(phone);
  const [userBirthDate,setUserBirthDate] = useState(birthdate);
  const [message, setMessage] = useState("");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const ref = useRef()

  const submit = async () => {
    const form = {
      email: userEmail,
      first_name: userFirstName,
      middle_name: userMiddleName,
      last_name: userLastName,
      phone: userPhone,
      birthdate: userBirthDate
    }
    axios.put(`http://localhost:5000/user/${userId}`, form, { withCredentials: true }).then((response) => {
      console.log(response)
      if (response.data) {
        setMessage("Information is successfully changed.");
        alert('Information is successfully changed.')
      }
    }).catch((error) => {
      setMessage(error.message);
    })
    setIsEdit(false)
  }

  function handleReset() {
    setUserEmail(email)
    setUserFirstName(firstName)
    setUserMiddleName(middleName)
    setUserLastName(lastName)
    setUserPhone(phone)
    setUserBirthDate(birthdate)
    setIsEdit(false)
  }

  useEffect(()=>{
    handleReset();
  }, [])

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
              <button className='general-details-btn1' type='reset' onClick={handleReset}>Cancel</button>
              <button className='general-details-btn2' type='submit' onClick={submit}>Save</button>
            </div> :
            <div className='general-details-btn-wrapper'>
              <button className='general-details-btn2' type='submit' onClick={() => setIsEdit(true)}>Edit</button>
            </div>
          }
      </div>
      <form className="general-details-form">
        <table className="general-details-table">
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Email</b></td>
            <td colSpan="5" ><input className='general-details-input'
            value={userEmail} 
            type='text' 
            placeholder={isEdit && email} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserEmail(e.target.value)}/></td>
          </tr>
          <tr className="general-details-row">
            <td colSpan="6"><div className='general-details-straightline'></div></td>
          </tr>
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>First Name</b></td>
            <td><input className='general-details-input-name' 
            value={userFirstName} 
            type='text' 
            placeholder={isEdit && firstName} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserFirstName(e.target.value)}/></td>

            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Middle Name</b></td>
            <td><input className='general-details-input-name' 
            value={userMiddleName} 
            type='text' 
            placeholder={isEdit && middleName} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserMiddleName(e.target.value)}/></td>

            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Last Name</b></td>
            <td><input className='general-details-input-name' 
            value={userLastName} 
            type='text' 
            placeholder={isEdit && lastName} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserLastName(e.target.value)}/></td>
          </tr>
          <tr className="general-details-row">
            <td colSpan="6"><div className='general-details-straightline'></div></td>
          </tr>
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Phone</b></td>
            <td colSpan='5' ><input className='general-details-input' 
            value={userPhone} 
            type='text' 
            placeholder={isEdit && phone} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserPhone(e.target.value)}/></td>
          </tr>
          <tr className="general-details-row">
            <td colSpan="6"><div className='general-details-straightline'></div></td>
          </tr>
          <tr className="general-details-row">
            <td><b style={{ fontSize: '20px', fontWeight: "500" }}>Birthdate</b></td>
            <td colSpan='5'>
              
              <div className="general-details-birthdate">
                <select className="general-details-select-month"  disabled={!isEdit && "disabled"} onChange={(e) => setMonth(e.target.value)}>
                    {
                        months.map((month, index) => 
                            <option className="general-details-option" key={index} value={index + 1}>{month}</option>
                        )
                    }
                </select>
                <select className="general-details-select-date" disabled={!isEdit && "disabled"} onChange={(e) => setDate(e.target.value)}>
                    {
                        Array.from(new Array(31), (x, i) => i + 1).map((date, index) => 
                            <option className="general-details-option" key={index} value={index + 1}>{date}</option>
                        )
                    }
                </select>
                <select className="general-details-select-year" disabled={!isEdit && "disabled"} onChange={(e) => setYear(e.target.value)}>
                    {
                        Array.from(new Array(83), (x, i) => i + 1922).map((year, index) => 
                            <option className="general-details-option" key={index} value={index + 1922}>{year}</option>
                        )
                    }
                </select>
              </div>
              {
                /*
                <input className='general-details-input'  
                value={userBirthDate} 
                type='text' 
                placeholder={birthdate}
                ref={ref}
                onFocus={() => (ref.current.type = "date")}
                onBlur={() => (ref.current.type = "date")}
                disabled={!isEdit && "disabled"} 
                onChange={(e) => setUserBirthDate(e.target.value)}/>
                */
              }
              </td>
          </tr>
        </table>
        
      </form>
    </div>
  )
}

export default GeneralDetails