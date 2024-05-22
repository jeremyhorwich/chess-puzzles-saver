import React, { CSSProperties, useState, useRef } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"

const initialPos: Array<string|null> = Array(64).fill(null);
initialPos[23] = whiteKing
initialPos[45] = whiteQueen
                        
function Chessboard(){
    //TODO: Set up initial position based on fen passed in through prop
    //TODO: Behavior if mouse leaves chessboard while dragging
    //TODO: Highlight hover squares
    //TOOD: Cancel out of aiming
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isAiming, setIsAiming] = useState<Boolean>(false);
    const [pieces, setPieces] = useState<Array<string|null>>(initialPos);
    const [dragImage, setDragImage] = useState<string|null>(null);
    
    const selectedOrigin = useRef<number|null>(null);
    
    const isDragging = (dragImage !== null);
    const chessBoardSize = 8*75;    //TODO: Find dynamically
    const highlightColor = "#cccc95";
    const borderColor = (selectedOrigin.current !== null) ? highlightColor : "#484848";
    const border = "1px solid " + borderColor;
    
    let styles: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
    }
    
    const dragPiece = <img
                        draggable="false"
                        className="dragPiece" 
                        src={dragImage as string}
                        style={styles} />;
    
    
    function handleMouseDown(e: React.MouseEvent) {
        if (e.button !== 0) return;  //If not a left mouse click
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        
        const originColumn = Math.floor((e.clientX - boardRect.left)/75);   //Must change for dynamic board size
        const originRow = Math.floor((e.clientY - boardRect.top)/75);      //Must change for dynamic board size
        const originSquare = originColumn + (originRow*8);
        
        if (!pieces[originSquare]) return;
        
        changeFromNeutralToDragging();
        return;
        
        
        function changeFromNeutralToDragging() {
            setDragImage(pieces[originSquare])

            const piecesCopy = pieces.slice();
            piecesCopy[originSquare] = null;
            setPieces(piecesCopy);
            
            selectedOrigin.current = originSquare;
                        
            setPosition({x: e.clientX - 75/2, y: e.clientY - 75/2});
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
        const squareSize = chessBoardSize/8;
        
        const targetColumn = Math.floor((e.clientX - boardRect.left)/squareSize);
        const targetRow = Math.floor((e.clientY - boardRect.top)/squareSize);
        const targetSquare = targetColumn + (targetRow*8);
        
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
        
        
        function changeFromDraggingToAiming() {
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = dragImage;
            
            setDragImage(null);
            setPieces(piecesCopy);
            
            setIsAiming(true);
        }
        
        
        function changeFromDraggingToNeutral() { 
            setDragImage(null)
            
            if (selectedOrigin.current === null) {
                console.log("null origin")     //TODO: change to try/fail?
                return;
            }
            
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = dragImage;        //TODO: Change this to be dynamic
            
            selectedOrigin.current = null;
            setPieces(piecesCopy)
        }     
        
        
        function changeFromAimingToNeutral() {
            setIsAiming(false);
            
            if (selectedOrigin === null) {
                console.log("null origin")     //TODO: change to try/fail?
                return;
            }
            
            const origin = selectedOrigin.current as number;
            //TODO: If move illegal, return
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = piecesCopy[origin]
            piecesCopy[origin] = null;
            selectedOrigin.current = null;
            setPieces(piecesCopy)
        }
    }       
        
    type SquareProps = {
        index: number,
        piece: string | null,
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
                {props.piece && <img draggable="false" className="piece" src={props.piece as string} />}
            </div>
        )
    }
    
    const squares = Array<JSX.Element>(64)
    for (let i = 0; i < 64; i++) {
        if (i === selectedOrigin.current /*|| i === hoveredSquare*/) {        //Will this cause issues when we flip the board?
            squares[i] = <Square index={i} piece={pieces[i]} highlight={highlightColor} />
        } else {
            squares[i] = <Square index={i} piece={pieces[i]} highlight={null} />
        }
    }
    
    return (
        <div 
            className="chessboard" style={{ border }} 
            onMouseMove={handleMouseMove} 
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
        >
            {isDragging && dragPiece}
            {squares}
        </div>
    )
}

export default Chessboard;