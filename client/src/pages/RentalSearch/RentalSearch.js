import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import './RentalSearch.css'

function RentalSearch() {
    const location = useLocation();
    const [result,setResult] = useState([])
    useEffect(()=>{
        try {
            setResult(location.state)
            console.log('Recieve results from rental page:',location.state)
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <>
            <div className='rentalsearch-searchbar'>
                <SearchBar/>
            </div>
            <h1>Rental Search OutPut:</h1>
            {result.map(prod=>(
                <div>
                    <h1>Price:{prod.rent}</h1>
                    <h1>{prod.address.num}{' '}
                      {prod.address.street},
                      Ward {prod.address.ward},
                      District {prod.address.district},
                      {prod.address.city} City</h1>
                <img src={prod.images[0]}/>
                </div>
            ))}
        </>
    )
}

export default RentalSearch