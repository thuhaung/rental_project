import React from 'react';
import "./Homepage.css";
import Rentals from "../Rentals/Rentals.js";
import Advertisements from "../Advertisements/Advertisements.js";
import Nav from "../../components/Nav";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function Homepage() {
  return (
    // <Router>
    //     <div>
    //         <h1>
    //           <Link to="/">Casa</Link>
    //         </h1>
    //         <Nav />
    //     </div>
    //     <Routes>
    //         <Route path="/rentals" exact element={<Rentals />} />
    //         <Route path="/advertisements" exact element={<Advertisements />} />
    //     </Routes>
    // </Router>
    <>
    <h1>Home Page</h1>
    </>
  )
}

export default Homepage
