import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Chatroom.css";
import { io } from "socket.io-client";
import Nav from "../../components/Nav/Nav.js";
import avatar from "../../assets/profile-pic.jpg";
import pic from "../../assets/homepage-rent-image.jpg";
import AmenitiesIcon from '../../assets/AmenitiesIcon';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Image } from "cloudinary-react";
import photo from "../../assets/images-icon.png";

function Chatroom() {
    const icons = AmenitiesIcon;
    const iconNames = ["Kitchen", "AC", "Parking", "Washer", "TV", "Wifi", "Fridge"];
    const cookie = new Cookies();
    const userId = cookie.get("userId");
    const [user, setUser] = useState();
    const [conversations, setConversations] = useState([]);
    const [receivers, setReceivers] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [currentConversation, setCurrentConversation] = useState();
    const [currentReceiver, setCurrentReceiver] = useState();
    const [currentRental, setCurrentRental] = useState();
    const [rentalImage, setRentalImage] = useState();
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [state, setState] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date())
    //const [message, setMessage] = useState();
    //const socket = io("http://localhost:5000/");

    const getAllConversations = async () => {
        axios.get(`http://localhost:5000/chatroom/conversation/${userId}`).then((response) => {
            if (response.data) {
                setConversations(response.data);
                for (let i in response.data) {
                    const members = response.data[i].members;
                    const receiverId = members.filter(member => member !== userId);
                    const rentalId = response.data[i].rental;
                    getAllReceiverNames(receiverId);
                    getAllRentalInfo(rentalId);
                }
            }
        }).catch((error) => console.log(error.message));
    }

    const getAllReceiverNames = async (receiverId) => {
        axios.get(`http://localhost:5000/user/${receiverId}`).then((response) => {
            if (response.data) {
                setReceivers(prev => [...prev, response.data]);
            }
        }).catch((error) => console.log(error.message));
    }

    const getAllRentalInfo = async (rentalId) => {
        axios.get(`http://localhost:5000/rental/${rentalId}`).then((response) => {
            if (response.data) {
                setRentals(prev => [...prev, response.data]);
            }
        }).catch((error) => console.log(error.message));
    }

    const getRentalImage = async (rentalId, userId) => {
        axios.get(`http://localhost:5000/advertisement/${userId}/${rentalId}/images`).then((response) => {
            if (response.data) {
                setRentalImage(response.data[0]);
            }
        }).catch((error) => console.log(error.message));
    }

    useEffect(() => {
        
        
        getAllConversations();
    }, [currentConversation, messages, state, currentDate]);

    const submitImage = (messageId) => {
        axios.post("http://localhost:5000/advertisement/upload-image", {image: selectedImage, conversationId: currentConversation._id, messageId: messageId}, { withCredentials: true }).then((response) => {
          if (response.data) {
              console.log("ok");
          }
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const saveImage = async (messageId, conversationId) => {
        axios.post("http://localhost:5000/chatroom/message/upload-image", {image: selectedImage, messageId: messageId, conversationId: conversationId}, {withCredentials: true}).then((response) => {
            if (response.data) {
                console.log("Image uploaded.");
            }
        }).catch((error) => console.log(error.message));
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
            const form = {
                conversation: currentConversation._id,
                sender: userId,
                text: text,
            }
            axios.post("http://localhost:5000/chatroom/message", form).then((response) => {
                if (response.data) {
                    console.log("ok");
                }
            }).catch((error) => console.log(error.message));
        }
        else {
            const form = {
                conversation: currentConversation._id,
                sender: userId,
                contains_image: true
            }
            axios.post("http://localhost:5000/chatroom/message", form).then((response) => {
                if (response.data) {
                    saveImage(response.data._id, response.data.conversation);
                }
            }).catch((error) => console.log(error.message));
        }
        setText("");
        setSelectedImage();
    }

    const getMessages = async (conversationId) => {
        axios.get(`http://localhost:5000/chatroom/message/${conversationId}`).then((response) => {
            if (response.data) {
                setMessages(response.data);
                for (let i in response.data) {
                    if (response.data[i].sender !== userId) {
                        if (!response.data[i].seen) {
                            getMessageStatus(response.data[i]._id);
                        }
                    }
                    if (!response.data[i].text) {
                        getImage(conversationId, response.data[i]._id);
                    }
                }
            }
        }).catch((error) => console.log(error.message));
    }

    const getMessageStatus = async (messageId) => {
        axios.get(`http://localhost:5000/chatroom/message/${messageId}/set-status`).then((response) => {
            if (response.data) {
                console.log(response.data);
            }
        }).catch((error) => console.log(error.message));
    }

    const getImage = async (conversationId, messageId) => {
        axios.get(`http://localhost:5000/chatroom/message/${conversationId}/${messageId}/image`).then((response) => {
            if (response.data) {
                setImages(prev => [...prev, {messageId: messageId, image: response.data}]);
            }
        }).catch((error) => console.log(error.message));
    }

    const previewImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        }
    }

    const displayImage = (messageId) => {
        for (let i in images) {
            if (images[i].messageId === messageId) {
                return <Image className="chatroom-box-message-attachment" cloud_name="heroinism" publicId={images[i].image.toString()} />
                //console.log(images[i].image);
            }
        }
    }

    const closeDeal = async (rentalId) => {
        axios.post("http://localhost:5000/rental/update-status", { rentalId: rentalId }, { withCredentials: true }).then((response) => {
            if (response.data) {
                console.log(response.data);
            } 
        }).catch((error) => console.log(error.message));
    }

    return (
        <div className="chatroom">
            <Nav />
            <hr className="chatroom-hr"></hr>
            <div className="chatroom-wrapper">
                <div className="chatroom-nav">
                    <h2>Chat</h2>
                    <div className="chatroom-listing">
                        {
                            receivers && conversations.map((convo, index) => (
                                <div key={index} className={"chatroom-listing-item" + (currentRental ? (currentRental._id === rentals[index]._id ? "-active" : "") : "")} onClick={() => {setCurrentConversation(convo); setCurrentReceiver(receivers[index]); setCurrentRental(rentals[index]); getRentalImage(rentals[index]._id, rentals[index].user); getMessages(convo._id); setText("")}}>
                                    <img src={avatar} alt="avatar" />
                                    <div className="chatroom-listing-item-preview">
                                        <h3>{receivers && receivers[index]?.first_name} • {rentals && (rentals[index]?.user === userId ? "Your District " : "Their District ") + rentals[index]?.address?.district + " " + rentals[index]?.property_type}</h3>
                                        <p>{convo.latest_message ? (convo.latest_message.sender === userId ? "You: " : (receivers && receivers[index]?.first_name + ": ")) : ""}{convo.latest_message ? (convo.latest_message.text ? convo.latest_message.text.slice(0, 26) + "..." : "Attachment") : ""}</p>
                                    </div>
                                </div> 
                            ))
                        }
                    </div>
                </div>
                <div className="chatroom-box">
                    <div className="chatroom-box-user-info">
                        <img src= {avatar} alt="avatar" />
                        <h3>{currentReceiver ? currentReceiver?.first_name + " • " : ""}  {currentRental ? (currentRental.user === userId ? "Your District " : "Their District ") + currentRental?.address?.district + " " + currentRental?.property_type : ""}</h3>
                    </div>
                    <div className="chatroom-box-messages">
                        <div className="their-chatroom-box-message">
                            <p>Test message</p>
                            
                        </div>
                        <div className="their-chatroom-box-message">
                            <p>Test message</p>
                            
                        </div>
                        
                        {
                            messages && messages.map((message, index) => (
                                <div key={index} className={(message.sender === userId? "your-" : "their-") + "chatroom-box-message"}>
                                    {
                                        message.text ? 
                                        <p>{message.text}</p> : 
                                        displayImage(message._id)
                                        /*<Image cloud_name="heroinism" public_id={getImage(currentConversation._id, message._id)} />*/
                                    }
                                    <p className="chatroom-box-message-seen">{index === messages.length - 1 ? (messages[index].sender === userId ? (messages[index].seen ? "Seen" : "Delivered") : "") : ""}</p>
                                </div>
                            ))
                        }

                    </div>
                
                <div className="chatroom-box-form">
                        <label className="chatroom-box-upload-img">
                            <input type="file" style={{display: "hidden"}} onChange={(e) => previewImage(e)} accept="image/png, image/jpeg, image/jpg, image/webp" />
                            <img src={photo} className="chatroom-box-add-img" alt="" />
                        </label>
                        {
                            selectedImage ? 
                            <div className="chatroom-box-image-wrapper">
                                <img className="chatroom-box-image" src={selectedImage} alt="img-attachment"/>
                                <button className="chatroom-box-image-remove-btn" onClick={() => setSelectedImage()}>x</button>
                                <p>Attached image</p>
                            </div>
                            :
                            (
                                currentRental && currentRental.is_available ? 
                                <input type="text" placeholder="Send a message..." value={text} className="chatroom-box-input" onChange={(e) => setText(e.target.value)}/>
                                : <input type="text" disabled={true} placeholder="Send a message..." value={text} className="chatroom-box-input" onChange={(e) => setText(e.target.value)}/>
                            )
                        }
                        <button className="chatroom-box-send-btn" onClick={(e) => {sendMessage(e); getMessages(currentConversation._id)}}>Send</button>
                    </div>
                </div>
                <div className="chatroom-rental">
                    {
                        rentals && currentRental && rentalImage &&
                        <>

                            <Image cloud_name="heroinism" public_id={rentalImage} onClick={() => navigate(`../rentals/${currentRental._id}`)}/>
                            <div className="chatroom-rental-info">
                                <h3>{currentRental.property_type} for Rent at District {currentRental.address.district}</h3>
                                <p>{currentRental.address.num + " " + currentRental.address.street + " Ward " + currentRental.address.ward + ", District " + currentRental.address.district}</p>
                                <p>{currentRental.num_of_bedrooms} bedrooms • {currentRental.num_of_bathrooms} bathrooms</p>
                                <p>{currentRental.rent/1000000} mil/month</p>
                                <div className="chatroom-rental-amenities">
                                    {
                                        currentRental.amenities.map(amenity => (
                                            <img src={icons[iconNames.indexOf(amenity)]} />
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                currentRental ?
                                    (currentRental.user === userId ?
                                        (
                                            currentRental.is_available ? 
                                            <button className="chatroom-rental-btn" onClick={() => {closeDeal(currentRental._id); setState(prev => prev + 1)}}>Close deal</button>
                                            : 
                                            <div className="chatroom-rental-success">
                                                <p>Deal complete</p>
                                            </div>
                                        ) :
                                        (
                                            !currentRental.is_available ?
                                            <div className="chatroom-rental-not-available">
                                                <p>Rental is no longer available</p>
                                            </div> 
                                            :
                                            ""
                                        )
                                    )
                                : ""
                            }   
                        </>
                    }
                </div>    
            </div>
        </div>
    )
}

export default Chatroom
