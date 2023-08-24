import './Notification.scss'
import { Link } from 'react-router-dom';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useSelector, useDispatch } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { deleteNotification, markNotificationAsRead } from './../../../actions/notificationsAction';
import axios from 'axios';
import users from "../../../assets/user.png";

export default function NotificationMenu() {
    const { user } = useSelector((state) => state.authReducer.authData)
    const { notification } = useSelector((state) => state.notificationReducer)
    const dispatch = useDispatch();

    const handleDeleteNotification = (id) => {
        const deleteNotification = async () => {
            console.log(id)
            await axios.post(`api/deleteNotification/${id}`)
            dispatch({ type: "DELETE_NOTIFICATION_SUCCESS", data: id })

        }
        deleteNotification();
        // dispatch(deleteNotification(id))


    }
    const handleMarkNotificationAsRead = (id) => {
        const markNotification = async () => {
            await axios.post(`api/markAsRead/${id}`)
            dispatch({ type: "MARK_NOTIFICATION_SUCCESS", data: id })

        }
        markNotification()
        // dispatch(markNotificationAsRead(id))


    }


    const handleDeleteSendFriendRequest = (id, notifi_id) => {
        const delet = async () => {
            console.log(id);
            await axios.post(`api/deleteFriend/${id}`);
            // console.log(data.friend.id);
            dispatch({ type: "DELETE_SEND_REQUEST_SUCCESS", data: id })
        }
        delet();
        handleMarkNotificationAsRead(notifi_id)

        // dispatch(rejectFrienReuest(id))
    }

    const handleAcceptFriend = (id, notifi_id) => {
        const Accept = async () => {
            await axios.post(`api/accepptfreind/${id}`);
            dispatch({ type: "REJECT_FRIENDS_REQUEST_SUCCESS", data: id })
        }
        Accept();
        handleMarkNotificationAsRead(notifi_id)
        // dispatch(rejectFrienReuest(id))
    }

    return (
        <dev className="any_thing">
            <div className="flex flex-col dropDownNoti">
                <div className="User-content">
                    <span>{user.name}</span>
                    {
                        user.profile_image ?
                            <img
                                src={`http://localhost:8000/user/${user.profile_image}`}
                            />
                            : <img src={users} />
                    }



                </div>

                <hr className='HR' />
                <div className="Notification-content">

                    {notification.map((notifi) => (
                        <ul className="flex flex-col gap-4">
                            {
                                notifi.type ===
                                    "App\\Notifications\\FriendRequestNotification" ?
                                    <li className={notifi.read_at === null ? 'unread' : 'read'}>
                                        {
                                            notifi.data.image ?
                                                <img src={`http://localhost:8000/user/${notifi.data.image}`} alt="" />
                                                : <img src={users} />
                                        }
                                        <div className="name-message">

                                            <div className="name-dele-read">
                                                <span>{notifi.data.name}</span>
                                                <div className="button-icon">
                                                    <button className='dele-btn' onClick={() => { handleDeleteNotification(notifi.id) }}><DeleteForeverIcon /></button>
                                                    <button className='Mark-btn' disabled={notifi.read_at === null ? false : true} onClick={() => { handleMarkNotificationAsRead(notifi.id) }}><MarkEmailReadIcon /></button>
                                                </div>

                                            </div>
                                            <h4>{notifi.data.message}</h4>
                                            <div className="button-Friend">
                                                <button className='Acc-btn' onClick={() => { handleAcceptFriend(notifi.data.friend_id, notifi.id) }} > Accept </button>
                                                <button className='Reje-btn' onClick={() => { handleDeleteSendFriendRequest(notifi.data.friend_id, notifi.id) }}>Reject</button>
                                            </div>
                                        </div>
                                    </li> :
                                    notifi.type === "App\\Notifications\\FriendRequestAcceptNotification" ?
                                        <li className={notifi.read_at === null ? 'unread' : 'read'}>

                                            {
                                                notifi.data.image ?
                                                    <img src={`http://localhost:8000/user/${notifi.data.image}`} alt="" />
                                                    : <img src={users} />
                                            }
                                            {/* <img src={`http://localhost:8000/user/${notifi.data.image}`} alt="" /> */}
                                            <div className="name-message">

                                                <div className="name-dele-read">
                                                    <span>{notifi.data.name}</span>
                                                    <div className="button-icon">
                                                        <button className='dele-btn' onClick={() => { handleDeleteNotification(notifi.id) }}><DeleteForeverIcon /></button>
                                                        <button className='Mark-btn' disabled={notifi.read_at === null ? false : true} onClick={() => { handleMarkNotificationAsRead(notifi.id) }}><MarkEmailReadIcon /></button>
                                                    </div>

                                                </div>
                                                <h4>{notifi.data.message}</h4>

                                            </div>
                                        </li> :
                                        notifi.type === "App\\Notifications\\CommentNotification" ?

                                            <li className={notifi.read_at === null ? 'unread' : 'read'}>
                                                {
                                                    notifi.data.image ?
                                                        <img src={`http://localhost:8000/user/${notifi.data.image}`} alt="" />
                                                        : <img src={users} />
                                                }
                                                {/* <img src={`http://localhost:8000/user/${notifi.data.image}`} alt="" /> */}
                                                <div className="name-message">

                                                    <div className="name-dele-read">
                                                        <span>{notifi.data.name}</span>
                                                        <div className="button-icon">
                                                            <button className='dele-btn' onClick={() => { handleDeleteNotification(notifi.id) }}><DeleteForeverIcon /></button>
                                                            <button className='Mark-btn' disabled={notifi.read_at === null ? false : true} onClick={() => { handleMarkNotificationAsRead(notifi.id) }}><MarkEmailReadIcon /></button>
                                                        </div>

                                                    </div>
                                                    <h4>{notifi.data.message}</h4>

                                                </div>
                                            </li>
                                            :
                                            notifi.type === "App\\Notifications\\LikeNotification" ?

                                                <li className={notifi.read_at === null ? 'unread' : 'read'}>
                                                    {
                                                        notifi.data.image ?
                                                            <img src={`http://localhost:8000/user/${notifi.data.image}`} alt="" />
                                                            : <img src={users} />
                                                    }
                                                    <div className="name-message">

                                                        <div className="name-dele-read">
                                                            <span>{notifi.data.name}</span>
                                                            <div className="button-icon">
                                                                <button className='dele-btn' onClick={() => { handleDeleteNotification(notifi.id) }}><DeleteForeverIcon /></button>
                                                                <button className='Mark-btn' disabled={notifi.read_at === null ? false : true} onClick={() => { handleMarkNotificationAsRead(notifi.id) }}><MarkEmailReadIcon /></button>
                                                            </div>

                                                        </div>
                                                        <h4>{notifi.data.message}</h4>

                                                    </div>
                                                </li>
                                                : 'nothing'
                            }

                            <hr className='HR' />




                        </ul>
                    ))}


                </div>

            </div>
        </dev>
    )
}