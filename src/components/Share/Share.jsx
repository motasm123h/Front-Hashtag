import "./Share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { uploadIma, uploadPost } from "../../actions/uploadAction";
import swal from 'sweetalert'
import users from "../../assets/user.png";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";




export default function Share() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const uploading = useSelector((state) => state.postReducer.uploading)
    const [image, setImage] = useState(null);
    const [type, setType] = useState(null);
    const [showOption, setShowOption] = useState(false);
    const imageRef = useRef();
    const desc = useRef()
    const { translateMode } = useContext(DarkModeContext);


    const options = [
        { value: '1', label: '# Sport' },
        { value: '2', label: '# News' },
        { value: '3', label: '# Food' },
        { value: '4', label: '# Music' },
        { value: '5', label: '# Dance' },
        { value: '6', label: '# Memes' },
        { value: '7', label: '# funny' },
        { value: '8', label: '# Love' },
        { value: '9', label: '# Happy' },
        { value: '10', label: '# Fashion' },
        { value: '11', label: '# Comedy' },
        { value: '12', label: '# Prank' },
        { value: '13', label: '# Friends' },
        { value: '14', label: '# Cooking' },
        { value: '15', label: '# Travel' },
        { value: '16', label: '# Animals' },
    ]

    const handleChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
        setType(selectedValues[0]);
    }

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img);
        }
    }

    const handelChangeSelect = () => {
        setShowOption(!showOption)
    }

    const handelSubmit = async (e) => {

        let newPost = {
            text: desc.current.value,
            image: null,
            type: type,
        }

        if (image) {
            const formData = new FormData();
            const fileName = Date.now() + image.name;
            formData.append("name", fileName);
            formData.append('type', "posts");
            formData.append('image', image);

            newPost.image = fileName
            try {
                dispatch(uploadIma(formData))
            } catch (err) {
                console.log(err)
            }
        }
        if (newPost.type === null || newPost.text.length === 0) {
            swal({
                title: "Opss ,there is an Error !",
                text: "Please chose the type of the post first",
                icon: "error",
                button: "Aww nooo!",
            });
        }

        else {
            dispatch(uploadPost(newPost));
            swal({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success",
                button: "Aww yiss!",
            });

        }

        resetShar();
    }

    const resetShar = () => {
        setImage(null);
        desc.current.value = null
    }


    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    {user.profile_image ? <img
                        src={`http://localhost:8000/user/${user.profile_image}`}
                        alt=""
                    /> :
                        <img src={users} />
                    }
                    <input
                        type="text"
                        placeholder={translateMode ? `What's on your mind ${user.name}?` : `${user.name} ..ماذا يجول في بالك ؟`}
                        ref={desc}
                    />
                </div>
                <hr />
                <div className="bottomm">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            ref={imageRef}
                            onChange={onImageChange} />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>
                                    {
                                        translateMode ?
                                            'Add Image'
                                            : 'أضف صورة'
                                    }
                                </span>
                            </div>
                        </label>

                        <select
                            className="select-tag"
                            onChange={handleChange}
                        >
                            {
                                options.map(option => (
                                    <option key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))
                            }

                        </select>



                    </div>
                    <div className="right">
                        <button
                            disabled={uploading}
                            onClick={handelSubmit}>
                            {uploading ? "loading..." : 
                                translateMode ?
                                    "Share"
                                    : 'أنشر'
                             
                            }</button>
                    </div>
                </div>

            </div>
            {
                image &&
                <div className="shar-image">
                    <button onClick={() => setImage(null)}>X</button>
                    <img src={URL.createObjectURL(image)} alt="preview" />

                </div>
            }
        </div>

    );
};

