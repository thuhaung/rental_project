import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const cookies = new Cookies();
    const axiosPrivate = useAxiosPrivate();

    const getUserInfo = () => {
        axiosPrivate.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            setUserInfo(response.data.first_name);
            console.log(response.data.first_name);
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
        getUserInfo();
    }, []);

    return (
        <div>
            
            
        </div>
    )
}

export default UserInfo
