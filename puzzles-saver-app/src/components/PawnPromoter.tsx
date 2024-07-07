import { CSSProperties } from "react";
import pieceImages from "../assets/pieceImages";

type PawnPromoterProps = {
    color: "white" | "black"
    handleClick: Function,
    style?: CSSProperties
}

//TODO dynamic size handling
const PIECE_SIZE = 75;

const containerStyles: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "0px",
    alignItems: "center",
}


const pieceStyles: CSSProperties = {
    height: PIECE_SIZE + "px",
    width: PIECE_SIZE + "px",
    backgroundColor: "#cccc95"
}

function PawnPromoter(props: PawnPromoterProps) {
    let queen = "q";
    let rook = "r";
    let knight = "n";
    let bishop = "b";

    if (props.color === "white") {
        queen = queen.toUpperCase();
        rook = rook.toUpperCase();
        knight = knight.toUpperCase();
        bishop = bishop.toUpperCase();
    }

    return (
        <div style={{...containerStyles, ...props.style}}>
            <img src={pieceImages[queen]} style={pieceStyles} onClick={() => props.handleClick(queen)}/>
            <img src={pieceImages[rook]} style={pieceStyles} onClick={() => props.handleClick(rook)}/>
            <img src={pieceImages[knight]} style={pieceStyles} onClick={() => props.handleClick(knight)}/>
            <img src={pieceImages[bishop]} style={pieceStyles} onClick={() => props.handleClick(bishop)}/>
        </div>
    )
}

export default PawnPromoter;