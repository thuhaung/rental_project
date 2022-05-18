import React from 'react';
import "./Homepage.css";
import Rentals from "../Rentals/Rentals.js";
import Advertisements from "../Advertisements/Advertisements.js";
import Nav from '../../components/Nav/Nav';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function Homepage() {
  return (
    <Nav />
  )
}

export default Homepage
