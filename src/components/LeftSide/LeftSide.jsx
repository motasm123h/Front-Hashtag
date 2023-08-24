import "./LeftSide.css";
import Search from "./Search/Search";
import InfoCard from "./InfoCard/InfoCard";
import FriendList from "./FriendList/FriendList";

export default function LeftSide(){
    return (
        <div className="LeftSide">
            <Search/>
            <InfoCard />
            <FriendList/>
        </div>
    )
}