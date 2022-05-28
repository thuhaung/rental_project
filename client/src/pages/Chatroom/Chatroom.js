import React, { useState, useEffect } from 'react'
import "./Chatroom.css";
import io from "socket.io-client";
import Nav from "../../components/Nav/Nav.js";
import avatar from "../../assets/profile-pic.jpg";
import pic from "../../assets/homepage-rent-image.jpg";
import AmenitiesIcon from '../../assets/AmenitiesIcon';

const socket = io.connect("http://localhost:5000");

function Chatroom() {
    const icons = AmenitiesIcon;
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    const joinRoom = () => {

    };

    return (
        <div className="chatroom">
            <Nav />
            <hr className="chatroom-hr"></hr>
            <div className="chatroom-wrapper">
                <div className="chatroom-nav">
                    <h2>Chat</h2>
                    <div className="chatroom-listing">
                        <div className="chatroom-listing-item">
                            <img src={avatar} alt="avatar" />
                            <div className="chatroom-listing-item-preview">
                                <h3>Ken Pham</h3>
                                <p>Hello</p>
                            </div>
                        </div>
                        <div className="chatroom-listing-item">
                            <img src={avatar} alt="avatar" />
                            <div className="chatroom-listing-item-preview">
                                <h3>Ken Pham</h3>
                                <p>Hello</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chatroom-box">
                    <div className="chatroom-box-user-info">
                        <img src= {avatar} alt="avatar" />
                        <h3>Ken Pham</h3>
                    </div>
                    <input type="text" placeholder="Send a message..." className="chatroom-box-input"/>
                </div>
                <div className="chatroom-rental">
                    <img src={pic} alt="rental" />
                    <div className="chatroom-rental-info">
                        <h3>Apartment for Rent at District Tan Binh</h3>
                            <p>70/15A Nguyen Sy Sach Ward 12, District Tan Binh</p>
                            <p>1 bedrooms • 1 bathrooms</p>
                            <p>7 mil/month</p>
                            <div className="chatroom-rental-amenities">
                                {icons.map(icon => (
                                    <img src={icon} alt="amenity" />
                                ))}
                            </div>
                    </div>
                    <button className="chatroom-rental-btn">Close deal</button>
                </div>
            </div>
        </div>
    )
}

export default Chatroom
