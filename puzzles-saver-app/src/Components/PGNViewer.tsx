import { useState } from "react";
import "./PGNViewerStyles.css";

export default PGNViewer;

//TODO: constant out the highlight and selection colors

function PGNViewer(PGN: string) {
    const testMoves = [
        "d4", "Nc6", "ef", "e6", "Nf3", "Nf6", "Bd3", "d5", "e5", "Nd7",
        "O-O", "b6", "Bg5", "f6", "exf6", "gxf6", "Bh4", "Qe7", "Re1", "Bb7",
        "Nc3"
    ];
    
    const moves = testMoves;
    
    const [hovered, setHovered] = useState<number|null>(null);
    const [selected, setSelected] = useState<number>(testMoves.length);
    
    //TODO: convert PGN to list of moves
    
    function handleOnMouseOver(index: number) {
        setHovered(index);
    }

    function handleClick(index: number) {
        setSelected(index);
    }

    const parsedMoves = moves.map((move, index) => {
        const shouldDisplayMoveNumber = ((index % 2) === 0);
        
        let moveClass = "pgnMove";
        if (hovered === index) {
            moveClass = "hoveredMove";
        }
        if (selected === index) {
            moveClass = "selectedMove";
        }

        return (
            <div>
                {shouldDisplayMoveNumber && <div>{Math.floor(index/2)}</div>}
                <div 
                    className={moveClass}
                    onMouseOver={() => handleOnMouseOver(index)}
                    onClick={() => handleClick(index)}
                >
                    {move}
                </div>
            </div>
        )
        })

    return (
        <div className="pgn">
            {parsedMoves};
        </div>
    )
}