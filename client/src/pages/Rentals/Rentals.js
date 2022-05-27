import React, { useEffect, useState } from 'react'
import './Rentals.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import ScrollContainer from 'react-indiana-drag-scroll'
import axios from 'axios'
import Arrow from '../../assets/Keyboard arrow right.svg'
import Location from '../../assets/Location.svg'
import Rent from '../../assets/Rent.svg'
import Nav from '../../components/Nav/Nav'
import RentalBox from '../../components/RentalBox/RentalBox'


function Rentals() {
  const [items, setItems] = useState([])
  const [rentalName, setRentalName] = useState([]);
  const [rent, setRent] = useState([]);
  const [address, setAddress] = useState([]);
  const [rentalId, setRentalId] = useState([]);
  const [userId, setUserId] = useState([]);

  //Get recent list from server
  useEffect(() => {
    axios.get('http://localhost:5000/rental/recent-list')
      .then(res => {
        setItems(res.data);
        console.log(res.data);
        for (let i in res.data) {
          setInfo(res.data[i]);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const setInfo = async (item) => {
    let rental = item;
    setRentalName(prev => [...prev, (rental.property_type + " for Rent at District " + rental.address.district)]);
    setRent(prev => [...prev, (rental.rent)]);
    setAddress(prev => [...prev, (rental.address)]);
    setRentalId(prev => [...prev, (rental._id)]);
    setUserId(prev => [...prev, (rental.user)]);
  }

  return (
    <div>
      <Nav/>
      <div className='rental-main-container'>
        <div className='rental-text-container'>
        <button onClick={() => {console.log(rentalName)}}>Click</button>
          <p>Find your best home</p>
          <div className='rental-searchbar-container'>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className='rental-sub-arrow'>
        <div className='rental-sub-container'>
          <h2>Most recent listings</h2>
          <div className='rental-scroll-container'>
            {
              items && items.map((item, index) => {
                return <RentalBox key={index} name={rentalName[index]} rentAmount={rent[index]} fullAddress={address[index]} rentalId={rentalId[index]} userId={userId[index]} />
              })
            }
            
            {/*item ? (item.map(prod => (
              <div className='rental-box1'>
                <img className='rental-image' alt="rental-pic" src={prod.images[0]} />
                <table className='rental-list-info'>
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
            ))) : null*/}
          </div>
        </div>
        <img className='rental-arrow' alt="arrow" src={Arrow} />
      </div>
    </div>
  )
}

export default Rentals
