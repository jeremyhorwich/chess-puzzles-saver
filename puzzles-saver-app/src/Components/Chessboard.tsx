import "./chessBoardStyles.css";

export default Chessboard

function Chessboard(){
    function Square(index: number) {
    
        const backgroundColor = ((index % 2) === 0) ? "#000000" : "#ffffff"
    
        return (
            <div key={index} className="square" style={{ backgroundColor }} ></div>
        )
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        squares[i] = Square(i)
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