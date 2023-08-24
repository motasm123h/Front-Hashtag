import "./Home.scss";
import Stories from "../../components/Stroies/Stories"
import Posts from "../../components/Posts/Posts"
import Share from "../../components/Share/Share"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from 'sweetalert'
import { profileInfo } from "../../actions/postAction";


export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData)

    const toggle = () => {
        dispatch({ type: "INITIALIZATION_SEARCH_ARRAYS" })
    }
    toggle();

    useEffect(() => {

    }, [])
    {
        user ?
            useEffect(() => {
                dispatch(profileInfo(user.id))
            }, [])
            : ''
    }

    return (
        <div className="home">

            <div className="story-list">
                <Stories />
            </div>
            <Share />
            <Posts />
        </div>
    )
}
