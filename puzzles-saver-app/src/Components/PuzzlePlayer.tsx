import { useState } from "react";
import { Puzzle } from "../dataTypes/puzzleTypes";
import Chessboard from "./Chessboard";
import flipIcon from '../assets/flipboard.svg'
import '../styles/puzzlePlayerStyles.css';

const neutralHighlight = "#cccc95";
const correctAnswerHighlight = "#63c963";
const wrongAnswerHighlight = "#ff0000";

function PuzzlePlayer(props: Puzzle) {
    const [currentHighlight, setCurrentHighlight] = useState<string>(neutralHighlight);
    const [shouldFlip, setShouldFlip] = useState<boolean>(false)
    const whitePlayerDisplay = props.whitePlayer || "Unknown Player"
    const blackPlayerDisplay = props.blackPlayer || "Unknown Player"
    const dateDisplay = props.date ? "From a game on: " + props.date : null
    const titleDisplay = props.title || dateDisplay || "Custom Puzzle";

    function onMoveEntered(move: string) {
        if (move === props.answer) {
            setCurrentHighlight(correctAnswerHighlight);
            return
        }
        setCurrentHighlight(wrongAnswerHighlight);
    }

    return (
        <div className="chessboard-wrapper">
            <div className="title">{titleDisplay}</div>
            <div className="top-info">
                <span className="span-text">{shouldFlip ? whitePlayerDisplay : blackPlayerDisplay}</span>
                <button className="flip-button" onClick={() => { setShouldFlip(!shouldFlip) }}>{flipIcon}</button>
            </div>
            <Chessboard
                key={props.fen + String(shouldFlip)}
                fen={props.fen}
                highlightColor={currentHighlight}
                onMoveEnter={onMoveEntered}
                flip={shouldFlip}
            />
            <div>
                <span className="display-text">{shouldFlip ? blackPlayerDisplay : whitePlayerDisplay}</span>
            </div>
        </div>
    );
}

export { PuzzlePlayer }