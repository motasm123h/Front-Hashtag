import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CookieIcon from '@mui/icons-material/Cookie';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import './Groups.scss'
import { Outlet, useParams } from "react-router"
import { Link } from 'react-router-dom';

import console from '../../assets/console.png'
import love from '../../assets/love-birds.png'
import comedy from '../../assets/comedy.png'
import cooking from '../../assets/cooking.png'
import earth from '../../assets/earth.png'
import handshake from '../../assets/handshake.png'
import happy from '../../assets/happy.png'
import dance from '../../assets/tap-dance.png'


export default function Groups() {
    return (
        <div className='icon-header'>
            <div className='icon-container'>
                <h1>Groups</h1>

                <div className="icon">
                    <Link to={`/groups/1`}>
                        <img src={console} className="sport-icon" alt="" />
                    </Link>

                    <Link to={`/groups/8`}>
                        <img src={love} className="love-icon" alt="" />
                    </Link>

                    <Link to={`/groups/14`}>
                        <img src={cooking} className="cook-icon" alt="" />
                    </Link>

                    <Link to={`/groups/7`}>
                        <img src={dance} className="enjoy-icon" alt="" />

                    </Link>
                </div>

                <div className="icon">


                    <Link to={`/groups/9`}>
                        <img src={happy} className="happy-icon" alt="" />
                    </Link>

                    <Link to={`/groups/11`}>
                        <img src={comedy} className="threat-icon" alt="" />
                    </Link>

                    <Link to={`/groups/13`}>
                        <img src={handshake} className="friend-icon" alt="" />
                    </Link>

                    <Link to={`/groups/15`}>
                        <img src={earth} className="travel-icon" alt="" />
                    </Link>



                </div>
            </div>

            <hr />

            <Outlet />

        </div>
    )
}