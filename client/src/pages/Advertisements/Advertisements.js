import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from "../../components/Footer/Footer.js";
import { Link } from "react-router-dom";
import "./Advertisements.css";
import Background from "../../assets/Rectangle 31.png"
import Nav from "../../components/Nav/Nav"

function Advertisements() {
  return (
    <>
      <Nav />
      <div className='advertisement-main-container'>
        <div className='advertisement-background-container'>
          <div className='advertisement-background-grid'></div>
          <img src={Background} className='advertisement-background-image' />
        </div>
        <div className='advertisement-wrapper-text'>
          <p className='advertisement-text1'>Have a place for renting?</p>
          <p className='advertisement-text2'>Let us help you every step of the way to<br></br> achieve a successful deal.</p>
          <button className='advertisement-btn'><Link style={{ color: 'white', fontSize: '20px', fontWeight: '600' }} to="/advertise-place">Try advertising</Link></button>
        </div>
      </div>
      <div className='advertisement-sub-container'>
        <p className='advertisement-sub-text1'>How to get started</p>
        <p className='advertisement-sub-text2'>An overview of the process from start to finish</p>
        <div className='advertisement-box-container'>
          <div className='advertisement-sub-box'>
            <div className='advertisement-box-info'>
              <div className='advertisement-sub-circle'>1</div>
              <p className='advertisement-box-text'>Learn about our policies & requirements</p>
              <p className='advertisement-box-sub-text'>Make sure your identification and property are verified.</p>
            </div>
          </div>
          <div className='advertisement-sub-box'>
            <div className='advertisement-box-info'>
              <div className='advertisement-sub-circle'>2</div>
              <p className='advertisement-box-text'>Provide information about your place</p>
              <p className='advertisement-box-sub-text'>This includes general information, amenities and additional descriptions.</p>
            </div>
          </div>
          <div className='advertisement-sub-box'>
            <div className='advertisement-box-info'>
              <div className='advertisement-sub-circle'>3</div>
              <p className='advertisement-box-text'>Start advertising</p>
              <p className='advertisement-box-sub-text'>Answer questions from rentees through our messaging system.</p>
            </div>
          </div>
        </div>
        <div className='advertisement-sub-wrapper-btn'>
          <button className='advertisement-btn'><Link style={{ color: 'white', fontSize: '25px', fontWeight: '600' }} to="/advertise-place">Let's go</Link></button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Advertisements
