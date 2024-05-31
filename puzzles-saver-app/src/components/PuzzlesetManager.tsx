import { useState } from "react";
import { PuzzlePlayer, PuzzlePlayerProps } from "./PuzzlePlayer";

type PuzzleSetManagerProps = {
    puzzleset: Array<PuzzlePlayerProps>
}


function PuzzleSetManager(props: PuzzleSetManagerProps) {
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0)
    const currentPuzzle = props.puzzleset[currentPuzzleIndex]

    function handleClick(direction: -1 | 1) {
        setCurrentPuzzleIndex(currentPuzzleIndex + direction)
    }

    return (
        <div>
            <PuzzlePlayer fen={currentPuzzle.fen} answer={currentPuzzle.answer}/>
            {currentPuzzleIndex > 0 && <button onClick={() => handleClick(-1)}>Button 1</button>}
            {currentPuzzleIndex < props.puzzleset.length && <button onClick={() => handleClick(1)}>Button 2</button>}
        </div>
    )
}

export default PuzzleSetManager

//Buttons for going to the next puzzle