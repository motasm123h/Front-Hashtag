import './PostMenu.scss'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostMenu() {
    const { user } = useSelector((state) => state.authReducer.authData)
    return (
        <dev>
            <div className="flex flex-col dropDownPost">
                <div className="Post-content">
                    <span>Edit </span>
                    
                    <span>Delete </span>
                    <span>Report</span>

                </div>


            </div>
        </dev>
    )
}