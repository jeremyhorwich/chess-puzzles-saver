import React, { CSSProperties, useState } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"
export default Chessboard2;

//TODO Handle what happens when mouse exits bounds of components

function Chessboard2(){
    //TODO: set up inital position based on fen passed in through prop
    const [position, setPosition] = useState({x: 0, y: 0})
    const [isDragging, setIsDragging] = useState<Boolean>(false)

    const styles: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
    }

    const initialPos: Array<JSX.Element|null> = Array(64).fill(null);

    initialPos[23] = <img draggable="false"
                        className="piece" 
                        src={whiteKing}
                        alt="White King" />;
    
    let testPiece = <img draggable="false"
                        className="dragPiece" 
                        src={whiteKing}
                        style={styles} 
                        alt="White King" />;
        
    const [selectedSquare, setSelected] = useState<number|null>(null);
    const [hoveredSquare, setHovered] = useState<number|null>(null);
    const [pieces, setPieces] = useState<Array<JSX.Element|null>>(initialPos);

    const highlightColor = "#cccc95";
    const borderColor = (selectedSquare !== null) ? highlightColor : "#484848";
    const border = "1px solid " + borderColor;
   
   
   
   function handleMouseDown(e: React.MouseEvent, squareClicked: number) {
        if (e.button !== 0) {  //Not a left mouse click
            return
        }

        if (pieces[squareClicked] === null) {
            return
        }
        
        if (selectedSquare === null) {
            //setSelected(squareClicked);
            setIsDragging(true);
            console.log("beginning drag");
            return
        }

        if (squareClicked === selectedSquare) {
            //setSelected(null);
            return
        }

        // let newPieces = pieces.slice();
        // if (newPieces[selectedSquare] !== null) {
        //     newPieces[squareClicked] = newPieces[selectedSquare];
        // }

        // newPieces[selectedSquare] = null;
        
        //setSelected(null)
        //setPieces(newPieces)
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) {
            return
        }

        const containerRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left - 60;
        const mouseY = e.clientY - containerRect.top - 60;

        setPosition({x: mouseX, y: mouseY})
    }

    function handleMouseOver(squareOver: number) {
        if (!isDragging) {
            return
        }

        //console.log(squareOver)

        // if (squareOver !== selectedSquare) {
        //     setHovered(squareOver);
        // }
    }

    function handleMouseUp(squareOver: number) {
        if (isDragging) {
            setIsDragging(false)
            console.log("drag end")
        }
        //setHovered(null)
        //setSelected(squareOver)
        //If we've left the square we started on, then drop piece there
    }
    
    type SquareProps = {
        index: number,
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
            <div key={id} 
                className="square" 
                onMouseDown={(e) => handleMouseDown(e, props.index)} 
                onMouseOver={() => handleMouseOver(props.index)}            //TODO move these function through props
                style={{ backgroundColor }}>
                {props.piece}
            </div>
        )
        
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        if (i === selectedSquare || i === hoveredSquare) {        //Will this cause issues when we flip the board?
            squares[i] = Square({index: i, piece: pieces[i], highlight: highlightColor});
        } else {
            squares[i] = Square({index: i, piece: pieces[i], highlight: null})
        }
    }

    return (
        <div className="chessboard" style={{ border }} onMouseUp={() => handleMouseUp(0)} onMouseMove={handleMouseMove}>
            {testPiece}
            {squares}
        </div>
    )
}