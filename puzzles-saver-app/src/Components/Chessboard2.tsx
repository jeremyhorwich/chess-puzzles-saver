import React, { CSSProperties, useState, useRef } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"
import useComponentSize from "../hooks/useComponentSize";
export default Chessboard2;

//TODO Handle what happens when mouse exits bounds of components

function Chessboard2(){
    //TODO: set up inital position based on fen passed in through prop
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState<Boolean>(false);
    const [isAiming, setIsAiming] = useState<Boolean>(false);

    const chessBoardSize = 8*75;

    const styles: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
    }
    const initialPos: Array<JSX.Element|null> = Array(64).fill(null);

     const whiteKingTest = <img draggable="false"
                        className="piece" 
                        src={whiteKing}
                        alt="White King" />;
    initialPos[23] = whiteKingTest
    
    let testDragPiece = <img draggable="false"
                        className="dragPiece" 
                        src={whiteKing}
                        style={styles} 
                        alt="White King" />;
        
    const [selectedOrigin, setSelectedOrigin] = useState<number|null>(null);
    const [pieces, setPieces] = useState<Array<JSX.Element|null>>(initialPos);
    const [dragPiece, setDragPiece] = useState<JSX.Element|null>(null)

    const highlightColor = "#cccc95";
    const borderColor = (selectedOrigin !== null) ? highlightColor : "#484848";
    const border = "1px solid " + borderColor;
    
    
    
    function handleMouseDown(e: React.MouseEvent) {
        if (e.button !== 0) return;  //If not a left mouse click

        const targetColumn = Math.floor(e.clientX/75)   //Must change for dynamic board size and position
        const targetRow = Math.floor(e.clientY/75)      //Must change for dynamic board size and position
        const targetSquare = targetColumn + (targetRow*8)
    
        if (!pieces[targetSquare]) return;
        
        setIsDragging(true); 
        setSelectedOrigin(targetSquare);
        setDragPiece(testDragPiece);    //Will have to change this to dynamic drag piece later
        
        const piecesCopy = pieces.slice();
        piecesCopy[targetSquare] = null;
        setPieces(piecesCopy);

        const containerRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - 75/2;
        const mouseY = e.clientY - 75/2;

        setPosition({x: mouseX, y: mouseY})
        
        //Should we set pieces position to be equal to the mouse here?
    }
    
    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) return;
        
        //TODO: Return center of this thing rather than weird quasi-middle
        const containerRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - 75/2;
        const mouseY = e.clientY - 75/2;

        setPosition({x: mouseX, y: mouseY});
    }
    
    function handleMouseUp(e: React.MouseEvent) { 
        if (!isDragging && !isAiming) return;
        
        //TODO: If move illegal, cancel dragging
        const targetColumn = Math.floor(e.clientX/75)   //Must change for dynamic board size and position
        const targetRow = Math.floor(e.clientY/75)      //Must change for dynamic board size and position
        const targetSquare = targetColumn + (targetRow*8)
        
        if (isDragging) {
            if (targetSquare === selectedOrigin) {
                changeFromDraggingToAiming();
                return;
            }
            changeFromDraggingToNeutral();
        } else {
            changeFromAimingToNeutral();
        }
        
        
        function changeFromDraggingToNeutral() { 
            setIsDragging(false);
            setDragPiece(null)

            if (selectedOrigin === null) {
                 console.log("null origin")     //TODO: change to try/fail?
                return;
            }
    
            const origin = selectedOrigin as number;
            
            movePiece(origin, targetSquare);
        }
        
        function changeFromDraggingToAiming() {
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = whiteKingTest;
            
            setDragPiece(null);
            setPieces(piecesCopy);
            
            setIsDragging(false);
            setIsAiming(true);
        }

        function changeFromAimingToNeutral() {
            setIsAiming(false);

            if (selectedOrigin === null) {
                console.log("null origin")     //TODO: change to try/fail?
                return;
            }
            
            const origin = selectedOrigin as number;
            //TODO: If move illegal, return
            movePiece(origin, targetSquare);
        }
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
                style={{ backgroundColor }}>
                {props.piece}
            </div>
        )
        
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        if (i === selectedOrigin /*|| i === hoveredSquare*/) {        //Will this cause issues when we flip the board?
            squares[i] = Square({index: i, piece: pieces[i], highlight: highlightColor});
        } else {
            squares[i] = Square({index: i, piece: pieces[i], highlight: null})
        }
    }
    
    return (
        <div 
            className="chessboard" style={{ border }} 
            onMouseMove={handleMouseMove} 
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
        >
            {isDragging && testDragPiece}
            {squares}
        </div>
    )
    function movePiece(originIndex: number, targetIndex: number) {  
        //Split into two different functions? One for drag move and one for point click move? Different operations...

        let piecesCopy = pieces.slice();
        piecesCopy[originIndex] = null;
        //piecesCopy[targetIndex] = dragPiece;
        piecesCopy[targetIndex] = whiteKingTest;
        
        // if (piecesCopy[originIndex] !== null) {
        //     piecesCopy[targetIndex] = piecesCopy[originIndex];
        //     piecesCopy[originIndex] = null;
        // }
        
        setSelectedOrigin(null)
        setPieces(piecesCopy)
    }
}


