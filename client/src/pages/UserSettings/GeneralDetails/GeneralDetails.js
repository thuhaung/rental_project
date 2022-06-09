import axios from 'axios';
import React, { useState,useRef, useEffect } from 'react'
import './GeneralDetails.css'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";

function GeneralDetails({ userId, email, firstName, middleName, lastName, phone, birthdate}) {
  const [isEdit, setIsEdit] = useState(false);
  const [userEmail, setUserEmail] = useState(email);
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userMiddleName, setUserMiddleName] = useState(middleName);
  const [userLastName, setUserLastName] = useState(lastName);
  const [userPhone,setUserPhone] = useState(phone);
  const [userBirthDate,setUserBirthDate] = useState(birthdate);
  const UTCBirthDate = new Date(birthdate);
  const [message, setMessage] = useState("");
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [date, setDate] = useState(UTCBirthDate.getDate());
  const [month, setMonth] = useState(UTCBirthDate.getMonth());
  const [year, setYear] = useState(UTCBirthDate.getFullYear());
  const ref = useRef();
  const axiosPrivate = useAxiosPrivate();

  const submit = async () => {
    if (userEmail == '' || userFirstName == '' || userMiddleName == '' || userLastName == '' || userPhone == '') {
      alert('Do not leave blank inputs')
    }
    else {
      const formBirthDate = year + "-" + month + "-" + date;
      const form = {
        email: userEmail,
        first_name: userFirstName,
        middle_name: userMiddleName,
        last_name: userLastName,
        phone: userPhone,
        birthdate: formBirthDate
      }
      axiosPrivate.put(`/user/${userId}`, form).then((response) => {
        console.log(response)
        if (response.data) {
          setMessage("Information is successfully changed.");
          alert('Information is successfully changed.')
          setIsEdit(false)
        }
      }).catch((error) => {
        setMessage(error.message);
      })
    }
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
            id='inputID'
            placeholder={email} 
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
            id='inputID' 
            placeholder={firstName} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserFirstName(e.target.value)}/></td>

            <td><b style={{ fontSize: '20px', fontWeight: "500", "marginLeft": "25px"}}>Middle Name</b></td>
            <td><input className='general-details-input-name' style={{"marginLeft": "10px"}}
            value={userMiddleName} 
            type='text' 
            id='inputID'
            placeholder={middleName} 
            disabled={!isEdit && "disabled"} 
            onChange={(e) => setUserMiddleName(e.target.value)}/></td>

            <td><b style={{ fontSize: '20px', fontWeight: "500", "marginLeft": "25px"}}>Last Name</b></td>
            <td><input className='general-details-input-name' style={{"marginLeft": "10px"}}
            value={userLastName} 
            type='text' 
            id='inputID'
            placeholder={lastName} 
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
            id='inputID'
            placeholder={phone} 
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
                            <option className="general-details-option" key={index} value={index + 1} selected={index === UTCBirthDate.getMonth()}>{month}</option>
                        )
                    }
                </select>
                <select className="general-details-select-date" disabled={!isEdit && "disabled"} onChange={(e) => setDate(e.target.value)}>
                    {
                        Array.from(new Array(31), (x, i) => i + 1).map((date, index) => 
                            <option className="general-details-option" key={index} value={index + 1} selected={index + 1 === UTCBirthDate.getDate()}>{date}</option>
                        )
                    }
                </select>
                <select className="general-details-select-year" disabled={!isEdit && "disabled"} onChange={(e) => setYear(e.target.value)}>
                    {
                        Array.from(new Array(83), (x, i) => i + 1922).map((year, index) => 
                            <option className="general-details-option" key={index} value={index + 1922} selected={index === (UTCBirthDate.getFullYear() - 1922)}>{year}</option>
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