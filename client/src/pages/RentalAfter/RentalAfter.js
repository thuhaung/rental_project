import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentalAfter.css'
import Location from '../../assets/Location.svg'
import Rent from '../../assets/Rent.svg'
import Nav from '../../components/Nav/Nav';

function RentalAfter(props) {
    const location = useLocation();
    const [result, setResult] = useState([])
    const LIST_HOUSE = location.state.data.sort((a, b) => (a.rent < b.rent) ? 1 : -1)
    useEffect(() => {
        setResult(LIST_HOUSE)
        console.log('Set succesfully')
    },[])
    //Filter output
    function handleFilter(e) {
        const copyListHouse = [...result]
        switch (e.target.value) {
            case 'descending':
                copyListHouse.sort((a, b) => (a.rent < b.rent) ? 1 : -1)
                setResult(copyListHouse)
                console.log('Descending', copyListHouse)
                break;
            case 'ascending':
                copyListHouse.sort((a, b) => (a.rent > b.rent) ? 1 : -1)
                setResult(copyListHouse)
                console.log('Ascending', copyListHouse)
                break;
            case 'most':
                copyListHouse.sort((a, b) => (a.amenities.length < b.amenities.length ? 1 : -1))
                setResult(copyListHouse)
                console.log('Amenities', copyListHouse)
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Nav />
            <div className='rentalafter-searchbar'>
                <SearchBar />
            </div>
            {!result ? <h1>No result</h1> :
                <div className='rentalafter-result-container'>
                    <p className='rentalafter-result-text1'>Results</p>
                    <p className='rentalafter-result-text2'>{result.length} rentals Sort by{' '}
                        <select className='rentalafter-filter' onChange={handleFilter}>
                            <option value='descending'>Highest to Lowest Price</option>
                            <option value='ascending'>Lowest to Highest Price</option>
                            <option value='most'>Most Amenities</option>
                        </select></p>
                    {result?.map(prod => (
                        <div className='rentalafter-box-container'>
                            <div className='rentalafter-box1'>
                                <img className='rentalafter-image' src={prod.images[0]} />
                                <table className='rentalafter-list-info'>
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
                    ))}
                </div>
            }
        </>
    )
}

export default RentalAfter