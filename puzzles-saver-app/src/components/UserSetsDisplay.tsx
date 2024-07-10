import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PuzzlesetDataDisplay from "./PuzzlesetDataDisplay";
import getUserPuzzlesets from "../fetches/getUserPuzzlesets";
import { Puzzleset } from "../dataTypes/puzzleTypes";
import GeneratePuzzlesetButton from "./GeneratePuzzlesetButton";

function UserSetsDisplay(props: {user: string}) {
    const navigate = useNavigate()  //TODO change to link
    const [displayArray, setDisplayArray] = useState<Puzzleset[]>([])
    
    function rerouteToPuzzlePlayer(puzzles: Array<string>) {
        console.log(puzzles)
        navigate("/playpuzzles", { state: { puzzles: puzzles } })
    }

    useEffect(() => {
        getUserPuzzlesets(props.user)
            .then((sets) => {
                setDisplayArray(sets)
            })
    }, [])
    
    return (
        <>
            {displayArray.length === 0 ? (
                <div> Loading </div>
            ) : (
                <div>
                    <span>{props.user}</span>
                    <GeneratePuzzlesetButton user={props.user} site="chesscom" numberOfPuzzles={50} />
                    <span>date name number of puzzles</span>
                    {
                        displayArray.map((set: Puzzleset) => (
                            <PuzzlesetDataDisplay key={set.name} set={set} handleClick={rerouteToPuzzlePlayer} />
                        ))
                    }
                </div>
            )}
        </>
    )
}

export default UserSetsDisplay;