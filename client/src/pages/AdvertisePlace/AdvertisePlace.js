import React, { useState, useEffect } from 'react'
import "./AdvertisePlace.css";
import Nav from "../../components/Nav/Nav";
import PropertyType from '../../components/PropertyType/PropertyType';
import SelectAmenities from "../../components/SelectAmenities/SelectAmenities";
import Rooms from '../../components/Rooms/Rooms';
import SelectPrice from '../../components/SelectPrice/SelectPrice';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import AddressForm from '../../components/AddressForm/AddressForm';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Advertisements() {
  const [propertyType, setPropertyType] = useState("");
  const [bedroomNum, setBedroomNum] = useState(0);
  const [bathroomNum, setBathroomNum] = useState(1);
  const [amenities, setAmenities] = useState([]);
  const [deposit, setDeposit] = useState(500000);
  const [rent, setRent] = useState(1000000);
  const [electricity, setElectricity] = useState(10000);
  const [water, setWater] = useState(10000);
  const [street, setStreet] = useState("");
  const [num, setNum] = useState("");
  const [ward, setWard] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState({});

  const [formSection, setFormSection] = useState(1);
  const questions = ["Which of these best describes your place?", "Where is your place located?", "What kinds of room does your place have?", "What does your place offer?", "How much does renting your place cost?", "Add some photos of your place"];
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formConfirmed, setFormConfirmed] = useState(false);
  const [rentalId, setRentalId] = useState("");

  const cookie = new Cookies();
  const userId = cookie.get("userId");

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

  const handleAddress = (val) => {
    setStreet(val.street);
    setNum(val.num);
    setWard(val.ward);
    setDistrict(val.district);
    setCity(val.city);
    setAddress(val);
  }

  const handleImages = async (arr) => {
    console.log(arr);
    setImages(arr);
  }

  const incrementFormSection = (e) => {
    if (formSection < 6) {
      setFormSection(prev => prev + 1);
    }
    else {
      handleSubmit(e);
    }
  }

  const decrementFormSection = (e) => {
    if (formSection > 1) {
      setFormSection(prev => prev - 1);
    }
  }

  const submitImages = () => {
    const cookie = new Cookies();
    console.log(cookie.get("userId"));
    axios.post("http://localhost:5000/advertisement/upload-image", {images: images, rentalId: rentalId}, { withCredentials: true }).then((response) => {
      if (response.data) {
          console.log("ok");
      }
    }).catch((error) => {
        console.log(error.message);
    })
  }

  const getComponent = () => {
    switch (formSection) {
      case 1:
        return <PropertyType onClick={handleProperty} active={propertyType}/>;

      case 2:
        return <AddressForm onClickAddress={handleAddress} streetVar={street} numVar={num} wardVar={ward} districtVar={district} cityVar={city}/>;
        
      case 3:
        return <Rooms onClickBedroom={handleBedroom} onClickBathroom={handleBathroom} numBed={bedroomNum} numBath={bathroomNum}/>;
        
      case 4:
        return <SelectAmenities onClick={handleAmenities} active={amenities}/>;
        
      case 5:
        return <SelectPrice onClickRent={handleRent} onClickDeposit={handleDeposit} onClickElectricity={handleElectricity} onClickWater={handleWater} rentVar={rent} depositVar={deposit} electricityVar={electricity} waterVar={water}/>;
        
      case 6:
        return <ImageUpload onClickImage={handleImages} onSubmit={submitImages}/>;
        
      default:
        return <PropertyType onClick={handleProperty}/>;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!propertyType) {
      setErrorMessage("Please choose a property type at the beginning of the form.");
    }
    else if (!street || !num || !district || !city) {
      setErrorMessage("Please fill in all address information.");
    }
    
    const form = {
      "user": userId,
      "property_type": propertyType,
      "num_of_bedrooms": bedroomNum,
      "num_of_bathrooms": bathroomNum,
      "amenities": amenities,
      "rent": rent,
      "deposit": deposit,
      "water": water,
      "electricity": electricity,
      "address": address
    }
    axios.post("http://localhost:5000/advertisement/post", form, { withCredentials: true }).then((response) => {
      if (response.data) {
        setRentalId(response.data);
        //setFormConfirmed(true);
        //navigate("/");
      }
    }).catch((error) => console.log(error.message));

    submitImages();
  }

  return (
    <div>
      <Nav />
      {
        formConfirmed ? 
        <div className="advertise-place-confirmed">
          <h2>Your rental has been posted!</h2>
          <button onClick={() => navigate("/")}>Check it out</button>
        </div> :
        <div className="advertise-place-wrapper">
          <div className="advertise-place-card">
            <div className="advertise-place-card-text">
                <h1>{questions[formSection - 1]}</h1>
            </div>
          </div>
          <div className="advertise-place-main">
            <div className = "advertise-place-form">
              {getComponent()}
            </div>
            <div className="advertise-place-nav">
              <button className="advertise-place-nav-back" onClick={(e) => decrementFormSection(e)}>Back</button>
              <button className="advertise-place-nav-next" onClick={(e) => incrementFormSection(e)}>Next</button>
            </div>
          </div>
        </div>  
      }
    </div>
  )
}

export default Advertisements
