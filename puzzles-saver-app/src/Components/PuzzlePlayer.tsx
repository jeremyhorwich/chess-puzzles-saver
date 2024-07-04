import { useState } from "react"
import { Puzzle } from "../dataTypes/puzzleTypes";
import Chessboard from "./Chessboard";
import PuzzleInfo from "./PuzzleInfo"


const neutralHighlight = "#cccc95";
const correctAnswerHighlight = "#02b802";
const wrongAnswerHighlight = "#ff0000";

function PuzzlePlayer(props: Puzzle) {
    const [currentHighlight, setCurrentHighlight] = useState<string>(neutralHighlight);
    const [shouldFlip, setShouldFlip] = useState<boolean>(false)
    
    function onMoveEntered(move: string) {
        if (move === props.answer) {
            setCurrentHighlight(correctAnswerHighlight);
            return
        }
        setCurrentHighlight(wrongAnswerHighlight);
    }

    return (
        <div>
            <PuzzleInfo 
                title={props.title}
                date={props.date}
                whitePlayer={props.whitePlayer}
                blackPlayer={props.blackPlayer}
            />  
            <Chessboard 
                key={props.fen + String(shouldFlip)} 
                fen={props.fen} 
                highlightColor={currentHighlight} 
                onMoveEnter={onMoveEntered}
                flip={shouldFlip}
            />
            <button onClick={() => {setShouldFlip(!shouldFlip)}}>
                Flip
            </button>
        </div>
    )
}

export { PuzzlePlayer }