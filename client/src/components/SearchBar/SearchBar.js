import React, { useState } from 'react'
import './SearchBar.css'
import axios from 'axios'

function SearchBar() {
  const [data,setData] = useState({
    city: "Ho Chi Minh",
    district:"1",
    price:"500",
    street:""
  })

  function handleChange(e){
    const newData = {...data}
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(data)
    try{
      const req = await axios.get('http://localhost:5000/rental/search', 
    { params: { city: data.city, district: data.district, price: data.price, street: data.street} });
      console.log('This is req',req)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='search-box'>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className='city'>
          <p className='city-text'>City</p>
          <select onChange={(e)=>handleChange(e)} value={data.city} id = "city" className='city-value'>
            <option value='Ho Chi Minh'>Ho Chi Minh city</option>
            <option value='Ha Noi'>Ha Noi</option>
          </select>
        </div>
        
        <div className='straight-line1'></div>

        <div className='district'>
          <p className='district-text'>Disctrict</p>
          <select onChange={(e)=>handleChange(e)} value={data.district} id = "district" className='district-value'>
            <option value='1'>District 1</option>
            <option value='2'>District 2</option>
            <option value='3'>District 3</option>
            <option value='4'>District 4</option>
            <option value='5'>District 5</option>
            <option value='6'>District 6</option>
            <option value='7'>District 7</option>
            <option value='8'>District 8</option>
            <option value='9'>District 9</option>
            <option value='10'>District 10</option>
            <option value='11'>District 11</option>
            <option value='12'>District 12</option>
          </select>
        </div>

        <div className='straight-line2'></div>

        <div className='price'>
          <p className='price-text'>Price Range</p>
          <select onChange={(e)=>handleChange(e)} value={data.price} id = "price" className='price-value'>
            <option value='500'>Under $500</option>
            <option value='1000'>Under $1000</option>
            <option value='2000'>Under $2000</option>
          </select>
        </div>

        <div className='straight-line3'></div>

        <input onChange={(e)=>handleChange(e)} value={data.street} id = "street" className='input' type='text' placeholder='Enter a street'></input>

        <button className='btn' type='submit'><p className='btn-text'>Search</p></button>
      </form>
    </div>
  )
}

export default SearchBar