import React, { useEffect, useState } from 'react'
import "./RentalBox.css";
import loading from "../../assets/loading-img.png";
import { Image } from "cloudinary-react";
import rent from "../../assets/Rent.svg";
import location from "../../assets/Location.svg";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RentalBox({ name, rentAmount, fullAddress, rentalId, userId }) {
    const [num, setNum] = useState("");
    const [street, setStreet] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const getImage = async () => {
        axios.get(`http://localhost:5000/advertisement/${userId}/${rentalId}/images`).then((response) => {
            setImage(response.data[0]);
        }).catch((error) => console.log(error.message));
    }

    useEffect(() => {
        if (fullAddress) {
            setNum(fullAddress.num);
            setStreet(fullAddress.street);
            setWard(fullAddress.ward);
            setDistrict(fullAddress.district);
        }
        getImage();
    }, [fullAddress, image]);


    return (
        <div className="rental-box" onClick={() => navigate(`../rentals/${rentalId}`)}>
            <div className="rental-box-img">
                {
                    !image ? 
                    <img className="rental-box-loading-img" style={{"border": "1px solid #bebebe", "width": "328px"}} src={loading} alt="loading-img" /> :
                    <Image cloud_name="heroinism" publicId={image}/>
                }
            </div>
            <div className="rental-box-info">
                <p>{name}</p>
                <div className="rental-box-info-section">
                    <img src={rent} className="rental-box-info-icon" alt="rent-icon" />
                    <p>{rentAmount/1000000 + " mil/month"}</p>
                </div>
                <div className="rental-box-info-section">
                    <img src={location} className="rental-box-info-icon" alt="location-icon" />
                    <p>{num + " " + street + " Ward " + ward + ", District " + district}</p>
                </div>
            </div>
        </div>
    )
}

export default RentalBox
