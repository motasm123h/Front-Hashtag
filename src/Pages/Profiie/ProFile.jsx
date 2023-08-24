import './ProFile.scss'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Post from "../../components/Post/Post"
import Profile from "../../components/models/Profile/Profile"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { profileInfo } from '../../actions/postAction'
import { Link } from "react-router-dom"
import loadinglogo from "../../assets/animation/Eclipse-1.1s-200px.gif";
import cover from "../../assets/cover.jpg";
import authenticity from "../../assets/authenticity.png";
import swal from 'sweetalert';
import CheckIcon from '@mui/icons-material/Check';
import users from "../../assets/user.png";
import bac from "../../assets/bac.jpg";
import loading_bar from '../../assets/loading-bar.png'



import axios from 'axios';
const ProFile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData)
    const { savePost } = useSelector((state) => state.saveReducer)
    const { profile, loading } = useSelector((state) => state.postReducer)
    const [updateProfileModelOpen, setUpdateProfileModelOpen] = useState(false);
    const [sendRequest, setSendRequest] = useState(false)
    useEffect(() => {
        dispatch(profileInfo(id))
    }, [id])

    // console.log(sendRequest)


    const handleSumbit = (id) => {
        const { data } = axios.post(`api/sendfreind/${id}`)
        dispatch({ type: "SEND_FRIENDS_REQUEST_SUCCESS", data: id })
        setSendRequest(true)
    }


    return (
        (loading || profile === null ? <div className="imgloading">
            <img src={loading_bar} />
        </div> :
            <div className="profile">

                <div className="images">
                    {

                        profile[0].user[0].cover_image ?
                            <img
                                src={profile[0] ? `http://localhost:8000/user/${profile[0].user[0].cover_image}` : cover}
                                alt=""
                                className="cover"
                            />
                            :
                            <img src={bac} className="cover" />
                    }
                    <div className='make-it-row'>

                        {
                            profile[0].user[0].profile_image ?
                                <img
                                    src={profile[0] ? `http://localhost:8000/user/${profile[0].user[0].profile_image}` : cover}
                                    alt=""
                                    className="profilePic"
                                />
                                : <img className="default-img" src={users} />
                        }
                        {
                            profile[0].user[0].Authentication_mark ?
                                <img className="auth" src={authenticity} alt="" /> : ''
                        }
                    </div>
                </div >
                <div className="profileContainer">
                    <div className="uInfo">
                        <div className="center">
                            <span>{profile[0] ? profile[0].user[0].name : 'MOTASM'}</span>

                            <div className="info">
                                <div className="item">
                                    <PlaceIcon />
                                    <span>{profile[0] ? profile[0].user[0].address : 'UK'}</span>

                                    <div className="right">
                                        <Link to="/chat">
                                            <EmailOutlinedIcon />
                                        </Link>
                                        <MoreVertIcon />
                                    </div>
                                </div>

                            </div>

                            {
                                parseInt(id) === user.id ?
                                    <div className="item" onClick={() => setUpdateProfileModelOpen(true)}>
                                        <button>Update</button>
                                    </div>
                                    : ''
                            }
                            <Profile
                                className="model-friend"
                                updateProfileModelOpen={updateProfileModelOpen}
                                setUpdateProfileModelOpen={setUpdateProfileModelOpen}
                            />
                        </div>

                        <div style={{ 'paddingLeft': '8px' }}>
                            {
                                sendRequest ? <button className='send-buttn' disabled={!sendRequest}>request send <CheckIcon /> </button> :
                                    parseInt(id) === user.id ? '' :
                                        <button className='add-friedn' onClick={() => { handleSumbit(profile[0].user[0].id) }}>Add friend</button>


                            }
                        </div>


                    </div>
                    {profile[0] ? profile[0].posts && (
                        <div className="posts">
                            {profile[0].posts.map(post => (
                                <Post
                                    post={post}
                                    key={post.id}
                                />
                            ))}
                        </div>
                    ) || (
                            'loading ....'
                        ) : ''}
                </div>
            </div >)
    );
};

export default ProFile;