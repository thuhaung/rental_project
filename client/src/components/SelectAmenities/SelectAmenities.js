import React, { useEffect, useState } from 'react'
import "./SelectAmenities.css";
import AmenitiesIcon from '../../assets/AmenitiesIcon';

function SelectAmenities({ onClick, active }) {
    const icons = AmenitiesIcon;
    const iconNames = ["Kitchen", "AC", "Parking", "Washer", "TV", "Wifi", "Fridge"];
    const [amenities, setAmenities] = useState(active);
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
        onClick(amenities);
    }, [amenities]);

    return (
        <div className="select-amenities-wrapper">
            {icons.map((icon, index) => 
                <div key={index} className={"select-amenities-box" + (isActive.includes(iconNames[index]) ? "-active" : "")} 
                    onClick={() =>
                        isActive.includes(iconNames[index]) ?
                        (setIsActive(isActive.filter(item => item !== iconNames[index])), setAmenities(amenities.filter(item => item !== iconNames[index]))) :
                        (setIsActive(prev => [...prev, iconNames[index]]), setAmenities(prev => [...prev, iconNames[index]]))
                    }>
                    <img src={icon} alt={icon} className="select-amenities-icon"/>
                </div>    
            )}
        </div>
    )
}

export default SelectAmenities
