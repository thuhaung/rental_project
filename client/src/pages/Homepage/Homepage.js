import React from 'react';
import "./Homepage.css";
import Rentals from "../Rentals/Rentals.js";
import Advertisements from "../Advertisements/Advertisements.js";
import Nav from '../../components/Nav/Nav';
import rent from "../../assets/homepage-rent-image.jpg";
import advertise from "../../assets/homepage-advertise-image.jpg";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Footer from '../../components/Footer/Footer';

function Homepage() {
  return (
    <div>
      <Nav />
      <div className="homepage-wrapper">
        <div className="homepage-rent-wrapper">
          <div className="homepage-rent-textbox">
            <h2>Rent your dream space</h2>
            <p>Find the perfect home with our application.</p>
            <button className="homepage-btn"><Link className="homepage-link" style={{color: 'white'}} to="/rentals">Explore rentals</Link></button>
          </div>
          <div className="homepage-rent-image">
            <div className="decorative-box" />
            <img src={rent} alt="rent" />
          </div>
        </div>
        <div className="homepage-advertise-wrapper">
          <div className="homepage-advertise-textbox">
            <h3>Advertise a home</h3>
            <p>Find rentees quickly through our easy application process.</p>
            <button className="homepage-btn"><Link className="homepage-link" style={{color: 'white'}} to="/advertisements">Explore options</Link></button>
          </div>
          <img src={advertise} alt="advertise" />
        </div>
      </div>
      <Footer />
    </div>
    
  )
}

export default Homepage
