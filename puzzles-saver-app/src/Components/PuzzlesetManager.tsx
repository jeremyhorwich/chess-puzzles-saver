import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Puzzle, Puzzleset } from "../dataTypes/puzzleTypes"; 
import { PuzzlePlayer } from "./PuzzlePlayer";
import getPuzzleset from "../fetches/getPuzzleset";
import getPuzzle from "../fetches/getPuzzle";

const startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type PuzzleSetManagerProps = {
    puzzlesetID: string
}

function PuzzlesetManager(props: PuzzleSetManagerProps) {
    const [currentPuzzleObject, setCurrentPuzzleObject] = useState<Puzzle>({
        fen: startingPosition, answer: "", title: "Loading Puzzle"
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
        <div>
            <PuzzlePlayer key={currentPuzzleObject.fen} {...currentPuzzleObject}/>
            {puzzleIndex.current < puzzleset.current.puzzles.length - 1 && <button onClick={() => handleClick(1)}>Next</button>}
            {!(puzzleIndex.current < puzzleset.current.puzzles.length - 1) && <button onClick={() => navigate(-1)}> Return</button>}
        </div>
    )
}

export default PuzzlesetManager;