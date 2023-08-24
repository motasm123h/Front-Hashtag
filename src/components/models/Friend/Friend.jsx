import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import './Friend.scss'
import axios from 'axios';
import { useState, useEffect } from 'react';
import users from "../../../assets/user.png";


function Friend({ showFriendModel, setShowFriendModel, postId }) {
    const [userMakeLike, setUserMakeLike] = useState([]);

    const handleFetchUser = () => {
        const fetch = async () => {
            const { data } = await axios.get(`api/post/like/index/${postId}`)
            setUserMakeLike(data.users)
        }
        fetch()
    }


    // useEffect(() => {
    //     handleFetchUser();
    // }, [postId])

    return (
        <>
            <Modal
                size="55%"

                opened={showFriendModel}
                onClose={() => setShowFriendModel(false)}
                title={`Poeple how react on this post (${userMakeLike.length})`}
                centered
            >
                <div className='h-friend'>
                    <h1 onClick={() => { handleFetchUser() }}>Click to show the people how react</h1>
                </div>
                <div className="modal-like-user">
                    {
                        userMakeLike.length > 0 ?
                            userMakeLike.map(user => (
                                <div className='modal-like-user-info'>

                                    {
                                        user.profile_image ?
                                            <img src={`http://localhost:8000/user/${user.profile_image}`} alt="" />
                                            : <img src={users} />
                                    }

                                    <span>{user.name}</span>
                                </div>
                            )) :
                            <div className="model-not-found">
                                <h1>No on like to this post</h1>
                            </div>
                    }

                </div>
            </Modal>


        </>
    );
}
export default Friend;