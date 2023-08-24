import "./Search.css";
import Logo from '../../../img/logo.png';
import { UilSearch } from '@iconscout/react-unicons';

export default function Search() {
    return (
        <div className="Search">
            <div className="InputSearch">
                <input type="text" />
                <div className="s-icon">
                    <UilSearch />
                </div>
            </div>
            <img src={Logo} alt="logo" />
        </div>
    )
}