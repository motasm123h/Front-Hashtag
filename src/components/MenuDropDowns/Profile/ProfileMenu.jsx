import './ProfileMenu.scss'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import axios from 'axios';
import translator from "../../../assets/translator.png";

import { useEffect } from 'react';

function ProfileMenu() {
    const { toggle, darkMode, translateMode, translatToggle } = useContext(DarkModeContext);

    const { user } = useSelector((state) => state.authReducer.authData)
    const handleLogout = () => {
        const logout = async () => {
            await axios.post('api/logout');
            localStorage.clear();
            window.location.reload();
        }
        logout();
    }

    return (
        <div className="flex flex-col dropDownProfile">

            <ul className="flex flex-col gap-4">
                <Link to={`/profile/${user.id}`}>
                    <li style={{ display: 'flex', flexDirection: 'raw', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            translateMode ?
                                'Profile' :
                                'صفحتي'
                        }

                        <PersonOutlinedIcon style={{ marginLeft: '60px' }} />
                    </li>
                </Link>

                <Link to={`/settings/${user.id}`}>
                    <li style={{ display: 'flex', flexDirection: 'raw', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            translateMode ?
                                'setting' :
                                'الأعدادات'
                        }

                        <Settings style={{ marginLeft: '60px' }} />
                    </li>
                </Link>

                <li style={{ display: 'flex', flexDirection: 'raw', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ position: 'relative', left: '-19px' }}>
                        {
                            translateMode ?
                                'DarkMode' :
                                'الوضع الليلي'
                        }


                    </span>
                    {darkMode ? (
                        <WbSunnyOutlinedIcon onClick={toggle}
                            style={{ position: 'relative', left: '20px' }}
                        />
                    ) : (
                        <DarkModeOutlinedIcon onClick={toggle}
                            style={{ position: 'relative', left: '20px' }}
                        />
                    )}
                </li>

                <li style={{ display: 'flex', flexDirection: 'raw', alignItems: 'center', justifyContent: 'center' }}>
                    <span onClick={translatToggle} style={{ position: 'relative', left: '-40px' }}>
                        {
                            translateMode ?
                                'Ar' :
                                'En'
                        }


                    </span>
                    {/* <Logout style={{ position: 'relative', left: '45px' }} />
                     */}
                    <img src={translator} style={{ position: 'relative', left: '45px' }} alt="" />
                </li>


                <Link>
                    <li style={{ display: 'flex', flexDirection: 'raw', alignItems: 'center', justifyContent: 'center' }}>
                        <span onClick={handleLogout} style={{ position: 'relative', left: '-30px' }}>
                            {
                                translateMode ?
                                    'logout' :
                                    ' الخروج'
                            }


                        </span>
                        <Logout style={{ position: 'relative', left: '35px' }} />
                    </li>
                </Link>

            </ul>
        </div>
    )
}
export default ProfileMenu;