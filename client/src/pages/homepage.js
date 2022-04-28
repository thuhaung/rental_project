import React from "react";
import "../styles/homepage.css";

const Homepage = (props) => {
    return (
        <div>
            <h1>Hello world.</h1>
            <h2>Login</h2>
            <div className="header">
                <ul>
                    <li>Rent</li>
                    <li>Advertise</li>
                    <li>Help</li>
                </ul>
            </div>
        </div>
    );
};

export default Homepage;