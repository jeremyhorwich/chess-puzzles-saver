import "./chessBoardStyles.css";
import { useId } from "react"
export default Chessboard

function Chessboard(){
    function handleClick() {
        //Store the highlighted square as state
        //Then when the board is clicked we match up the id of the square
        //with the highlight below
    }

    function Square(index: number) {
        const id=useId()
        
        const shouldBeBlack = ((Math.floor(index / 8) % 2) + (index % 2)) % 2 === 0;
        const backgroundColor = shouldBeBlack ? "#ffffff" : "#000000";
        
        let styles;

        styles = {
            backgroundColor: backgroundColor,
            border: (index === 8) ? "4px solid #cccc95" : "1px solid #000000",
            zIndex: (index === 8) ? 1 : 0
        }

        return (
            <div key={id} className="square" style={styles} ></div>
        )

    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        squares[i] = Square(i);
    }
    
    return (
        <div className="chessboard">
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