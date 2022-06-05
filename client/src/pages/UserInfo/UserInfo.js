import React, { useEffect, useState } from 'react';
import "./UserInfo.css";
import Nav from "../../components/Nav/Nav.js";
import Footer from "../../components/Footer/Footer.js";
import Avatar from '../../assets/profile-pic.jpg'
import verified from "../../assets/verified.png";
import RentalBox from "../../components/RentalBox/RentalBox.js";
import { Link } from "react-router-dom";
import axios from "axios";

function UserInfo() {
    const [user, setUser] = useState({});
    const [option, setOption] = useState("rentals");
    const [styleRentals, setStyleRentals] = useState('userinfo-option2')
    const [styleSaved, setStyleSaved] = useState('userinfo-option1')
    const [rentals, setRentals] = useState([]);

    const getUserInfo = () => {
        axios.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            setUser(response.data.user);
        }).catch((error) => {
            console.log(error.message);
        })
    }

    const getRentals = () => {
        axios.get(`http://localhost:5000/rental/${user._id}/all`).then((response) => {
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
        getUserInfo();
    }, []);

    return (
        <div className="user-info-wrapper">
            <Nav />
            <div className='user-info-container'>
                <div className='user-info-background'></div>
                <div className='user-info-profile-wrapper'>
                    <img className='user-info-avatar' src={Avatar} />
                    <div className="user-info-profile-name">
                        <h2>{user.last_name} {user.middle_name} {user.first_name}</h2>
                        {
                            user.is_verified ?
                            <div className="user-info-is-verified">
                                <p>Verified</p>
                                <img src={verified} /> 
                            </div>
                            : ""
                        }
                    </div>
                </div>
                
                <div className='user-info-option-wrapper'>
                    <div className={styleRentals} onClick={() => {
                        setOption("rentals");
                        setStyleRentals('user-info-option2');
                        setStyleSaved('user-info-option1');
                    }}>
                        Rentals
                    </div>
                    <div className={styleSaved} onClick={() => {
                        setOption("saved");
                        setStyleRentals('user-info-option1');
                        setStyleSaved('user-info-option2');
                    }}>
                        Saved homes
                    </div>
                </div>
            </div>
            <div className='user-info-edit-wrapper'>
                {(() => {
                    switch (option) {
                        case 'rentals':
                            getRentals();
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
                            break;
                        case 'saved':
                            
                            break;
                        default:
                            return null;
                            break;
                    }
                })()}
            </div>
            <Footer />
        </div>
    )
}

export default UserInfo
