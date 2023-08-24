
import { useEffect, useState } from "react";
import axios from "axios";
import TopBarDashboard from "../../../components/Dashboard/TopBarDashboard/TopBarDashboard";
import { Link } from "react-router-dom";
import users from "../../../assets/user.png";

export default function Users() {

    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getAllUser').then(res => {
                setUsers(res.data.users)
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            <TopBarDashboard />
            <div className="cardUser">
                <div className="card-wrabber">
                    {users.map(user => (
                        <Link to={`/dashboard/Userdetails/${user.id}`}>
                            <div key={user.id} className="payment-card-user" onClick={() => { userDetails(user.id) }}>
                                <div className="card-header">
                                    <div className="amount">
                                        {
                                            user.profile_image ?
                                                <img className="imgUser" src={`http://127.0.0.1:8000/user/${user.profile_image}`} alt="" />
                                                : <img className="default-img" src={users} />

                                        }
                                        <span className="emailUser">{user.name}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}