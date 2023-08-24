import './RandomFriend.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import users from "../../assets/user.png";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";


export default function RandomFriend() {
    const { randomfriends } = useSelector((state) => state.friendReducer)
    const dispatch = useDispatch();
    const { translateMode } = useContext(DarkModeContext);

    const handleSumbit = (id) => {
        const { data } = axios.post(`api/sendfreind/${id}`)
        dispatch({ type: "SEND_FRIENDS_REQUEST_SUCCESS", data: id })
    }

    return (

        randomfriends && randomfriends.length > 0 && (
            <>
                {randomfriends.map(friend => {
                    return (
                        <div className="user">
                            <Link to={`profile/${friend.id}`}>

                                <div className="userInfo">
                                    <div className="im">

                                        {
                                            friend.profile_image ?
                                                <img src={`http://localhost:8000/user/${friend.profile_image}`} alt="" />
                                                : <img src={users} />
                                        }
                                    </div>
                                    <div className="name-friend">
                                        <span>{friend.name}</span>
                                    </div>
                                </div>
                            </Link>
                            <div className="buttons">
                                <button onClick={() => handleSumbit(friend.id)}>
                                    {
                                        translateMode ?
                                            'send' :
                                            'ارسال'
                                    }
                                </button>
                            </div>
                        </div>
                    )
                })}
            </>
        )
        || (
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: "18px" }}>Wait an Hour To Get New Suggestions</p>
        )


    )
}