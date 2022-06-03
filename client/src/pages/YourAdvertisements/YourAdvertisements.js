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
        <div className="your-ad">
            <Nav />
            <div className="your-ad-container">
                <div className="your-ad-result-filter-box">
                    <p className="your-ad-title">Your advertisements</p>
                    <p className="your-ad-sort">{result.length} rentals Sort by{' '}
                    <select className="your-ad-select-filter" >
                        <option value='descending'>Highest to Lowest Price</option>
                        <option value='ascending'>Lowest to Highest Price</option>
                        <option value='most'>Most Amenities</option>
                    </select></p>
                </div>
                {
                    result ? 
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
                    :
                    <h2 className="your-ad-no-results">No results</h2>
                }
            </div>
        </div> 
    )
}

export default YourAdvertisements
