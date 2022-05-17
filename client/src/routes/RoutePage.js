import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Advertisements from '../pages/Advertisements/Advertisements'
import HomePage from '../pages/Homepage/Homepage'
import Rentals from '../pages/Rentals/Rentals'
import RentalSearch from '../pages/RentalSearch/RentalSearch'

function RoutePage() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/homepage" element={<HomePage/>} />
                <Route path="/advertisements" element={<Advertisements/>} />
                <Route path="/rentals" element={<Rentals/>} />
                <Route path="/rental-search" element={<RentalSearch/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default RoutePage