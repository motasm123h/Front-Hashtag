import './Profile.scss'
import { Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Image from "../../../assets/img.png";
import { uploadIma } from '../../../actions/uploadAction';
import { updateInfo } from '../../../actions/AuthAction';
import swal from 'sweetalert'


function Profile({ updateProfileModelOpen, setUpdateProfileModelOpen }) {
    const { user } = useSelector((state) => state.authReducer.authData)
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
    })
    const [profileImage, setProfile_image] = useState(null)
    const [coverImage, setCover_image] = useState(null)


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            console.log("this is image" + img)
            e.target.name === "profileImage"
                ? setProfile_image(img)
                : setCover_image(img)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (profileImage) {
            let data = new FormData();
            const fileName = Date.now() + profileImage.name;

            data.append("image", profileImage, profileImage.name);
            data.append("name", fileName);
            data.append("type", 'user');
            formData.profile_image = fileName;
            try {
                dispatch(uploadIma(data))
            } catch (err) {
                console.log(err)
            }
        }

        if (coverImage) {
            let data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append("name", fileName);
            data.append("image", coverImage);
            data.append("type", 'user');
            formData.cover_image = fileName;
            try {
                dispatch(uploadIma(data))
            } catch (err) {
                console.log(err)
            }
        }
        dispatch(updateInfo(formData));
        swal({
            title: "Mission ِccomplished!",
            // text: "You clicked the button!",
            icon: "success",
            button: "Aww yess!",
        });
    }

    return (

        <Modal
            size="55%"
            opened={updateProfileModelOpen}
            onClose={() => setUpdateProfileModelOpen(false)}
            // display="fixed"
            centered
            align="center"
            className='profile-modal'
        >

            <form onSubmit={handleSubmit} className='form'>
                <div className="public_info">
                    <input
                        type="text"
                        placeholder="User Name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />

                    <input
                        type="text"
                        placeholder="Your Address"
                        name="address"
                        onChange={handleChange}
                        value={formData.address}
                    />
                </div>
                <div >

                    <div className='cover-profile'>

                        <input
                            id="profile"
                            type="file"
                            name="profileImage"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />

                        <label htmlFor="profile">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Profile Image</span>
                            </div>
                        </label>



                        <input
                            type="file"
                            id="coverfile"
                            name="coverImage"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />

                        <label htmlFor="coverfile">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Cover Image</span>
                            </div>
                        </label>
                    </div>


                    <div className="item-photo">

                        {profileImage && (
                            <img src={URL.createObjectURL(profileImage)} alt="Cover Image" />
                        )}

                        {coverImage && (
                            <img src={URL.createObjectURL(coverImage)} alt="Cover Image" />
                        )}

                    </div>


                </div>
                <button>
                    Update your info
                </button>
            </form>

        </Modal>



    );
}
export default Profile;