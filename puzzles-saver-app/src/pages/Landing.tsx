import ProfileInput from "../components/ProfileInput"
import Toolbar from "../components/Toolbar"
import '../styles/centering.css';

function Landing() {
    return (
        <div>
            <Toolbar />
            <div className="centered">
                <ProfileInput /> 
            </div>
        </div>
    )
}

export default Landing;