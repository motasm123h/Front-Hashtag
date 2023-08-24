import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import "./Posts.scss";
import authReducer from './../../reducers/authReducer';
import postReducer from './../../reducers/postReducer';
import { useEffect } from 'react';
import * as createPostApi from '../../api/PostRequest'
import { PostFetch } from "../../actions/postAction";
import axios from 'axios'
import { commentFetch } from "../../actions/commentAction";
import hello from "../../assets/hello.png";
import { useState } from "react";
import HashTag from "../models/HashTag/HashTag";


export default function Posts() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData)
    const { posts, loading } = useSelector((state) => state.postReducer)
    const [hashTagModelOpen, setHashTagModelOpen] = useState(false);



    useEffect(() => {
        dispatch(PostFetch())
    }, [])

    // console.log(posts)

    useEffect(() => {
        const hasRefreshed = localStorage.getItem('hasRefreshed');
        if (!hasRefreshed) {
            localStorage.setItem('hasRefreshed', true);
            window.location.reload();
        }
    }, []);

    return (


        posts && posts.length > 0 && (
            <div className="posts">
                {posts.map(post => (
                    <Post
                        post={post}
                        key={post.id}
                    />
                ))}
            </div>
        ) || (
            <>
                <div className="posts-img">
                    < img src={hello} />
                    <span onClick={() => { setHashTagModelOpen(true) }}>  Please choose your hashtag</span>
                </div>

                <HashTag
                    className="model-friend"
                    hashTagModelOpen={hashTagModelOpen}
                    setHashTagModelOpen={setHashTagModelOpen}
                />
            </>
        )

    )

};

