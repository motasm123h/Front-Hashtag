import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import TopBarDashboard from '../../../components/Dashboard/TopBarDashboard/TopBarDashboard';
import SideBarUserDetails from '../../../components/Dashboard/SideBarUserDetails/SideBarUserDetails';
import Post from './../../../components/Post/Post';
import users from "../../../assets/user.png";


export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [postUser, setPostUser] = useState([]);


    const fetchData = () => {

        const FetchUsres = async () => {
            const { data } = await axios.get(`http://127.0.0.1:8000/api/getUserPost/${id}`)
            setUser(data.user)
            setPostUser(data.posts)
        }
        FetchUsres();
    }

    console.log(postUser)

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <div>
                <TopBarDashboard />
            </div>
            <div style={{ display: "flex" }}>

                <div>
                    <SideBarUserDetails user={user} />
                </div>
                <div className='dashboard-posts' style={{ flex: 5 }}>
                    {

                        postUser.map(post => (
                            <div className='dashboard-post-card'>
                                <div className="user-info-and-text">
                                    <div className="user-info">
                                        {
                                            user.profile_image ?
                                                <img className="user-post-img" src={`http://127.0.0.1:8000/user/${user.profile_image}`} alt="" />
                                                : <img className="user-post-img" src={users} />

                                        }
                                        {/* <img className="user-post-img" src={`http://127.0.0.1:8000/user/${user.profile_image}`} alt="" /> */}
                                        <h1 >{post.user.name}</h1>
                                    </div>
                                    <div className="post-text">
                                        <span>{post.text}</span>
                                    </div>
                                </div>

                                <div>
                                    {
                                        post.image ?
                                            <img className="post-img" src={`http://127.0.0.1:8000/posts/${post.image}`} alt="" />
                                            : ''
                                    }
                                    <div>

                                    </div>

                                </div>

                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}