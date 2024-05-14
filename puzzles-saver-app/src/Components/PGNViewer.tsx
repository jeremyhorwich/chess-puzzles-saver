import { useState } from "react";
import "./PGNViewerStyles.css";

export default PGNViewer;

//TODO: constant out the highlight and selection colors

function PGNViewer(PGN: string) {
    //TODO: convert PGN to list of moves
    const testMoves = [
        "1. d4 Nc6", "2. ef e6", "3. Nf3 Nf6", "4. Bd3 d5", "5. e5 Nd7",
        "6. O-O b6", "7. Bg5 f6", "8. exf6 gxf6", "9. Bh4 Qe7", "10. Re1 Bb7",
        "11. Nc3"
    ];

    const [hovered, setHovered] = useState<number|null>(null);
    const [selected, setSelected] = useState<number>(testMoves.length);

    function handleOnMouseOver(index: number) {
        setHovered(index);
    }

    function handleClick(index: number) {
        setSelected(index);
    }

    const moves = testMoves;

    const parsedMoves = moves.map((move, index) => {
        if (hovered === Math.floor(index)) {
            return PGNMove({move: move,handleOnMouseOver: handleOnMouseOver,
                highlight: (index - Math.floor(index)), highlightColor: "#404040", handleClick: handleClick})
        }
        if (selected === Math.floor(index)) {
            return PGNMove({move: move,handleOnMouseOver: handleOnMouseOver,
                highlight: (index - Math.floor(index)), highlightColor: "#000000", handleClick: handleClick})
        }

        return PGNMove({move: move,handleOnMouseOver: handleOnMouseOver,handleClick: handleClick})
    })

    return (
        <div className="pgn">
            {parsedMoves};
        </div>
    )

    type PGNMoveProps = {
        move: string,
        highlight?: number,
        highlightColor?: string,
        handleOnMouseOver: Function,
        handleClick: Function
    }

    //TODO change background and font based on what is being passed in
    function PGNMove(props: PGNMoveProps
    ) {

        let styles: Record<string, any>;
        if (props.highlightColor === "#000000") {
            styles = {
                backgroundColor: props.highlightColor,
                fontColor: "#ffffff"
            }
        } else {
            styles = {
                backgroundColor: props.highlightColor
            }
        }
        
        const parsed = props.move.split(" ");
        const index = parseInt(parsed[0]);

        let whiteMove: JSX.Element;
        if (props.highlight === 0) {
            whiteMove =
                <div 
                    className="pgnMove"
                    style={styles}
                    onMouseOver={() => props.handleOnMouseOver(index)}
                    onClick={() => props.handleClick(index)}>
                    {parsed[1]}
                </div>
        } else {
            whiteMove =
                <div 
                    className="pgnMove"
                    onMouseOver={() => props.handleOnMouseOver(index)}
                    onClick={() => props.handleClick(index)}>
                    {parsed[1]}
                </div>
        }

        let blackMove: JSX.Element;
        if (props.highlight === 0.5) {
            blackMove =
                <div 
                    className="pgnMove"
                    style={styles}
                    onMouseOver={() => props.handleOnMouseOver(index)}
                    onClick={() => props.handleClick(index)}>
                    {parsed[1]}
                </div>
        } else {
            blackMove =
                <div 
                    className="pgnMove"
                    onMouseOver={() => props.handleOnMouseOver(index)}
                    onClick={() => props.handleClick(index)}>
                    {parsed[1]}
                </div>
        }

        return (
            <>
                <div className="pgnMove">
                    {parsed[0]}
                </div>
                {whiteMove}
                {blackMove}
            </>
        )
    }
}