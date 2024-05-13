import { useState } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.svg"
import whiteQueen from "../assets/WhiteQueen.svg"
export default Chessboard;

<img className="piece" src={whiteKing} alt="White King" />

function Chessboard(){
    //TODO: set up inital position based on fen passed in through prop

    let initialPos: Array<JSX.Element|null> = Array(64).fill(null)
    initialPos[23] = <img className="piece" src={whiteKing} alt="White King" />
    initialPos[45] = <img className="piece" src={whiteQueen} alt="White King" />


    const [highlightedSquare, setHighlighted] = useState<number|null>(null)

    const [pieces, setPieces] = useState<Array<JSX.Element|null>>(initialPos)

    /*
 
    0. Create a list of pieces that hold the images
    1. Update the board to take in a FEN as a prop
    2. On the handleMouseDown event update the piece array

    */

    const highlightColor = "#cccc95"
    const borderColor = (highlightedSquare !== null) ? highlightColor : "#484848"
    const border = "1px solid " + borderColor;
    
    function handleMouseDown(e : React.MouseEvent, squareClicked: number) {
        if (e.button !== 0) {  //Not a left mouse click
            return
        }

        if (highlightedSquare === null) {
            setHighlighted(squareClicked);
            return
        }

        if (squareClicked === highlightedSquare) {
            setHighlighted(null);
            return
        }

        let newPieces = pieces.slice();
        if (newPieces[highlightedSquare] !== null) {
            newPieces[squareClicked] = newPieces[highlightedSquare];
        }

        newPieces[highlightedSquare] = null;
        
        setHighlighted(null)
        setPieces(newPieces)
    }
    
    
    type SquareProps = {
        index: number,
        handleMouseDown: Function,
        piece: JSX.Element | null,
        highlight: string | null
    }
    
    
    function Square(props: SquareProps) {       
        const shouldBeBlack = ((Math.floor(props.index / 8) % 2) + (props.index % 2)) % 2 === 0;
        let backgroundColor = shouldBeBlack ? "#ffffff" : "#484848";
        backgroundColor = (props.highlight !== null) ? props.highlight : backgroundColor;
              
        const columns = ["a","b","c","d","e","f","g","h"]
        const id = columns[props.index % 8] + (Math.floor(props.index/8) + 1)
        
        return (
            <div key={id} className="square" onMouseDown={(e) => props.handleMouseDown(e, props.index)} style={{ backgroundColor }}>
                {props.piece}
            </div>
        )
        
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        if (i === highlightedSquare) {        //Will this cause issues when we flip the board?
            squares[i] = Square({index: i, handleMouseDown: handleMouseDown, piece: pieces[i], highlight: highlightColor});
        } else {
            squares[i] = Square({index: i, handleMouseDown: handleMouseDown, piece: pieces[i], highlight: null})
        }
    }

    return (
        <div className="chessboard" style={{ border }}>
            {squares}
        </div>
    )
}

/* Draft 1:

- Render Squares
- Render pieces on squares
- When square clicked highlight - if highlighted unhighlight unselect
- Move piece from origin to target 

*/