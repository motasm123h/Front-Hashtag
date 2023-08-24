import { Link, Outlet } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import LogoutIcon from '@mui/icons-material/Logout';

import './Dashboard.css'
import HomeDash from '../../components/Dashboard/HomeDashboard/HomeDash';
import TopBarDashboard from '../../components/Dashboard/TopBarDashboard/TopBarDashboard';


export default function Dashboard() {
    return (
        <>


            <TopBarDashboard />


            <div className="split-it">

                <div className="Sidebar">
                    <ul className="SideBarList">

                        <Link to="/dashboard">
                            <li
                                className='row'>
                                <div id="icon"> <DashboardIcon /> </div>
                                <div id="title">Dashboard</div>
                            </li>
                        </Link>


                        <Link to="/dashboard/users">
                            <li
                                className='row' >
                                <div id="icon"> <PeopleIcon /> </div>
                                <div id="title">Users</div>
                            </li>
                        </Link>

                        <Link to="/">
                            <li
                                className='row'>
                                <div id="icon"> <VideoLibraryIcon /> </div>
                                <div id="title">Videos System</div>
                            </li>
                        </Link>


                        <Link to="/dashboard/Special_people">
                            <li
                                className='row'>
                                <div id="icon"> <StarHalfIcon /> </div>
                                <div id="title"> Special people</div>
                            </li>
                        </Link>
                        <Link to="/dashboard/Special_people/request">
                            <li
                                className='row'>
                                <div id="icon"> <StarHalfIcon /> </div>
                                <div id="title"> Authinticated Request </div>
                            </li>
                        </Link>

                    </ul>
                </div>

                <div className="dash-setup">
                    <HomeDash />
                </div>

            </div>



        </>
    )
}