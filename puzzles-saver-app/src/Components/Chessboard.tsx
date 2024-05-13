import { useState } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.svg"
export default Chessboard;

function Chessboard(){
    const aboveHighestIndexValue = 64;

    const [highlighted, setHighlighted] = useState<number>(aboveHighestIndexValue)

    const highlightColor = "#cccc95"
    const borderColor = (highlighted < aboveHighestIndexValue) ? highlightColor : "#484848"
    const border = "1px solid " + borderColor;
    
    function handleClick(squareIndex: number) {
        //Can put more complex logic here for moving pieces
        let newHighlighted = highlighted;
        if (highlighted < aboveHighestIndexValue) {
            newHighlighted = aboveHighestIndexValue;
        } else {
            newHighlighted = squareIndex;
        }
        setHighlighted(newHighlighted);
    }
    
    
    type SquareProps = {
        index: number,
        handleClick: Function,
        highlight: string | null
    }
    
    
    function Square(props: SquareProps) {       
        const shouldBeBlack = ((Math.floor(props.index / 8) % 2) + (props.index % 2)) % 2 === 0;
        let backgroundColor = shouldBeBlack ? "#ffffff" : "#484848";
        backgroundColor = (props.highlight !== null) ? props.highlight : backgroundColor;
              
        const columns = ["a","b","c","d","e","f","g","h"]
        const id = columns[props.index % 8] + (Math.floor(props.index/8) + 1)
        
        return (
            <div key={id} className="square" onClick={() => props.handleClick(props.index)} style={{ backgroundColor }}>
                <img className="piece" src={whiteKing} alt="White King" />
            </div>
        )
        
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        if (i === highlighted) {        //Will this cause issues when we flip the board?
            squares[i] = Square({index: i, handleClick: handleClick, highlight: highlightColor});
        } else {
            squares[i] = Square({index: i, handleClick: handleClick, highlight: null})
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