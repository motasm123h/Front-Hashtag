import { useEffect, useState } from "react";
import TopBarDashboard from "../../../components/Dashboard/TopBarDashboard/TopBarDashboard";
import axios from "axios";
import users from "../../../assets/user.png";
import { Link } from "react-router-dom";

export default function SpecialPeople() {
    const [authUser, setAuthUser] = useState([]);
    const handleFetchAuthUser = () => {
        const fetchData = async () => {
            const { data } = await axios.get('api/getAllAuthUser');
            setAuthUser(data.user)
        }
        fetchData()
    }
    const handleUpgradeUser = (id) => {
        const upgradeUser = async () => {
            await axios.post(`api/AuthUser/${id}`);
        }
        upgradeUser()
    }

    useEffect(() => {
        handleFetchAuthUser();
    }, [])
    console.log(authUser)
    return (
        <div>
            <TopBarDashboard />
            <div className="bg-auth-user">
                {authUser.map(user => (
                    <div key={user.id} className="payment-card-user" onClick={() => { userDetails(user.id) }}>
                        <div className="card-header">
                            <Link to={`/dashboard/Userdetails/${user.id}`}>
                                <div className="amount">
                                    {
                                        user.profile_image ?
                                            <img className="imgUser" src={`http://127.0.0.1:8000/user/${user.profile_image}`} alt="" />
                                            : <img className="default-img" src={users} />

                                    }
                                </div>
                            </Link>
                            <div>
                                <span className="emailUser">{user.name}</span>
                                <button onClick={() => { handleUpgradeUser(user.id) }}>upgrade</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div >
    )
}