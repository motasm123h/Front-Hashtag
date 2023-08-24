import "./LeftNav.scss";
import laugh from "../../assets/laugh.png";
import Groups from "../../assets/men.png";
import users from "../../assets/user.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memoriesimg from "../../assets/bookmark.png";
import Events from "../../assets/news.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/play-button.png";
import chat from "../../assets/chat.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { Link } from "react-router-dom";
import Friend from "../models/Friend/Friend";
import Memories from "../models/Memories/Memories";
import { useState } from "react";
import { useSelector } from "react-redux";
import HashTag from './../models/HashTag/HashTag';
import authReducer from './../../reducers/authReducer';
import hashtag from '../../assets/hashtag.png';
import Save from '../../Pages/Save/Save';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const LeftNav = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    const { user } = useSelector((state) => state.authReducer.authData);

    const [friendModelOpen, setFriendModelOpen] = useState(false);
    const [memoriesModelOpen, setMemoriesModelOpen] = useState(false);
    const [hashTagModelOpen, setHashTagModelOpen] = useState(false);
    const { translateMode } = useContext(DarkModeContext);

    return (
        <>
            <HashTag
                className="model-friend"
                hashTagModelOpen={hashTagModelOpen}
                setHashTagModelOpen={setHashTagModelOpen}
            />

            <div className="leftBar">
                <div className="container">
                    <div className="menu">
                        <Link to={`/profile/${user.id}`}>
                            <div className="user">
                                {
                                    user.profile_image ? <img
                                        src={`http://localhost:8000/user/${user.profile_image}`}
                                        alt=""
                                    /> : <img src={users} />
                                }
                                <span>{user.name}</span>
                            </div>
                        </Link>
                        <hr />

                        <div className="item" onClick={() => { scrollToTop, setHashTagModelOpen(true) }}>
                            <img src={hashtag} alt="" />
                            <span>
                                {
                                    translateMode ?
                                        'HashTags' :
                                        'الهاشتاغات'

                                }

                            </span>
                        </div>


                        <Link to="/friends">
                            <div className="item" >
                                <img src={laugh} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Friends' :
                                            'الأصدقاء'

                                    }


                                </span>
                            </div>
                        </Link>


                        <Friend
                            className="model-friend"
                            friendModelOpen={friendModelOpen}
                            setFriendModelOpen={setFriendModelOpen}
                        />

                        <Link to="/save">

                            <div className="item" onClick={() => setMemoriesModelOpen(true)}>
                                <img src={Memoriesimg} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Memories' :
                                            'العناصر المحفوظة'

                                    }
                                </span>
                            </div>
                        </Link>


                        <Link to="/video">
                            <div className="item">
                                <img src={Videos} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Videos' :
                                            'الفيديوهات'

                                    }
                                </span>

                            </div>
                        </Link>

                        <Link to="/chat">
                            <div className="item">
                                <img src={chat} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Messages' :
                                            'المحادثات'

                                    }
                                </span>
                            </div>
                        </Link>

                    </div>
                    <div className="menu">
                        <span>
                            {
                                translateMode ?
                                    'Your shortcuts' :
                                    'أختصاراتك'

                            }
                            
                            </span>
                        <hr />

                        <Link to="NewsFeed">
                            <div className="item">
                                <img src={Events} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'News Feed' :
                                            'الأخبار الجديدة'

                                    }
                                </span>
                            </div>
                        </Link>

                        <Link to="/groups">
                            <div className="item">
                                <img src={Groups} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Groups' :
                                            'المجموعات'

                                    }
                                </span>
                            </div>
                        </Link>

                        <Link to="/games">

                            <div className="item">
                                <img src={Gaming} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Gaming' :
                                            'الألعاب'

                                    }
                                    </span>
                            </div>

                        </Link>

                        <div className="item">
                            <img src={Gallery} alt="" />
                            <span>
                                {
                                    translateMode ?
                                        'Gallery' :
                                        'الأستديو'

                                }
                                </span>
                        </div>


                        <div className="item">
                            <img src={Market} alt="" />
                            <span>
                                {
                                    translateMode ?
                                        'Marketplace' :
                                        'المتجر'

                                }
                                </span>
                        </div>

                        {/* <div className="item">
                            <img src={Watch} alt="" />
                            <span>Watch</span>
                        </div> */}

                    </div>
                    <div className="menu">
                        <span>
                            {
                                translateMode ?
                                    'Others' :
                                    '.. أخرى'

                            }
                            </span>
                        <hr />

                        <div className="item">
                            <img src={Fund} alt="" />
                            <span>
                                {
                                    translateMode ?
                                        'Fundraiser' :
                                        'جمع التبرعات'

                                }
                                </span>
                        </div>
                        <div className="item">
                            <img src={Tutorials} alt="" />
                            <span>
                                {
                                    translateMode ?
                                        'Tutorials' :
                                        'دروس'

                                }
                                </span>
                        </div>
                        <div className="item">
                            <img src={Courses} alt="" />
                            <span>
                                {
                                    translateMode ?
                                        'Courses' :
                                        'كورسات'

                                }
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default LeftNav;