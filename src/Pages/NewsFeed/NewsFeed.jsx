import { useSelector } from 'react-redux'
import './NewsFeed.scss'
import Post from '../../components/Post/Post'
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

export default function NewsFeed() {

    const { newsFeedPost } = useSelector((state) => state.postReducer)
    const { translateMode } = useContext(DarkModeContext);

    console.log(newsFeedPost)



    return (
        <div className="newsFeed">

            <h1>
                {
                    translateMode ?
                        ' here you can find what ever you want' :
                        'هنا يمكنك أن تجد ماتريد'
                }
            </h1>

            <div className='newsFeedPost'>

                {
                    newsFeedPost && (
                        <div className="posts">
                            {newsFeedPost.map(post => (
                                <Post
                                    post={post}
                                    key={post.id}
                                />
                            ))}
                        </div>
                    ) || (
                        "Please choose your hashtag"
                    )}
            </div>
        </div>
    )

}