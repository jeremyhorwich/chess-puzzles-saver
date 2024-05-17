import React, { useState } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"
export default Chessboard;

function Chessboard(){
    //TODO: set up inital position based on fen passed in through prop

    /*

    Functionality in a nutshell:
        - Two methods for moving piece
            (A) Click twice. We click the origin square and the target
                origin is highlighted, target is not. After target selected
                or origin clicked again the highlight goes away
            (B) Click to pick up and drag. We highlight the squares we are over.
                Then when we drop we don't highlight anything anymore

    On drag start
    On drag over
        - Set drop zone as that element (state variable)

    On drop

    */
   
   
   const [selectedSquare, setSelected] = useState<number|null>(null);
   const [hoveredSquare, setHovered] = useState<number|null>(null);
   const [isDragging, setIsDragging] = useState<Boolean>(false)
   const [pieces, setPieces] = useState<Array<JSX.Element|null>>(Array(64).fill(null));
   const [position, setPosition] = useState({x: 0, y: 0})
   
   const highlightColor = "#cccc95";
   const borderColor = (selectedSquare !== null) ? highlightColor : "#484848";
   const border = "1px solid " + borderColor;
   
   let initialPos: Array<JSX.Element|null> = Array(64).fill(null);
   initialPos[23] = <img draggable="false"
                       className="piece" 
                       src={whiteKing} 
                       alt="White King" />;
   
   initialPos[45] = <img draggable className="piece" src={whiteQueen} alt="White King" />;

   setPieces(initialPos)   //THIS WILL NOT WORK

   const styles = {
       position: "absolute",
       left: position.x,
       right: position.y,
       cursor: isDragging ? "grabbing" : "grab"
   }
   
   
   function handleMouseDown(e: React.MouseEvent, squareClicked: number) {
        if (e.button !== 0) {  //Not a left mouse click
            return
        }

        if (pieces[squareClicked] === null) {
            return
        }
        
        if (selectedSquare === null) {
            setSelected(squareClicked);
            setIsDragging(true)
            return
        }

        if (squareClicked === selectedSquare) {
            setSelected(null);
            return
        }

        let newPieces = pieces.slice();
        if (newPieces[selectedSquare] !== null) {
            newPieces[squareClicked] = newPieces[selectedSquare];
        }

        newPieces[selectedSquare] = null;
        
        setSelected(null)
        setPieces(newPieces)
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) {
            return
        }
        setPosition({
            x: e.clientX,
            y: e.clientY
        })
    }

    function handleMouseOver(squareOver: number) {
        if (!isDragging) {
            return
        }

        if (hoveredSquare !== selectedSquare) {
            setHovered(hoveredSquare);
        }
    }

    function handleMouseUp(squareOver: number) {
        setIsDragging(false)
        setHovered(null)
        //If we've left the square we started on, then drop piece there
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
        if (i === selectedSquare) {        //Will this cause issues when we flip the board?
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