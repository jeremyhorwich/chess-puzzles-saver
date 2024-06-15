import { useState, useEffect, useRef } from "react";
import { Puzzle, Puzzleset } from "../dataTypes/puzzleTypes"; 
import { PuzzlePlayer } from "./PuzzlePlayer";
import useGetPuzzleset from "../hooks/fetches/useGetPuzzleset";
import useGetPuzzle from "../hooks/fetches/useGetPuzzle";

const startingPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

type PuzzleSetManagerProps = {
    puzzlesetID: string
}

function PuzzlesetManager(props: PuzzleSetManagerProps) {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(-1);
    const puzzleObject = useRef<Puzzle>({fen: startingPosition, answer: "", title: "Loading Puzzle"});
    const puzzleset = useRef<Puzzleset>({name: "", puzzles: [""]});

    useEffect(() => {
        useGetPuzzleset(props.puzzlesetID)
            .then((puzzlesetJSON) => {
                puzzleset.current = puzzlesetJSON;
                useGetPuzzle(puzzlesetJSON.puzzles[0])
                    .then((puzzleJSON) => {
                        puzzleObject.current = puzzleJSON
                        setCurrentPuzzleIndex(0);       //Force a rerender now that we have data
                    });
            })
    }, []);

    useEffect(() => {
        if (puzzleset.current.name === "") return;
        console.log("changing")
        useGetPuzzle(puzzleset.current.puzzles[currentPuzzleIndex])
            .then((puzzleJSON) => {puzzleObject.current = puzzleJSON});
    }, [currentPuzzleIndex]);

    function handleClick(direction: -1 | 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + direction);
    }

    return (
        <div>
            <PuzzlePlayer {...puzzleObject.current}/>
            {currentPuzzleIndex > 0 && <button onClick={() => handleClick(-1)}>Button 1</button>}
            {currentPuzzleIndex < puzzleset.current.puzzles.length && <button onClick={() => handleClick(1)}>Button 2</button>}
        </div>
    )
}

export default PuzzlesetManager;