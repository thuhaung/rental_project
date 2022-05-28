import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentalAfter.css'
import Location from '../../assets/Location.svg'
import Rent from '../../assets/Rent.svg'
import Nav from '../../components/Nav/Nav';
import RentalBox from "../../components/RentalBox/RentalBox.js";

function RentalAfter(props) {
    const location = useLocation();
    const [result, setResult] = useState([]);
    const rentals = location.state.data.sort((a, b) => (a.rent < b.rent) ? 1 : -1);

    useEffect(() => {
        setResult(rentals);
        console.log('Set succesfully');
    }, []);

    //Filter output
    function handleFilter(e) {
        const sortedRentals = [...result];

        switch (e.target.value) {
            case 'descending':
                sortedRentals.sort((a, b) => (a.rent < b.rent) ? 1 : -1)
                setResult(sortedRentals)
                console.log('Descending', sortedRentals)
                break;
            case 'ascending':
                sortedRentals.sort((a, b) => (a.rent > b.rent) ? 1 : -1)
                setResult(sortedRentals)
                console.log('Ascending', sortedRentals)
                break;
            case 'most':
                sortedRentals.sort((a, b) => (a.amenities.length < b.amenities.length ? 1 : -1))
                setResult(sortedRentals)
                console.log('Amenities', sortedRentals)
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Nav />
            <div className='rental-after-searchbar'>
                <SearchBar />
            </div>
            {!result ? <h1>No result</h1> :
                <div className='rental-after-result-container'>
                    <div className="rental-after-result-filter-box">
                        <p className='rental-after-result-text1'>Results</p>
                        <p className='rental-after-result-text2'>{result.length} rentals Sort by{' '}
                        <select className='rental-after-filter' onChange={handleFilter}>
                            <option value='descending'>Highest to Lowest Price</option>
                            <option value='ascending'>Lowest to Highest Price</option>
                            <option value='most'>Most Amenities</option>
                        </select></p>
                    </div>
                    <div className="rental-after-result-listing">
                        {result?.map(rental => (
                            <RentalBox 
                                name={rental.property_type + " for Rent at District " + rental.address.district}
                                rentAmount={rental.rent}
                                fullAddress={rental.address}
                                rentalId={rental._id}
                                userId={rental.user}
                            />
                            /*
                            <div className='rental-after-box-container'>
                                <div className='rental-after-box1'>
                                    <img className='rental-after-image' src={prod.images[0]} />
                                    <table className='rental-after-list-info'>
                                        <tr>
                                            <td><img src={Rent} /></td>
                                            <td>{prod.rent}{' '}VND/Month</td>
                                        </tr>
                                        <tr>
                                            <td><img src={Location} /></td>
                                            <td>{prod.address.num}{' '}
                                                {prod.address.street},
                                                Ward {prod.address.ward},
                                                District {prod.address.district},
                                                {prod.address.city} City</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            */
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default RentalAfter