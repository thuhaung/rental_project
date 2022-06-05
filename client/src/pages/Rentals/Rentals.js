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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import Footer from '../../components/Footer/Footer'


function Rentals() {
  const [items, setItems] = useState([])
  const [rentalName, setRentalName] = useState([]);
  const [rent, setRent] = useState([]);
  const [address, setAddress] = useState([]);
  const [rentalId, setRentalId] = useState([]);
  const [userId, setUserId] = useState([]);


  //Get recent list from server
  useEffect(() => {
    axios.get('http://localhost:5000/rental/recent-list').then(res => {
      setItems(res.data);
      for (let i in res.data) {
        setInfo(res.data[i]);
      }
    }).catch(err => {
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <div>
      <Nav/>
      <div className='rental-main-container'>
        <div className='rental-text-container'>
          <p>Find your best home</p>
          <div className='rental-searchbar-container'>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className='rental-sub-arrow'>
        <div className='rental-sub-container'>
          <h2>Most recent listings</h2>
          <Carousel className='rental-scroll-container' responsive={responsive}>
            {
              items && rentalId && userId && items.map((item, index) => (
                <RentalBox  key={index} name={rentalName[index]} rentAmount={rent[index]} fullAddress={address[index]} rentalId={rentalId[index]} userId={userId[index]} />
              ))
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
            ))) : null
            <img className='rental-arrow' alt="arrow" src={Arrow} />*/}
          </Carousel >
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Rentals
