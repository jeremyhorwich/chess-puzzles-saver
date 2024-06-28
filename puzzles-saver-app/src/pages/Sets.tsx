import { useLocation } from "react-router-dom"

export function Sets() {
    const location = useLocation();
    const { display } = location.state || {};
        
    if (!display) {
        return <h1>error</h1>
    }

    return <h1>{display}</h1>
}