
import PeopleIcon from '@mui/icons-material/People';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Link } from "react-router-dom";

import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

export default function HomeDash() {

    const token = localStorage.getItem('token')
    const [numberUser, setNumberUser] = useState(0)
    const [numberPost, setNumberPost] = useState(0)
    const [numberVideo, setNumberVideo] = useState(0)

    useEffect(() => {
        let data = axios.get('http://127.0.0.1:8000/api/getInfo', {
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            setNumberPost(res.data.post_number);
            setNumberUser(res.data.user_number);
            setNumberVideo(res.data.video_num);
        })
    }, [numberUser, numberPost])

    return (
        <div>
            <Outlet />
            <div className="cards">
                <h3 className="maintitle">Welcome To Your Dashboard</h3>
                <div className="card-wrabber">

                    <Link to="/dashboard/users">
                        <div className="payment-card" >
                            <div className="amount">
                                <span>Users Number <PeopleIcon /></span>
                                <span className="amount-value">{numberUser}</span>
                            </div>
                        </div>
                    </Link>


                    <Link to="/posts">
                        <div className="payment-card" >
                            <div className="amount">
                                <span> <VideoLibraryIcon style={{ fontSize: "25px" }} /> Posts system</span>
                                <span className="amount-value">{numberPost}</span>
                            </div>
                        </div>
                    </Link>



                    <Link to="/dashboard/video">
                        <div className="payment-card">
                            <div className="amount">
                                <span> <VideoLibraryIcon style={{ fontSize: "25px" }} /> video systems</span>
                                <span className="amount-value">{numberVideo}</span>

                            </div>
                        </div>
                    </Link>


                    <Link to="/">
                        <div className="payment-card">
                            <div className="amount">
                                <span> <CreateIcon style={{ fontSize: "25px" }} />Go to home</span>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}