import { useState, useEffect, useRef } from "react";
import { Puzzle, Puzzleset } from "../dataTypes/puzzleTypes"; 
import { PuzzlePlayer } from "./PuzzlePlayer";
import useGetPuzzleset from "../hooks/fetches/useGetPuzzleset";
import useGetPuzzle from "../hooks/fetches/useGetPuzzle";

type PuzzleSetManagerProps = {
    puzzlesetID: string
}

function PuzzlesetManager(props: PuzzleSetManagerProps) {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
    const [currentPuzzle, setCurrentPuzzle] = useState<Puzzle>({fen: "", answer: ""})
    const puzzleset = useRef<Puzzleset>({name: "", puzzles: [""]})

    useEffect(() => {
        useGetPuzzleset(props.puzzlesetID)
            .then((puzzlesetJSON) => {
                puzzleset.current = puzzlesetJSON
                useGetPuzzle(puzzlesetJSON.puzzles[currentPuzzleIndex])
                    .then((puzzleJSON) => {setCurrentPuzzle(puzzleJSON)})
            })
    }, [])

    useEffect(() => {
        if (puzzleset.current.name === "") return;
        useGetPuzzle(puzzleset.current.puzzles[currentPuzzleIndex])
            .then((puzzleJSON) => {setCurrentPuzzle(puzzleJSON)})
    }, [currentPuzzleIndex])

    function handleClick(direction: -1 | 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + direction);
    }

    return (
        <div>
            {currentPuzzle.fen}
            {/* <PuzzlePlayer fen={currentPuzzle.fen} answer={currentPuzzle.answer}/>
            {currentPuzzleIndex > 0 && <button onClick={() => handleClick(-1)}>Button 1</button>}
            {currentPuzzleIndex && <button onClick={() => handleClick(1)}>Button 2</button>} */}
        </div>
    )
}

export default PuzzlesetManager

//Buttons for going to the next puzzle