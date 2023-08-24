import "./InfoCard.css";
import cover from "../../../img/cover.jpg";
import profileImg from "../../../img/profileImg.jpg";

export default function InfoCard() {
    return (
        <div className="InfoCard">
            <div className="ProfileImgaes">
                <img src={cover} alt="" />
                <img src={profileImg} alt="" />
            </div>

            <div className="ProfileName">
                <span>Motasm Hajeh</span>
                {/* <span>Intrest in Killing </span> */}
            </div>

            <div className="PostsAndFriend">
                <hr/>
                <div>
                    
                <div className="PostStatus">
                    <span>5</span>
                    <span>posts</span>
                </div>
                <div className="vl"></div>

                <div className="PostStatus">
                    <span>5 </span>
                    <span>friend</span>
                </div>
            
                </div>
            </div>
            <span>Go To Profile</span>
        </div>
    )
}