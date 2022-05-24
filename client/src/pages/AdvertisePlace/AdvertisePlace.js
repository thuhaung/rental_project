import React, { useState, useEffect } from 'react'
import "./AdvertisePlace.css";
import Nav from "../../components/Nav/Nav";
import PropertyType from '../../components/PropertyType/PropertyType';
import SelectAmenities from "../../components/SelectAmenities/SelectAmenities";
import Rooms from '../../components/Rooms/Rooms';
import SelectPrice from '../../components/SelectPrice/SelectPrice';
import ImageUpload from '../../components/ImageUpload/ImageUpload';

function Advertisements() {
  const [question, setQuestion] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedroomNum, setBedroomNum] = useState(0);
  const [bathroomNum, setBathroomNum] = useState(1);
  const [amenities, setAmenities] = useState([]);
  const [deposit, setDeposit] = useState(0);
  const [rent, setRent] = useState(0);
  const [electricity, setElectricity] = useState(0);
  const [water, setWater] = useState(0);

  const [formSection, setFormSection] = useState(1);

  const handleProperty = (e) => {
    setPropertyType(e.target.value);
  }

  const handleBedroom = (val) => {
    setBedroomNum(val);
  }

  const handleBathroom = (val) => {
    setBathroomNum(val);
  }

  const handleAmenities = (arr) => {
    setAmenities(arr);
  }

  const handleRent = (val) => {
    setRent(val);
  }

  const handleDeposit = (val) => {
    setDeposit(val);
  }

  const handleElectricity = (val) => {
    setElectricity(val);
  }

  const handleWater = (val) => {
    setWater(val);
  }


  return (
    <div>
      <Nav />
      <div className="advertise-place-wrapper">
        <div className="advertise-place-card">
          <div className="advertise-place-card-text">
              <h1>{rent}</h1>
              <h1>{deposit}</h1>
          </div>
        </div>
        <div className="advertise-place-main">
          <div className = "advertise-place-form">
            {/*<PropertyType onClick={handleProperty}/>
            <Rooms onClickBedroom = {handleBedroom} onClickBathroom={handleBathroom} />
            <SelectAmenities onClick={handleAmenities} />
            <SelectPrice onClickRent={handleRent} onClickDeposit={handleDeposit} onClickElectricity={handleElectricity} onClickWater={handleWater}/>
            <ImageUpload />*/}
            
          </div>
          <div className="advertise-place-nav">
            <button className="advertise-place-nav-back">Back</button>
            <button className="advertise-place-nav-next" onClick={() => setFormSection(prev => prev + 1)}>Next</button>
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Advertisements
