import React from 'react'
import background from '../../assets/rentalBackground.png'
import './Rentals.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import Nav from '../../components/Nav'

function Rentals() {
  return (
    <div>
        <div className='main-container'>
          <div className='text-container'>
            <p>Find your best home</p>
          </div>
          <SearchBar/>
        </div>
        <div className='sub-container'>
          <h2>Most recent listings</h2>
        </div>
    </div>
  )
}

export default Rentals
