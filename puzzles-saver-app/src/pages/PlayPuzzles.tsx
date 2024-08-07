import { useLocation, useNavigate } from "react-router-dom"
import Toolbar from "../components/Toolbar";
import PuzzlesetManager from "../components/PuzzlesetManager";
import '../styles/centering.css';

export function PlayPuzzles() {
    const location = useLocation();
    const { puzzles } = location.state || {}
    const navigate = useNavigate();

    if (!puzzles) {
        navigate("/error");
        return null
    }

    return (
        <div>
            <Toolbar />
            <div className="centered">
                <PuzzlesetManager puzzleIDs={puzzles}/>
            </div>
        </div>
    )
}