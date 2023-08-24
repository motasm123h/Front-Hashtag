import "./Post.scss";
import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostMenu from './../MenuDropDowns/Post/PostMenu';
import { PostDelete } from "../../actions/postAction";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { formatDistanceStrict } from 'date-fns';
import users from "../../assets/user.png";
import Friend from './../models/Friend/Friend';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";


const Post = ({ post }) => {

    const currentDate = new Date();

    const timeDiff = formatDistanceStrict(new Date(post.created_at), currentDate, { addSuffix: true });

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData)
    const [commentOpen, setCommentOpen] = useState(false);
    const [showPostOption, setShowPostOption] = useState(false);
    const [postId, setPostID] = useState(0);
    const [showFriendModel, setShowFriendModel] = useState(false);
    const { translateMode } = useContext(DarkModeContext);

    const handleShowPost = () => {
        setShowPostOption(!showPostOption)
    }

    const getPostId = (id) => {
        setPostID(id);
    }
    const showComment = () => {
        setCommentOpen(!commentOpen)
    }

    const [liked, setLiked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const react = async () => {
            setLiked(!liked);
            await axios.post(`api/post/like/create/${post.id}`)
            if (post.isLiked === false) {
                dispatch({ type: "ADD_THE_LIKE_TO_THE_POST", id: post.id })
            }
            else {
                dispatch({ type: "REMOVE_THE_LIKE_FROME_THE_POST", id: post.id })
            }
        }
        react()
    }



    const handleDeletewithAlert = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // handleDeletePost();
                    dispatch(PostDelete(post.id))

                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    const handleReportwithAlert = () => {
        swal({
            title: "Are you sure?",
            text: "Once you report , you will not be able to romve it!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    // handleDeletePost();
                    const report = async () => {
                        const { data } = await axios.post(`api/post/report/${post.id}`)

                    }
                    report();

                    swal("Poof! We will look for your report !", {
                        icon: "success",
                    });
                } else {
                    swal("Hope you have good time!");
                }
            });
    }

    const handleSavePost = () => {
        const savePost = async () => {
            const { data } = await axios.post(`api/post/save/${post.id}`)
            if (post.isSaved === false) {
                dispatch({ type: "ADD_THE_SAVE_TO_THE_POST", data: { id: post.id, data: data.post } })
            }
            else {
                dispatch({ type: "REMOVE_THE_SAVE_FROME_THE_POST", id: post.id })
            }
        }
        savePost();
    }

    const handleMakeReportOnPost = () => {
        const report = async () => {
            const { data } = await axios.post(`api/post/report/${post.id}`)

        }
        report();
    }

    // console.log(post.isLiked)

    return (
        <div
            className={`card ${showPostOption ? 'cardFlip' : ''}`}>
            <div className="front">

                <div className="post">
                    <div className="container">
                        <div className="user">
                            <div className="userInfo">

                                {
                                    post.user.profile_image ?
                                        <img src={`http://localhost:8000/user/${post.user.profile_image}`} alt="" />
                                        : <img src={users} />
                                }
                                <div className="details">
                                    <Link
                                        to={`/profile/${post.user_id}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <span className="name">{post.user.name}</span>
                                    </Link>
                                    <span className="date">{timeDiff}</span>
                                </div>
                            </div>
                            <div>
                                <MoreHorizIcon onClick={handleShowPost} />
                            </div>
                        </div>
                        <div className="content">
                            <p>{post.text}</p>
                            {
                                post.image ?
                                    <img src={`http://localhost:8000/posts/${post.image}`} alt="" /> : ''}
                        </div>
                        <div className="info">
                            <div className="test">

                                <div className="item" >
                                    <div onClick={handleSubmit}>

                                        {
                                            post.isLiked
                                                ? <FavoriteOutlinedIcon />
                                                : <FavoriteBorderOutlinedIcon />
                                        }
                                    </div>
                                    <div className='like-border' onClick={() => { setShowFriendModel(true), getPostId(post.id) }}>
                                        {post.like_count}
                                    </div>


                                    {
                                        showFriendModel ?
                                            <Friend
                                                showFriendModel={showFriendModel}
                                                setShowFriendModel={setShowFriendModel}
                                                postId={postId}
                                            /> : ''
                                    }

                                </div>
                                <div className="item"
                                    onClick={() => { showComment(), getPostId(post.id) }}>
                                    <TextsmsOutlinedIcon />
                                    <div className='like-border' >
                                        {post.comment_count}

                                    </div>
                                </div>
                                <div className="item" onClick={handleSavePost}>
                                    {
                                        post.isSaved
                                            ? <BookmarkIcon />
                                            : <TurnedInNotIcon />}

                                    {
                                        translateMode ?
                                            'save' :
                                            'حفظ'
                                    }
                                </div>
                            </div>

                            <div className="hash">
                                <Link to={`/HashTagPosts/${post.hashtag_id}`}>
                                    {post.type}
                                </Link>
                            </div>
                        </div>



                        {commentOpen &&
                            <Comments
                                postId={postId}
                            />
                        }
                    </div>
                </div>

            </div>

            {
                showPostOption &&
                <div className="back">
                    <div className="container">
                        <div className="memo">
                            <MoreHorizIcon onClick={handleShowPost} />
                        </div>
                        <div className="butt">
                            {
                                post.user.id === user.id ?

                                    <button
                                        onClick={handleDeletewithAlert}
                                        className="edit-button">
                                        {
                                            translateMode ?
                                                'Delete' :
                                                'حذف'
                                        }
                                        <span><DeleteForeverIcon /></span>
                                    </button>
                                    :
                                    ' '
                            }

                            <Link to={`/post/edit/${post.id}`}>
                                {
                                    post.user.id === user.id ?
                                        <button
                                            className="delete-button">
                                            {
                                                translateMode ?
                                                    'Edit' :
                                                    'تعديل'
                                            }

                                            <span> <EditIcon /> </span>
                                        </button>
                                        :
                                        ' '
                                }

                            </Link>


                            {/* stop here */}
                            <Link to>
                                {
                                    post.user.id === user.id ? ' ' :
                                        <button onClick={() => { handleReportwithAlert() }}
                                            className="delete-button">
                                            {
                                                translateMode ?
                                                    'Report' :
                                                    'أبلاغ'
                                            }
                                            <span><ReportIcon /></span>
                                        </button>
                                }

                            </Link>
                        </div>
                    </div>
                </div>}

        </div>

    );
};

export default Post;