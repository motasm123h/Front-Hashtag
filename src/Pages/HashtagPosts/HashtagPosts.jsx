import { useParams } from 'react-router'
import './HashtagPosts.scss'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Post from '../../components/Post/Post';
import Welcome from './../../components/chat/Welcome/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { postByType } from '../../actions/postAction';
import loading_bar from '../../assets/loading-bar.png'
export default function HashTagPosts() {
    const { post_type } = useParams();
    const { postsForType, postType, loading } = useSelector((state) => state.postReducer)
    const dispatch = useDispatch()


    console.log(postsForType)

    useEffect(() => {
        dispatch(postByType(post_type))
        // const post = async () => {
        //     const { data } = await axios.get(`api/post/type/${post_type}`)
        //     setPosts(data.post)
        //     setType(data.type)
        // }
        // post();
    }, [post_type])

    // console.log(posts)
    // console.log(type)



    return (
        <div className="hashtagPost">
            <h1> <span> {postType} </span></h1>
            <div className='hashtagPost-header'>



                {
                    loading ?
                        <img src={loading_bar} /> :
                        (
                            postsForType && postsForType.length > 0 && (
                                <div className="hashtagPost">
                                    {postsForType.map(post => (
                                        <Post
                                            post={post}
                                            key={post.id}
                                        />
                                    ))}
                                </div>
                            ) || (
                                <h2>THe <spane>{postType}</spane>has no post yet</h2>
                            )
                        )
                }



            </div>
        </div>

    )
}