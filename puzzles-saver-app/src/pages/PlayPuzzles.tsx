import { useLocation, useNavigate } from "react-router-dom"

export function PlayPuzzles() {
    const location = useLocation();
    const { puzzles } = location.state || {}
    const navigate = useNavigate();

    if (!puzzles) {
        navigate("/error");
        return null
    }

    return <h1>placeholder2</h1>
}