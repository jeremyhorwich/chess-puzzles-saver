import { useLocation, useNavigate } from "react-router-dom"
import UserSetsDisplay from "../components/UserSetsDisplay";
import Toolbar from "../components/Toolbar";

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
            <UserSetsDisplay user="jeremyhorwich" />
        </div>

    )
}