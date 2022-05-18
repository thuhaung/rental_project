import React, { useEffect, useState } from 'react'
import './Rentals.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import ScrollContainer from 'react-indiana-drag-scroll'
import axios from 'axios'
import Arrow from '../../assets/Keyboard arrow right.svg'
import Location from '../../assets/Location.svg'
import Rent from '../../assets/Rent.svg'


function Rentals() {
  const [item, setItem] = useState([])

  //Get recent list from server
  useEffect(() => {
    axios.get('http://localhost:5000/rental/search/recent-list')
      .then(res => {
        console.log("Get recent list from server", res)
        setItem(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <div className='rental-main-container'>
        <div className='rental-text-container'>
          <p>Find your best home</p>
          <SearchBar />
        </div>
      </div>
      <div className='rental-sub-arrow'>
        <div className='rental-sub-container'>
          <h2>Most recent listings</h2>
          <ScrollContainer className='rental-scroll-container'>
            {item ? (item.map(prod => (
              <div className='rental-box1'>
                <img className='rental-image' src={prod.images[0]} />
                <table className='rental-list-info'>
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
            ))) : null}
          </ScrollContainer>
        </div>
        <img className='rental-arrow' src={Arrow} />
      </div>
    </div>
  )
}

export default Rentals
