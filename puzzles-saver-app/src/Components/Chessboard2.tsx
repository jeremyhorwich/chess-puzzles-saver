import React, { CSSProperties, useState, useRef } from "react";
import "./chessBoardStyles.css";
import whiteKing from "../assets/WhiteKing.png"
import whiteQueen from "../assets/WhiteQueen.png"
export default Chessboard2;

//TODO Handle what happens when mouse exits bounds of components

function Chessboard2(){
    //TODO: set up inital position based on fen passed in through prop
    const [position, setPosition] = useState({x: 0, y: 0})
    const [isDragging, setIsDragging] = useState<Boolean>(false)
    const [isAiming, setIsAiming] = useState<Boolean>(false)

    const styles: CSSProperties = {
        position: "absolute",
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab"
    }

    const chessboardRef = useRef<HTMLDivElement|null>(null)

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
    const [hoveredSquare, setHoveredSquare] = useState<number|null>(null);
    const [pieces, setPieces] = useState<Array<JSX.Element|null>>(initialPos);
    const [dragPiece, setDragPiece] = useState<JSX.Element|null>(null)

    const highlightColor = "#cccc95";
    const borderColor = (selectedOrigin !== null) ? highlightColor : "#484848";
    const border = "1px solid " + borderColor;
    
    
    
    function handleMouseDown(e: React.MouseEvent, squareClicked: number) {
        if (e.button !== 0) return;  //If not a left mouse click
        if (!pieces[squareClicked]) return;
        
        setIsDragging(true); 
        setSelectedOrigin(squareClicked);
        setDragPiece(testDragPiece);    //Will have to change this to dynamic drag piece later
        
        const piecesCopy = pieces.slice();
        piecesCopy[squareClicked] = null;
        setPieces(piecesCopy);
        
        //Should we set pieces position to be equal to the mouse here?
    }
    
    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging) return;
        
        //TODO: Return center of this thing rather than weird quasi-middle
        const containerRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left - 60;
        const mouseY = e.clientY - containerRect.top - 60;
        
        setPosition({x: mouseX, y: mouseY});
    }
    
    function handleMouseOver(squareOver: number) {
        console.log("over")
        if (!isDragging) {
            return
        }

        setHoveredSquare(squareOver);
        
        //console.log(squareOver)
        
        // if (squareOver !== selectedSquare) {
            //     setHovered(squareOver);
            // }
        }
        
    function handleMouseUp() { 
        console.log(hoveredSquare)      
        if (!isDragging && !isAiming) return;
        //TODO: If move illegal, cancel dragging
        
        if (isDragging) {
            if (hoveredSquare === selectedOrigin) {
                changeFromDraggingToAiming();
                return;
            }
            changeFromDraggingToNeutral();            
        } else {
            changeFromAimingToNeutral();
        }
        
        
        function changeFromDraggingToNeutral() { 
            setIsDragging(false);

            if (selectedOrigin === null) {
                 console.log("null origin")     //TODO: change to try/fail?
                return;
            }
    
            const origin = selectedOrigin as number;
            movePiece(origin, hoveredSquare as number);     //TODO: Type guard this
        }
        
        function changeFromDraggingToAiming() {
            const piecesCopy = pieces.slice();
            piecesCopy[hoveredSquare as number] = whiteKingTest;
            
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
            movePiece(origin, hoveredSquare as number);        //TODO: Type guard this
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
                onMouseDown={(e) => handleMouseDown(e, props.index)}
                onMouseOver={() => handleMouseOver(props.index)}
                // onMouseOver={() => handleMouseOver(props.index)}            //TODO move these function through props
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
            onMouseUp={() => handleMouseUp()} 
            ref={chessboardRef}
        >
            {testDragPiece}
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


