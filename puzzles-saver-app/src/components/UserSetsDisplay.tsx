import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getUserPuzzlesets from "../fetches/getUserPuzzlesets";
import { Puzzleset } from "../dataTypes/puzzleTypes";
import GeneratePuzzlesetButton from "./GeneratePuzzlesetButton";
import '../styles/userSetsDisplayStyles.css';


function UserSetsDisplay(props: {user: string}) {
    const navigate = useNavigate()  //TODO change to link
    const [displayArray, setDisplayArray] = useState<Puzzleset[]>([])
    
    function rerouteToPuzzlePlayer(puzzles: Array<string>) {
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
                <span className="span-text">Finding sets...</span>
            ) : (
                <div className="user-sets-container">
                    <div className="table-header">
                        <span>{props.user}</span>
                        <GeneratePuzzlesetButton user={props.user} site="chesscom" numberOfPuzzles={50} />
                    </div>
                    <div className="user-sets-table">
                        <div className="table-row header">
                            <span>Date</span>
                            <span>Name</span>
                            <span>Number of Puzzles</span>
                        </div>
                        {displayArray.map((set: Puzzleset) => (
                            <div key={set.name} className="table-row" onClick={() => rerouteToPuzzlePlayer(set.puzzles)}>
                                <span> {set.date} </span>
                                <span> {set.name} </span>
                                <span> {set.puzzles.length} </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default UserSetsDisplay;