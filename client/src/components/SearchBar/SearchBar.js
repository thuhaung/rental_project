import React, { useState } from 'react'
import './SearchBar.css'
import axios from 'axios'
import { districtsHCMC, districtsHanoi } from './DistrictValue.js'
import { useNavigate } from 'react-router-dom'


function SearchBar(props) {
  const navigate = useNavigate();
  const [city, setCity] = useState("Ho Chi Minh City");
  const [district, setDistrict] = useState("");
  const [price, setPrice] = useState(0);
  const [street, setStreet] = useState("");

  /*
  const [data, setData] = useState({
    city: "Ho Chi Minh City",
    district: "",
    price: "",
    street: ""
  })
  function handleChange(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }*/

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      city: city,
      district: district,
      price: price,
      street: street
    }
    console.log(data);
    try {
      //get search result
      const req = await axios.get('http://localhost:5000/rental/search',
        { params: data });
      // console.log('This is search output:', req.data)
      //Pass search result to rent page after filter
      navigate('/rental-after', { state: { data: req.data } });
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <form onSubmit={(e) => handleSubmit(e)} className='searchbar-search-box'>
        <div className='searchbar-city'>
          <p className='searchbar-city-text'>City</p>
          <select onChange={(e) => setCity(e.target.value)} value={city} id="city" className='searchbar-city-value'>
            <option value='Ho Chi Minh'>Ho Chi Minh City</option>
            <option value='Ha Noi'>Hanoi</option>
          </select>
        </div>

        <div className='searchbar-straight-line1'></div>
        <div className='searchbar-district'>
          <p className='searchbar-district-text'>District</p>
          <select onChange={(e) => setDistrict(e.target.value)} value={district} id="district" className='searchbar-district-value'>
            {city === 'Ho Chi Minh City' ? (districtsHCMC.map(prod => (
              <option value={prod.value}>{prod.label}</option>))) : ((districtsHanoi.map(prod => (
                <option value={prod.value}>{prod.label}</option>))))}
          </select>
        </div>

        <div className='searchbar-straight-line1'></div>

        <div className='searchbar-price'>
          <div className="searchbar-price-info">
            <p className='searchbar-price-text'>Price Range</p>
            <p className="searchbar-price-range">(0-15mil)</p>
          </div>

          <input type="range" min="0" max="15000000" className="searchbar-price-value" onChange={(e) => setPrice(e.target.value)}/>
          {
            price > 0.1 &&
            <div className="searchbar-display-price">
              <p>{"0 - " + (price/1000000).toFixed(1) + " mil"}</p>
            </div>
          }
          {/*
            <select onChange={(e) => handleChange(e)} value={data.price} id="price" className='searchbar-price-value'>
              <option value=''>All</option>
              <option value='5000000'>Under 5000000</option>
              <option value='10000000'>Under 10000000</option>
              <option value='20000000'>Under 20000000</option>
            </select>
            */}
          
        </div>

        <div className='searchbar-straight-line1'></div>

        <input onChange={(e) => setStreet(e.target.value)} value={street} id="street" className='searchbar-input' type='text' placeholder='Enter a street'></input>

        <button className='searchbar-btn' type='submit'><p className='searchbar-btn-text'>Search</p></button>
      </form>
  )
}

export default SearchBar