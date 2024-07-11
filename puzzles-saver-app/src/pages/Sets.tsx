import { useLocation, useNavigate } from "react-router-dom"
import UserSetsDisplay from "../Components/UserSetsDisplay";
import Toolbar from "../Components/Toolbar";
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