import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentalSearch.css'
import Location from '../../assets/Location.svg'
import Rent from '../../assets/Rent.svg'

function RentalSearch() {
    const location = useLocation();
    const [result, setResult] = useState([])
    useEffect(() => {
        try {
            setResult(location.state)
            console.log('Recieve results from rental page:', location.state)
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <div className='rentalsearch-searchbar'>
                <SearchBar />
            </div>
            <div className='rentalsearch-result-container'>
                <p className='rentalsearch-result-text1'>Results</p>
                <p className='rentalsearch-result-text2'>{result.length} rentals Sort by{' '}
                    <select className='rentalsearch-filter'>
                        <option>Most Relevant</option>
                    </select></p>

                {result.map(prod => (
                    <div className='rentalsearch-box-container'>
                        <div className='rentalsearch-box1'>
                            <img className='rentalsearch-image' src={prod.images[0]} />
                            <table className='rentalsearch-list-info'>
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
        </>
    )
}

export default RentalSearch