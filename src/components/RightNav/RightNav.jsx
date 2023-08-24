import { useDispatch, useSelector } from "react-redux";
import "./RightNav.scss";
import RandomFriend from "../RandomFriend/RandomFriend";
import axios from "axios";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { getOnlineFriend } from "../../actions/FriendsAction";
import { Link } from "react-router-dom";
import users from "../../assets/user.png";



const RightNav = () => {

    const { translateMode } = useContext(DarkModeContext);
    const { friends, onlineFreind } = useSelector((state) => state.friendReducer)

    const dispatch = useDispatch();
    const handleSumbit = (id) => {
        const { data } = axios.post(`api/sendfreind/${id}`)
        dispatch({ type: "SEND_FRIENDS_REQUEST_SUCCESS", data: id })
    }

    console.log(onlineFreind)
    useEffect(() => {
        dispatch(getOnlineFriend())
    }, [])


    const friendsMaping = friends.map(friend => {
        return (

            <div className="user">
                <div className="userInfo">
                    <img src={`http://localhost:8000/user/${friend.profile_image}`} alt="" />
                    <span>{friend.name}</span>
                </div>
                <div className="buttons">
                    <button onClick={() => handleSumbit(friend.id)}>send</button>

                </div>
            </div>

        )
    })

    // console.log(friends)
    return (
        <div className="rightBar">
            <span>
                {
                    translateMode ?
                        'Suggestions For You' :
                        'أشخاص قد تعرفهم'
                }
            </span>
            <div className="container">
                <div className="item">
                    <RandomFriend />
                </div>
                {/* <span>
                    {
                        translateMode ?
                            'Online Friend' :
                            'الأصدقاء المتاحين'
                    }
                </span>
                <div className="item">
                    {onlineFreind.map(friend => {
                        return (
                            <div className="user">
                                <Link to={`profile/${friend.id}`}>

                                    <div className="userInfo">
                                        {
                                            friend.profile_image ?
                                                <img src={`http://localhost:8000/user/${friend.profile_image}`} alt="" />
                                                : <img src={users} />
                                        }
                                        <span>{friend.name}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div> */}
            </div>

        </div>
    );
}

export default RightNav;