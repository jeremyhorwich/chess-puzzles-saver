import { useState } from "react";
import "./chessBoardStyles.css";
export default Chessboard

function Chessboard(){
    const [highlighted, setHighlighted] = useState<number>(64)

    const highlightColor = "#cccc95"
    const borderColor = (highlighted < 64) ? highlightColor : "#000000"
    const border = "1px solid " + borderColor
    
    function handleClick(squareIndex: number) {
        //Can put more complex logic here for moving pieces
        let newHighlighted = highlighted;
        if (highlighted < 64) {
            newHighlighted = 64;
        } else {
            newHighlighted = squareIndex;
        }
        setHighlighted(newHighlighted)
        //Store the highlighted square as state
        //Then when the board is clicked we match up the id of the square
        //with the highlight below
    }
    
    
    type SquareProps = {
        index: number,
        handleClick: Function,
        highlight: string | null
    }
    
    
    function Square(props: SquareProps) {       
        const shouldBeBlack = ((Math.floor(props.index / 8) % 2) + (props.index % 2)) % 2 === 0;
        let backgroundColor = shouldBeBlack ? "#ffffff" : "#000000";
        backgroundColor = (props.highlight !== null) ? props.highlight : backgroundColor;
              
        const columns = ["a","b","c","d","e","f","g","h"]
        const id = columns[props.index % 8] + (Math.floor(props.index/8) + 1)
        
        return (
            <div key={id} className="square" onClick={() => props.handleClick(props.index)} style={{ backgroundColor }} ></div>
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