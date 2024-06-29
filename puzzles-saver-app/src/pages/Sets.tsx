import { useLocation } from "react-router-dom"

export function Sets() {
    const location = useLocation();
    const { user } = location.state || {};
        
    if (!user) {
        return <h1>error</h1>
    }

    return <h1>{user}</h1>
}