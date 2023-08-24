import "./FriendList.css";
import profileImg from "../../../img/img1.png";
import { data } from '../../../Data/FriednSuge';

export default function FriendList() {
    return (
        <div className="FriednList">
            <h1> pepole you may konw </h1>

            {data.map((friend) => {
                return (
                    <div className="Friend">
                        <div>
                            <img src={friend.img} alt="" />
                            <div className="name">
                                <span>{friend.name}</span>
                                <span>@{friend.username}</span>
                            </div>
                        </div>
                        <button className="button add-btn"> Add</button>
                    </div>
                )
            })}

        </div>
    )
}