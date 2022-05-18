import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie';

function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const cookies = new Cookies();

    const getUserInfo = () => {
        axios.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            setUserInfo(response.data);
        }).catch((error) => {
            console.log(error.message);
        })
    }

    useEffect(() => {
        /*axios.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.message);
        })*/
        console.log(cookies.get("userId"));
    }, []);

    return (
        <div>
            hello
        </div>
    )
}

export default UserInfo
