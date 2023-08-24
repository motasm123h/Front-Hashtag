import "./Edit.scss";
import Image from "../../../assets/img.png";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { uploadIma } from "../../../actions/uploadAction";
import { PostUpdate } from "../../../actions/postAction";
import { Navigate, redirect, useParams } from "react-router";


export default function Edit() {
    const param = useParams()
    console.log(param.id)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authReducer.authData)
    const uploading = useSelector((state) => state.postReducer.uploading)
    const [image, setImage] = useState(null);
    const [type, setType] = useState(null);
    const imageRef = useRef();
    const desc = useRef()

    console.log(type)

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
        dispatch(PostUpdate(newPost,param.id));

        resetShar();

        redirect('/')
    }

    const resetShar = () => {
        setImage(null);
        desc.current.value = null
    }


    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    {user.profile_image && <img
                        src={`http://localhost:8000/user/${user.profile_image}`}
                        alt=""
                    />}
                    <input
                        type="text"
                        placeholder={`Type Your New Post  !`}
                        ref={desc}
                    />
                </div>
                <hr />
                <div className="bottom">
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
                                <span>Add Image</span>
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
                            {uploading ? "loading..." : "EDIT"}</button>
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

