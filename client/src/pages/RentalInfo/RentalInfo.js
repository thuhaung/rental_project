import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Nav from "../../components/Nav/Nav.js";
import "./RentalInfo.css";
import { Image } from "cloudinary-react";
import loading from "../../assets/loading-img.png";
import avatar from "../../assets/profile-pic.jpg";
import AmenitiesIcon from '../../assets/AmenitiesIcon.js';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Cookies from "universal-cookie";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from "react-places-autocomplete";

function RentalInfo() {
    const icons = AmenitiesIcon;
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyCEKMFxGQT1dKWt2ljFcG5I2C9lSFxCe_M" })
    const [rental, setRental] = useState("");
    const [rentalName, setRentalName] = useState("");
    const [address, setAddress] = useState("");
    const [district, setDistrict] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [rent, setRent] = useState("");
    const [deposit, setDeposit] = useState("");
    const [water, setWater] = useState("");
    const [electricity, setElectricity] = useState("");
    const [renter, setRenter] = useState({});
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const iconNames = ["Kitchen", "AC", "Parking", "Washer", "TV", "Wifi", "Fridge"];
    const navigate = useNavigate();

    const getRental = async () => {
        axios.get(`http://localhost:5000/rental/${id}`).then((response) => {
            if (response.data) {
                const item = response.data;
                console.log(item);
                setRental(item);
                getRenter(item.user);
                getImages(id, item.user);
            }
        }).catch(error => console.log(error.message)); 
    }

    const getRenter = async (userId) => {
        if (userId) {
            axios.get(`http://localhost:5000/user/${userId}`).then((response) => {
                console.log(response.data);
                setRenter(response.data);
            }).catch((error) => console.log(error.message));
        }
    }

    const getImages = async (rentalId, userId) => {
        axios.post("http://localhost:5000/advertisement/images", { rentalId: rentalId, userId: userId }).then((response) => {
            console.log(response.data);
            setImages(response.data);
        }).catch((error) => console.log(error.message));
    }

    useEffect(() => {
        getRental();
    }, []);

    /*
    useEffect(() => {
        if (rental) {
            getRenter(rental.user);
            setRentalName(rental.property_type + " for Rent at District " + rental.address.district);
            setAmenities(rental.amenities);
            setRent(rental.rent);
            setDeposit(rental.deposit);
            setElectricity(rental.electricity);
            setWater(rental.water);
            getImages(id, rental.user);
            setAddress(rental.address);
        }
    }, []);*/

    const handleChange = (address) => {
        setAddress(address);
    }

    const handleSelect = (address) => {
        geocodeByAddress(address)
                                .then(results => getLatLng(results[0]))
                                .then(latLng => console.log('Success', latLng))
                                .catch(error => console.error('Error', error));
    };

    const contactRenter = () => {
        const form = {
            senderId: userId,
            receiverId: rental.user,
            rentalId: rental._id
        }
        axios.post("http://localhost:5000/chatroom/conversation", form).then((response) => {
            if (response.data) {
                navigate(`../user/${userId}/chatroom`);
            }
        }).catch((error) => console.log(error.message));
    }


    useEffect(() => {
        /*const script = document.createElement('script');
      
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC5qHhy7lazQbxUKO0WtOizl0ISGIsu18U&libraries=places";
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        }*/
      }, []);

    return (
        <div className="rental-info-wrapper">
            <Nav />
            <div className="rental-info-general-card">
                <div className="rental-info-title">
                    <h2>{rental && rental.property_type + " for Rent at District " + rental.address.district}</h2>
                    {
                        rental && rental.user === userId && <button className="rental-info-edit-btn">Edit</button>
                    }
                </div>
                <div className="rental-info-images">
                    <div className="rental-info-first-image">
                        { images[0] ? <Image key={0} cloud_name="heroinism" public_id={images[0]}/> : <img src={loading} alt="loading-img" />}
                    </div>
                    <div className="rental-info-other-images">
                        {
                            images && images.map((image, index) => (
                                index > 0 &&
                                <Image key={index} cloud_name="heroinism" public_id={image}/>
                            ))
                        }
                    </div>
                </div>
                <div className="rental-info-general">
                    <div className="rental-info-general-rental">
                        {
                            rental &&
                            <div className="rental-info-general-rental-wrapper">
                                <h3>{rental.address.num + " " + rental.address.street + " Ward " + rental.address.ward + ", District " + rental.address.district}</h3>
                                <p>{rental.num_of_bedrooms + " bedrooms" + " • " + rental.num_of_bathrooms + " bathrooms"}</p>
                            </div>
                        }
                    </div>
                    <div className="rental-info-general-renter">
                        {
                            renter &&
                            <div className="rental-info-general-renter-wrapper">
                                <h3>{renter.last_name + " " + renter.middle_name + " " + renter.first_name}</h3>
                                <p>Verified</p>
                            </div>
                        }
                        <img src={avatar} alt="avatar" />
                    </div>
                </div>
                <hr className="rental-info-hr"></hr>
                <div className="rental-info-amenities">
                    <h3>Amenities</h3>
                    <div className="rental-info-amenities-wrapper">
                        {
                            rental.amenities && rental.amenities.map((amenity) => (
                                <div className="rental-info-amenity">
                                    <img src={icons[iconNames.indexOf(amenity)]} />
                                    <p>{amenity}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <hr className="rental-info-hr"></hr>
                <div className="rental-info-requirements">
                    <h3>Requirements</h3>
                    <div className="rental-info-requirements-wrapper">
                        <div className="rental-info-requirement">
                            <p className="rental-info-requirement-name">Rent</p>
                            <p>{rental && rental.rent.toLocaleString() + " VND"}</p>
                        </div>
                        <div className="rental-info-requirement">
                            <p className="rental-info-requirement-name">Deposit</p>
                            <p>{rental && rental.deposit.toLocaleString() + " VND"}</p>
                        </div>
                        <div className="rental-info-requirement">
                            <p className="rental-info-requirement-name">Electricity</p>
                            <p>{rental && rental.electricity.toLocaleString() + " VND"}</p>
                        </div>
                        <div className="rental-info-requirement">
                            <p className="rental-info-requirement-name">Water</p>
                            <p>{rental && rental.water.toLocaleString() + " VND"}</p>
                        </div>
                    </div>
                </div>
                <hr className="rental-info-hr"></hr>
                <div className="rental-info-map">
                    <h3>Location</h3>
                    {
                        
                    }
                    
                </div>
                {
                    rental ?
                        (rental.is_available ?
                            (rental.user !== userId ? 
                            <button className="rental-info-contact" onClick={() => contactRenter()}>Contact Renter</button> 
                            :
                            ""
                            )
                            :
                            <div className="rental-info-unavailable">
                                <p>This rental is no longer available.</p>
                            </div>
                        )
                        :
                        ""
                }
                
            </div>
        </div>
    )
}

export default RentalInfo
