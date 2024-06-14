import { useState } from "react"
import { Puzzle } from "../dataTypes/puzzleTypes";
import Chessboard from "./Chessboard"
import PuzzleInfo from "./PuzzleInfo"


const neutralHighlight = "#cccc95";
const correctAnswerHighlight = "#02b802";
const wrongAnswerHighlight = "#ff0000";

function PuzzlePlayer(props: Puzzle) {
    const [currentHighlight, setCurrentHighlight] = useState(neutralHighlight);
    
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
            <Chessboard fen={props.fen} highlightColor={currentHighlight} onMoveEnter={onMoveEntered}/>
        </div>
    )
}

export { PuzzlePlayer}