import './Settings.scss'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import users from "../../assets/user.png";
import bac from "../../assets/bac.jpg";


export default function Settings() {
    const { user } = useSelector((state) => state.authReducer.authData)

    const handleDeleteAccuont = () => {
        const dele = async () => {
            await axios.post(`api/deleteAccuont`)
            localStorage.clear();
            window.location.reload();
        }
        dele();
    }

    const handleAuthAccuont = () => {
        const Auth = async () => {
            await axios.post(`api/user/AsktoAuth`)
        }
        Auth();
    }


    return (
        <div className="profile">

            <div className="images">
                {
                    user.cover_image ?
                        <img
                            src={user.cover_image ? `http://localhost:8000/user/${user.cover_image}` : ''}
                            className="cover"
                        />
                        : <img src={bac} className="cover" />
                }

                {
                    user.profile_image ?
                        <img
                            src={user.profile_image ? `http://localhost:8000/user/${user.profile_image}` : ''}
                            alt=""
                            className="profilePic"
                        /> :
                        <img src={users} className="profilePic" />

                }
            </div >
            <div className="profileContainer">
                <div className="uInfoo">
                    <div className="centerr">

                        <div className="infoo">
                            <span>name :{user.name ? user.name : 'MOTASM'}</span>
                            <div className="user-info">
                                <span>Address :{user.address ? user.address : 'UK'}</span>

                            </div>
                            <div className="user-info">
                                <span>email : {user.email ? user.email : 'UK'}</span>
                            </div>
                            <div className="user-info">
                                <span> Role: normal user </span>
                            </div>

                        </div>



                    </div>


                </div>

                <br />
                <br />

                <div className='use-button'>
                    <button className='blue' onClick={handleAuthAccuont}>blue mark</button>
                    <button className='red' onClick={handleDeleteAccuont}>delete my account</button>

                </div>
            </div>
        </div>

    )
}