import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Advertisements from '../pages/Advertisements/Advertisements'
import HomePage from '../pages/Homepage/Homepage'
import Rentals from '../pages/Rentals/Rentals'
import RentalAfter from '../pages/RentalAfter/RentalAfter'
import UserInfo from '../pages/UserInfo/UserInfo'
import RequireAuth from "../components/RequireAuth/RequireAuth";
import PrivateRoute from '../components/RequireAuth/PrivateRoute'

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

                {/* protected routes <Route element={<RequireAuth />}>*/}
                
                  <Route path="/user-info" element={<PrivateRoute> <UserInfo /> </PrivateRoute>} />
                  {/* advertise rental, rent a place, chatrooms are protected routes </Route>*/}
                
            </Routes>
        </Router>
    </div>
  )
}

export default RoutePage