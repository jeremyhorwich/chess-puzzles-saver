import { Puzzleset } from "../dataTypes/puzzleTypes"

type PuzzlesetDataDisplayProps = {
    set: Puzzleset
    handleClick: Function
}

function PuzzlesetDataDisplay(props: PuzzlesetDataDisplayProps) {
    return (
        <div onClick={() => props.handleClick(props.set.puzzles)}>
                {props.set.date} {props.set.name} {props.set.puzzles.length}
        </div>
    )
}

export default PuzzlesetDataDisplay