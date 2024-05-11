import "./chessBoardStyles.css";

export default Chessboard

function Chessboard(){
    function Square(index: number) {
    
        const shouldBeBlack = ((Math.floor(index / 8) % 2) + (index % 2)) % 2 === 0;
        const backgroundColor = shouldBeBlack ? "#ffffff" : "#000000";
   
        return (
            <div key={index} className="square" style={{ backgroundColor }} ></div>
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