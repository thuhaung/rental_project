import React from 'react'
import './SearchBar.css'

function SearchBar() {
  return (
    <div className='search-box'>
      <div className='city'>
        <p className='city-text'>City</p>
        <select className='city-value'>
          <option value='HCM'>Ho Chi Minh city</option>
          <option value='HCM'>Ha Noi</option>
        </select>
      </div>
      <div className='straight-line1'></div>
      <div className='district'>
        <p className='district-text'>Disctrict</p>
        <select className='district-value'>
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
        <select className='price-value'>
          <option value='under5m'>Under 5m</option>
          <option value='under10m'>Under 10m</option>
          <option value='under50m'>Under 50m</option>
        </select>
      </div>
      <div className='straight-line3'></div>
      <input className='input' type='text' placeholder='Enter a street'></input>
      <div className='btn'><p className='btn-text'>Search</p></div>
    </div>
  )
}

export default SearchBar