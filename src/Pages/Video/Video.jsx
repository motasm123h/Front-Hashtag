import './Video.scss';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { videoFetch, createPostVideo } from '../../actions/VideoAction';
import swal from 'sweetalert'
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import users from "../../assets/user.png";
import loading_bar from '../../assets/loading-bar.png'



export default function Video() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData)
    const { video, loading } = useSelector((state) => state.videoReducer)
    const { translateMode } = useContext(DarkModeContext);

    const [videoUpload, setVideoUpload] = useState(null);
    const videoRef = useRef();
    const desc = useRef();



    const deleteVideo = (id) => {
        const delet = async () => {
            const { data } = await axios.post(`api/post/deletVideo/${id}`)
            dispatch({ type: "REDUCER_THE_VIDEOS_BY_ONE", data: id })
        }
        delet()
    }


    const onVideoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let video = e.target.files[0]
            setVideoUpload(video);
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        let newPost = {
            text: desc.current.value,
        }

        if (videoUpload) {
            const formData = new FormData();
            formData.append("video", videoUpload);
            formData.append('text', newPost.text);

            try {
                dispatch(createPostVideo(formData))
                console.log("here")
            } catch (err) {
                console.log(err)
            }
            swal({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success",
                button: "Aww yiss!",
            });
        }
        if (newPost.type === null || newPost.text.length === 0) {
            swal({
                title: "Opss ,there is an Error !",
                text: "Please chose the type of the post first",
                icon: "error",
                button: "Aww nooo!",
            });
        }


        resetShar();
    }

    const resetShar = () => {
        setVideoUpload(null);
        desc.current.value = null
    }




    useEffect(() => {
        dispatch(videoFetch())
    }, []);

    return (
        <div className="video-container">


            <div className="share">
                <div className="container">
                    <div className="top">
                        {
                            user.profile_image ?
                                <img src={`http://localhost:8000/user/${user.profile_image}`} alt="" />
                                :
                                <img src={users} />

                        }

                        <input
                            type="text"
                            placeholder={translateMode ? `Shar your videos now ${user.name} (:` : `${user.name} أنشر فيديوهاتك يا `}
                            ref={desc}
                        />
                    </div>
                    <hr />
                    <div className="bottom">
                        <div className="left">
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                ref={videoRef}
                                accept="video/*"
                                onChange={onVideoChange} />
                            <label htmlFor="file">
                                <div className="item">
                                    <img src={Image} alt="" />
                                    <span>{translateMode ? 'Add video' : 'أضف فيديو'}</span>
                                </div>
                            </label>

                        </div>
                        <div className="right">
                            <button
                                onClick={handelSubmit}>
                                {
                                    translateMode ?
                                        'upload' :
                                        'نشر'
                                }

                            </button>
                        </div>
                    </div>

                </div>

            </div>
            {
                loading ?
                    <img src={loading_bar} /> :
                    <div>
                        {video.map(video => (
                            <div key={video.id} className='div-video'>
                                <div className='video-header'>
                                    <div className='user-infor'>
                                        {
                                            video.user.profile_image ?
                                                <img src={`http://localhost:8000/user/${video.user.profile_image}`} alt="" />
                                                :
                                                <img src={users} />

                                        }

                                        <h2>{video.text}</h2>
                                    </div>
                                    <div className="X-but" onClick={() => { deleteVideo(video.id) }}>
                                        x
                                    </div>
                                </div>

                                <video src={`http://localhost:8000/video/${video.video}`} controls autoPlay ></video>
                            </div>
                        ))}

                    </div>

            }


        </div>
    );
}