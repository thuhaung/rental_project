import React, { useEffect, useState } from 'react'
import "./Rooms.css";

function Rooms({ onClickBedroom, onClickBathroom }) {
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(1);

    const incrementBed = () => {
        if (bedrooms < 5) {
            setBedrooms(prev => prev + 1);
        }
    }

    const decrementBed = () => {
        if (bedrooms > 0) {
            setBedrooms(prev => prev - 1);
        }
    }

    const incrementBath = () => {
        if (bathrooms < 5) {
            setBathrooms(prev => prev + 1);
        }
    }

    const decrementBath = () => {
        if (bathrooms > 1) {
            setBathrooms(prev => prev - 1);
        }
    }

    useEffect(() => {
        onClickBedroom(bedrooms);
        onClickBathroom(bathrooms);
    }, [bedrooms, bathrooms]);

    return (
        <div className="rooms-wrapper">
            <div className="rooms-form">
                <h2>Bedrooms</h2>
                <div className="rooms-count">
                    <p onClick={decrementBed}>-</p>
                    <h3>{bedrooms}</h3>
                    <p onClick={incrementBed}>+</p>
                </div>
            </div>
            <div className="rooms-form">
                <h2>Bathrooms</h2>
                <div className="rooms-count">
                    <p onClick={decrementBath}>-</p>
                    <h3>{bathrooms}</h3>
                    <p onClick={incrementBath}>+</p>
                </div>
            </div>
        </div>
    )
}

export default Rooms
