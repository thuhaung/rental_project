import React, { useEffect, useState } from 'react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import RentalBox from "../../../components/RentalBox/RentalBox.js";
import { Link } from "react-router-dom";

function UserSaved() {
    const [rentals, setRentals] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const getRentals = async () => {
        axiosPrivate.get("/user/saved-rentals/all").then((response) => {
            if (response.data) {
                setRentals(response.data);
            }
        }).catch((error) => console.log(error.message));
    }

    function handleFilter(e) {
        const sortedRentals = [...rentals];

        switch (e.target.value) {
            case 'descending':
                sortedRentals.sort((a, b) => (a.rent < b.rent) ? 1 : -1)
                setRentals(sortedRentals)
                console.log('Descending', sortedRentals)
                break;
            case 'ascending':
                sortedRentals.sort((a, b) => (a.rent > b.rent) ? 1 : -1)
                setRentals(sortedRentals)
                console.log('Ascending', sortedRentals)
                break;
            case 'most':
                sortedRentals.sort((a, b) => (a.amenities.length < b.amenities.length ? 1 : -1))
                setRentals(sortedRentals)
                console.log('Amenities', sortedRentals)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getRentals();
    }, [rentals]);

    return (
        rentals.length > 0 ?
        <div className="user-info-show-rentals">
            <div className="user-info-result-filter-box">
                <p className='user-info-result-text1'>Rentals</p>
                <p className='user-info-result-text2'>{rentals && rentals.length} rentals Sort by{' '}
                <select className='user-info-after-filter' onChange={handleFilter}>
                    <option value='descending'>Highest to Lowest Price</option>
                    <option value='ascending'>Lowest to Highest Price</option>
                    <option value='most'>Most Amenities</option>
                </select></p>
            </div>
            <div className="user-info-show-rentals-listing">
                {
                    rentals && rentals.map(rental => (
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
        <div className="user-info-show-no-rentals">
            <p>Have a place to advertise? Explore your options </p> 
            <h3><Link to="/advertise-place">here.</Link></h3>
        </div>
    );
}

export default UserSaved
