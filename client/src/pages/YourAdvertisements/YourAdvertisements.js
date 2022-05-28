import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav/Nav.js";
import RentalBox from "../../components/RentalBox/RentalBox.js";
import "./YourAdvertisements.css";

function YourAdvertisements() {
    const { id } = useParams(); 
    const [result, setResult] = useState([]);

    const getRentals = async () => {
        axios.get(`http://localhost:5000/rental/${id}/all`).then((response) => {
            if (response.data) {
                setResult(response.data);
            }
        }).catch(error => console.log(error.message));
    }

    useEffect(() => {
        getRentals();
    }, []);

    return (
        <div classname="your-ad-wrapper">
            <Nav />
            {
                result ? 
                <div classname="your-ad-results">
                    <div classname="your-ad-filter-box">
                        <p className='rental-after-result-text1'>Results</p>
                        <p className='rental-after-result-text2'> rentals Sort by{' '}
                            <select className='rental-after-filter' >
                                <option value='descending'>Highest to Lowest Price</option>
                                <option value='ascending'>Lowest to Highest Price</option>
                                <option value='most'>Most Amenities</option>
                            </select>
                        </p>
                    </div>
                    <div className="your-ad-listing">
                        {
                            result && result.map(rental => (
                                <RentalBox 
                                    name={rental.property_type + " for Rent at District " + rental.address.district}
                                    rentAmount={rental.rent}
                                    fullAddress={rental.address}
                                    rentalId={rental._id}
                                    userId={rental.user}
                                />
                            ))
                        }
                    </div>
                </div>
                :
                <h2 className="your-ad-no-results">No results</h2>
            }
            
            
        </div>
    )
}

export default YourAdvertisements
