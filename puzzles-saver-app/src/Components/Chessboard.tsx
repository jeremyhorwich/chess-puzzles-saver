import React, { CSSProperties, useState, useRef, useEffect } from "react";
import useGetMoveSANFromCoords from "../hooks/fetches/useGetMoveSANFromCoords";
import useGetIsMoveLegal from "../hooks/fetches/useGetIsMoveLegal";
import "../styles/chessBoardStyles.css";
import pieceImages from "../assets/pieceImages";

const backend_server = "http://127.0.0.1:8000"

type ChessboardProps = {
    fen: string,
    highlightColor: string
    onMoveEnter: Function
}
                        
function Chessboard(props: ChessboardProps) {
    //TODO: Highlight hover squares?
    const [dragPosition, setDragPosition] = useState({x: 0, y: 0});
    const [pieces, setPieces] = useState<Array<string|null>>(Array(64).fill(null));
    
    const dragImage = useRef<string|null>(null);
    const originSquare = useRef<number|null>(null);
    const targetSquare = useRef<number|null>(null);
    const isAiming = useRef<boolean>(false);
    
    const isDragging = (dragImage.current !== null);
    const chessBoardSize = 8*75;    //TODO: Find dynamically
    const darkSquaresColor = "#484848";
    const lightSquaresColor = "#ffffff";
    const borderColor = (originSquare.current !== null) ? props.highlightColor : darkSquaresColor;
    const border = "1px solid " + borderColor;
    
    useEffect(() => {
        async function getInitialPos() {
            try {
                const response = await fetch(`${backend_server}/chess/utils/fen-to-pieces-coords?fen=${props.fen}`);
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                const initialPosJSON = await response.json();
                
                const initialPos: Array<string|null> = Array(64).fill(null);
                for (const location in initialPosJSON) {
                    const piece = pieceImages[initialPosJSON[location]];
                    initialPos[Number(location)] = piece;
                }

                setPieces(initialPos)
            } catch (error) {
                console.log(error);
            }
        }
        getInitialPos();
    }, [])

    
    
    function handleMouseDown(e: React.MouseEvent) {
        if (e.button === 2) {   //If a right mouse click
            resetToNeutral();
            return;
        }
        
        if (e.button !== 0) return;  //If not a left mouse click
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        
        const clickedColumn = Math.floor((e.clientX - boardRect.left)/(chessBoardSize/8));
        const clickedRow = Math.floor((e.clientY - boardRect.top)/(chessBoardSize/8));
        const clickedSquare = clickedColumn + (clickedRow*8);

        if (isAiming.current && clickedSquare !== originSquare.current) return;
        
        if (pieces[clickedSquare]) {
            beginDragging();
            targetSquare.current = null;
        } 
        
        return;
        
        
        function beginDragging() {
            originSquare.current = clickedSquare;
            dragImage.current = pieces[clickedSquare];
            
            const piecesCopy = pieces.slice();
            piecesCopy[clickedSquare] = null;
            
            setPieces(piecesCopy);
            setDragPosition({x: e.clientX - 75/2, y: e.clientY - 75/2});
        }
    }
    
    
    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) return;
        
        const boardRect = e.currentTarget.getBoundingClientRect();
        const outsideXDimensions = e.clientX < boardRect.left || e.clientX > boardRect.right;
        const outsideYDimensions = e.clientY < boardRect.top || e.clientY > boardRect.bottom;
        
        if (outsideXDimensions || outsideYDimensions) { 
            resetToNeutral();
            return;
        }
        
        const pieceSize = (chessBoardSize/8);
        setDragPosition({x: e.clientX - pieceSize/2, y: e.clientY - pieceSize/2});
        return;      
    }
    
    
    function handleMouseUp(e: React.MouseEvent) { 
        if (!isDragging && !isAiming.current) return;
                
        const boardRect = e.currentTarget.getBoundingClientRect();
        const squareSize = chessBoardSize/8;
        
        const hoveredColumn = Math.floor((e.clientX - boardRect.left)/squareSize);
        const hoveredRow = Math.floor((e.clientY - boardRect.top)/squareSize);
        const hoveredSquare = hoveredColumn + (hoveredRow*8);

        useGetIsMoveLegal(props.fen, originSquare.current as number, hoveredSquare)
            .then((isMoveLegal) => {
                if (isDragging) {
                    if (hoveredSquare === originSquare.current) {
                        stopDragging();
                        toggleAiming();
                        return;
                    }

                    if (!isMoveLegal) {
                        resetToNeutral();
                        return;
                    }
                    
                    stopDragging();                    
                    isAiming.current = false;
                    targetSquare.current = hoveredSquare;
                    
                    const moveSAN = useGetMoveSANFromCoords(props.fen, originSquare.current as number, targetSquare.current);
                    moveSAN.then((value) => props.onMoveEnter(value))
                    return;
                }
                
                if (isAiming.current) {
                    if (!isMoveLegal) {
                        resetToNeutral();
                        return;
                    }

                    const piecesCopy = pieces.slice();
                    piecesCopy[hoveredSquare] = piecesCopy[originSquare.current as number];
        
                    piecesCopy[originSquare.current as number] = null;
                    setPieces(piecesCopy);
                    
                    isAiming.current = false;
                    targetSquare.current = hoveredSquare;
                    
                    const move = useGetMoveSANFromCoords(props.fen, originSquare.current as number, targetSquare.current);
                    move.then((value) => {
                        console.log(value)
                        props.onMoveEnter(value)
                    })
                }            
            })

        function stopDragging() {
            const piecesCopy = pieces.slice();
            piecesCopy[hoveredSquare] = dragImage.current;
            
            dragImage.current = null;
            setPieces(piecesCopy);
        }
        
        
        function toggleAiming() {
            isAiming.current = !isAiming.current;
            if (!isAiming.current) {
                originSquare.current = null;
            }
        }
    }

    
    function resetToNeutral() {
        if (dragImage.current) {
            const piecesCopy = pieces.slice();
            piecesCopy[originSquare.current as number] = dragImage.current;
            setPieces(piecesCopy);
        } else {
            setDragPosition({x: 0, y: 0});  //Forcing a rerender to unhighlight origin square
        }
        
        dragImage.current = null;
        originSquare.current = null;
        isAiming.current = false;
    }
    

    let styles: CSSProperties = {
        position: "absolute",
        left: dragPosition.x,
        top: dragPosition.y,
        cursor: isDragging ? "grabbing" : "grab"
    }
    
    const dragPiece = <img
                        draggable="false"
                        className="dragPiece" 
                        src={dragImage.current as string}
                        style={styles} />;
    
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
            <div className="square" style={{ backgroundColor }}>
                {props.piece && <img draggable="false" className="piece" src={props.piece as string} />}
            </div>
        )
    }
    
    const squares = Array<JSX.Element>(64)
    const columns = ["a","b","c","d","e","f","g","h"]
    
    for (let i = 0; i < 64; i++) {
        const id = columns[i % 8] + (Math.floor(i/8) + 1)
        if (i === originSquare.current || i === targetSquare.current) {       //Will this cause issues when we flip the board?
            squares[i] = <Square key={id} index={i} piece={pieces[i]} highlight={props.highlightColor} />
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