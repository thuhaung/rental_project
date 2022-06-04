import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Nav from '../../components/Nav/Nav';
import './UserInfo.css';
import Avatar from '../../assets/profile-pic.jpg'
import GeneralDetail from './GeneralDetail';
import Password from './Password';
import Verifaction from './Verifaction';

function UserInfo() {
    const [userInfo, setUserInfo] = useState({});
    const [option, setOption] = useState('detail');
    const [styleDetail, setStyleDetail] = useState('userinfo-option2')
    const [stylePass, setStylePass] = useState('userinfo-option1')
    const [styleVerify, setStyleVerify] = useState('userinfo-option1')
    const cookies = new Cookies();
    const axiosPrivate = useAxiosPrivate();

    const getUserInfo = () => {
        axiosPrivate.get("http://localhost:5000/user", { withCredentials: true }).then((response) => {
            setUserInfo(response.data.user);
            console.log(response.data.user);
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
            <Nav />
            <div className='userinfo-container'>
                <div className='userinfo-background'></div>
                <img className='userinfo-avatar' src={Avatar} />
                <div className='userinfo-profile-wrapper'>
                    <p style={{ fontWeight: '600', fontSize: '31px', lineHeight: '38px', marginBottom: '-10px' }}>Profile Settings</p>
                    <p style={{ fontWeight: '300', fontSize: '23px', lineHeight: '28px' }}>{userInfo.last_name} {userInfo.middle_name} {userInfo.first_name}</p>
                </div>
                <div className='userinfo-option-wrapper'>
                    <div className={styleDetail} onClick={() => {
                        setOption('detail');
                        setStyleDetail('userinfo-option2');
                        setStylePass('userinfo-option1');
                        setStyleVerify('userinfo-option1')
                    }}>
                        General Detail
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
                            return <GeneralDetail
                                email={userInfo.email}
                                firstName={userInfo.first_name}
                                middlename={userInfo.middle_name}
                                lastName={userInfo.last_name} />
                            break;
                        case 'password':
                            return <Password />
                            break;
                        case 'verify':
                            return <Verifaction />
                            break;
                        default:
                            return null
                            break;
                    }
                })()}
            </div>
        </div>
    )
}

export default UserInfo
