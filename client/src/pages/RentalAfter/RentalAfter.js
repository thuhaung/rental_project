import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentalAfter.css'
import Location from '../../assets/Location.svg'
import Rent from '../../assets/Rent.svg'

function RentalAfter(props) {
    const location = useLocation();
    const [result, setResult] = useState(location.state.data)
    console.log('This is result',result)
    return (
        <>
            <div className='rentalafter-searchbar'>
                <SearchBar />
            </div>
            {!result ? <h1>No result</h1> :
                <div className='rentalafter-result-container'>
                    <p className='rentalafter-result-text1'>Results</p>
                    <p className='rentalafter-result-text2'>{result.length} rentals Sort by{' '}
                        <select className='rentalafter-filter'>
                            <option>Most Relevant</option>
                        </select></p>
                    {result?.map(prod => (
                        <div className='rentalafter-box-container'>
                            <div className='rentalafter-box1'>
                                <img className='rentalafter-image' src={prod.images[0]} />
                                <table className='rentalafter-list-info'>
                                    <tr>
                                        <td><img src={Rent} /></td>
                                        <td>${prod.rent}</td>
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
                    ))}
                </div>
            }
        </>
    )
}

export default RentalAfter