import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { useDispatch, useSelector } from "react-redux";
import { HashTags } from '../../../actions/AuthAction';
import { useState } from 'react';
import './HashTag.scss';
import swal from 'sweetalert'


export default function HashTag() {
    const dispatch = useDispatch()
    const [hashtag, setHastag] = useState({
        type: []
    });
    const options = [
        { value: '1', label: 'Sport' },
        { value: '2', label: 'News' },
        { value: '3', label: 'Food' },
        { value: '4', label: 'Music' },
        { value: '5', label: 'Dance' },
        { value: '6', label: 'Memes' },
        { value: '7', label: 'funny' },
        { value: '8', label: 'Love' },
        { value: '9', label: 'Happy' },
        { value: '10', label: 'Fashion' },
        { value: '11', label: 'Comedy' },
        { value: '12', label: 'Prank' },
        { value: '13', label: '#Friends' },
        { value: '14', label: '#Cooking' },
        { value: '15', label: '#Travel' },
        { value: '16', label: '#Animals' },
    ]
    const handleChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions).map(option => option.value);
        setHastag({
            ...hashtag,
            type: selectedValues
        });
    }
    const HandleSubmit = (e) => {
        e.preventDefault();
        dispatch(HashTags(hashtag))
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
        });
    }

    return (
        <div className="HashTag-list">


            Pick a HashTag:

            <select
                className="select-tag"
                multiple={true}
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
            <button onClick={HandleSubmit}>Submit</button>


        </div>
    );
}