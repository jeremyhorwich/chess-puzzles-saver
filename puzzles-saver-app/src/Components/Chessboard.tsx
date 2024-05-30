import React, { CSSProperties, useState, useRef, useEffect } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"

const pieceImages: {[key: string]: string} = {
    "k": whiteKing,
    "q": whiteQueen
}

type ChessboardProps = {
    fen: string,
    highlightColor: string
    onMoveEnter: Function
}
                        
function Chessboard(props: ChessboardProps) {
    //TODO: Behavior if mouse leaves chessboard while dragging

    //TODO: Highlight hover squares
    const [position, setPosition] = useState({x: 0, y: 0});
    const [pieces, setPieces] = useState<Array<string|null>>(Array(64).fill(null));
    
    const dragImage = useRef<string|null>(null);
    const selectedOrigin = useRef<number|null>(null);
    const isAiming = useRef<boolean>(false);
    
    const isDragging = (dragImage.current !== null);
    
    const chessBoardSize = 8*75;    //TODO: Find dynamically
    const highlightColor = props.highlightColor;
    const darkSquaresColor = "#484848";
    const lightSquaresColor = "#ffffff";
    const borderColor = (selectedOrigin.current !== null) ? highlightColor : darkSquaresColor;
    const border = "1px solid " + borderColor;
    
    useEffect(() => {
        //TODO: Fetch position from API rather than static data mockup
        
        const initialPos: Array<string|null> = Array(64).fill(null);
        initialPos[23] = pieceImages["k"];
        initialPos[45] = pieceImages["q"];

        setPieces(initialPos)
    }, [])
    
    let styles: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
    }
   
    const dragPiece = <img
                        draggable="false"
                        className="dragPiece" 
                        src={dragImage.current as string}
                        style={styles} />;
    
    
    function handleMouseDown(e: React.MouseEvent) {
        if (e.button === 2) {   //Ifa  right mouse click
            resetToNeutral();
            return;
        }

        if (e.button !== 0) return;  //If not a left mouse click
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        
        const clickedColumn = Math.floor((e.clientX - boardRect.left)/75);   //Must change for dynamic board size
        const clickedRow = Math.floor((e.clientY - boardRect.top)/75);      //Must change for dynamic board size
        const clickedSquare = clickedColumn + (clickedRow*8);

        if (pieces[clickedSquare]) beginDragging();
                
        return;
        
        
        function beginDragging() {
            selectedOrigin.current = clickedSquare;
            dragImage.current = pieces[clickedSquare];

            const piecesCopy = pieces.slice();
            piecesCopy[clickedSquare] = null;

            setPieces(piecesCopy);                        
            setPosition({x: e.clientX - 75/2, y: e.clientY - 75/2});
        }
    }
    
    
    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) return;
        
        //If we exit the confines of the component, then trigger a leave...
        const boardRect = e.currentTarget.getBoundingClientRect();
        const outsideXDimensions = e.clientX < boardRect.left || e.clientX > boardRect.right;
        const outsideYDimensions = e.clientY < boardRect.top || e.clientY > boardRect.bottom;
        
        if (outsideXDimensions || outsideYDimensions) { 
            resetToNeutral();
            return;
        }
        
        const pieceSize = (chessBoardSize/8);
        setPosition({x: e.clientX - pieceSize/2, y: e.clientY - pieceSize/2});
        return;      
    }

    
    function handleMouseUp(e: React.MouseEvent) { 
        if (!isDragging && !isAiming.current) return;
        
        //TODO: If move illegal, cancel dragging
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        const squareSize = chessBoardSize/8;
        
        const targetColumn = Math.floor((e.clientX - boardRect.left)/squareSize);
        const targetRow = Math.floor((e.clientY - boardRect.top)/squareSize);
        const targetSquare = targetColumn + (targetRow*8);
        
        if (isDragging) {
            stopDragging();
            
            if (targetSquare === selectedOrigin.current) {
                toggleAiming();
                return;
            }
            
            props.onMoveEnter("e")
            resetAiming();
            return;
        }
        
        if (isAiming.current) {
            
            //TODO Check for illegal move
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = piecesCopy[selectedOrigin.current as number];
            piecesCopy[selectedOrigin.current as number] = null;
            setPieces(piecesCopy);
            
            props.onMoveEnter("e")

            resetAiming();
        }
        return;
        
        function stopDragging() {
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare] = dragImage.current;
            
            dragImage.current = null;
            setPieces(piecesCopy);
        }
        
        
        function toggleAiming() {
            isAiming.current = !isAiming.current;
            if (!isAiming.current) {
                selectedOrigin.current = null;
            }
            return;
        }
        

        function resetAiming() {
            selectedOrigin.current = null;
            isAiming.current = false;
            return;
        }
    }
    
    
    function resetToNeutral() {
        if (dragImage.current) {
            const piecesCopy = pieces.slice();
            piecesCopy[selectedOrigin.current as number] = dragImage.current;
            setPieces(piecesCopy);
        } else {
            setPosition({x: 0, y: 0});  //Forcing a rerender to unhighlight origin square
        }

        dragImage.current = null;
        selectedOrigin.current = null;
        isAiming.current = false;
    }

    
    type SquareProps = {
        index: number,
        piece: string | null,
        highlight: string | null
    }   
    
    function Square(props: SquareProps) {       
        const shouldBeLight = ((Math.floor(props.index / 8) % 2) + (props.index % 2)) % 2 === 0;
        let backgroundColor = shouldBeLight ? lightSquaresColor : darkSquaresColor;
        backgroundColor = (props.highlight !== null) ? props.highlight : backgroundColor;
            
        return (
            <div
                className="square" 
                style={{ backgroundColor }}
            >
                {props.piece && <img draggable="false" className="piece" src={props.piece as string} />}
            </div>
        )
    }
    
    const squares = Array<JSX.Element>(64)
    const columns = ["a","b","c","d","e","f","g","h"]
    
    for (let i = 0; i < 64; i++) {
        const id = columns[i % 8] + (Math.floor(i/8) + 1)
        if (i === selectedOrigin.current /*|| i === hoveredSquare*/) {        //Will this cause issues when we flip the board?
            squares[i] = <Square key={id} index={i} piece={pieces[i]} highlight={highlightColor} />
        } else {
            squares[i] = <Square key={id} index={i} piece={pieces[i]} highlight={null} />
        }
    }
    
    return (
        <div 
            className="chessboard" style={{ border }} 
            onMouseMove={handleMouseMove} 
            onMouseUp={(e) => handleMouseUp(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            onContextMenu={(e) => e.preventDefault()}
        >
            {isDragging && dragPiece}
            {squares}
        </div>
    )
}

export default Chessboard;