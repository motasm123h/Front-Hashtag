import { Modal, Button, Group } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert'
import { deleteStory, getViews } from '../../../actions/storyAction';
import './StoryShow.scss'
import { formatDistanceStrict } from 'date-fns';
import users from "../../../assets/user.png";


function StoryShow({ openShowStoryModel, setOpenShowModel, story }) {
    const dispatch = useDispatch();
    useEffect(() => {

        {
            story ?
                dispatch(getViews(story.id))
                : ''
        }
    }, [openShowStoryModel]);
    const { stories_view } = useSelector((state) => state.storyReducer);

    const currentDate = new Date();
    const timeDiff = story ? formatDistanceStrict(new Date(story.created_at), currentDate, { addSuffix: true }) : '';

    const handleDeleteStory = (id) => {
        dispatch(deleteStory(id));
    }

    return (

        <Modal
            size="55%"
            opened={openShowStoryModel}
            onClose={() => setOpenShowModel(false)}
            centered
            title={`Your story `}
            align="center"
            className='profileshow-modal'
        >

            <div className="header">
                {
                    story ?
                        <>
                            <div className="story-body">

                                <img


                                    src={`http://localhost:8000/stories/image/${story.media_url}`}

                                    alt="" />
                                <div className='views-create'>

                                    <span>created since :{timeDiff}</span>
                                    <span>the views number : {stories_view.length}</span>
                                    <button onClick={() => { handleDeleteStory(story.id) }}>Delete</button>
                                </div>
                            </div>
                            <hr />
                            <br />
                            <div className='user-header'>
                                {stories_view.map(story => (
                                    <div className="user">
                                        {
                                            story.profile_image ?
                                                <img
                                                    src={`http://localhost:8000/user/${story.profile_image}`}
                                                />
                                                : <img src={users} />
                                        }
                                        <span>{story.name}</span>
                                    </div>
                                ))}
                            </div>
                        </>


                        :
                        ''
                }
            </div>

        </Modal>



    );
}
export default StoryShow;