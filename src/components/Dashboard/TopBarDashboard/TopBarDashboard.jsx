import { Link } from "react-router-dom";

export default function TopBarDashboard() {
    return (
        <div className="TopBarDashboard">
            <h1 className="titleDash"> #HashTag</h1>
            <Link to='/dashboard/users' className="TopBarDashboardButton">Users</Link>
            <Link to='/' className="TopBarDashboardButton">VideoSystem</Link>
            <Link to='/dashboard' className="TopBarDashboardButton">Admin</Link>
        </div>
    )
}