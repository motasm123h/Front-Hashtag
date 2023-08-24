import { savePostFetch } from '../../actions/SaveAction';
import Post from '../../components/Post/Post';
import './Save.scss'
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DarkModeContext } from "../../context/darkModeContext";



export default function Save() {
    const dispatch = useDispatch()
    const { savePost } = useSelector((state) => state.saveReducer)
    const { translateMode } = useContext(DarkModeContext);

    useEffect(() => {
        dispatch(
            savePostFetch()
        )
        // PostFetch()
    }, [])
    return (
        <div className='save-container'>
            <h1>
                {
                    translateMode ?
                    '  Welcome to the MEMORIES section':
                    'مرحبا الى قسم العناصر الحفوظة'
                }
              </h1>

            {savePost && (
                <div className="posts">
                    {savePost.map(post => (
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
    )
}