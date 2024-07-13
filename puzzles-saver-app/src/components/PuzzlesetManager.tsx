import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Puzzle, Puzzleset } from "../dataTypes/puzzleTypes"; 
import { PuzzlePlayer } from "./PuzzlePlayer";
import getPuzzleset from "../fetches/getPuzzleset";
import getPuzzle from "../fetches/getPuzzle";
import rightArrow from "../assets/right-arrow.svg"
import "../styles/puzzlesetManagerStyles.css";

const startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type PuzzleSetManagerProps = {
    puzzlesetID: string
}

function PuzzlesetManager(props: PuzzleSetManagerProps) {
    const [currentPuzzleObject, setCurrentPuzzleObject] = useState<Puzzle>({
        fen: startingPosition, answer: "", title: ""
    });

    const puzzleIndex = useRef<number>(0);
    const puzzleset = useRef<Puzzleset>({name: "", date: "", puzzles: [""]});

    const navigate = useNavigate();

    useEffect(() => {
        getPuzzleset(props.puzzlesetID)
            .then((puzzlesetJSON) => {
                puzzleset.current = puzzlesetJSON;
                getPuzzle(puzzlesetJSON.puzzles[0])
                    .then((puzzleJSON) => {setCurrentPuzzleObject(puzzleJSON)});
            })
    }, []);


    function handleClick(direction: -1 | 1) {
        puzzleIndex.current += direction;
        getPuzzle(puzzleset.current.puzzles[puzzleIndex.current])
            .then((puzzleJSON) => {setCurrentPuzzleObject(puzzleJSON)});
    }

    return (
        <div className="chessboard-wrapper">
            <PuzzlePlayer key={currentPuzzleObject.fen} {...currentPuzzleObject}/>
            <div className="button-center">
                {puzzleIndex.current < puzzleset.current.puzzles.length - 1 && 
                    <img 
                        className="next-button"
                        src={rightArrow} 
                        onClick={() => handleClick(1)} />}
                {!(puzzleIndex.current < puzzleset.current.puzzles.length - 1) && 
                    <button 
                        className="return-button"
                        onClick={() => navigate(-1)}> Return to User Sets 
                    </button>}
            </div>
        </div>
    )
}

export default PuzzlesetManager;