import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Advertisements from '../pages/Advertisements/Advertisements.js'
import HomePage from '../pages/Homepage/Homepage'
import Rentals from '../pages/Rentals/Rentals'
import RentalAfter from '../pages/RentalAfter/RentalAfter'
import UserInfo from '../pages/UserInfo/UserInfo'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import AdvertisePlace from "../pages/AdvertisePlace/AdvertisePlace";
import Nav from '../components/Nav/Nav'
import RentalInfo from '../pages/RentalInfo/RentalInfo.js'
import YourAdvertisements from '../pages/YourAdvertisements/YourAdvertisements.js'

function RoutePage() {
  return (
    <div>
        <Router>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/advertisements" element={<Advertisements />} />
                <Route path="/rentals" element={<Rentals />} />
                <Route path="/rental-after" element={<RentalAfter />} />
                <Route path="/rentals/:id" element={<RentalInfo />} />
                <Route path="/user/:id/rentals" element={<YourAdvertisements />} />
                
                {/* protected routes <Route element={<RequireAuth />}>*/}
                
                  <Route path="/user/info" element={<PrivateRoute> <UserInfo /> </PrivateRoute>} />
                  <Route path="/advertise-place" element={<PrivateRoute> <AdvertisePlace /> </PrivateRoute>} />
                  {/* advertise rental, rent a place, chatrooms are protected routes </Route>*/}
                
            </Routes>
        </Router>
    </div>
  )
}

export default RoutePage