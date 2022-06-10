import React, { useState, useEffect } from 'react'
import './SearchBar.css'
import axios from 'axios'
import { districtsHCMC, districtsHanoi } from './DistrictValue.js'
import { useNavigate } from 'react-router-dom'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";


function SearchBar(props) {
  const navigate = useNavigate();
  const [city, setCity] = useState("Ho Chi Minh City");
  const [district, setDistrict] = useState("");
  const [price, setPrice] = useState(0);
  const [street, setStreet] = useState("");
  const [manual, setManual] = useState(true);
  const [place, setPlace] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [rentalLats, setRentalLats] = useState([]);
  const [rentalLngs, setRentalLngs] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [dis, setDis] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      city: city,
      district: district,
      price: price,
      street: street
    }
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

  const rad = function(x) {
    return x * Math.PI / 180;
  };

  const distance = (placeLat, placeLng, rentalLat, rentalLng) => {
    var R = 6378137; 
    var dLat = rad(rentalLat - placeLat);
    var dLong = rad(rentalLng - placeLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(placeLat)) * Math.cos(rad(rentalLat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d/1000;
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setLat(latLng.lat);
    setLng(latLng.lng);
  }
  
  const getCoord = async (rental) => {
    const location = rental.address.num + " " + rental.address.street + " District " + rental.address.district + " " + rental.address.city;
    /*axios.get("https://maps.googleapis.com/maps/api/geocode/json", {params: {address: location, key: "AIzaSyCEKMFxGQT1dKWt2ljFcG5I2C9lSFxCe_M"}})
    .then((response) => {
      if (response.ok) {
        setRentalLats(prev => [...prev, response.data.results[0].geometry.location.lat]);
        setRentalLngs(prev => [...prev, response.data.results[0].geometry.location.lng]);
      }
      else if (response.status === "OVER_QUERY_LIMIT") {
        setTimeout(function() {
          getCoord(rental);
        }, 200);
      }
    })
    .catch((error) => console.log(error.message));*/
    axios.get("http://www.mapquestapi.com/geocoding/v1/address", {params: {location: location, key: "vAXPgGrAWlncdLPGJS9BWGp8IkNzatEy"}})
    .then((response) => {
      if (response.data) {
        setRentalLats(prev => [...prev, response.data.results[0].locations[0].latLng.lat]);
        setRentalLngs(prev => [...prev, response.data.results[0].locations[0].latLng.lng]);
      }
    })
    .catch((error) => console.log(error.message));
  }

  const getCloseRentals = async (data) => {
    let allRentals = data;
    let closeRentals = [];
    for (let i in allRentals) {
      if (distance(lat, lng, rentalLats[i], rentalLngs[i]) <= dis) {
        closeRentals.push(allRentals[i]);
      } 
    }
    navigate('/rental-after', { state: { data: closeRentals } });
  }

  const handleSubmitByPlaces = (e) => {
    e.preventDefault();
    getCloseRentals(rentals);
  }

  useEffect(() => {
    axios.get("http://localhost:5000/rental/all").then((response) => {
      if (response.data);
        setRentals(response.data);
        for (let i in response.data) {
          getCoord(response.data[i]);
        }
    })
    .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-choices">
        <div className="searchbar-choice" onClick={() => setManual(true)}>
          <p>Manual</p>
        </div>
        <div className="searchbar-vertical-line"></div>
        <div className="searchbar-choice" onClick={() => setManual(false)}>
          <p>By Place</p>
        </div>
      </div>
      {
        manual ? 
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
          </div>

          <div className='searchbar-straight-line1'></div>

          <input onChange={(e) => setStreet(e.target.value)} value={street} id="street" className='searchbar-input' type='text' placeholder='Enter a street'></input>

          <button className='searchbar-btn' type='submit'><p className='searchbar-btn-text'>Search</p></button>
        </form>
        :
        <form className='searchbar-search-box' onSubmit={(e) => {setRentalLats([]); setRentalLngs([]); handleSubmitByPlaces(e)}}>
          <div className='searchbar-distance'>
            <div className="searchbar-distance-info">
              <p className='searchbar-distance-text'>Distance</p>
              <p className="searchbar-distance-range">(within)</p>
            </div>
            <select onChange={(e) => setDis(e.target.value)} value={dis} className='searchbar-distance-value'>
              <option value='4'>4km</option>
              <option value='6'>6km</option>
              <option value='8'>8km</option>
              <option value='10'>10km</option>
            </select>
          </div>

          <div className='searchbar-straight-line1'></div>
          {
            
            <PlacesAutocomplete
            value={place}
            onChange={setPlace}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input 
                  {...getInputProps({
                    placeholder: "Enter a place",
                    className: 'searchbar-by-place-input',
                  })}
                />
                <div className="searchbar-autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item-active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#dadada', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
           
          }
          

          <button className='searchbar-by-place-btn' type='submit'><p className='searchbar-btn-text'>Search</p></button>

        </form>
      }
      
      
    </div>
      
  )
}

export default SearchBar