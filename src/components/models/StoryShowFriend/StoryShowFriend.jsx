import { Modal, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert'
import { getViews } from '../../../actions/storyAction';
import './StoryShowFriend.scss'
import { viewStory } from '../../../api/StoryRequest';
import users from "../../../assets/user.png";


function StoryShowFriend({ openShowStoryModelFriend, setOpenShowModelFriend, story }) {
    const dispatch = useDispatch();
    useEffect(() => {

        const { data } = viewStory(story.id);
        console.log(data)
    }, []);



    return (

        <Modal
            size="55%"
            opened={openShowStoryModelFriend}
            onClose={() => setOpenShowModelFriend(false)}
            centered
            align="center"
            className='StoryShowFriend-modal'
        >
            <div className="header">
                {
                    story ?
                        <div className='story'>
                            <div className='user-info'>
                                {
                                    story ?

                                        <img
                                            src={`http://localhost:8000/user/${story.user.profile_image}`}
                                            alt="" />
                                        : <img src={users} />
                                }
                                <h2>{story.user.name}</h2>
                            </div>
                            <img
                                src={`http://localhost:8000/stories/image/${story.media_url}`}
                                alt="" />
                        </div>

                        :
                        ''
                }
            </div>

        </Modal>



    );
}
export default StoryShowFriend;