import { useState } from "react";
import PuzzlesetDataDisplay from "./PuzzlesetDataDisplay";
import { useNavigate } from "react-router-dom";

function UserSetsDisplay(props: {user: string}) {
    const [puzzlesets, setPuzzlesets] = useState<Array<string>>([""]);
    const navigate = useNavigate()
    let setDisplays;

    function rerouteToPuzzlePlayer(puzzles: Array<string>) {
        navigate("/playpuzzles", { state: { puzzles: puzzles } })
    }

    //useEffect that sets puzzlesets
    
    return (
        <>
            {puzzlesets[0] === "" ? (
                <div> Loading </div>
            ) : (
                {setDisplays}
            )
        }
        </>
    )
}

export default UserSetsDisplay;