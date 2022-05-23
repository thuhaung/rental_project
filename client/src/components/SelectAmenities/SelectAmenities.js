import React, { useEffect, useState } from 'react'
import "./SelectAmenities.css";
import AmenitiesIcon from '../../assets/AmenitiesIcon';

function SelectAmenities({ onClick }) {
    const icons = AmenitiesIcon;
    const iconNames = ["Kitchen", "AC", "Parking", "Washer", "TV", "Wifi", "Fridge"];
    const [amenities, setAmenities] = useState([]);
    const [isActive, setIsActive] = useState([]);

    useEffect(() => {
        onClick(amenities);
    }, [amenities]);

    return (
        <div className="select-amenities-wrapper">
            {icons.map((icon, index) => 
                <div key={index} className={"select-amenities-box" + (isActive.includes(index) ? "-active" : "")} 
                    onClick={() =>
                        isActive.includes(index) ?
                        (setIsActive(isActive.filter(item => item !== index)), setAmenities(amenities.filter(item => item !== iconNames[index]))) :
                        (setIsActive(prev => [...prev, index]), setAmenities(prev => [...prev, iconNames[index]]))
                    }>
                    <img src={icon} alt={icon} className="select-amenities-icon"/>
                </div>    
            )}
        </div>
    )
}

export default SelectAmenities
