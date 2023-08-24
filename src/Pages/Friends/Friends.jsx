import { useDispatch, useSelector } from 'react-redux';
import './Friends.scss';
import { getFriend, getsendFrienReuest, getRecievedRequest } from '../../actions/FriendsAction';
import { Link, useNavigate } from "react-router-dom";
import users from "../../assets/user.png";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";


import axios from 'axios';
import { useState } from 'react';
export default function Friends() {
    const [friendsChoice, setFriendsChoice] = useState(false);
    const [sendRequestChoice, setSendRequestChoice] = useState(false);
    const [recievedRequestChoice, setRecievedRequestChoice] = useState(false);
    const { translateMode } = useContext(DarkModeContext);

    const { friends, sendRequest, recievedRequest } = useSelector((state) => state.friendReducer)
    const dispatch = useDispatch()

    const handleFetchAllFriend = () => {

        dispatch(getFriend())
        setFriendsChoice(true)
        setRecievedRequestChoice(false);
        setSendRequestChoice(false)
    }

    const handleFetchAllSendRequest = () => {
        dispatch(getsendFrienReuest())
        setSendRequestChoice(true)
        setRecievedRequestChoice(false);
        setFriendsChoice(false)
    }

    const handleFetchAllRecievedRequest = () => {
        dispatch(getRecievedRequest())
        setRecievedRequestChoice(true);
        setSendRequestChoice(false)
        setFriendsChoice(true)
    }

    const handleRejectFriend = (id) => {
        const reject = async () => {
            console.log(id);
            await axios.post(`api/rejectedfreind/${id}`);
            dispatch({ type: "REJECT_FRIENDS_REQUEST_SUCCESS", data: id })
        }
        reject();
    }
    const handleDeletesendFriendRequest = (id) => {
        const delet = async () => {
            console.log(id);
            await axios.post(`api/deleteFriend/${id}`);
            dispatch({ type: "DELETE_SEND_REQUEST_SUCCESS", data: id })
        }
        delet();
    }
    const handleDeleteFriend = (id) => {
        const delet = async () => {
            console.log(id);
            await axios.post(`api/deleteFriend/${id}`);
            dispatch({ type: "DELETE_Friend_SUCCESS", data: id })
        }
        delet();
    }
    const handleAcceptFriend = (id) => {
        const delet = async () => {
            await axios.post(`api/accepptfreind/${id}`);
            dispatch({ type: "REJECT_FRIENDS_REQUEST_SUCCESS", data: id })
        }
        delet();
    }
    const friend = friends.map(friend => {
        return (
            <div className="friend-card">

                <Link to={`profile/${friend.id}`}>
                    {
                        friend.profile_image ?
                            <img src={`http://localhost:8000/user/${friend.profile_image}`} className="friend-avatar" />
                            : <img className="friend-def-img" src={users} />
                    }
                </Link>
                <div className="friend-info">
                    <h2>{friend.name}</h2>
                </div>
                <button onClick={() => { handleDeleteFriend(friend.pivot.id) }}>Reomve</button>
            </div >
        )
    })
    const recievReqs = recievedRequest && recievedRequest.map(friend => {
        return (
            <div className="friend-card">
                {
                    friend.user.profile_image ?
                        <img src={`http://localhost:8000/user/${friend.user.profile_image}`} className="friend-avatar" />
                        : <img className="friend-def-img" src={users} />
                }
                <div className="friend-info">
                    <h2>{friend.user.name}</h2>

                </div>
                <button onClick={() => { handleRejectFriend(friend.id) }}>Reomve</button>
                <button className='btn-2' onClick={() => { handleAcceptFriend(friend.id) }}>Accept</button>
            </div >
        )
    })
    const sendReqs = sendRequest && sendRequest.map(friend => {
        return (
            <div className="friend-card">
                {
                    friend.freind.profile_image ?
                        <img src={`http://localhost:8000/user/${friend.freind.profile_image}`} className="friend-avatar" />
                        : <img className="friend-def-img" src={users} />
                }

                <div className="friend-info">
                    <h2>{friend.freind.name}</h2>

                </div>
                <button onClick={() => { handleDeletesendFriendRequest(friend.id) }}> Cancel </button>
            </div >
        )
    })

    return (

        <div className="friend" >
            <div className="header">
                <h3 onClick={() => handleFetchAllFriend()}>{
                    translateMode ?
                        'My Friends' :
                        'أصدقائي'
                }</h3>
                <h3 onClick={() => handleFetchAllRecievedRequest()} >{
                    translateMode ?
                        'receiving requests' :
                        'الطلبات المتلقية'
                }</h3>
                <h3 onClick={() => handleFetchAllSendRequest()} >{
                    translateMode ?
                        'Sent requests' : 'الطلبات المرسلة'
                }</h3>
            </div>

            <div className="bodydd">
                {
                    recievedRequestChoice ? recievReqs :
                        sendRequestChoice ? sendReqs :
                            friendsChoice ? friend : friend
                }
            </div>

        </div >
    )
}