import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
import Nav from '../../components/Nav/Nav';
import './UserSettings.css';
import Avatar from '../../assets/profile-pic.jpg'
import GeneralDetails from './GeneralDetails/GeneralDetails';
import Password from './Password/Password';
import Verification from './Verification/Verification';
import Footer from "../../components/Footer/Footer.js";

function UserSettings() {
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const from = location.state?.from?.pathname;
    const [option, setOption] = useState(location?.state?.verifiedSection ? "verify" : "detail");
    const [styleDetail, setStyleDetail] = useState(location?.state?.verifiedSection ? "userinfo-option1" :'userinfo-option2')
    const [stylePass, setStylePass] = useState('userinfo-option1')
    const [styleVerify, setStyleVerify] = useState(location?.state?.verifiedSection ? "userinfo-option2" : 'userinfo-option1')
    const cookies = new Cookies();
    

    const getUserInfo = () => {
        axios.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            setUserInfo(response.data.user);
        }).catch((error) => {
            console.log(error.message);
        })
    }

    useEffect(() => {
        /*if (location?.state?.verifiedSection) {
            setOption("verify");
            setStyleVerify('userinfo-option2');
            setStyleDetail('userinfo-option1');
            setStylePass('userinfo-option1');
        }*/
        
        /*axios.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error.message);
        })*/
        getUserInfo();
    }, []);

    return (
        <div>
            <Nav />
            <div className='userinfo-container'>
                
                    <div className='userinfo-background'></div>
                    <div className='userinfo-profile-wrapper'>
                        <img className='userinfo-avatar' src={Avatar} />
                        <div className="userinfo-profile-name">
                        <h2>Profile settings</h2>
                        <p>{userInfo.last_name} {userInfo.middle_name} {userInfo.first_name}</p>
                        </div>
                    </div>
                    
                    <div className='userinfo-option-wrapper'>
                        <div className={styleDetail} onClick={() => {
                            setOption('detail');
                            setStyleDetail('userinfo-option2');
                            setStylePass('userinfo-option1');
                            setStyleVerify('userinfo-option1')
                        }}>
                            General Details
                        </div>
                        <div className={stylePass} onClick={() => {
                            setOption('password');
                            setStylePass('userinfo-option2');
                            setStyleDetail('userinfo-option1');
                            setStyleVerify('userinfo-option1')
                        }}>
                            Password
                        </div>
                        <div className={styleVerify} onClick={() => {
                            setOption('verify');
                            setStyleVerify('userinfo-option2');
                            setStyleDetail('userinfo-option1');
                            setStylePass('userinfo-option1');
                        }}>
                            Verification
                        </div>
                    </div>
                
            </div>
               
            
            <div className='userinfo-edit-wrapper'>
                {(() => {
                    switch (option) {
                        case 'detail':
                            return <GeneralDetails
                                email={userInfo.email}
                                firstName={userInfo.first_name}
                                middleName={userInfo.middle_name}
                                lastName={userInfo.last_name} />
                            break;
                        case 'password':
                            return <Password />
                            break;
                        case 'verify':
                            return <Verification isVerified={userInfo.is_verified} from={from}/>
                            break;
                        default:
                            return null
                            break;
                    }
                })()}
            </div>
            <Footer />
        </div>
    )
}

export default UserSettings
