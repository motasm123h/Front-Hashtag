import "./stories.scss"
import { useSelector } from "react-redux";
import { useState } from 'react';
import users from "../../assets/user.png";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";




import StoryModels from './../models/Story/StoryModels';
import StoryShow from './../models/StoryShow/StoryShow';
import StoryShowFriend from "../models/StoryShowFriend/StoryShowFriend";
export default function Stories() {

    const { user } = useSelector((state) => state.authReducer.authData)
    const [openModel, setOpenModel] = useState(false);
    const [openShowStoryModel, setOpenShowModel] = useState(false);
    const [openShowStoryModelFriend, setOpenShowModelFriend] = useState(false);
    const [story, setStory] = useState([]);
    const { stories } = useSelector((state) => state.storyReducer);
    const { myStory } = useSelector((state) => state.storyReducer);
    const { translateMode, } = useContext(DarkModeContext);

    return (
        <div className="stories">
            <div className="story">

                {myStory[0] ?

                    <img
                        onClick={() => setOpenShowModel(true)}
                        src={`http://localhost:8000/stories/image/${myStory[0].media_url}`}
                        alt=""
                    />
                    : user.profile_image ?
                        <img
                            src={`http://localhost:8000/user/${user.profile_image}`}
                            alt=""
                        /> : <img src={users} />
                }

                <StoryShow
                    openShowStoryModel={openShowStoryModel}
                    setOpenShowModel={setOpenShowModel}
                    story={myStory[0]}
                />

                <span>{user.name}</span>
                <button
                    onClick={() => { setOpenModel(true) }}
                >+</button>

                <StoryModels
                    openModel={openModel}
                    setOpenModel={setOpenModel}

                />
            </div>


            {

                stories[0] ?
                    stories.map(story => (
                        <>
                            <div className="story" key={story.id}
                                onClick={() => { setOpenShowModelFriend(true), setStory(story) }}
                            >
                                <img
                                    src={`http://localhost:8000/stories/image/${story.media_url}`}
                                    alt="" />
                                <span>{story.content}</span>
                            </div>
                        </>
                    ))

                    : <h1>{
                        translateMode ?
                            'You Dont Have any story to show it'
                            :
                            'ليس لديك أي قصص لعرضها الان'
                    } </h1>

            }
            {
                openShowStoryModelFriend ?
                    <StoryShowFriend
                        openShowStoryModelFriend={openShowStoryModelFriend}
                        setOpenShowModelFriend={setOpenShowModelFriend}
                        story={story}
                    />
                    : ''
            }

        </div>
    )
}

