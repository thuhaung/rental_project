import React, { useState } from 'react'
import './SearchBar.css'
import axios from 'axios'
import { districtValue1, districtValue2 } from './DistrictValue.js'
import { useNavigate } from 'react-router-dom'

function SearchBar(props) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    city: "Ho Chi Minh",
    district: "1",
    price: "500",
    street: ""
  })

  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      //get search result
      const req = await axios.get('http://localhost:5000/rental/search',
        { params: { city: data.city, district: data.district, price: data.price, street: data.street } });
      console.log('This is search output:', req.data)

      //Pass search result to rent page after filter
      navigate('/rental-search',{state: req.data})
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
      <form onSubmit={(e) => handleSubmit(e)} className='searchbar-search-box'>
        <div className='searchbar-city'>
          <p className='searchbar-city-text'>City</p>
          <select onChange={(e) => handleChange(e)} value={data.city} id="city" className='searchbar-city-value'>
            <option value='Ho Chi Minh'>Ho Chi Minh city</option>
            <option value='Ha Noi'>Ha Noi city</option>
          </select>
        </div>

        <div className='searchbar-straight-line1'></div>

        <div className='searchbar-district'>
          <p className='searchbar-district-text'>Disctrict</p>
          <select onChange={(e) => handleChange(e)} value={data.district} id="district" className='searchbar-district-value'>
            {data.city == 'Ho Chi Minh'?(districtValue1.map(prod => (
              <option value={prod.value}>{prod.label}</option>))):((districtValue2.map(prod => (
                <option value={prod.value}>{prod.label}</option>))))}
          </select>
        </div>

        <div className='searchbar-straight-line1'></div>

        <div className='searchbar-price'>
          <p className='searchbar-price-text'>Price Range</p>
          <select onChange={(e) => handleChange(e)} value={data.price} id="price" className='searchbar-price-value'>
            <option value='500'>Under $500</option>
            <option value='1000'>Under $1000</option>
            <option value='2000'>Under $2000</option>
          </select>
        </div>

        <div className='searchbar-straight-line1'></div>

        <input onChange={(e) => handleChange(e)} value={data.street} id="street" className='searchbar-input' type='text' placeholder='Enter a street'></input>

        <button className='searchbar-btn' type='submit'><p className='searchbar-btn-text'>Search</p></button>
      </form>
  )
}

export default SearchBar