import React, { CSSProperties, useState, useRef } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"

const initialPos: Array<JSX.Element|null> = Array(64).fill(null);

const whiteKingTest = <img 
                        draggable="false"
                        className="piece" 
                        src={whiteKing}
                        alt="White King" />;
                        
                        initialPos[23] = whiteKingTest
                        
function Chessboard(){
    //TODO: Set up initial position based on fen passed in through prop
    //TODO: Behavior if mouse leaves chessboard while dragging
    //TODO: Highlight hover squares
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState<Boolean>(false);
    const [isAiming, setIsAiming] = useState<Boolean>(false);
    const [pieces, setPieces] = useState<Array<JSX.Element|null>>(initialPos);
    const [dragImage, setDragImage] = useState<JSX.Element|null>(null)
    
    const selectedOrigin = useRef<number|null>(null);
    
    const chessBoardSize = 8*75;    //TODO: Find dynamically
    const highlightColor = "#cccc95";
    const borderColor = (selectedOrigin !== null) ? highlightColor : "#484848";
    const border = "1px solid " + borderColor;
    
    let styles: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
    }
    
    let testDragPiece = <img draggable="false"
    className="dragPiece" 
    src={whiteKing}
    style={styles} 
    alt="White King" />;
    
    
    function handleMouseDown(e: React.MouseEvent) {
        if (e.button !== 0) return;  //If not a left mouse click
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        
        const targetColumn = Math.floor((e.clientX - boardRect.left)/75);   //Must change for dynamic board size
        const targetRow = Math.floor((e.clientY - boardRect.top)/75);      //Must change for dynamic board size
        const targetSquare = targetColumn + (targetRow*8);
        
        if (!pieces[targetSquare]) return;
        
        changeFromNeutralToDragging();
        return;
        
        
        function changeFromNeutralToDragging() {
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = null;
            
            setPieces(piecesCopy);
            selectedOrigin.current = targetSquare;
            //setDragImage(testDragPiece);    //TODO Change this to have dynamic image
            
            setPosition({x: e.clientX - 75/2, y: e.clientY - 75/2});
            setIsDragging(true); 
        }
    }
    
    
    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) return;
        
        const pieceSize = (chessBoardSize/8);
        setPosition({x: e.clientX - pieceSize/2, y: e.clientY - pieceSize/2});
    }

    
    function handleMouseUp(e: React.MouseEvent) { 
        if (!isDragging && !isAiming) return;
        
        //TODO: If move illegal, cancel dragging
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        const squareSize = chessBoardSize/8
        
        const targetColumn = Math.floor((e.clientX - boardRect.left)/squareSize)
        const targetRow = Math.floor((e.clientY - boardRect.top)/squareSize)
        const targetSquare = targetColumn + (targetRow*8)
        
        if (isDragging) {
            if (targetSquare === selectedOrigin.current) {
                changeFromDraggingToAiming();
            } else {
                changeFromDraggingToNeutral();
            }
            return; 
        }
        
        changeFromAimingToNeutral();
        return;
        
        
        function changeFromDraggingToNeutral() { 
            setIsDragging(false);
            setDragImage(null)
            
            if (selectedOrigin.current === null) {
                console.log("null origin")     //TODO: change to try/fail?
                return;
            }
            
            const origin = selectedOrigin.current as number;
            
            movePiece(origin, targetSquare);
        }
        
        
        function changeFromDraggingToAiming() {
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = whiteKingTest; //TODO: Get new piece type dynamically
            
            setDragImage(null);
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
            
            const origin = selectedOrigin.current as number;
            //TODO: If move illegal, return
            movePiece(origin, targetSquare);
        }
        
        
        function movePiece(originIndex: number, targetIndex: number) {  
            //Split into two different functions? One for drag move and one for point click move? Different operations...
            
            let piecesCopy = pieces.slice();
            piecesCopy[originIndex] = null;
            piecesCopy[targetIndex] = whiteKingTest;        //TODO: Change this to be dynamic
            
            selectedOrigin.current = null;
            setPieces(piecesCopy)
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
            <div 
                key={id} 
                className="square" 
                style={{ backgroundColor }}
            >
                {props.piece}
            </div>
        )
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        if (i === selectedOrigin.current /*|| i === hoveredSquare*/) {        //Will this cause issues when we flip the board?
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
}

export default Chessboard;