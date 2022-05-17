import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import Rentals from "./pages/Rentals/Rentals";
import SearchBar from "./components/SearchBar/SearchBar";
import Nav from '../src/components/Nav';
import RoutePage from "./routes/RoutePage";

const App = () => {
    return (
        <div>
          {/* <Homepage /> */}
          {/* <Rentals/> */}
          {/* <SearchBar/> */}
          {/* <Nav/> */}
          <RoutePage/>
        </div>
    );
}

export default App;