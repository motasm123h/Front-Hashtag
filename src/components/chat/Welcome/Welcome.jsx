import './Welcome.scss'
import robot from '../../../assets/animation/robot.gif';

export default function Welcome() {
    return (
        <div className="wel">
            <img src={robot} />
            <h3>Select A chat to start talking with people</h3>
        </div>
    )
}