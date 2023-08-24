import { commentCreate, commentFetch } from "../../actions/commentAction";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./comments.scss";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import users from "../../assets/user.png";

const Comments = (postId) => {


    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData)
    const allComments = useSelector((state) => state.commentReducer.commentData);
    const [newComment, setNewComment] = useState({
        comment: "",
        post_id: postId.postId,
    });


    useEffect(() => {
        dispatch(commentFetch(postId.postId))
    }, [newComment])

    const comments = allComments.filter(comment => comment.post_id === postId.postId)
    const handelChange = (e) => {
        setNewComment({
            ...newComment,
            [e.target.name]: e.target.value
        })
    }
    const reset = () => {
        newComment.comment = ""
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(commentCreate(newComment, postId.postId))
        dispatch({ type: 'CREATE_SUCCESS_COUNTER', data: postId.postId })
        reset();
    }

    const deletePost = (id) => {
        const dele = async () => {
            await axios.post(`api/post/comment/delete/${id}`);
            dispatch({ type: 'REDUCE_THE_COUNTER_BY_ONE', data: postId.postId })
        }

        dele();
        dispatch({ type: "DELETE_COMMENT_FROM_THE_COMMENTS", id: id })

    }


    return (
        <div className="comments">
            <div className="write">
                {
                    user.profile_image ?
                        <img src={`http://localhost:8000/user/${user.profile_image}`} alt="" />
                        :
                        <img src={users} />

                }

                <input
                    name="comment"
                    value={newComment.comment}
                    onChange={handelChange}
                    type="text"
                    placeholder="write a comment" />
                <button
                    onClick={onSubmit}
                >Send</button>
            </div>
            {comments.map((comment) => (
                <div className="comment" key={comment.id}>
                    {
                        comment.user.profile_image ?
                            < img src={`http://localhost:8000/user/${comment.user.profile_image}`} alt="" /> :
                            <img src={users} />
                    }
                    <div className="info" >
                        <span>{comment.user.name}</span>
                        <p>{comment.comment}</p>
                    </div>
                    <div>
                        {
                            comment.user.id === user.id ?
                                <button onClick={() => { deletePost(comment.id) }}> <DeleteForeverIcon /> </button>
                                : ''
                        }
                    </div>
                    {/* <span className="date">{comment.date_created}</span> */}
                    {/* <hr /> */}
                </div>
            ))}
        </div>
    );
};

export default Comments;