import React, { useState } from 'react'
import "./PropertyType.css";

function PropertyType({ onClick }) {
    const [isActive, setIsActive] = useState(0);

    return (
        <div className="property-type">
            <div className="property-type-form">
                <input type="button" className={"property-type-form-btn" + (isActive === 1 ? "-active" : "")} onClick={(e) => {setIsActive(1); onClick(e)}} value="Apartment" />
                <input type="button" className={"property-type-form-btn" + (isActive === 2 ? "-active" : "")} onClick={(e) => {setIsActive(2); onClick(e)}} value="Room" />
                <input type="button" className={"property-type-form-btn" + (isActive === 3 ? "-active" : "")} onClick={(e) => {setIsActive(3); onClick(e)}} value="House" />
            </div>
        </div>
    )
}

export default PropertyType
