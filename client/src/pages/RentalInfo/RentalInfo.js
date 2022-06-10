import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Nav from "../../components/Nav/Nav.js";
import "./RentalInfo.css";
import { Image } from "cloudinary-react";
import loading from "../../assets/loading-img.png";
import avatar from "../../assets/profile-pic.jpg";
import AmenitiesIcon from '../../assets/AmenitiesIcon.js';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Cookies from "universal-cookie";
import { Map, Marker } from "pigeon-maps";
import { maptiler } from 'pigeon-maps/providers';
import Footer from '../../components/Footer/Footer.js';
import verified from "../../assets/verified.png";
import AddressForm from '../../components/AddressForm/AddressForm.js';
import Rooms from '../../components/Rooms/Rooms.js';
import SelectAmenities from '../../components/SelectAmenities/SelectAmenities.js';
import SelectPrice from '../../components/SelectPrice/SelectPrice.js';
import ImageUpload from '../../components/ImageUpload/ImageUpload.js';
import Modal from 'react-modal';
import "../../components/ImageUpload/ImageUpload.css";
import icon from "../../assets/images-icon.png";
import { RentalImage, RentalGeneral } from '../../model/Rental.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';



function RentalInfo() {
<<<<<<< HEAD
    //const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyC5qHhy7lazQbxUKO0WtOizl0ISGIsu18U" })
    // const [rentalName, setRentalName] = useState("");
    // const [address, setAddress] = useState("");
    // const [district, setDistrict] = useState("");
    // const [amenities, setAmenities] = useState([]);
    // const [rent, setRent] = useState("");
    // const [deposit, setDeposit] = useState("");
    // const [water, setWater] = useState("");
    // const [electricity, setElectricity] = useState("");
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const maptilerProvider = maptiler('CnzknMBRrl0lmKvk9umd', 'streets');
=======
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const maptilerProvider = maptiler('CnzknMBRrl0lmKvk9umd', 'streets');
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyC5qHhy7lazQbxUKO0WtOizl0ISGIsu18U" })
>>>>>>> 8a73d773177684537f65e55d61feb9422a959ce5
    const icons = AmenitiesIcon;
    const [rental, setRental] = useState("");
    const [renter, setRenter] = useState({});
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const iconNames = ["Kitchen", "AC", "Parking", "Washer", "TV", "Wifi", "Fridge"];
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const formElementStyle = {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
    const axiosPrivate = useAxiosPrivate();

    const getRental = async () => {
        axios.get(`http://localhost:5000/rental/${id}`).then((response) => {
            if (response.data) {
                const item = response.data;
                console.log(item);
                setRental(item);
                getRenter(item.user);
                getImages(id, item.user);
                //getLocation(item);
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
        axios.get(`http://localhost:5000/advertisement/${userId}/${rentalId}/images`).then((response) => {
            // console.log('image???', response.data);
            setImages(response.data);
            // setImages([])
        }).catch((error) => console.log(error.message));
    }
    
    const getLocation = async (rental) => {
        /*const location = rental.address.num + " " + rental.address.street + " District " + rental.address.district + " " + rental.address.city;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {params: {address: location, key: "AIzaSyCEKMFxGQT1dKWt2ljFcG5I2C9lSFxCe_M"}})
        .then((response) => {
            setLat(response.data.results[0].geometry.location.lat);
            setLng(response.data.results[0].geometry.location.lng);
        })
        .catch((error) => console.log(error.message));*/
    }

    useEffect(() => {
        getRental();

    }, []);

    // const handleChange = (address) => {
    //     setAddress(address);
    // }


    const contactRenter = () => {
        const form = {
            senderId: userId,
            receiverId: rental.user,
            rentalId: rental._id
        }
        console.log(form);
        axiosPrivate.post("/chatroom/conversation", form).then((response) => {
            if (response.data) {
                navigate(`../user/${userId}/chatroom`);
            }
        }).catch((error) => console.log(error.message));
    }

    const handlePreviewImage = (e) => {
        const files = e.target.files
        previewImage(files)
    }
    const previewImage = (files) => {
        // console.log('files???', files)
        for (let i in files) {
            const reader = new FileReader();
            // console.log('reader fuck', reader)
            reader.readAsDataURL(files[i]);
            // console.log('FUCK', reader.result)
            reader.onloadend = () => {
                setEditingImages(prev => [...prev, reader.result]);
                setAddedImages(prev => [...prev, reader.result])
            }
        }  
    }
    function openModal() {
        console.log('rental fuck', rental)

        // Set address
        setEditingAddress(rental.address)
        setEditingStreet(rental.address.street)
        setEditingCity(rental.address.city)
        setEditingDistrict(rental.address.district)
        setEditingNum(rental.address.num)
        setEditingWard(rental.address.ward)

        // Set room
        setEditingBedroomNum(rental.num_of_bedrooms)
        setEditingBathroomNum(rental.num_of_bathrooms)

        // Set amenities
        setEditingAmenities(rental.amenities)

        // Set image
        setEditingImages(images)

        // Set price
        setEditingRent(rental.rent)
        setEditingDeposit(rental.deposit)
        setEditingWater(rental.water)
        setEditingElectricity(rental.electricity)

        // Set modal
        setIsOpen(true);
    
      }
    function closeModal() {
    setIsOpen(false);
    }

    /**************** States & Functions for Editing Rental Page ****************/

     const [editingBedroomNum, setEditingBedroomNum] = useState();
     const [editingBathroomNum, setEditingBathroomNum] = useState();
     const [editingAmenities, setEditingAmenities] = useState([]);
     const [editingDeposit, setEditingDeposit] = useState();
     const [editingRent, setEditingRent] = useState();
     const [editingElectricity, setEditingElectricity] = useState();
     const [editingWater, setEditingWater] = useState();
     const [editingStreet, setEditingStreet] = useState("");
     const [editingNum, setEditingNum] = useState("");
     const [editingWard, setEditingWard] = useState("");
     const [editingDistrict, setEditingDistrict] = useState("");
     const [editingCity, setEditingCity] = useState("");
     const [editingaAddress, setEditingAddress] = useState({});
     const [editingImages, setEditingImages] = useState([]);
     const [removedImages, setRemovedImages] = useState([]);
     const [addedImages, setAddedImages] = useState([]);

    const handleAddress = (val) => {
        setEditingStreet(val.street);
        setEditingNum(val.num);
        setEditingWard(val.ward);
        setEditingDistrict(val.district);
        setEditingCity(val.city);
        setEditingAddress(val);
    }
    const handleBedroom = (val) => {
        setEditingBedroomNum(val);
      }
    
      const handleBathroom = (val) => {
        setEditingBathroomNum(val);
      }
    
      const handleAmenities = (arr) => {
        setEditingAmenities(arr);
      }
    
      const handleRent = (val) => {
        setEditingRent(val);
      }
    
      const handleDeposit = (val) => {
        setEditingDeposit(val);
      }
    
      const handleElectricity = (val) => {
        setEditingElectricity(val);
      }
    
      const handleWater = (val) => {
        setEditingWater(val);
      }
    const checkImageForUpdate = () => {
        let initialImages = images;
        let oldImages = removedImages;
        // Return the delete images. 
        let checkedImages = {
            addImages: [],
            deletedImages: []
        }
        checkedImages.deletedImages = oldImages.filter(img => initialImages.indexOf(img) > -1);
        console.log('checkedImages.deletedImages',checkedImages.deletedImages)
        
    }
    const updateRentalGeneral = () => {
        checkImageForUpdate()
        const updatedRental = {
            addImages: [addedImages],
            deleteImages: [removedImages],
            info: new RentalGeneral(
                userId,
                rental.property_type,
                editingBedroomNum,
                editingBathroomNum,
                editingAmenities,
                editingRent,
                editingDeposit,
                editingWater,
                editingElectricity,
                editingaAddress
            )
        }
        
        console.log('updatedRental', updatedRental)
        axios.put(
            `http://localhost:5000/rental/${rental._id}`, 
            updatedRental, 
            { 
                withCredentials: true 
            }).then((response) => {
                if (response.data) {
                    // Reload page with updated data
                    window.location.reload()
                }
            }).catch((error) => console.log(error.message));
    }
    const handleSaveForLater = async () => {
        // console.log('rental', rental, 'and userId', cookies)
        axiosPrivate.put("/user/save-rentals",{
            rental,
            cookies
        }).then((response) => {
            // console.log('rental response save', response)
        }).catch((error) => {
            console.log(error.message);
        })
        alert('Added to "Saved Rentals". You can visit them later in your profile.')
    }
    /**************** End of defining states and functions for Editing Rental Page****************/
    
    const showModal = () => (
        rental && 
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
        >
            <div style={formElementStyle}>
                <AddressForm 
                    onClickAddress={handleAddress}
                    streetVar={editingStreet}
                    numVar={editingNum}
                    wardVar={editingWard}
                    districtVar={editingDistrict}
                    cityVar={editingCity}
                />
            </div>
            <div style={formElementStyle}>
                <Rooms
                    onClickBedroom={handleBedroom}
                    onClickBathroom={handleBathroom}
                    numBed={editingBedroomNum}
                    numBath={editingBathroomNum}
                />
            </div>
            <div style={formElementStyle}>
                <SelectAmenities
                    onClick={handleAmenities}
                    active={editingAmenities}
                />
            </div>
            <div style={formElementStyle}>
                <SelectPrice
                    onClickRent={handleRent}
                    onClickDeposit={handleDeposit}
                    onClickElectricity={handleElectricity}
                    onClickWater={handleWater}
                    rentVar={editingRent}
                    depositVar={editingDeposit}
                    electricityVar={editingElectricity}
                    waterVar={editingWater}
                />
            </div>
            <div style={formElementStyle} className="rental-image-wrapper">
                {
                    editingImages.length > 0 ?
                    <div className="rental-image-upload-wrapper">
                        <div className="rental-image-upload">
                            <h2>Add up to 5 photos</h2>
                            <label 
                                className="rental-image-upload-label" 
                                style={{display: editingImages.length === 5 ? "none" : "block"}}>
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={handlePreviewImage} 
                                    accept="image/png, image/jpeg, image/jpg, image/webp"/>
                                Upload
                            </label>
                        </div>
                        <div className="rental-image-list">
                            {
                                editingImages && editingImages.map((image, index) => {
                                    console.log('editing image after upload', editingImages)
                                    return(
                                        <div className="rental-image-specific">
                                            {
                                                image.includes('data:image') 
                                                ? <img key={index} src={image}/>
                                                : <Image key={index} cloud_name="heroinism" public_id={image}/>
                                            }
                                            <button 
                                                className="rental-image-remove-btn" 
                                                onClick={() => {
                                                    setEditingImages(editingImages.filter((item) => item !== image)); 
                                                    setRemovedImages(editingImages.filter((item) => item == image))
                                                }}>
                                                Remove
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    :
                    <div className="rental-image-first-upload-wrapper">
                        <div className="rental-image-upload-first-time">
                            <div className="rental-image-upload-first-time-illustration">
                                <img src={icon} alt="image-upload"/>
                                <h2>Add up to 5 photos</h2>
                            </div>
                            <label className="rental-image-first-time-upload-label">
                                <input type="file" multiple onChange={handlePreviewImage} accept="image/png, image/jpeg, image/jpg, image/webp"/>
                                <u>Upload from your device</u>
                            </label>
                        </div>
                    </div>
                }
            </div>
            <hr></hr>
            <div style={formElementStyle}>
                <div className="rental-save-btn" onClick={(e) => {
                    updateRentalGeneral();
                    setIsOpen(false);
                    
                }}>
                    Save
                </div>
            </div>
            
        </Modal>
    )

    return (
        <div className="rental-info-wrapper">
            <Nav />
            
            <div className="rental-info-general-card">
                <div className="rental-info-title">
                    <h2>{rental && rental.property_type + " for Rent at District " + rental.address.district}</h2>
                    {
                        (rental && rental.user === userId) ? <button className="rental-info-edit-btn" onClick={openModal}>Edit</button>
                        :<button className="rental-info-save-btn" onClick={handleSaveForLater}>Save for later</button>  
                    }
                </div>
                <div className='rental-page-edit__modal'>
                    {showModal()}
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
                                <div className="rental-info-is-verified">
                                    <p>Verified</p>
                                    <img src={verified} /> 
                                </div>   
                            </div>
                        }
                        <img src={avatar} alt="avatar" style={{cursor: "pointer"}} onClick={() => navigate(`../user/${rental.user}/info`)}/>
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
                    {  /*
                        lat && lng &&
                        <Map height={300} defaultCenter={[lat, lng]} defaultZoom={11}  provider={maptilerProvider}>
                            <Marker width={50} anchor={[lat, lng]} />
                        </Map>
                        */
                    
                    /*
                        <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName="map-container">

                        </GoogleMap>
                    */}
                    
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
