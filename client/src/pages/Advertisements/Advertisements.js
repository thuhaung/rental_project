import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./Advertisements.css";

function Advertisements() {
  return (
    <div>
      <button><Link to="/advertise-place">Advertise a place</Link></button>
    </div>
  )
}

export default Advertisements
