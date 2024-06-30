import { useLocation, useNavigate } from "react-router-dom"

export function Sets() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};
    
    if (!user) {
        navigate("/error");
        return null
    }

    return <h1>{user}</h1>
}