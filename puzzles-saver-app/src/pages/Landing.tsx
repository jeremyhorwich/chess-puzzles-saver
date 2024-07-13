import ProfileInput from "../temp_components/ProfileInput"
import Toolbar from "../temp_components/Toolbar"
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