import whitePawn from "./Chess_plt45.svg";
import whiteRook from "./Chess_rlt45.svg";
import whiteKnight from "./Chess_nlt45.svg";
import whiteBishop from "./Chess_blt45.svg";
import whiteQueen from "./Chess_qlt45.svg";
import whiteKing from "./Chess_klt45.svg";
import blackPawn from "./Chess_pdt45.svg";
import blackRook from "./Chess_rdt45.svg";
import blackKnight from "./Chess_ndt45.svg";
import blackBishop from "./Chess_bdt45.svg";
import blackQueen from "./Chess_qdt45.svg";
import blackKing from "./Chess_kdt45.svg";


const pieceImages: {[key: string]: string} = {
    "P": whitePawn,
    "R": whiteRook,
    "N": whiteKnight,
    "B": whiteBishop,
    "Q": whiteQueen,
    "K": whiteKing,
    "p": blackPawn,
    "r": blackRook,
    "n": blackKnight,
    "b": blackBishop,
    "q": blackQueen,
    "k": blackKing
}

export default pieceImages