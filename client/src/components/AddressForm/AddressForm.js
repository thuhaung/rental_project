import React, { useState, useEffect } from 'react'
import "./AddressForm.css";

function AddressForm({ onClickAddress, streetVar, numVar, wardVar, districtVar, cityVar }) {

    const [street, setStreet] = useState(streetVar);
    const [num, setNum] = useState(numVar);
    const [city, setCity] = useState(cityVar);
    const [ward, setWard] = useState(wardVar);
    const [district, setDistrict] = useState(districtVar);

    useEffect(() => {
        const form = {
            "street": street,
            "num": num,
            "ward": ward,
            "district": district,
            "city": city
        }
        onClickAddress(form);
    }, [street, num, ward, district, city]);

    return (
        <div className="address-form-wrapper">
            {/* <h2>Enter your address</h2> */}
            <div className="address-form-main">
                <input type="text" className="address-form-start" value={street} placeholder={street ? street : "Street"} onChange={(e) => setStreet(e.target.value)}/>
                <input type="text" value={num} placeholder={num ? num : "Building number"} onChange={(e) => setNum(e.target.value)}/>
                <input type="text" value={ward} placeholder={ward ? ward : "Ward"} onChange={(e) => setWard(e.target.value)}/>
                <input type="text" value={district} placeholder={district ? district : "District"} onChange={(e) => setDistrict(e.target.value)}/>
                <input type="text" value={city} placeholder={city ? city : "City"} onChange={(e) => setCity(e.target.value)}/>
                <input type="text" className="address-form-end" placeholder="Vietnam" readOnly={true}/>
            </div>
        </div>
    )
}

export default AddressForm
