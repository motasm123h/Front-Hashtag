import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "../MenuDropDowns/Profile/ProfileMenu";
import NotificationMenu from "../MenuDropDowns/Notification/NotificationMenu";
import users from "../../assets/user.png";
import hashtag from '../../assets/hashtag.png';

import './NavBar.scss'
import axios from 'axios'

import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert'
import HashTag from './../models/HashTag/HashTag';


export default function Navbar() {
    const { user } = useSelector((state) => state.authReducer.authData)
    const { notification } = useSelector((state) => state.notificationReducer)
    const dispatch = useDispatch();



    const Navigate = useNavigate();
    const { toggle, darkMode, translateMode, translatToggle } = useContext(DarkModeContext);
    const [open, setOpen] = useState(false);
    const [userMenuDropDown, setuUerMenuDropDown] = useState(false);
    const [notificationMenu, setNotificationMenu] = useState(false);

    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState('');


    const handleChangeSearch = async (e) => {
        const text = e.target.value
        setSearchText(text)

        if (searchText.length >= 1) {
            const { data } = await axios.get(`api/search/${searchText}`)

        }
    }



    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none", display: "flex" }}>
                    <img className="logo-img" src={hashtag} />
                    <span>HashTag</span>
                </Link>
                <Link to="/">
                    <HomeOutlinedIcon />
                </Link>
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle} />

                )

                    : (
                        <DarkModeOutlinedIcon onClick={toggle} />
                    )}
                {/* <GridViewOutlinedIcon /> */}

                <Link to="/Search">
                    <div className="search">
                        <SearchOutlinedIcon />
                        <input type="text" placeholder="" onChange={handleChangeSearch} />
                    </div>
                </Link>

            </div>
            <div className="right">
                <Link to="/chat">
                    <EmailOutlinedIcon />
                </Link>
                <div>

                    <div className="tide">

                        {(notification.length === 0 ? '' : <div className="redFlag">
                            <h4>{notification.length}</h4>
                        </div>)
                        }
                        <NotificationsOutlinedIcon onClick={() => setNotificationMenu(!notificationMenu)} />
                        {
                            notificationMenu && <NotificationMenu />
                        }
                    </div>
                </div>

                <div className="user">

                    {
                        user.profile_image ? <img
                            onClick={() => setuUerMenuDropDown(!userMenuDropDown)}
                            src={`http://localhost:8000/user/${user.profile_image}`}
                            alt=""
                        /> : <img
                            onClick={() => setuUerMenuDropDown(!userMenuDropDown)}
                            src={users} />
                    }

                    {/* <span className="cli" >{user.name}</span> */}
                    {
                        userMenuDropDown && <ProfileMenu />
                    }
                </div>
            </div>
        </div>
    );
};