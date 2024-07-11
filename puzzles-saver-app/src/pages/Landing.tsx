import ProfileInput from "../Components/ProfileInput"
import Toolbar from "../Components/Toolbar"
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