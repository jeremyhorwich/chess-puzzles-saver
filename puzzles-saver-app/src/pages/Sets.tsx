import { useLocation, useNavigate } from "react-router-dom"
import UserSetsDisplay from "../temp_components/UserSetsDisplay";
import Toolbar from "../temp_components/Toolbar";
import '../styles/centering.css';

export function Sets() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};
    
    if (!user) {
        navigate("/error");
        return null
    }

    return (
        <div>
            <Toolbar />
            <div className="centered">
                <UserSetsDisplay user="jeremyhorwich" />
            </div>
        </div>

    )
}