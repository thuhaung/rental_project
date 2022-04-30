import React from "react";
import Rentals from "./pages/Rentals/Rentals";
import Advertisements from "./pages/Advertisements/Advertisements";
import Nav from "./components/Nav";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


const App = () => {
    return (
        <Router>
          <div>
            <h1>Casa</h1>
            <Nav />
          </div>
          <Routes>
            <Route path="/rentals" exact element={<Rentals />} />
            <Route path="/advertisements" exact element={<Advertisements />} />
          </Routes>
        </Router>
    );
}

export default App;