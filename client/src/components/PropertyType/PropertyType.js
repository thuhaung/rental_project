import React, { useState } from 'react'
import "./PropertyType.css";

function PropertyType({ onClick, active }) {
    const [isActive, setIsActive] = useState(active);

    return (
        <div className="property-type">
            <div className="property-type-form">
                <input type="button" className={"property-type-form-btn" + (isActive === "Apartment" ? "-active" : "")} onClick={(e) => {setIsActive("Apartment"); onClick(e)}} value="Apartment" />
                <input type="button" className={"property-type-form-btn" + (isActive === "Room" ? "-active" : "")} onClick={(e) => {setIsActive("Room"); onClick(e)}} value="Room" />
                <input type="button" className={"property-type-form-btn" + (isActive === "House" ? "-active" : "")} onClick={(e) => {setIsActive("House"); onClick(e)}} value="House" />
            </div>
        </div>
    )
}

export default PropertyType
