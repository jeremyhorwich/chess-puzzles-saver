import { useLocation, useNavigate } from "react-router-dom"
import UserSetsDisplay from "../components/UserSetsDisplay";

export function Sets() {
    const navigate = useNavigate();
    const location = useLocation();
    // const { user } = location.state || {};
    
    // if (!user) {
    //     navigate("/error");
    //     return null
    // }

    return (
        <UserSetsDisplay user="jeremyhorwich" />
    )
}