import React, { CSSProperties, useState, useRef, useEffect } from "react";
import getMoveSANFromCoords from "../fetches/getMoveSANFromCoords";
import getIsMoveLegal from "../fetches/getIsMoveLegal";
import "../styles/chessBoardStyles.css";
import pieceImages from "../assets/pieceImages";
import getPositionFromFEN from "../fetches/getPositionFromFEN";
import PawnPromoter from "../Components/PawnPromoter";

type ChessboardProps = {
    fen: string,
    highlightColor: string
    onMoveEnter: Function
    flip: boolean
}

enum ChessboardState {
    neutral,
    dragging,
    aiming,
    promoting
}
                        
function Chessboard(props: ChessboardProps) {
    const [dragPosition, setDragPosition] = useState({x: 0, y: 0});
    const [pieces, setPieces] = useState<Array<string|null>>(Array(64).fill(null));

    const boardState = useRef<ChessboardState>(ChessboardState.neutral)    
    const dragImage = useRef<string|null>(null);
    const originSquare = useRef<number|null>(null);
    const targetSquare = useRef<number|null>(null);
    const promotionCapture = useRef<string|null>(null);
    const shouldResetOnDragEnd = useRef<boolean>(false);
    
    const isDragging = boardState.current === ChessboardState.dragging
    const chessBoardSize = 8*75;    //TODO: Find dynamically
    const darkSquaresColor = "#484848";
    const lightSquaresColor = "#ffffff";
    const borderColor = (originSquare.current !== null) ? props.highlightColor : darkSquaresColor;
    const border = "1px solid " + borderColor;
    const sideToMove: "w" | "b" = props.fen.split(" ")[1] as "w" | "b"; //TODO dragging/aiming if piece isn't from side to move
    let promotionElement: JSX.Element|null = null;
    
    useEffect(() => {
        getPositionFromFEN(props.fen)
            .then((positionJSON) => {
                const position: Array<string|null> = Array(64).fill(null);
                for (const location in positionJSON) {
                    const piece = pieceImages[positionJSON[location]];
                    position[Number(location)] = piece;
                }
        
                setPieces(position)
            })
    }, [])

    let handleMouseDown = (_e: React.MouseEvent) => {};
    let handleMouseMove = (_e: React.MouseEvent) => {};
    let handleMouseUp = (_e: React.MouseEvent) => {}; 

    if (boardState.current === ChessboardState.neutral) {
        promotionCapture.current = null;
        handleMouseDown = (e: React.MouseEvent) => {
            if (e.button !== 0) return;  //If not a left mouse click
            
            const clickedSquare = findInteractedSquare(e);
            if (pieces[clickedSquare]) {
                beginDragging(e, clickedSquare);
            }
            
            return;
        }
    }

    if (boardState.current === ChessboardState.dragging) {
        handleMouseDown = (e: React.MouseEvent) => {
            if (e.button === 2) {   //If a right mouse click
                resetToNeutral();
                return;
            }
        }

        handleMouseMove = (e: React.MouseEvent) => {
            const boardRect = e.currentTarget.getBoundingClientRect();

            const outsideXDimensions = e.clientX < boardRect.left || e.clientX > boardRect.right;
            const outsideYDimensions = e.clientY < boardRect.top || e.clientY > boardRect.bottom;

            const offsetX = e.clientX - boardRect.left;
            const offsetY = e.clientY - boardRect.top;
            
            if (outsideXDimensions || outsideYDimensions) { 
                resetToNeutral();
                return;
            }
            
            const pieceSize = (chessBoardSize/8);
            setDragPosition({x: offsetX - pieceSize/2, y: offsetY - pieceSize/2});
            return;  
        }

        handleMouseUp = (e: React.MouseEvent) => {
            let hoveredSquare = findInteractedSquare(e);
            if (shouldResetOnDragEnd.current) {
                resetToNeutral();
                return;
            }

            shouldResetOnDragEnd.current = false;
            
            if (hoveredSquare === originSquare.current) {
                undoDragStart();
                boardState.current = ChessboardState.aiming;
                return;
            }
            
            getIsMoveLegal(props.fen, originSquare.current as number, hoveredSquare)
                .then((isMoveLegal) => {
                    if (!isMoveLegal) {
                        resetToNeutral();
                        return;
                    }
                    
                    targetSquare.current = hoveredSquare;
                    
                    promotionCapture.current = pieces[hoveredSquare]
                    
                    undoDragStart();
                                        
                    if (isMoveLegal === "promotion") {
                        boardState.current = ChessboardState.promoting;
                        return;
                    }

                    const moveSAN = getMoveSANFromCoords(props.fen, originSquare.current as number, targetSquare.current);
                    moveSAN.then((value) => props.onMoveEnter(value))

                    boardState.current = ChessboardState.neutral;
                    return;
                })
                
            function undoDragStart() {
                const piecesCopy = pieces.slice();
                piecesCopy[hoveredSquare] = dragImage.current;
                
                dragImage.current = null;
                setPieces(piecesCopy);
            }
        }
    }


    if (boardState.current === ChessboardState.aiming) {
        handleMouseDown = (e: React.MouseEvent) => {
            if (e.button === 2) {   //If a right mouse click
                resetToNeutral();
                return;
            }

            if (e.button !== 0) return;  //If not a left mouse click
            
            const clickedSquare = findInteractedSquare(e);
            if (pieces[clickedSquare]) {
                if (clickedSquare === originSquare.current) shouldResetOnDragEnd.current = true;
                beginDragging(e, clickedSquare);
            }

            return;
        }

        handleMouseUp = (e: React.MouseEvent) => {
            let hoveredSquare = findInteractedSquare(e);
            
            
            getIsMoveLegal(props.fen, originSquare.current as number, hoveredSquare)
                .then((isMoveLegal) => {
                    if (!isMoveLegal) {
                        resetToNeutral();
                        return;
                    }

                    promotionCapture.current = pieces[hoveredSquare];

                    const piecesCopy = pieces.slice();
                    piecesCopy[hoveredSquare] = piecesCopy[originSquare.current as number];
        
                    piecesCopy[originSquare.current as number] = null;
                    setPieces(piecesCopy);
                    
                    targetSquare.current = hoveredSquare;

                    if (isMoveLegal === "promotion") {
                        boardState.current = ChessboardState.promoting;
                        return;
                    }
                    
                    const move = getMoveSANFromCoords(props.fen, originSquare.current as number, targetSquare.current);
                    move.then((value) => {
                        console.log(value)
                        props.onMoveEnter(value)
                    })
                    
                    boardState.current = ChessboardState.neutral
                })            
            }
        }

    if (boardState.current === ChessboardState.promoting) {
        handleMouseDown = (e: React.MouseEvent) => {
            if (e.button === 2) {   //If a right mouse click
                const piecesCopy = pieces.slice();
                piecesCopy[originSquare.current as number] = piecesCopy[targetSquare.current as number];
                piecesCopy[targetSquare.current as number] = promotionCapture.current;
                setPieces(piecesCopy)
                
                resetToNeutral();
                return;
            }
        }

        let promotionColumn = (targetSquare.current as number);
        if (sideToMove === "b") promotionColumn = 63 - (targetSquare.current as number)
        
        const promotionPosition = `${promotionColumn  * (chessBoardSize / 8)}px`;
        
        function handlePromotionSubmit(promotionPiece: string) {
            const piecesCopy = pieces.slice();
            piecesCopy[targetSquare.current as number] = pieceImages[promotionPiece];
            setPieces(piecesCopy);

            const move = getMoveSANFromCoords(props.fen, 
                                              originSquare.current as number, 
                                              targetSquare.current as number,
                                              promotionPiece.toLowerCase());
            move.then((value) => {
                props.onMoveEnter(value)
            })

            //check if we have the right move - send the position + promotion
            boardState.current = ChessboardState.neutral;
        } 

        promotionElement = <PawnPromoter 
                            color={sideToMove} 
                            handleClick={handlePromotionSubmit} 
                            style={{ position: "absolute", left: promotionPosition}} 
                            />
        
    }

    function findInteractedSquare(e: React.MouseEvent) {
        const boardRect = e.currentTarget.getBoundingClientRect();
        const squareSize = chessBoardSize/8;    
    
        const column = Math.floor((e.clientX - boardRect.left)/squareSize);
        const row = Math.floor((e.clientY - boardRect.top)/squareSize);

        if (props.flip) return 63 - (column + (row*8));
        return column + (row*8);
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
        targetSquare.current = null;
        shouldResetOnDragEnd.current = false;
        boardState.current = ChessboardState.neutral;
    }

    
    function beginDragging(e: React.MouseEvent, clickedSquare: number) {
        originSquare.current = clickedSquare;
        dragImage.current = pieces[clickedSquare];
        
        const piecesCopy = pieces.slice();
        piecesCopy[clickedSquare] = null;
        
        setPieces(piecesCopy);

        const boardRect = e.currentTarget.getBoundingClientRect()

        const offsetX = e.clientX - boardRect.left;
        const offsetY = e.clientY - boardRect.top;
    
        const pieceSize = (chessBoardSize/8);
        setDragPosition({x: offsetX - pieceSize/2, y: offsetY - pieceSize/2});
        boardState.current = ChessboardState.dragging
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
        const id = columns[i % 8] + (Math.floor(i / 8) + 1)
        if (i === originSquare.current || i === targetSquare.current) {
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
            {!props.flip ? squares : squares.reverse()}
            {promotionElement}
        </div>
    )
}

export default Chessboard;