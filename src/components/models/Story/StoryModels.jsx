import { Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Image from "../../../assets/img.png";
import swal from 'sweetalert'
import { uploadStory, uploadStoryImage } from '../../../actions/storyAction';


function StoryModels({ openModel, setOpenModel }) {
    const { user } = useSelector((state) => state.authReducer.authData)
    const dispatch = useDispatch();
    const [storyImage, setStoryImage] = useState(null)
    const [formData, setFormData] = useState({
        content: '',
        name: '',
        media_type: '',
        media_url: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setStoryImage(img)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (storyImage) {
            let data = new FormData();
            const fileName = Date.now() + storyImage.name;
            data.append("image", storyImage);
            data.append("name", fileName);
            formData.name = fileName;
            formData.media_type = 'image';
            formData.media_url = fileName;
            try {
                dispatch(uploadStoryImage(data))
            } catch (err) {
                console.log(err)
            }
        }

        dispatch(uploadStory(formData));
        swal({
            title: "Mission ِccomplished!",
            icon: "success",
            button: "Aww yess!",
        });
    }

    return (

        <Modal
            size="55%"
            opened={openModel}
            onClose={() => setOpenModel(false)}
            centered
            align="center"
            className='profile-modal'
        >

            <form onSubmit={handleSubmit} className='form'>
                <div className="public_info">
                    <input
                        type="text"
                        placeholder={`write what ever you want ${user.name}`}
                        name="content"
                        onChange={handleChange}
                        value={formData.content}
                    />
                    <input
                        id="profile"
                        type="file"
                        name="storyImage"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />

                    <label htmlFor="profile">
                        <div className="item">
                            <img src={Image} alt="" />
                            <span>Add Profile Image</span>
                        </div>
                    </label>


                </div>
                <div >

                    {/* <div className='cover-profile'> */}









                    <div className="item-photo">

                        {storyImage && (
                            <img src={URL.createObjectURL(storyImage)} alt="Cover Image" />
                        )}
                        {/*
                        {coverImage && (
                            <img src={URL.createObjectURL(coverImage)} alt="Cover Image" />
                        )} */}

                    </div>


                </div>
                <button>
                    Update your info
                </button>
            </form>

        </Modal>



    );
}
export default StoryModels;