import { useEffect } from 'react';
import './SpicificGroups.scss'
import { Outlet, useParams } from "react-router"
import axios from 'axios';
import { useState } from 'react';
import Post from '../../components/Post/Post';

export default function SpicificGroups() {
    const params = useParams();
    const [posts, setPosts] = useState([]);

    const id = params['id']

    console.log(id)
    useEffect(() => {
        const post = async () => {
            const { data } = await axios.get(`api/post/type/${id}`)
            setPosts(data.post)
        }
        post();
    }, [id])




    return (
        <div className="group">

            <div className='group-header'>
                {
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
                        "Please choose your hashtag"
                    )
                }
            </div>
        </div>

    )
}