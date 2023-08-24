import DeleteIcon from '@mui/icons-material/Delete';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import axios from 'axios';
import users from "../../../assets/user.png";


export default function SideBarUserDetails({ user }) {
 

    async function handledelet() {
        const res = await axios.post(`http://127.0.0.1:8000/api/deleteUser/${user.id}`);
    }

    async function handleauth() {
        const res = await axios.post(`http://127.0.0.1:8000/api/deleteUser/${user.id}`);
    }

    return (
        <div className="SideBarUserDetails">
            <ul className="SideBarList">
                <li>
                    {
                        user.profile_image ?
                            <img className="imgUser" src={`http://127.0.0.1:8000/user/${user.profile_image}`} alt="" />
                            : <img className="default-img" src={users} />

                    }
                </li>
                <li
                    className='rowUser' >
                    <h3>User name :</h3>
                    <div id="title"> {user.name}</div>
                    <hr></hr>
                </li>

                <li
                    className='rowUser'>
                    <h3>User email :</h3>
                    <div id="title"> {user.email}</div>
                    <hr></hr>
                </li>

                <li
                    className='rowUser'>
                    <h3>User addres :</h3>
                    <div id="title">{user.address}</div>
                    <hr></hr>
                </li>


                <li
                    className='rowUserD' onClick={() => { handledelet() }}>
                    <div id="title">
                        <h3> Delete This Account</h3>
                        <DeleteIcon style={{ color: "red", cursor: "pointer" }} />
                    </div>
                </li>


                <li
                    className='rowUserD' onClick={() => { handleauth }}>
                    <div id="title">
                        <h3>Add To Special People</h3>
                        <StarHalfIcon style={{ color: "blue", cursor: "pointer" }} /></div>
                </li>
            </ul>
        </div>
    )
}