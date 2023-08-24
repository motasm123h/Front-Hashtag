import './Search.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import axios from 'axios'
import { Link } from "react-router-dom"
import result from '../../img/3024051.jpg'
import users from "../../assets/user.png";


export default function Search() {


    const { searchUser } = useSelector((state) => state.postReducer)
    const { SearchPost } = useSelector((state) => state.postReducer)
    console.log(SearchPost)

    const handleSumbit = (id) => {
        const { data } = axios.post(`api/sendfreind/${id}`)
        dispatch({ type: "SEND_FRIENDS_REQUEST_SUCCESS", data: id })
    }

    const User = searchUser && searchUser.length > 0 ? searchUser.map(user => {
        return (
            <div className="friend-container">
                <Link to={`profile/${user.id}`}>
                    <div className="friend-card">
                        {
                            user.profile_image ?

                                <img src={`http://localhost:8000/user/${user.profile_image}`} className="friend-avatar" /> :

                                <img src={users} className="friend-avatar" />
                        }
                        <div className="friend-info">
                            <h2>{user.name}</h2>
                        </div>
                        <div className="buttons">
                            <button onClick={() => handleSumbit(user.id)}>send</button>
                        </div>
                    </div >
                </Link>
            </div>
        )
    }) :
        <div className="img-center">
            <img src={result} />
        </div>

    return (
        <div className="search-result">
            <div className="UserSearch">
                <h1> the Related user</h1>
                {
                    User
                }
            </div>


            <div className="PostSearch">
                <h1>the Related Post</h1>
                {SearchPost && SearchPost.length > 0 ? (
                    <div className="posts">
                        {SearchPost.map(post => (
                            <Post
                                post={post}
                                key={post.id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="img-center">
                        <img src={result} />
                    </div>
                )}
            </div>
        </div>
    )
}